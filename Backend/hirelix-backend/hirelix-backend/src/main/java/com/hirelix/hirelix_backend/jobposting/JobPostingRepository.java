package com.hirelix.hirelix_backend.jobposting;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostingRepository
        extends JpaRepository<JobPosting, Long> {

    List<JobPosting> findByCandidateId(Long candidateId);
}