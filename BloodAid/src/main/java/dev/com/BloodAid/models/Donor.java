package dev.com.BloodAid.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "donors")
@Getter
@Setter
//@NoArgsConstructor
@AllArgsConstructor
public class Donor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String bloodType;
    private String phone;



    public Donor(String name, String email, String bloodType, String phone) 
    {
        this.name = name;
        this.email = email;
        this.bloodType = bloodType;
        this.phone = phone;
    }


    public Long getId() 
    { 
        return id; 
    }

    public void setId(Long id) 
    {
         this.id = id; 
    }

    public String getName() 
    { 
        return name; 
    }

    public void setName(String name) 
    { 
        this.name = name; 
    }

    public String getEmail() 
    { 
        return email; 
    }

    public void setEmail(String email)
    { 
        this.email = email; 
    }

    public String getBloodType() 
    {
         return bloodType; 
    }

    public void setBloodType(String bloodType) 
    { 
        this.bloodType = bloodType; 
    }

    public String getPhone() 
    { 
        return phone; 
    }

    public void setPhone(String phone) 
    { 
        this.phone = phone; 
    }
}
