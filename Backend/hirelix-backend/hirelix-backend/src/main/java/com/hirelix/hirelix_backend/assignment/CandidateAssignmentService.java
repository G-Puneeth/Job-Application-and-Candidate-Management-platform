package com.hirelix.hirelix_backend.assignment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CandidateAssignmentService {

    @Autowired
    private CandidateAssignmentRepository assignmentRepository;
    public void deleteAssignment(Long id) {

    assignmentRepository.deleteById(id);
}

public void deleteAllAssignments() {

    assignmentRepository.deleteAll();
}
public void deleteByCandidateId(
        Long candidateId) {

    assignmentRepository
            .deleteByCandidateId(
                    candidateId);
}
    public CandidateAssignment assignCandidate(
            CandidateAssignment assignment) {

        CandidateAssignment savedAssignment =
                assignmentRepository
                        .findByCandidateId(
                                assignment.getCandidateId())
                        .stream()
                        .findFirst()
                        .orElse(new CandidateAssignment());

        savedAssignment.setCandidateId(
                assignment.getCandidateId());

        if (assignment.getJobSearcherId() != null
                && assignment.getJobSearcherId() > 0) {
            savedAssignment.setJobSearcherId(
                    assignment.getJobSearcherId());
        }

        if (assignment.getResumeSpecialistId() != null
                && assignment.getResumeSpecialistId() > 0) {
            savedAssignment.setResumeSpecialistId(
                    assignment.getResumeSpecialistId());
        }

        if (assignment.getApplicationSpecialistId() != null
                && assignment.getApplicationSpecialistId() > 0) {
            savedAssignment.setApplicationSpecialistId(
                    assignment.getApplicationSpecialistId());
        }

        return assignmentRepository.save(savedAssignment);
    }

    public List<CandidateAssignment> getAllAssignments() {

        return assignmentRepository.findAll();
    }
    public List<CandidateAssignment>
getAssignmentsForJobSearcher(
        Long employeeId) {

    return assignmentRepository
            .findByJobSearcherId(
                    employeeId);
}

public List<CandidateAssignment>
getAssignmentsForResumeSpecialist(
        Long employeeId) {

    return assignmentRepository
            .findByResumeSpecialistId(
                    employeeId);
}

public List<CandidateAssignment>
getAssignmentsForApplicationSpecialist(
        Long employeeId) {

    return assignmentRepository
            .findByApplicationSpecialistId(
                    employeeId);
}
}
