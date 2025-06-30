//package dev.com.BloodAid.models;
//
//import java.time.LocalDateTime;
//import java.util.Collection;
//import java.util.List;
//
//import org.hibernate.annotations.CreationTimestamp;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Table(name = "users",
//       uniqueConstraints = { @UniqueConstraint(columnNames = "email") })
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class User implements UserDetails {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String userName;
//
//    @Column(nullable = false, unique = true)
//    private String email;
//
//    @Column(nullable = false, unique = true, length = 15)
//    private String phoneNumber;
//
//    @Column(nullable = false)
//    private String password;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private Role role; // ADMIN, DONOR, RECEIVER, HOSPITAL_STAFF
//
//    @Column(nullable = false)
//    private String bloodType;
//
//    @Column(nullable = false)
//    private String location;
//
//    private boolean available;
//
//    @CreationTimestamp
//    private LocalDateTime createdAt;
//
//    // 🔹 Role-based Authorities
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
//    }
//
//    @Override
//    public String getUsername() { return email; }
//
//    @Override
//    public boolean isAccountNonExpired() { return true; }
//
//    @Override
//    public boolean isAccountNonLocked() { return true; }
//
//    @Override
//    public boolean isCredentialsNonExpired() { return true; }
//
//    @Override
//    public boolean isEnabled() { return true; }
//}



package dev.com.BloodAid.models;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users",
        uniqueConstraints = { @UniqueConstraint(columnNames = "email") })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true, length = 15)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // ADMIN, DONOR, RECEIVER, HOSPITAL_STAFF

    @Column(nullable = false)
    private String bloodType;

    @Column(nullable = false)
    private String location;

    private boolean available;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // 🔹 Role-based Authorities
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
public String getPassword() {
    return password; // Returns the password field
}



    @Override
    public String getUsername() {
        return email; // Using email as username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // You can add logic here if needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // You can add logic here if needed
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // You can add logic here if needed
    }

    @Override
    public boolean isEnabled() {
        return true; // You can add logic here if needed
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}