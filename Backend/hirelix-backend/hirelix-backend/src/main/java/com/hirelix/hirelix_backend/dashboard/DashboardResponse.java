package com.hirelix.hirelix_backend.dashboard;

public class DashboardResponse {

    private Long totalCandidates;
    private Long totalEmployees;
    private Long totalJobPostings;
    private Long totalApplications;

    public Long getTotalCandidates() {
        return totalCandidates;
    }

    public void setTotalCandidates(Long totalCandidates) {
        this.totalCandidates = totalCandidates;
    }

    public Long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(Long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public Long getTotalJobPostings() {
        return totalJobPostings;
    }

    public void setTotalJobPostings(Long totalJobPostings) {
        this.totalJobPostings = totalJobPostings;
    }

    public Long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(Long totalApplications) {
        this.totalApplications = totalApplications;
    }
}