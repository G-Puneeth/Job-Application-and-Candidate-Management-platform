package com.hirelix.hirelix_backend.application;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application saveApplication(
            Application application) {

        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }

    public List<Application> getByCandidateId(
            Long candidateId) {

        return applicationRepository
                .findByCandidateId(candidateId);
    }

    public List<Application> getByJobPostingId(
            Long jobPostingId) {

        return applicationRepository
                .findByJobPostingId(jobPostingId);
    }

    public Long getApplicationCount(
        Long candidateId) {

    return (long)
            applicationRepository
                    .findByCandidateId(
                            candidateId)
                    .size();
    }
}
