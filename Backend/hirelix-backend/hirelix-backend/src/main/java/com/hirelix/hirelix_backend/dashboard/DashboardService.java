package com.hirelix.hirelix_backend.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hirelix.hirelix_backend.application.ApplicationRepository;
import com.hirelix.hirelix_backend.candidate.CandidateRepository;
import com.hirelix.hirelix_backend.employee.EmployeeRepository;
import com.hirelix.hirelix_backend.jobposting.JobPostingRepository;

@Service
public class DashboardService {

    private long jobPostingResetOffset = 0;

    private long applicationResetOffset = 0;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public DashboardResponse getDashboard() {

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalCandidates(
                candidateRepository.count());

        response.setTotalEmployees(
                employeeRepository.count());

        response.setTotalJobPostings(
                Math.max(
                        0,
                        jobPostingRepository.count()
                                - jobPostingResetOffset));

        response.setTotalApplications(
                Math.max(
                        0,
                        applicationRepository.count()
                                - applicationResetOffset));

        return response;
    }

    public DashboardResponse resetDailyWorkflowCounts() {

        jobPostingResetOffset =
                jobPostingRepository.count();

        applicationResetOffset =
                applicationRepository.count();

        return getDashboard();
    }
}
