package com.hirelix.hirelix_backend.candidate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.hirelix.hirelix_backend.security.JwtService;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public Candidate saveCandidate(Candidate candidate) {

        if (!"PAID".equals(candidate.getPaymentStatus())
                || candidate.getPaymentTransactionId() == null
                || candidate.getPaymentTransactionId().isBlank()) {
            throw new RuntimeException(
                    "Payment required before candidate registration");
        }

        candidate.setPassword(
                passwordEncoder.encode(candidate.getPassword()));
     
        return candidateRepository.save(candidate);
    }
   public List<Candidate> getAllCandidates() {
    return candidateRepository.findAll();
}
    public String loginCandidate(LoginRequest request) {

        Candidate candidate = candidateRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (candidate == null) {
            return "Email not found";
        }

        boolean passwordMatch =
                passwordEncoder.matches(
                        request.getPassword(),
                        candidate.getPassword());

        if (passwordMatch) {
            return jwtService.generateToken(
                    candidate.getEmail());
        }

        return "Invalid Password";
    }
    public Candidate getCandidate(Long id) {

    return candidateRepository
            .findById(id)
            .orElse(null);
    }
   public Candidate updateProfile(Long id, Candidate updatedCandidate) {

    Candidate candidate = candidateRepository
            .findById(id)
            .orElse(null);

    if (candidate == null) {
        return null;
    }
    candidate.setFirstName(updatedCandidate.getFirstName());
    candidate.setLastName(updatedCandidate.getLastName());
    candidate.setEmail(updatedCandidate.getEmail());
    candidate.setSkills(updatedCandidate.getSkills());
    candidate.setCertifications(updatedCandidate.getCertifications());
    candidate.setExperience(updatedCandidate.getExperience());
    candidate.setTargetRole(updatedCandidate.getTargetRole());

    candidate.setEducation(updatedCandidate.getEducation());
    candidate.setLinkedinUrl(updatedCandidate.getLinkedinUrl());
    candidate.setPreferredLocations(updatedCandidate.getPreferredLocations());

    candidate.setVisaStatus(updatedCandidate.getVisaStatus());
    candidate.setVisaSponsorship(updatedCandidate.getVisaSponsorship());
    candidate.setWorkAuthorization(updatedCandidate.getWorkAuthorization());

    return candidateRepository.save(candidate);
    
}
public Candidate updateResume(
        Long candidateId,
        String resumePath) {

    Candidate candidate =
            candidateRepository
                    .findById(candidateId)
                    .orElse(null);

    if (candidate == null) {
        return null;
    }

    candidate.setResumeFilePath(
            resumePath);

    return candidateRepository
            .save(candidate);
}
}
