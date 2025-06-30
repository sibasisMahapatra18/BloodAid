package dev.com.BloodAid.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import dev.com.BloodAid.models.User;
import dev.com.BloodAid.repo.UserRepo;
import dev.com.BloodAid.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {


    private final UserRepo userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepo userRepository, 
                          AuthenticationManager authenticationManager, 
                          JwtService jwtService,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(token);
    }
}


