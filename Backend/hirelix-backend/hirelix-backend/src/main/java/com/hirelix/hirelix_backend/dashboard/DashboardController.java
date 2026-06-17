package com.hirelix.hirelix_backend.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/api/dashboard")
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboard();
    }

    @PostMapping("/api/dashboard/reset-daily-counts")
    public DashboardResponse resetDailyWorkflowCounts() {

        return dashboardService.resetDailyWorkflowCounts();
    }
}
