# CampusConnect – Campus Appointment & Service Booking Portal

**Project Type:** Individual DevOps Project  
**Course:** DevOps  
**Repository:** [CampusConnect – GitHub](https://github.com/priya-bhatt-2602/Appointment-Scheduler-DevOps)  
**Live Application:** [CampusConnect](https://priya-bhatt-2602.github.io/Appointment-Scheduler-DevOps/)

---

## 1. Project Overview

CampusConnect is a web-based campus appointment and service booking portal designed to provide university students with a convenient platform to discover and book different campus services.

The application brings academic mentoring, health consultations, and student grooming services together in one interface. Students can explore available services, book appointments, view their schedules, and manage their appointments through a user-friendly dashboard.

Along with application development, this project demonstrates the implementation of DevOps practices, including version control, Continuous Integration (CI), Continuous Deployment (CD), automated application testing, and post-deployment health checks.

## 2. Application Objectives

- Provide students with a centralized campus service booking interface.
- Make it easier to discover and book available campus services.
- Display scheduled appointments and completed sessions on the dashboard.
- Provide appointment tracking and cancellation functionality.
- Maintain application source code using Git and GitHub.
- Automate application validation and testing using GitHub Actions.
- Deploy application updates through GitHub Pages.
- Verify website availability after deployment.

## 3. Application Features

### 3.1 Home Dashboard

The dashboard provides an overview of the campus appointment portal.

It includes:
- Welcome section and navigation.
- Scheduled appointments summary.
- Completed sessions summary.
- Service directory.
- Upcoming appointment agenda.
- Quick access to booking and schedule pages.

### 3.2 Available Campus Services

CampusConnect provides three main service categories.

**1. Campus Health & Wellness Center**

- Service: Doctor Consultation
- Description: General health checkups, medical certificates, and student wellness consultations.
- Duration: 30 minutes
- Location: Room 204 Health Wing

**2. Academic & Career Development**

- Service: Mentoring Session
- Description: Guidance on coursework, semester project reviews, internship preparation, and resume building.
- Duration: 45 minutes
- Mode: In-person or Zoom
- Location: Engineering Hall 3B

**3. Campus Grooming & Style Studio**

- Service: Salon Appointment
- Description: Haircuts, styling, and personal grooming services through campus lifestyle partners.
- Duration: 20–40 minutes
- Location: Student Union Suite 12

### 3.3 Book Appointment

Students can access the booking interface to select and book the available campus services.

### 3.4 My Appointments

Students can access their appointment information and manage their scheduled bookings, including cancellation.

### 3.5 Appointment Dashboard Information

The dashboard displays scheduled appointments, completed sessions, service categories, and upcoming agenda information.

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure of application pages |
| CSS3 | Styling and responsive layout |
| Tailwind CSS | UI styling |
| JavaScript | Application functionality and interactions |
| Browser localStorage | Client-side appointment data persistence |
| Git | Version control |
| GitHub | Source code hosting |
| GitHub Actions | Automated CI and health-check workflows |
| Node.js | Running automated application tests |
| GitHub Pages | Website hosting and deployment |

**Implementation Note:** The current application uses browser localStorage for appointment data. It does not currently use a centralized backend database.

## 5. DevOps Implementation

The project applies DevOps practices to automate validation, testing, deployment, and post-deployment verification.

### 5.1 Version Control – Git and GitHub

Git is used to track application changes and maintain the development history.

GitHub is used to host the source code repository and manage project versions.

Repository: https://github.com/priya-bhatt-2602/Appointment-Scheduler-DevOps

### 5.2 Continuous Integration (CI)

GitHub Actions is used to automate application validation and testing.

**Workflow File:** `.github/workflows/ci.yml`

**Workflow Name:** Appointment Scheduler CI

**Triggers:**
- Push to the main branch.
- Pull requests targeting the main branch.
- Manual workflow execution.

**Pipeline Steps:**

1. Checkout repository.
2. Check required application and test files.
3. Set up Node.js version 22.
4. Execute automated application tests using:

`node --test tests/app.test.js`

This workflow helps identify missing project files and test failures automatically.

### 5.3 Continuous Deployment (CD)

GitHub Pages is used to publish and host the CampusConnect application.

**Deployment Workflow:** `pages-build-deployment`

The configured GitHub Pages deployment process builds and publishes the website from the repository's configured source.

When changes are pushed to the deployment branch, GitHub Pages automatically builds and publishes the updated application.

**Live Website:**  
https://priya-bhatt-2602.github.io/Appointment-Scheduler-DevOps/

### 5.4 Deployment Health Check

An additional GitHub Actions workflow was created to verify the availability of the deployed website.

**Workflow File:** `.github/workflows/health-check.yml`

**Workflow Name:** CampusConnect Deployment Health Check

**Triggers:**
- Completion of the `pages-build-deployment` workflow.
- Manual execution through GitHub Actions.

**Health Check Steps:**

1. Check the deployment workflow result.
2. Stop execution if deployment has failed.
3. Wait 30 seconds for the website to become available.
4. Send an HTTP request to the live website.
5. Verify that the website returns HTTP status code 200.
6. Report whether the website is accessible.

This provides an additional automated verification step after deployment.

## 6. CI/CD Workflow

The CampusConnect DevOps process follows these stages:

1. **Code:** Application changes are made to the source files.
2. **Version Control:** Changes are committed and pushed to GitHub.
3. **Continuous Integration:** GitHub Actions checks required files and executes automated application tests.
4. **Continuous Deployment:** GitHub Pages builds and publishes the updated application.
5. **Health Check:** A separate GitHub Actions workflow checks deployment status and website availability.
6. **Verification:** Workflow results and the live application are checked.

## 7. Testing

### 7.1 Automated Testing

Automated application testing is performed using Node.js and the built-in test runner.

The test suite is executed through the GitHub Actions CI workflow.

Command:

`node --test tests/app.test.js`

### 7.2 Manual Testing

Manual testing is performed to verify the application's main functions and user interface.

Testing activities include:
- Dashboard loading and navigation.
- Available services display.
- Appointment booking.
- Form validation.
- Appointment information display.
- Appointment cancellation.
- Interface and layout verification.

## 8. Project Structure

```text
Appointment-Scheduler-DevOps/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── health-check.yml
│
├── agile_academic_scheduler/
├── book_appointment/
├── css/
├── home_dashboard/
├── js/
├── my_appointments/
├── tests/
│
├── index.html
├── book-appointment.html
├── my-appointments.html
├── campusconnect-logo.png.jpeg
├── README.md
└── .gitignore
```

## 9. Benefits of DevOps Implementation

- Git provides version control and change tracking.
- GitHub provides centralized source code management.
- GitHub Actions automates application validation and testing.
- GitHub Pages provides automated website publishing.
- Deployment health checks verify website availability.
- Automated workflows reduce repetitive manual tasks.
- Workflow execution history provides evidence of pipeline results.

## 10. Conclusion

CampusConnect combines a campus service booking application with practical DevOps implementation.

The application brings doctor consultations, academic mentoring sessions, and salon appointments into one convenient platform.

The DevOps implementation integrates Git, GitHub, GitHub Actions, automated application testing, GitHub Pages, and deployment health checks.

Through this project, practical experience is gained in version control, Continuous Integration, Continuous Deployment, automated testing, and post-deployment verification.

---

**Project:** CampusConnect – Campus Appointment & Service Booking Portal  
**Repository:** [GitHub Repository](https://github.com/priya-bhatt-2602/Appointment-Scheduler-DevOps)  
**Live Application:** [CampusConnect](https://priya-bhatt-2602.github.io/Appointment-Scheduler-DevOps/)
