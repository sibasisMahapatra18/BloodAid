package dev.com.BloodAid.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/user")
public class UserController {


    @GetMapping("/greet")
     public String greet(){
        return "Hello User";
     }
     
    
}
