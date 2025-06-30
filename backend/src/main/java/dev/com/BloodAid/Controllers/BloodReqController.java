package dev.com.BloodAid.Controllers;

import dev.com.BloodAid.repo.UserRepo;
import dev.com.BloodAid.service.BloodReqServices;
import dev.com.BloodAid.models.BloodRequest;
import dev.com.BloodAid.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/blood-requests")
@RestController
public class BloodReqController {
    @Autowired
    private BloodReqServices bloodRequestService;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/create")
    public ResponseEntity<BloodRequest> createRequest(@RequestBody BloodRequest request) {
        return ResponseEntity.ok(bloodRequestService.createRequest(request));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<BloodRequest>> getAllRequests() {
        return ResponseEntity.ok(bloodRequestService.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodRequest> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(bloodRequestService.getRequestById(id));
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<BloodRequest>> getRequestsByUser(@PathVariable User userId) {
//        return ResponseEntity.ok(bloodRequestService.getRequestsByUser(userId));
//    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BloodRequest>> getRequestsByUser(@PathVariable Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(bloodRequestService.getRequestsByUser(user));
    }



    @GetMapping("/search")
    public ResponseEntity<List<BloodRequest>> searchRequests(
            @RequestParam(required = false) String bloodType,
            @RequestParam(required = false) String location) {
        return ResponseEntity.ok(bloodRequestService.searchRequests(bloodType, location));
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
//        bloodRequestService.deleteRequest(id);
//        return ResponseEntity.noContent().build();
//    }
}
