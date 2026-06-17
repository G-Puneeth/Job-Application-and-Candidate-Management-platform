package com.hirelix.hirelix_backend.application;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public Application saveApplication(
            @RequestBody Application application) {

        return applicationService
                .saveApplication(application);
    }

    @GetMapping
    public List<Application> getAllApplications() {

        return applicationService
                .getAllApplications();
    }

    @GetMapping("/candidate/{candidateId}")
    public List<Application> getByCandidateId(
            @PathVariable Long candidateId) {

        return applicationService
                .getByCandidateId(candidateId);
    }

    @GetMapping("/job/{jobPostingId}")
    public List<Application> getByJobPostingId(
            @PathVariable Long jobPostingId) {

        return applicationService
                .getByJobPostingId(jobPostingId);
    }
    @GetMapping("/candidate/{candidateId}/count")
   public Long getApplicationCount(
        @PathVariable Long candidateId) {

    return applicationService
            .getApplicationCount(
                    candidateId);
    }
}
