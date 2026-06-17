package com.hirelix.hirelix_backend.atsresume;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ats-resumes")
public class ATSResumeController {

    @Autowired
    private ATSResumeService atsResumeService;

    @PostMapping
    public ATSResume saveResume(
            @RequestBody ATSResume atsResume) {

        return atsResumeService
                .saveResume(atsResume);
    }

    @GetMapping("/candidate/{candidateId}")
    public List<ATSResume> getByCandidateId(
            @PathVariable Long candidateId) {

        return atsResumeService
                .getByCandidateId(candidateId);
    }

    @GetMapping("/job/{jobPostingId}")
    public List<ATSResume> getByJobPostingId(
            @PathVariable Long jobPostingId) {

        return atsResumeService
                .getByJobPostingId(jobPostingId);
    }
}