package com.hirelix.hirelix_backend.employee;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
   public List<Employee> getAllEmployees() {

    return employeeRepository.findAll();
}
    public Employee createEmployee(Employee employee) {

        employee.setPassword(
                passwordEncoder.encode(
                        employee.getPassword()));

        return employeeRepository.save(employee);
    }
}