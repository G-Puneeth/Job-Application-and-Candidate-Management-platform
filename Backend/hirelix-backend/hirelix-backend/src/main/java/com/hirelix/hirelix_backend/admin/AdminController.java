package com.hirelix.hirelix_backend.admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.hirelix.hirelix_backend.candidate.Candidate;
import com.hirelix.hirelix_backend.employee.Employee;
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
      @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/login")
    public String login(
            @RequestBody AdminLoginRequest request) {

        return adminService.login(request);
    }
     @GetMapping("/encode")
    public String encode() {
        return passwordEncoder.encode("admin123");
    }
    @GetMapping("/candidates")
public List<Candidate> getAllCandidates() {
    return adminService.getAllCandidates();
}
@PostMapping("/employees")
public Employee createEmployee(
        @RequestBody Employee employee) {

    return adminService.createEmployee(employee);
}

@GetMapping("/employees")
public List<Employee> getAllEmployees() {

    return adminService.getAllEmployees();
}

}