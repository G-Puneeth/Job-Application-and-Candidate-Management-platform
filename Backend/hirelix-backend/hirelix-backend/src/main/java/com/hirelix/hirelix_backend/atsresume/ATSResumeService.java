package com.hirelix.hirelix_backend.atsresume;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ATSResumeService {

    @Autowired
    private ATSResumeRepository atsResumeRepository;

    public ATSResume saveResume(
            ATSResume atsResume) {

        return atsResumeRepository.save(atsResume);
    }

    public List<ATSResume> getByCandidateId(
            Long candidateId) {

        return atsResumeRepository
                .findByCandidateId(candidateId);
    }

    public List<ATSResume> getByJobPostingId(
            Long jobPostingId) {

        return atsResumeRepository
                .findByJobPostingId(jobPostingId);
    }
}