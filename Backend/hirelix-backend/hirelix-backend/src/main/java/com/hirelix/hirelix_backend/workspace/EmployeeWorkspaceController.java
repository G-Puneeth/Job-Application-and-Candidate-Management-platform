package com.hirelix.hirelix_backend.workspace;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workspace")
public class EmployeeWorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;

    @GetMapping("/job-searcher/{employeeId}")
    public List<JobSearcherWorkspaceResponse>
            getJobSearcherWorkspace(
                    @PathVariable Long employeeId) {

        return workspaceService
                .getJobSearcherWorkspace(employeeId);
    }
    @GetMapping("/resume-specialist/{employeeId}")
public List<ResumeSpecialistWorkspaceResponse>
        getResumeSpecialistWorkspace(
                @PathVariable Long employeeId) {

    return workspaceService
            .getResumeSpecialistWorkspace(employeeId);
   }
    @GetMapping("/application-specialist/{employeeId}")
public List<ApplicationSpecialistWorkspaceResponse>
        getApplicationSpecialistWorkspace(
                @PathVariable Long employeeId) {

    return workspaceService
            .getApplicationSpecialistWorkspace(
                    employeeId);
   }
}