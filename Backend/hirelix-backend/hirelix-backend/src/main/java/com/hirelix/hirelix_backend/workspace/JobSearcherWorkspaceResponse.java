package com.hirelix.hirelix_backend.workspace;

public class JobSearcherWorkspaceResponse {

    private Long candidateId;

    private String targetRole;

    private String targetCompany;

    private String skills;

    private String certifications;

    private java.util.List<com.hirelix.hirelix_backend.jobposting.JobPosting> jobs;

    private java.util.List<com.hirelix.hirelix_backend.application.Application> applications;

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
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

    public java.util.List<com.hirelix.hirelix_backend.jobposting.JobPosting> getJobs() {
        return jobs;
    }

    public void setJobs(
            java.util.List<com.hirelix.hirelix_backend.jobposting.JobPosting> jobs) {
        this.jobs = jobs;
    }

    public java.util.List<com.hirelix.hirelix_backend.application.Application> getApplications() {
        return applications;
    }

    public void setApplications(
            java.util.List<com.hirelix.hirelix_backend.application.Application> applications) {
        this.applications = applications;
    }
}
