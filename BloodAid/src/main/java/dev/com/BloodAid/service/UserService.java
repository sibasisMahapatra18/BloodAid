package dev.com.BloodAid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.com.BloodAid.repo.UserRepo;
import dev.com.BloodAid.models.User;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public User getUserById(Long id) {
       return userRepo.findById(id).get();
    }
    public User updateUser(Long id, User updatedUser) {
        User user = getUserById(id);
        user.setUserName(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setLocation(updatedUser.getLocation());
        
        return userRepo.save(user);
    }
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public List<User> searchUsers(String query) {
        return userRepo.findByUserNameContainingIgnoreCase(query);
    }

    
}
