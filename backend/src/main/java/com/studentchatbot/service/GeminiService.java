// package com.studentchatbot.service;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.*;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import java.util.List;
// import java.util.Map;

// @Service
// public class GeminiService {

//     @Value("${gemini.api.key}")
//     private String apiKey;

//     @Value("${gemini.api.url}")
//     private String apiUrl;

//     public String getResponse(String message) {

//         try {

//             RestTemplate restTemplate = new RestTemplate();

//             HttpHeaders headers = new HttpHeaders();
//             headers.setContentType(MediaType.APPLICATION_JSON);

//             Map<String, Object> requestBody = Map.of(
//                     "contents", List.of(
//                             Map.of(
//                                     "parts", List.of(
//                                             Map.of("text", message)
//                                     )
//                             )
//                     )
//             );

//             HttpEntity<Map<String, Object>> entity =
//                     new HttpEntity<>(requestBody, headers);

//             ResponseEntity<Map> response = restTemplate.exchange(
//                     apiUrl + "?key=" + apiKey,
//                     HttpMethod.POST,
//                     entity,
//                     Map.class
//             );

//             System.out.println("========== GEMINI RESPONSE ==========");
//             System.out.println(response.getBody());
//             System.out.println("=====================================");

//             List candidates = (List) response.getBody().get("candidates");

//             if (candidates == null || candidates.isEmpty()) {
//                 return "No response received from Gemini.";
//             }

//             Map candidate = (Map) candidates.get(0);

//             Map content = (Map) candidate.get("content");

//             List parts = (List) content.get("parts");

//             Map part = (Map) parts.get(0);

//             return part.get("text").toString();

//         } catch (Exception e) {

//             System.out.println("========== GEMINI ERROR ==========");
//             e.printStackTrace();
//             System.out.println(e.getMessage());
//             System.out.println("==================================");

//             String error = e.getMessage();

//             if (error != null) {

//                 if (error.contains("RESOURCE_EXHAUSTED")) {
//                     return "Gemini API quota exceeded. Please wait a few minutes and try again.";
//                 }

//                 if (error.contains("401")) {
//                     return "Invalid Gemini API Key.";
//                 }

//                 if (error.contains("403")) {
//                     return "Access denied. Please check your Gemini API Key permissions.";
//                 }

//                 if (error.contains("404")) {
//                     return "Gemini model not found. Please update the model name in application.properties.";
//                 }

//                 if (error.contains("429")) {
//                     return "Too many requests. Please wait a minute and try again.";
//                 }

//             }

//             return "Something went wrong while communicating with Gemini AI.";
//         }
//     }
// }
package com.studentchatbot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    // Reuse a single RestTemplate instance instead of creating one per request
    private final RestTemplate restTemplate = new RestTemplate();

    public String getResponse(String message) {
        int maxRetries = 3;
        int retryDelay = 1500; // Start with a 1.5-second delay

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                Map<String, Object> requestBody = Map.of(
                        "contents", List.of(
                                Map.of("parts", List.of(Map.of("text", message)))));

                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

                ResponseEntity<Map> response = restTemplate.exchange(
                        apiUrl + "?key=" + apiKey,
                        HttpMethod.POST,
                        entity,
                        Map.class);

                List candidates = (List) response.getBody().get("candidates");
                if (candidates == null || candidates.isEmpty()) {
                    return "No response received from Gemini.";
                }

                Map candidate = (Map) candidates.get(0);
                Map content = (Map) candidate.get("content");
                List parts = (List) content.get("parts");
                Map part = (Map) parts.get(0);

                return part.get("text").toString();

            } catch (Exception e) {
                String error = e.getMessage();

                // If it's a rate limit or quota exception, wait and retry
                if (error != null && (error.contains("RESOURCE_EXHAUSTED") || error.contains("429"))) {
                    if (attempt < maxRetries) {
                        try {
                            System.out.println(
                                    "Rate limit hit. Retrying attempt " + attempt + " in " + retryDelay + "ms...");
                            Thread.sleep(retryDelay);
                            retryDelay *= 2; // Double the wait time for the next retry (Exponential Backoff)
                            continue;
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                        }
                    }
                }

                // If retries fail or it's a structural error (like 401/404), handle it here
                System.out.println("========== GEMINI ERROR ==========");
                e.printStackTrace();
                System.out.println("==================================");

                if (error != null) {
                    if (error.contains("RESOURCE_EXHAUSTED"))
                        return "Gemini API quota exceeded. Please wait a few minutes and try again.";
                    if (error.contains("401"))
                        return "Invalid Gemini API Key.";
                    if (error.contains("403"))
                        return "Access denied. Please check your Gemini API Key permissions.";
                    if (error.contains("404"))
                        return "Gemini model not found. Please update the model name in application.properties.";
                    if (error.contains("429"))
                        return "Too many requests. Please wait a minute and try again.";
                }
                break;
            }
        }
        return "Something went wrong while communicating with Gemini AI.";
    }
}