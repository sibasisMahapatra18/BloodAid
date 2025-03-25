package dev.com.BloodAid.repo;

import dev.com.BloodAid.models.BloodRequest;
import dev.com.BloodAid.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Blood_Req_Repo extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByUser(User user);
    List<BloodRequest> findByBloodType(String bloodType);
    List<BloodRequest> findByLocation(String location);
    List<BloodRequest> findByBloodTypeAndLocation(String bloodType, String location);
}
