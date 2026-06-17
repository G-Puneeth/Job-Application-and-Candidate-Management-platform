package com.hirelix.hirelix_backend.assignment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateAssignmentRepository
        extends JpaRepository<CandidateAssignment, Long> {

    List<CandidateAssignment> findByJobSearcherId(Long jobSearcherId);

    List<CandidateAssignment> findByResumeSpecialistId(Long resumeSpecialistId);

    List<CandidateAssignment> findByApplicationSpecialistId(Long applicationSpecialistId);
    List<CandidateAssignment> findByCandidateId(Long candidateId);
    void deleteByCandidateId(
        Long candidateId);
}