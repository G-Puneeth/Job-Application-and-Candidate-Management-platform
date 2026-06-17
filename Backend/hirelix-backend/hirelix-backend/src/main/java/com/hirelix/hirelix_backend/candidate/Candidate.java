package com.hirelix.hirelix_backend.candidate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "candidates")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateRefId;

    private String firstName;

    private String lastName;

    private String phone;

    private String email;
@JsonIgnore
    private String password;
   
    private String education;
    private String university;
    private String graduationYear;
    private String cgpa;
    
   
    private String skills;

    private String certifications;

    private String experience;
    private String resumeFilePath;
    private String subscriptionPlan;
    private String paymentStatus;
    private String paymentTransactionId;

    public String getResumeFilePath() {
        return resumeFilePath;
    }

    public void setResumeFilePath(String resumeFilePath) {
        this.resumeFilePath = resumeFilePath;
    }

    public String getSubscriptionPlan() {
        return subscriptionPlan;
    }

    public void setSubscriptionPlan(String subscriptionPlan) {
        this.subscriptionPlan = subscriptionPlan;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentTransactionId() {
        return paymentTransactionId;
    }

    public void setPaymentTransactionId(String paymentTransactionId) {
        this.paymentTransactionId = paymentTransactionId;
    }

    private String targetRole;
    private String country;
    private String preferredLocations;
    private String visaStatus;
    private String visaSponsorship;
    private String workAuthorization;
    private String linkedinUrl;

    public Candidate() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCandidateRefId() {
        return candidateRefId;
    }

    public void setCandidateRefId(String candidateRefId) {
        this.candidateRefId = candidateRefId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
     public String getEducation() {
    return education;
   }

    public void setEducation(String education) {
    this.education = education;
   }
    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(String graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getCgpa() {
        return cgpa;
    }

    public void setCgpa(String cgpa) {
        this.cgpa = cgpa;
    }

    public String getCountry() {
        return country;
    }
     public String getPreferredLocations() {
        return preferredLocations;
    }

    public void setPreferredLocations(String preferredLocations) {
        this.preferredLocations = preferredLocations;
    }
    public void setCountry(String country) {
        this.country = country;
    }
     public String getVisaStatus() {
        return visaStatus;
    }

    public void setVisaStatus(String visaStatus) {
        this.visaStatus = visaStatus;
    }

    public String getVisaSponsorship() {
        return visaSponsorship;
    }

    public void setVisaSponsorship(String visaSponsorship) {
        this.visaSponsorship = visaSponsorship;
    }

    public String getWorkAuthorization() {
        return workAuthorization;
    }

    public void setWorkAuthorization(String workAuthorization) {
        this.workAuthorization = workAuthorization;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }
    public String getSkills() {
    return skills;
}

public void setSkills(String skills) {
    this.skills = skills;
}

public String getCertifications() {
    return certifications;
}

public void setCertifications(String certifications) {
    this.certifications = certifications;
}

public String getExperience() {
    return experience;
}

public void setExperience(String experience) {
    this.experience = experience;
}

public String getTargetRole() {
    return targetRole;
}

public void setTargetRole(String targetRole) {
    this.targetRole = targetRole;
}
}
