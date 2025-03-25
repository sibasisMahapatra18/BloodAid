package dev.com.BloodAid.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.com.BloodAid.models.User;

public interface UserRepo extends JpaRepository<User, Long> {
    
}
