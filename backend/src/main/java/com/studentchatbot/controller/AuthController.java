// package com.studentchatbot.controller;

// import com.studentchatbot.dto.LoginRequest;
// import com.studentchatbot.dto.LoginResponse;
// import com.studentchatbot.service.AuthService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173")
// public class AuthController {

//   @Autowired
//   private AuthService authService;

//   @PostMapping("/login")
//   public LoginResponse login(@RequestBody LoginRequest request) {

//     return authService.login(request);

//   }

// }
package com.studentchatbot.controller;

import com.studentchatbot.dto.LoginRequest;
import com.studentchatbot.dto.LoginResponse;
import com.studentchatbot.entity.Student; // Or your User entity
import com.studentchatbot.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allows access from Vercel & local
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {
        try {
            // Call your authService / userService registration logic
            authService.register(student); 

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Registration successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}