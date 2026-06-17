package com.hirelix.hirelix_backend.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import com.hirelix.hirelix_backend.candidate.Candidate;
import com.hirelix.hirelix_backend.candidate.CandidateRepository;
import com.hirelix.hirelix_backend.employee.Employee;
import com.hirelix.hirelix_backend.employee.EmployeeRepository;
import com.hirelix.hirelix_backend.security.JwtService;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;
    @Autowired
private CandidateRepository candidateRepository;
@Autowired
private EmployeeRepository employeeRepository;
public Employee createEmployee(Employee employee) {

    employee.setPassword(
            passwordEncoder.encode(
                    employee.getPassword()));

    return employeeRepository.save(employee);
}

public List<Employee> getAllEmployees() {

    return employeeRepository.findAll();
}

public List<Candidate> getAllCandidates() {
    return candidateRepository.findAll();
}

    public String login(AdminLoginRequest request) {

        Admin admin = adminRepository
                .findByUsername(request.getUsername())
                .orElse(null);

        if (admin == null) {
            return "Admin Not Found";
        }

        boolean passwordMatch =
                passwordEncoder.matches(
                        request.getPassword(),
                        admin.getPassword());

        if (passwordMatch) {
            return jwtService.generateToken(
                    admin.getUsername());
        }

        return "Invalid Password";
    }
}