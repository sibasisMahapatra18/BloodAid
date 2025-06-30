package dev.com.BloodAid.service;

import dev.com.BloodAid.models.BloodRequest;
import dev.com.BloodAid.models.User;
import dev.com.BloodAid.repo.Blood_Req_Repo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class BloodReqServices {
    @Autowired
    private Blood_Req_Repo blood_req_repo;

    public BloodRequest createRequest(BloodRequest request) {
        return blood_req_repo.save(request);
    }

    public List<BloodRequest> getAllRequests() {
        return blood_req_repo.findAll();
    }

    public BloodRequest getRequestById(Long id) {
        return blood_req_repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public List<BloodRequest> getRequestsByUser(User user) {
        return blood_req_repo.findByUser(user);
    }

    public List<BloodRequest> searchRequests(String bloodType, String location) {
        if (bloodType != null && location != null) {
            return blood_req_repo.findByBloodTypeAndLocation(bloodType, location);
        } else if (bloodType != null) {
            return blood_req_repo.findByBloodType(bloodType);
        } else if (location != null) {
            return blood_req_repo.findByLocation(location);
        }
        return blood_req_repo.findAll();
    }

    public void deleteRequest(Long id) {
        blood_req_repo.deleteById(id);
    }
}
