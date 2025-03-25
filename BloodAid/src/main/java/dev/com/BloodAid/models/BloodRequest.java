package dev.com.BloodAid.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="blood_req")
@Builder
public class BloodRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String bloodType;
    private String location;
    private int unitsNeeded;
    private String hospitalName;
    private String contactNumber;
    private boolean urgent;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
