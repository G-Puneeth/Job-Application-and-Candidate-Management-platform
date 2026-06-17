package com.hirelix.hirelix_backend.atsresume;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ATSResumeRepository
        extends JpaRepository<ATSResume, Long> {

    List<ATSResume> findByCandidateId(Long candidateId);

    List<ATSResume> findByJobPostingId(Long jobPostingId);
}