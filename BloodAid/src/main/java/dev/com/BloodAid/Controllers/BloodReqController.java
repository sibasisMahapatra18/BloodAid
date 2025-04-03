package dev.com.BloodAid.Controllers;

import dev.com.BloodAid.service.BloodReqServices; // Correct the package name if it is 'services'
import dev.com.BloodAid.models.BloodRequest;
import dev.com.BloodAid.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/blood-requests")
@RestController
public class BloodReqController {
    private BloodReqServices bloodRequestService;

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

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BloodRequest>> getRequestsByUser(@PathVariable User userId) {
        return ResponseEntity.ok(bloodRequestService.getRequestsByUser(userId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<BloodRequest>> searchRequests(
            @RequestParam(required = false) String bloodType,
            @RequestParam(required = false) String location) {
        return ResponseEntity.ok(bloodRequestService.searchRequests(bloodType, location));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        bloodRequestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}
