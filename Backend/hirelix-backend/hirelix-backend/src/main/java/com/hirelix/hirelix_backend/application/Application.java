package com.hirelix.hirelix_backend.application;

import jakarta.persistence.*;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long candidateId;

    private Long jobPostingId;

    private Long atsResumeId;

    private String applicationStatus;

    private Long submittedByEmployeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public Long getJobPostingId() {
        return jobPostingId;
    }

    public void setJobPostingId(Long jobPostingId) {
        this.jobPostingId = jobPostingId;
    }

    public Long getAtsResumeId() {
        return atsResumeId;
    }

    public void setAtsResumeId(Long atsResumeId) {
        this.atsResumeId = atsResumeId;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public Long getSubmittedByEmployeeId() {
        return submittedByEmployeeId;
    }

    public void setSubmittedByEmployeeId(Long submittedByEmployeeId) {
        this.submittedByEmployeeId = submittedByEmployeeId;
    }
}