package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.model.UserAccount;
import net.javaguides.springboot.repository.UserAccountRepository;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, allowedOriginPatterns = {"https://*.onrender.com"})
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserAccount userAccount) {
        Map<String, Object> response = new HashMap<>();

        if (userAccount.getUsername() == null || userAccount.getUsername().isBlank()) {
            response.put("message", "Username is required.");
            return ResponseEntity.badRequest().body(response);
        }

        if (userAccountRepository.existsByUsername(userAccount.getUsername())) {
            response.put("message", "Username already exists.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        UserAccount savedUser = userAccountRepository.save(userAccount);
        response.put("message", "Registration successful.");
        response.put("user", savedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}