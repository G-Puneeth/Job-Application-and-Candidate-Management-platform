package com.hirelix.hirelix_backend.workspace;

import java.util.List;

import com.hirelix.hirelix_backend.atsresume.ATSResume;
import com.hirelix.hirelix_backend.jobposting.JobPosting;

public class ApplicationSpecialistWorkspaceResponse {

    private Long candidateId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String linkedinUrl;

    private String education;

    private String university;

    private String graduationYear;

    private String cgpa;

    private String skills;

    private String certifications;

    private String experience;

    private String targetRole;

    private String country;

    private String preferredLocations;

    private String visaStatus;

    private String visaSponsorship;

    private String workAuthorization;

    private List<JobPosting> jobs;

    private List<ATSResume> resumes;

    private List<com.hirelix.hirelix_backend.application.Application> applications;

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPreferredLocations() {
        return preferredLocations;
    }

    public void setPreferredLocations(String preferredLocations) {
        this.preferredLocations = preferredLocations;
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

    public List<JobPosting> getJobs() {
        return jobs;
    }

    public void setJobs(List<JobPosting> jobs) {
        this.jobs = jobs;
    }

    public List<ATSResume> getResumes() {
        return resumes;
    }

    public void setResumes(List<ATSResume> resumes) {
        this.resumes = resumes;
    }

    public List<com.hirelix.hirelix_backend.application.Application> getApplications() {
        return applications;
    }

    public void setApplications(
            List<com.hirelix.hirelix_backend.application.Application> applications) {
        this.applications = applications;
    }
}
