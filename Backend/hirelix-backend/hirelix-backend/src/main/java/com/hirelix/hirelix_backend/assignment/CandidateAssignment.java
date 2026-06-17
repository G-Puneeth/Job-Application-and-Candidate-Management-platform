package com.hirelix.hirelix_backend.assignment;

import jakarta.persistence.*;

@Entity
@Table(name = "candidate_assignments")
public class CandidateAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long candidateId;

    private Long jobSearcherId;

    private Long resumeSpecialistId;

    private Long applicationSpecialistId;

    // Add getters and setters here

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

    public Long getJobSearcherId() {
        return jobSearcherId;
    }

    public void setJobSearcherId(Long jobSearcherId) {
        this.jobSearcherId = jobSearcherId;
    }

    public Long getResumeSpecialistId() {
        return resumeSpecialistId;
    }

    public void setResumeSpecialistId(Long resumeSpecialistId) {
        this.resumeSpecialistId = resumeSpecialistId;
    }

    public Long getApplicationSpecialistId() {
        return applicationSpecialistId;
    }

    public void setApplicationSpecialistId(Long applicationSpecialistId) {
        this.applicationSpecialistId = applicationSpecialistId;
    }
}