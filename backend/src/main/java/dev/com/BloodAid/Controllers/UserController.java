package dev.com.BloodAid.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dev.com.BloodAid.models.User;
import dev.com.BloodAid.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
// import dev.com.BloodAid.models.UpdateUserRequest;


@RestController
@RequestMapping("/user")
public class UserController {
  
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }
  
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String query) {
        return ResponseEntity.ok(userService.searchUsers(query));
    }

     @GetMapping("/greet")
     public String greet(HttpServletRequest request){
        return "Hello User"+request.getSession().getId();
     }
     
    
}
