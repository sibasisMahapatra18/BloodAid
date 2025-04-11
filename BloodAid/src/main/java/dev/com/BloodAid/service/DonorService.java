package dev.com.BloodAid.service;

import dev.com.BloodAid.models.Donor;
import dev.com.BloodAid.repo.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonorService 
{
    @Autowired
    private DonorRepository donorRepository;

    public List<Donor> getAllDonors()
    {
        return donorRepository.findAll();
    }

    public Optional<Donor> getDonorById(Long id)
    {
        return donorRepository.findById(id);
    }


    public Donor saveDonor(Donor donor) 
    {
        return donorRepository.save(donor);
    }

    public Donor updateDonor(Long id, Donor donorDetails) 
    {
        return donorRepository.findById(id).map(donor -> {
            donor.setName(donorDetails.getName());
            donor.setEmail(donorDetails.getEmail());
            donor.setBloodType(donorDetails.getBloodType());
            donor.setPhone(donorDetails.getPhone());
            return donorRepository.save(donor);
        }).orElseThrow(() -> new RuntimeException("Donor not found"));
    }

    public void deleteDonor(Long id) 
    {
        donorRepository.deleteById(id);
    }
}

