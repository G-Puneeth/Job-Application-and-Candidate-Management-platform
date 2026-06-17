# Job-Application-and-Candidate-Management-platform
A full-stack job application management platform that helps candidates streamline their job search through employee-assisted application workflows.

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
