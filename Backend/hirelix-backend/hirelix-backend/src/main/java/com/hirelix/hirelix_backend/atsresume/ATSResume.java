package com.hirelix.hirelix_backend.atsresume;

import jakarta.persistence.*;

@Entity
@Table(name = "ats_resumes")
public class ATSResume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long candidateId;

    private Long jobPostingId;

    private String resumePath;

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

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public Long getSubmittedByEmployeeId() {
        return submittedByEmployeeId;
    }

    public void setSubmittedByEmployeeId(Long submittedByEmployeeId) {
        this.submittedByEmployeeId = submittedByEmployeeId;
    }
}