package com.hirelix.hirelix_backend.assignment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/assignments")
public class CandidateAssignmentController {

    @Autowired
    private CandidateAssignmentService assignmentService;

    @PostMapping
    public CandidateAssignment assignCandidate(
            @RequestBody CandidateAssignment assignment) {

        return assignmentService.assignCandidate(assignment);
    }

    @GetMapping
    public List<CandidateAssignment> getAllAssignments() {

        return assignmentService.getAllAssignments();
    }
    @GetMapping("/candidate/{candidateId}")
public CandidateAssignment getByCandidateId(
        @PathVariable Long candidateId) {

    return assignmentService
            .getAllAssignments()
            .stream()
            .filter(a ->
                    a.getCandidateId()
                            .equals(candidateId))
            .findFirst()
            .orElse(null);
}
@GetMapping("/jobsearcher/{employeeId}")
public List<CandidateAssignment> getJobSearcherAssignments(
        @PathVariable Long employeeId) {

    return assignmentService
            .getAssignmentsForJobSearcher(
                    employeeId);
}

@GetMapping("/resume/{employeeId}")
public List<CandidateAssignment> getResumeAssignments(
        @PathVariable Long employeeId) {

    return assignmentService
            .getAssignmentsForResumeSpecialist(
                    employeeId);
}

@GetMapping("/application/{employeeId}")
public List<CandidateAssignment> getApplicationAssignments(
        @PathVariable Long employeeId) {

    return assignmentService
            .getAssignmentsForApplicationSpecialist(
                    employeeId);
}
    @DeleteMapping("/{id}")
    public void deleteAssignment(
            @PathVariable Long id) {

        assignmentService.deleteAssignment(id);
    }

    @DeleteMapping("/all")
    public void deleteAllAssignments() {

        assignmentService.deleteAllAssignments();
    }
    @DeleteMapping("/candidate/{candidateId}")
public void deleteByCandidateId(
        @PathVariable Long candidateId) {

    assignmentService
            .deleteByCandidateId(
                    candidateId);
}

}