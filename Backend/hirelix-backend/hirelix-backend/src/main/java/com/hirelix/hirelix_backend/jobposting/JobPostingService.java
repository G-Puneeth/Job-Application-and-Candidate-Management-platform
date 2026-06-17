package com.hirelix.hirelix_backend.jobposting;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    public JobPosting saveJobPosting(
            JobPosting jobPosting) {

        return jobPostingRepository.save(jobPosting);
    }

    public List<JobPosting> getJobsByCandidate(
            Long candidateId) {

        return jobPostingRepository
                .findByCandidateId(candidateId);
    }

    public List<JobPosting> getAllJobs() {

        return jobPostingRepository.findAll();
    }
}