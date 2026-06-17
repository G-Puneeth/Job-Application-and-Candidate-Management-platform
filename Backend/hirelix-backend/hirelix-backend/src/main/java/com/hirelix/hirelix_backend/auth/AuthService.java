package com.hirelix.hirelix_backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hirelix.hirelix_backend.admin.Admin;
import com.hirelix.hirelix_backend.admin.AdminRepository;
import com.hirelix.hirelix_backend.candidate.Candidate;
import com.hirelix.hirelix_backend.candidate.CandidateRepository;
import com.hirelix.hirelix_backend.employee.Employee;
import com.hirelix.hirelix_backend.employee.EmployeeRepository;
import com.hirelix.hirelix_backend.security.JwtService;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private String normalizeRole(String role) {

        if (role == null) {
            return "";
        }

        return role.trim()
                .toUpperCase()
                .replace(" ", "_")
                .replace("-", "_");
    }

    public AuthResponse login(AuthRequest request) {

        String username = request.getUsername();
        String password = request.getPassword();

        System.out.println("================================");
        System.out.println("Login Attempt");
        System.out.println("Username: " + username);

        // ADMIN LOGIN

        Admin admin =
                adminRepository
                        .findByUsername(username)
                        .orElse(null);

        System.out.println("Admin Found: " + (admin != null));

        if (admin != null) {

            System.out.println("Admin DB Password: " + admin.getPassword());

            // TEMPORARY DEBUG

            if (admin.getPassword().equals(password)
                    || passwordEncoder.matches(
                            password,
                            admin.getPassword())) {

                System.out.println("Admin Login Success");

                return new AuthResponse(
                        jwtService.generateToken(
                                admin.getUsername()),
                        "ADMIN",
                        admin.getId());
            }
        }

        // EMPLOYEE LOGIN

        Employee employee =
                employeeRepository
                        .findByEmployeeId(username)
                        .orElse(null);

        System.out.println("Employee Found: " + (employee != null));

        if (employee != null) {

            System.out.println("Employee DB Password: " + employee.getPassword());

            if (employee.getPassword().equals(password)
                    || passwordEncoder.matches(
                            password,
                            employee.getPassword())) {

                System.out.println("Employee Login Success");

                return new AuthResponse(
                        jwtService.generateToken(
                                employee.getEmployeeId()),
                        normalizeRole(employee.getRole()),
                        employee.getId());
            }
        }

        // CANDIDATE LOGIN

        Candidate candidate =
                candidateRepository
                        .findByEmail(username)
                        .orElse(null);

        System.out.println("Candidate Found: " + (candidate != null));

        if (candidate != null) {

            System.out.println("Candidate DB Password: " + candidate.getPassword());

            if (candidate.getPassword().equals(password)
                    || passwordEncoder.matches(
                            password,
                            candidate.getPassword())) {

                System.out.println("Candidate Login Success");

                return new AuthResponse(
                        jwtService.generateToken(
                                candidate.getEmail()),
                        "CANDIDATE",
                        candidate.getId());
            }
        }

        System.out.println("Login Failed");

        throw new RuntimeException(
                "Invalid Username or Password");
    }
}
