package com.hirelix.hirelix_backend.workspace;

import java.util.List;

import com.hirelix.hirelix_backend.jobposting.JobPosting;

public class ResumeSpecialistWorkspaceResponse {

    private Long candidateId;

    private String education;

    private String skills;

    private String experience;

    private String targetRole;

    private String targetCompany;

    private String certifications;

    private List<JobPosting> jobs;

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
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

    public String getTargetCompany() {
        return targetCompany;
    }

    public void setTargetCompany(String targetCompany) {
        this.targetCompany = targetCompany;
    }

    public String getCertifications() {
        return certifications;
    }

    public void setCertifications(String certifications) {
        this.certifications = certifications;
    }

    public List<JobPosting> getJobs() {
        return jobs;
    }

    public void setJobs(List<JobPosting> jobs) {
        this.jobs = jobs;
    }
}
