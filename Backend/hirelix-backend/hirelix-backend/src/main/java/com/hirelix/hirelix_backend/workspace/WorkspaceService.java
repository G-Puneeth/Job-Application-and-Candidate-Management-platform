package com.hirelix.hirelix_backend.workspace;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hirelix.hirelix_backend.assignment.CandidateAssignment;
import com.hirelix.hirelix_backend.assignment.CandidateAssignmentRepository;
import com.hirelix.hirelix_backend.candidate.Candidate;
import com.hirelix.hirelix_backend.candidate.CandidateRepository;
import com.hirelix.hirelix_backend.jobposting.JobPosting;
import com.hirelix.hirelix_backend.jobposting.JobPostingRepository;
import com.hirelix.hirelix_backend.atsresume.ATSResumeRepository;
import com.hirelix.hirelix_backend.application.ApplicationRepository;


@Service
public class WorkspaceService {
@Autowired
private ATSResumeRepository atsResumeRepository;

@Autowired
private ApplicationRepository applicationRepository;

    @Autowired
    private CandidateAssignmentRepository assignmentRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;

    // Employee 1 Workspace
    public List<JobSearcherWorkspaceResponse>
            getJobSearcherWorkspace(Long employeeId) {
        System.out.println(
    "JOB SEARCHER WORKSPACE REQUEST"
);

System.out.println(
    "EMPLOYEE ID = " + employeeId
);
        List<CandidateAssignment> assignments =
                assignmentRepository
                        .findByJobSearcherId(employeeId);

        List<JobSearcherWorkspaceResponse> response =
                new ArrayList<>();

        for (CandidateAssignment assignment : assignments) {
            if (assignment == null || assignment.getCandidateId() == null) continue;

            Candidate candidate =
                    candidateRepository
                            .findById(
                                    assignment.getCandidateId())
                            .orElse(null);

            if (candidate != null) {

                JobSearcherWorkspaceResponse dto =
                        new JobSearcherWorkspaceResponse();

                dto.setCandidateId(candidate.getId());
                dto.setTargetRole(candidate.getTargetRole());
                dto.setSkills(candidate.getSkills());
                dto.setCertifications(
                        candidate.getCertifications());

                List<JobPosting> jobs =
                        jobPostingRepository
                                .findByCandidateId(
                                        candidate.getId());

                dto.setJobs(jobs);
                dto.setApplications(
                        applicationRepository
                                .findByCandidateId(
                                        candidate.getId()));

                if (!jobs.isEmpty()) {
                    dto.setTargetCompany(
                            jobs.get(0).getCompanyName());
                }

                response.add(dto);
                
            }
        }

        return response;
    }

    // Employee 2 Workspace
    public List<ResumeSpecialistWorkspaceResponse>
            getResumeSpecialistWorkspace(Long employeeId) {

        List<CandidateAssignment> assignments =
                assignmentRepository
                        .findByResumeSpecialistId(employeeId);

        List<ResumeSpecialistWorkspaceResponse> response =
                new ArrayList<>();

        for (CandidateAssignment assignment : assignments) {
            if (assignment == null || assignment.getCandidateId() == null) continue;

            Candidate candidate =
                    candidateRepository
                            .findById(
                                    assignment.getCandidateId())
                            .orElse(null);

            if (candidate != null) {

                ResumeSpecialistWorkspaceResponse dto =
                        new ResumeSpecialistWorkspaceResponse();

                dto.setCandidateId(candidate.getId());
                dto.setEducation(candidate.getEducation());
                dto.setSkills(candidate.getSkills());
                dto.setCertifications(
                        candidate.getCertifications());
                dto.setExperience(candidate.getExperience());
                dto.setTargetRole(candidate.getTargetRole());

                List<JobPosting> jobs =
                        jobPostingRepository
                                .findByCandidateId(
                                        candidate.getId());

                dto.setJobs(jobs);

                if (!jobs.isEmpty()) {
                    dto.setTargetCompany(
                            jobs.get(0).getCompanyName());
                }

                response.add(dto);
            }
        }

        return response;
    }
    public List<ApplicationSpecialistWorkspaceResponse>
        getApplicationSpecialistWorkspace(
                Long employeeId) {

    List<CandidateAssignment> assignments =
            assignmentRepository
                    .findByApplicationSpecialistId(
                            employeeId);

    List<ApplicationSpecialistWorkspaceResponse>
            response = new ArrayList<>();

    for (CandidateAssignment assignment : assignments) {
            if (assignment == null || assignment.getCandidateId() == null) continue;

        Candidate candidate =
                candidateRepository
                        .findById(
                                assignment.getCandidateId())
                        .orElse(null);

        if (candidate != null) {

            ApplicationSpecialistWorkspaceResponse dto =
                    new ApplicationSpecialistWorkspaceResponse();

            dto.setCandidateId(candidate.getId());
            dto.setFirstName(candidate.getFirstName());
            dto.setLastName(candidate.getLastName());
            dto.setEmail(candidate.getEmail());
            dto.setPhone(candidate.getPhone());
            dto.setLinkedinUrl(
                    candidate.getLinkedinUrl());
            dto.setEducation(candidate.getEducation());
            dto.setUniversity(candidate.getUniversity());
            dto.setGraduationYear(candidate.getGraduationYear());
            dto.setCgpa(candidate.getCgpa());
            dto.setSkills(candidate.getSkills());
            dto.setCertifications(candidate.getCertifications());
            dto.setExperience(candidate.getExperience());
            dto.setTargetRole(candidate.getTargetRole());
            dto.setCountry(candidate.getCountry());
            dto.setPreferredLocations(candidate.getPreferredLocations());
            dto.setVisaStatus(candidate.getVisaStatus());
            dto.setVisaSponsorship(candidate.getVisaSponsorship());
            dto.setWorkAuthorization(candidate.getWorkAuthorization());

            dto.setJobs(
                    jobPostingRepository
                            .findByCandidateId(
                                    candidate.getId()));

            dto.setResumes(
                    atsResumeRepository
                            .findByCandidateId(
                                    candidate.getId()));

            dto.setApplications(
                    applicationRepository
                            .findByCandidateId(
                                    candidate.getId()));

            response.add(dto);
        }
    }

    return response;
 }
}

