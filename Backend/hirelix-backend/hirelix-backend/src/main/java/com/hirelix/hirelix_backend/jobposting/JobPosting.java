package com.hirelix.hirelix_backend.jobposting;

import jakarta.persistence.*;

@Entity
@Table(name = "job_postings")
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long candidateId;

    private String companyName;

    private String jobTitle;

    private String jobUrl;

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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobUrl() {
        return jobUrl;
    }

    public void setJobUrl(String jobUrl) {
        this.jobUrl = jobUrl;
    }

    public Long getSubmittedByEmployeeId() {
        return submittedByEmployeeId;
    }

    public void setSubmittedByEmployeeId(Long submittedByEmployeeId) {
        this.submittedByEmployeeId = submittedByEmployeeId;
    }
}