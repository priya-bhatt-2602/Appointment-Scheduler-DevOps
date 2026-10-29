# Appointment Scheduler

**Course:** CSE706 Agile Scrum Project  
**Sprint 1:** 15–20 October 2026 (Completed 23 October 2026)  
**Sprint 2:** 21–27 October 2026 (Completed 27 October 2026)  
**Jira Project:** `MyScrumTeam` (Issues: `SCRUM-1` through `SCRUM-10`)  
**GitHub Repository:** [priya-bhatt-2602/AppointmentScheduler](https://github.com/priya-bhatt-2602/AppointmentScheduler)  

---

## 📌 Project Overview

**Appointment Scheduler** is a responsive academic web application designed to help university students and faculty schedule, track, and manage academic syncs, doctor consultations, mentoring sessions, and campus appointments. 

Developed following the **Agile Scrum** methodology, this repository contains the completed Sprint 1 and Sprint 2 implementations delivering an end-to-end booking and schedule management experience:
- Client-side state management & view routing
- Persistence via browser `localStorage`
- Form validation and pre-submission checks
- Appointment rescheduling workflow with date/time pickers
- Cancellation flow with slot release
- Comprehensive double-booking prevention engine
- 65 automated verification assertions running with a 100% pass rate

### 🎨 Visual & Design System Reference
The visual architecture follows the design specification defined in [`agile_academic_scheduler/DESIGN.md`](agile_academic_scheduler/DESIGN.md):
- **Core Screens:**
  1. **Home Dashboard** (`#home`): Student greeting, active sprint velocity status, metric modules (Scheduled Syncs, Completed Sessions, Categories), upcoming agenda preview strip, and 3 realistic service category cards with direct pre-selection deep links.
  2. **Book Appointment** (`#book-appointment`): A 4-step scheduling workflow (Service Selection, Mini Date Picker Strip, Timeslot Grid with full/unavailable states, and SSO Contact Information) paired with a live sticky booking summary sidebar, error validation alerts, and a real-data confirmation modal.
  3. **My Appointments** (`#my-appointments`): Dynamically rendered appointments list sourced directly from `localStorage`, filter tabs (*All*, *Upcoming*, *Completed*, *Cancelled*) with live counter badges, appointment detail inspection modals, rescheduling dialogs, and cancellation capabilities.
- **Color Palette & Typography:** Academic and corporate palette with high-contrast legibility, Inter typography, tabular numerics (`tnum`), and standardized radii (`rounded-xl` for cards, `rounded-full` for status pills).

---

## 📁 Project Architecture & Directory Structure

```text
AppointmentScheduler/
├── index.html                   # Master single-page application shell, router, and dialog modals
├── book-appointment.html        # Direct redirect route to Book Appointment
├── my-appointments.html         # Direct redirect route to My Appointments
├── css/
│   └── style.css                # Shared design tokens (DESIGN.md), custom variables, animations
├── js/
│   └── app.js                   # Client router, booking engine, rescheduling, cancellation, and persistence
├── tests/
│   ├── app.test.js              # Comprehensive automated verification suite (SCRUM-1 to SCRUM-10, 65 tests)
│   └── README.md                # Testing guide & acceptance verification report
├── agile_academic_scheduler/    # Original Stitch design specification (DESIGN.md)
├── home_dashboard/              # Original Stitch Home Dashboard export (code.html & screen.png)
├── book_appointment/            # Original Stitch Book Appointment export (code.html & screen.png)
├── my_appointments/             # Original Stitch My Appointments export (code.html & screen.png)
├── README.md                    # Project documentation & local setup instructions
├── Sprint1_Completion_Checklist.md # Sprint 1 verification checklist & Jira report
├── Sprint2_Completion_Checklist.md # Sprint 2 verification checklist & Jira report
└── .gitignore                   # Ignore rules for OS, IDEs, and temporary build files
```

---

## 🛠️ Technology Stack Rationale

Per project guidelines, the application utilizes a clean, dependency-free web stack:
- **HTML5:** Semantic markup (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`) with ARIA accessibility roles.
- **Tailwind CSS & Design Tokens:** Native CSS variables in `css/style.css` matching `agile_academic_scheduler/DESIGN.md`, supplemented by utility styling via Tailwind CDN.
- **Vanilla JavaScript:** Fast, dependency-free client-side routing via URL hash (`#home`, `#book-appointment`, `#my-appointments`), data layer persistence (`localStorage`), atomic state modifications, and dynamic DOM rendering.
- **No Heavy Build Steps:** Zero external build tools required; runs immediately in any standard modern web browser.

---

## 🚀 How to Run Locally

You can launch and test the application using any of the methods below:

### Option 1: Direct File Open (Quickest)
Simply double-click [`index.html`](index.html) or open it directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

### Option 2: Python Static Server
If Python 3 is installed on your workstation, run the following in your terminal:
```powershell
python -m http.server 3000
```
Then visit: [http://localhost:3000](http://localhost:3000)

### Option 3: Node.js `npx serve`
```powershell
npx serve .
```

---

## 🧪 Automated Verification & Testing

The test suite in [`tests/app.test.js`](tests/app.test.js) covers all Sprint 1 & Sprint 2 acceptance criteria across **65 automated assertions**:

| Story | Focus Area | Assertions | Status |
|---|---|---|---|
| **SCRUM-1** | App structure, navigation shell, client hash routing, footer | 9 tests | ✅ PASSED |
| **SCRUM-2** | Service category cards, active selection state, sidebar sync, pre-selection | 6 tests | ✅ PASSED |
| **SCRUM-3** | Date picker strip, weekend lockout, timeslot matrix, unavailable slot enforcement | 8 tests | ✅ PASSED |
| **SCRUM-4** | Form validation, missing phone detection, booking persistence in `localStorage` | 7 tests | ✅ PASSED |
| **SCRUM-5** | Confirmation modal data integrity, dynamic confirmation populating | 4 tests | ✅ PASSED |
| **SCRUM-6** | View booked appointments, dynamic schedule list, empty states, tab filters | 7 tests | ✅ PASSED |
| **SCRUM-7** | Reschedule appointment dialog, atomic date/time update, card re-rendering | 8 tests | ✅ PASSED |
| **SCRUM-8** | Cancel appointment confirmation dialog, status update, slot release | 6 tests | ✅ PASSED |
| **SCRUM-9** | Double-booking prevention engine on booking and rescheduling, collision rejection | 7 tests | ✅ PASSED |
| **SCRUM-10** | Error recovery for corrupted storage, slot re-booking verification, bug fixes | 3 tests | ✅ PASSED |
| **TOTAL** | **Full Sprint 1 & Sprint 2 Verification Suite** | **65 tests** | **100% PASSED** |

### Running the Tests:
1. Open [`index.html`](index.html) in your browser with the query parameter:
   ```text
   index.html?runTests=true
   ```
2. Open Developer Tools (<kbd>F12</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>) and switch to the **Console** tab.
3. You will see the complete breakdown with:
   ```text
   [SUMMARY] 65/65 tests passed (0 failed).
   ```

---

## 📋 Sprint 2 Completion Status (SCRUM-6 through SCRUM-10)

### SCRUM-6: View booked appointments (3 points • Assignee: Sagar)
- **Status:** **Done**
- **Summary:** Dynamically displays saved bookings with real date badges, practitioner details, status pills, and empty state handling.

### SCRUM-7: Reschedule an appointment (3 points • Assignee: Shrey)
- **Status:** **Done**
- **Summary:** Interactive Reschedule Modal allows choosing a new date and timeslot. Atomically updates `localStorage` and updates My Appointments in real time while blocking conflicting slots.

### SCRUM-8: Cancel an appointment (2 points • Assignee: Priya)
- **Status:** **Done**
- **Summary:** Cancel Confirmation Modal protects against accidental clicks, transitions status to `cancelled`, and releases the slot for other students.

### SCRUM-9: Prevent double-booking (3 points • Assignee: Shrey)
- **Status:** **Done**
- **Summary:** Pre-submission and pre-reschedule collision detection via `isSlotAvailable()` prevents multiple bookings for the same slot.

### SCRUM-10: Functional tests and bug fixes (3 points • Assignee: Priya)
- **Status:** **Done**
- **Summary:** 65 automated assertions covering all user stories with 100% pass rate in headless Chrome; corrupted storage error recovery verified.
