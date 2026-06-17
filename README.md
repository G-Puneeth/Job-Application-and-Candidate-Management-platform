# Job-Application-and-Candidate-Management-platform
A full-stack job application management platform that helps candidates streamline their job search through employee-assisted application workflows.
# Screenshots
<img width="1920" height="1080" alt="Screenshot (78)" src="https://github.com/user-attachments/assets/f14b2052-be78-4052-9619-c6f29946e8cf" />
<img width="1920" height="1080" alt="Screenshot (79)" src="https://github.com/user-attachments/assets/7ce6bc5b-a3cf-4601-a44d-6c75da5812af" />
<img width="1920" height="1080" alt="Screenshot (80)" src="https://github.com/user-attachments/assets/4c78eef3-95c4-4186-8a65-2c3b5a022cd1" />
<img width="1920" height="1080" alt="Screenshot (81)" src="https://github.com/user-attachments/assets/fb95445b-318f-4182-bcad-03140f5d3995" />
<img width="1920" height="1080" alt="Screenshot (82)" src="https://github.com/user-attachments/assets/15157f4e-7017-43ad-8858-6ca1aaca8147" />
<img width="1920" height="1080" alt="Screenshot (83)" src="https://github.com/user-attachments/assets/6de770b6-e469-4f93-970a-2a69331cc4c0" />
<img width="1920" height="1080" alt="Screenshot (84)" src="https://github.com/user-attachments/assets/d592b9c3-094d-450c-a865-290d482c043f" />
<img width="1920" height="1080" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/a359dabc-9772-4106-a802-c28b094c7d38" />
<img width="1920" height="1080" alt="Screenshot (86)" src="https://github.com/user-attachments/assets/bb3cc2c1-a4e8-4b15-b5c8-0da0772b399a" />
<img width="1920" height="1080" alt="Screenshot (87)" src="https://github.com/user-attachments/assets/32af7f34-2e31-4867-8e91-c7d0e3b8699a" />
<img width="1920" height="1080" alt="Screenshot (88)" src="https://github.com/user-attachments/assets/b77c9427-f775-409d-b247-a825aac923f0" />

## 🚀 Overview

Hirelix is a full-stack job application management platform designed to help students and working professionals streamline their job search process.

Many candidates struggle to apply for jobs consistently due to academic schedules, work commitments, or lack of time. Hirelix addresses this problem by providing a structured workflow where dedicated employees assist candidates with job searching, ATS-friendly resume preparation, and application management.

The platform centralizes candidate information, employee workflows, job tracking, and application status monitoring into a single system.

---

## 🎯 Problem Statement

Job seekers often face challenges such as:

* Finding relevant job opportunities daily
* Tailoring resumes for each application
* Tracking applications across multiple platforms
* Managing large numbers of job applications efficiently

Hirelix simplifies this process by creating a collaborative recruitment workflow between candidates and employees.

---

## ✨ Key Features

### Candidate Management

* Candidate Registration
* Secure Login Authentication
* Profile Management
* Resume Management
* Candidate Dashboard

### Employee Management

* Employee Registration
* Employee Login
* Role-Based Access Control
* Employee Dashboard

### Recruitment Workflow

* Candidate Assignment
* Job Tracking
* ATS Resume Management
* Application Status Monitoring

### Administration

* Candidate Monitoring
* Employee Monitoring
* Workflow Tracking
* Performance Management

---

## 🔄 Workflow

1. Candidate registers on Hirelix.
2. Admin reviews candidate information.
3. Candidate is assigned to a Job Search Specialist.
4. Job Search Specialist finds relevant opportunities.
5. Resume Specialist creates ATS-friendly resumes.
6. Application Specialist submits applications.
7. Application statuses are tracked and updated.
8. Candidate monitors progress through the dashboard.

---

## 🏗️ System Architecture

Controller Layer

↓

Service Layer

↓

Repository Layer

↓

MySQL Database

The application follows a layered architecture using Spring Boot best practices.

---

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* Maven

### Frontend

* React.js
* HTML
* CSS
* Bootstrap
* JavaScript

### Database

* MySQL

### Tools & Version Control

* Git
* GitHub
* Postman
* VS Code

---

## 📂 Project Structure

backend/

├── candidate/

├── employee/

├── assignment/

├── job/

├── security/

├── config/

└── repository/

frontend/

├── components/

├── pages/

├── services/

└── assets/

database/

└── MySQL

---

## 🔐 Authentication

Hirelix uses JWT (JSON Web Token) authentication to secure APIs and manage user sessions.

Features:

* Secure Login
* Token-Based Authentication
* Protected Endpoints
* Role-Based Authorization

---

## 📡 REST APIs

### Candidate APIs

* POST /api/candidates/register
* POST /api/candidates/login
* GET /api/candidates
* GET /api/candidates/profile/{id}
* PUT /api/candidates/profile/{id}
* PUT /api/candidates/{id}/resume

### Employee APIs

* POST /api/employees/register
* POST /api/employees/login
* GET /api/employees
* GET /api/employees/{id}

### Assignment APIs

* POST /api/assignments
* GET /api/assignments

### Job APIs

* POST /api/jobs
* GET /api/jobs

---

## 📈 Project Highlights

* Developed a full-stack recruitment platform using Java, Spring Boot, React, and MySQL.
* Built 10+ REST APIs with JWT-based authentication.
* Designed a workflow supporting multiple employee roles and candidate management.
* Created a scalable architecture following Controller-Service-Repository design patterns.
* Designed to support 1,000+ candidate profiles and large-scale job application workflows.

---

## 📸 Screenshots

### Home Page

(Add Screenshot Here)

### Candidate Dashboard

(Add Screenshot Here)

### Employee Dashboard

(Add Screenshot Here)

### API Testing

(Add Screenshot Here)

### Database Schema

(Add Screenshot Here)

---

## 🚀 Future Enhancements

* AI-Based Job Matching
* Resume Parsing
* ATS Score Analyzer
* Automated Job Applications
* Email Notifications
* SMS Notifications
* Analytics Dashboard
* Payment Gateway Integration
* Subscription Management
* Interview Tracking System

---

## 👨‍💻 Author

Puneeth Gotti

B.Tech Computer Science & Engineering

Java Full Stack Developer

GitHub: https://github.com/G-Puneeth

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
