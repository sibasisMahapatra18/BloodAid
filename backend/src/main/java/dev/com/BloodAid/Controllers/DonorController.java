package dev.com.BloodAid.Controllers;

import dev.com.BloodAid.models.Donor;
import dev.com.BloodAid.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donors")
public class DonorController 
{
    @Autowired
    private DonorService donorService;

    @GetMapping
    public List<Donor> getAllDonors() 
    {
        return donorService.getAllDonors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donor> getDonorById(@PathVariable Long id) 
    {
        Optional<Donor> donor = donorService.getDonorById(id);
        return donor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Donor createDonor(@RequestBody Donor donor) 
    {
        return donorService.saveDonor(donor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Donor> updateDonor(@PathVariable Long id, @RequestBody Donor donorDetails) 
    {
        try 
        {
            Donor updatedDonor = donorService.updateDonor(id, donorDetails);
            return ResponseEntity.ok(updatedDonor);
        } 
        
        catch (RuntimeException e) 
        {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonor(@PathVariable Long id) 
    {
        donorService.deleteDonor(id);
        return ResponseEntity.noContent().build();
    }
}

