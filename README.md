
# CampusConnect – Appointment Scheduler

**Course:** CSE706 – Agile Scrum Project  
**Project Type:** Academic Appointment Scheduling Web Application  
**Repository:** [Appointment-Scheduler-DevOps](https://github.com/priya-bhatt-2602/Appointment-Scheduler-DevOps)  
**Live Website:** [CampusConnect](https://priya-bhatt-2602.github.io/Appointment-Scheduler-DevOps/)

## Project Overview

CampusConnect is a web-based appointment scheduling application designed to help university students manage academic mentoring sessions, consultations, and other campus appointments.

The application provides a dashboard, appointment booking, appointment tracking, rescheduling, and cancellation features. It uses HTML, CSS, and JavaScript, with browser localStorage for client-side appointment persistence.

## DevOps Implementation

The project incorporates DevOps practices to automate code validation, testing, and website deployment.

### Tools and Technologies

- **HTML5:** Structures the web pages.
- **CSS and Tailwind CSS:** Provide styling and responsive layouts.
- **JavaScript:** Implements navigation, booking workflows, validation, and appointment management.
- **Git:** Tracks changes to the source code.
- **GitHub:** Hosts the source code and supports collaboration.
- **GitHub Actions:** Runs automated validation and application tests when code is pushed to the repository.
- **GitHub Pages:** Hosts the live website.

### CI/CD Workflow

1. **Code:** Changes are made to the project files.
2. **Version Control:** Changes are committed and pushed to the `main` branch.
3. **Continuous Integration (CI):** GitHub Actions checks required files and runs the configured validation and test steps.
4. **Continuous Deployment (CD):** GitHub Pages publishes the website through its deployment workflow.
5. **Verification:** The workflow status and live website are checked to confirm that the update was published successfully.

### DevOps Benefits

- Automated validation reduces manual checking.
- Automated tests help detect regressions.
- Version control maintains a history of changes.
- Continuous deployment reduces the need for manual website uploads.
- Workflow logs make build and deployment results easier to verify.

## Important Implementation Note

The current application uses browser localStorage for appointment data. It does not use a centralized backend database, so appointment records are stored in the user's browser rather than shared between users or devices.
