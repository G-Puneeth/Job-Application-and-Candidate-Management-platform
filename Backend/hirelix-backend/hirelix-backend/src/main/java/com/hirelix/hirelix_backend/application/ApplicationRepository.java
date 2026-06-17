package com.hirelix.hirelix_backend.application;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    List<Application> findByCandidateId(Long candidateId);

    List<Application> findByJobPostingId(Long jobPostingId);
    Long countByCandidateId(Long candidateId);
}