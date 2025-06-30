package dev.com.BloodAid.repo;

import dev.com.BloodAid.models.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> 
{
}
