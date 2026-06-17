package com.hirelix.hirelix_backend.candidate;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private CandidateRepository candidateRepository;

    @GetMapping
    public List<Candidate> getAllCandidates() {

        return candidateService.getAllCandidates();
    }

    @PostMapping("/register")
    public Candidate registerCandidate(
            @RequestBody Candidate candidate) {
         System.out.println(
            candidate.getEducation());

    System.out.println(
            candidate.getSkills());

    System.out.println(
            candidate.getTargetRole());

    System.out.println(
            candidate.getLinkedinUrl());

        return candidateService.saveCandidate(
                candidate);
    }

    @PostMapping("/login")
    public String loginCandidate(
            @RequestBody LoginRequest request) {

        return candidateService.loginCandidate(
                request);
    }

    @GetMapping("/dashboard")
    public String dashboard() {

        return "Welcome to Hirelix Candidate Dashboard";
    }

    @GetMapping("/profile/{id}")
    public Candidate getProfile(
            @PathVariable Long id) {

        return candidateService.getCandidate(
                id);
    }

    @PutMapping("/profile/{id}")
    public Candidate updateProfile(
            @PathVariable Long id,
            @RequestBody Candidate updatedCandidate) {

        Candidate candidate =
                candidateRepository
                        .findById(id)
                        .orElseThrow();

        candidate.setFirstName(
                updatedCandidate.getFirstName());

        candidate.setLastName(
                updatedCandidate.getLastName());

        candidate.setPhone(
                updatedCandidate.getPhone());

        candidate.setEducation(
                updatedCandidate.getEducation());

        candidate.setUniversity(
                updatedCandidate.getUniversity());

        candidate.setGraduationYear(
                updatedCandidate.getGraduationYear());

        candidate.setCgpa(
                updatedCandidate.getCgpa());

        candidate.setSkills(
                updatedCandidate.getSkills());

        candidate.setCertifications(
                updatedCandidate.getCertifications());

        candidate.setExperience(
                updatedCandidate.getExperience());

        candidate.setTargetRole(
                updatedCandidate.getTargetRole());

        candidate.setCountry(
                updatedCandidate.getCountry());

        candidate.setPreferredLocations(
                updatedCandidate.getPreferredLocations());

        candidate.setVisaStatus(
                updatedCandidate.getVisaStatus());

        candidate.setVisaSponsorship(
                updatedCandidate.getVisaSponsorship());

        candidate.setWorkAuthorization(
                updatedCandidate.getWorkAuthorization());

        candidate.setLinkedinUrl(
                updatedCandidate.getLinkedinUrl());

        return candidateRepository.save(
                candidate);
    }

    @PutMapping("/{id}/resume")
    public Candidate updateResume(
            @PathVariable Long id,
            @RequestParam String resumePath) {

        return candidateService.updateResume(
                id,
                resumePath);
    }
    @GetMapping("/email/{email}")
public Candidate getCandidateByEmail(
        @PathVariable String email) {

    return candidateRepository
            .findByEmail(email)
            .orElse(null);
}
}