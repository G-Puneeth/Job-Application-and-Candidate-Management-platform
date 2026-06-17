package com.hirelix.hirelix_backend.jobposting;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job-postings")
public class JobPostingController {

    @Autowired
    private JobPostingService jobPostingService;

    @PostMapping
    public JobPosting saveJobPosting(
            @RequestBody JobPosting jobPosting) {

        return jobPostingService
                .saveJobPosting(jobPosting);
    }

    @GetMapping
    public List<JobPosting> getAllJobs() {

        return jobPostingService.getAllJobs();
    }

    @GetMapping("/{candidateId}")
    public List<JobPosting> getJobsByCandidate(
            @PathVariable Long candidateId) {

        return jobPostingService
                .getJobsByCandidate(candidateId);
    }
}