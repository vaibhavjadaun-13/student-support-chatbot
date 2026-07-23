package com.studentchatbot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // 1. Allow credentials (cookies/auth headers)
        config.setAllowCredentials(true);

        // 2. Exact domains allowed (Localhost + Your Vercel domain)
        config.setAllowedOriginPatterns(List.of(
            "http://localhost:5173",
            "https://*.vercel.app",
            "https://student-support-chatbot-hce5.vercel.app"
        ));

        // 3. Allow all headers and HTTP methods (including OPTIONS preflight)
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}