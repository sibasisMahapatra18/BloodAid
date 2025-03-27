package dev.com.BloodAid.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.com.BloodAid.models.User;

public interface UserRepo extends JpaRepository<User, Long> {
    List<User> findByUserNameContainingIgnoreCase(String userName);
    Optional<User> findByEmail(String email);

}
