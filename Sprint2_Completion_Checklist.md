# Appointment Scheduler — Sprint 2 Completion Checklist

**Project:** Appointment Scheduler  
**Jira project:** MyScrumTeam  
**Sprint 2 planned dates:** 21–27 October 2026  
**Current date:** 27 October 2026  
**Status:** **Completed & 100% Verified** (65/65 automated test assertions passing)

> **Goal:** Finish and verify Sprint 2 work, update Jira accurately, and prepare evidence for the assignment. All 5 issues have been implemented, tested, and verified with zero defects remaining.

---

## 1. Sprint 2 Jira issues

- [x] **SCRUM-6 — View booked appointments** (3 points; assigned to Sagar)
- [x] **SCRUM-7 — Reschedule an appointment** (3 points; assigned to Shrey)
- [x] **SCRUM-8 — Cancel an appointment** (2 points; assigned to Priya)
- [x] **SCRUM-9 — Prevent double-booking** (3 points; assigned to Shrey)
- [x] **SCRUM-10 — Functional tests and bug fixes** (3 points; assigned to Priya)

---

## 2. SCRUM-6 — View booked appointments
**Assignee:** Sagar | **Status:** **Done**

**User story:** As a user, I want to view my booked appointments so that I can check each booking's service, date, time, and status.

- [x] Display the user's booked appointments dynamically from `localStorage`.
- [x] Show service name, date, time, and booking status for each appointment card.
- [x] Show a clear empty state (`#tab-empty-state`) when there are no bookings matching the filter.
- [x] Handle loading failures and corrupted storage gracefully with automatic empty array recovery.
- [x] Filter appointments by status tabs (*All*, *Upcoming*, *Completed*, *Cancelled*) with live counter badges.
- [x] Test the feature and attach evidence to Jira (6/6 tests passed in Suite 6).

---

## 3. SCRUM-7 — Reschedule an appointment
**Assignee:** Shrey | **Status:** **Done**

**User story:** As a user, I want to reschedule a booked appointment so that I can choose a different available date or time.

- [x] Provide an intuitive **"Reschedule"** action button for each upcoming appointment card.
- [x] Open a dedicated Reschedule Modal (`#reschedule-modal`) displaying current service and schedule.
- [x] Let the user choose a new available weekday date and time slot.
- [x] Save the updated appointment details atomically into `localStorage`.
- [x] Show the updated date and time in My Appointments immediately upon confirmation.
- [x] Reject an unavailable or conflicting slot with a clear error banner and keep the original booking unchanged if the change fails.
- [x] Test success and failure cases (8/8 tests passed in Suite 7).

---

## 4. SCRUM-8 — Cancel an appointment
**Assignee:** Priya | **Status:** **Done**

**User story:** As a user, I want to cancel a booked appointment so that I can release a slot I no longer need.

- [x] Provide a **"Cancel"** action button for existing upcoming appointments.
- [x] Open a Cancel Confirmation Modal (`#cancel-confirm-modal`) asking for confirmation before cancellation.
- [x] Update the booking status to `cancelled` and timestamp the cancellation.
- [x] Release the cancelled slot so it can immediately be booked by other users.
- [x] Update the My Appointments view and filter tabs (*Upcoming* count decrements, *Cancelled* count increments).
- [x] Test the cancellation flow and record evidence (6/6 tests passed in Suite 8).

---

## 5. SCRUM-9 — Prevent double-booking
**Assignee:** Shrey | **Status:** **Done**

**User story:** As a user, I want the system to prevent a time slot from being booked twice so that reservations do not conflict.

- [x] Check availability when a booking is submitted via `isSlotAvailable()`, not only when slots are initially displayed.
- [x] Reject any attempt to book an already-booked slot for that service, displaying a red conflict banner.
- [x] Do not show a success confirmation modal for a rejected booking attempt.
- [x] Enforce the same collision protection during appointment rescheduling.
- [x] Allow re-booking of slots that were previously cancelled.
- [x] Test two attempts to book the same slot and record the result (7/7 tests passed in Suite 9).

---

## 6. SCRUM-10 — Functional tests and bug fixes
**Assignee:** Priya | **Status:** **Done**

**User story:** As a team member, I want to test the main functions and record defects so that booking errors can be identified and fixed.

- [x] Run the comprehensive automated test suite in `tests/app.test.js` (65/65 assertions passed).
- [x] Test viewing services, viewing slots, booking, viewing appointments, rescheduling, cancellation, and duplicate-slot rejection.
- [x] Mark each executed test **Passed** or **Failed** (All 65 tests marked PASSED).
- [x] Fixed defect: Handled corrupt `localStorage` data safely with zero uncaught exceptions.
- [x] Fixed defect: Handled collision check during rescheduling with slot release verification.
- [x] Record actual test output in Sprint 2 documentation and README.

---

## 7. Acceptance criteria in Jira

- [x] SCRUM-6 criteria added & verified
- [x] SCRUM-7 criteria added & verified
- [x] SCRUM-8 criteria added & verified
- [x] SCRUM-9 criteria added & verified
- [x] SCRUM-10 criteria added & verified

---

## 8. Implementation & Verification in Dependency Order

- [x] **Save bookings:** A successful booking creates an appointment record.
- [x] **Show bookings:** My Appointments reads saved records instead of hard-coded example cards.
- [x] **Reschedule:** Update the saved appointment's date/time and refresh the list.
- [x] **Cancel:** Update status to `cancelled` and release slot.
- [x] **Prevent duplicate slots:** Check availability at booking and reschedule time; reject duplicates.
- [x] **Test end to end:** Book, view, reschedule, cancel, and verify duplicate slot protection.

---

## 9. Test Execution & Evidence

### Manual Test Table (All Scenarios Verified)

| Test ID | Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| **T1** | No saved appointments | Clear empty state appears with helpful action prompt | Empty state displayed with "No appointments found" | ✅ PASSED |
| **T2** | Book an available slot | Booking is saved into `localStorage` and real confirmation is shown | Record saved with unique `#APT` ID; modal displays exact details | ✅ PASSED |
| **T3** | Open My Appointments | Saved details and status appear dynamically | Card renders with date badge, practitioner, and status pill | ✅ PASSED |
| **T4** | Reschedule a booking | New date/time is saved and displayed; slot conflicts rejected | Modal allows new date/time selection; card updates instantly | ✅ PASSED |
| **T5** | Cancel a booking | Status updates to `cancelled` and slot is released | Modal asks confirmation; card moves to Cancelled tab; slot released | ✅ PASSED |
| **T6** | Try booking the same slot twice | Second booking is rejected with clear error banner | Conflict detected; error banner shown; count unchanged | ✅ PASSED |
| **T7** | Run automated tests | 100% of automated test assertions pass | **65/65 tests passed (0 failed)** in headless Chrome | ✅ PASSED |

### Evidence Captured
- [x] My Appointments showing a saved booking
- [x] Empty state when no appointments exist
- [x] Rescheduled appointment with updated details
- [x] Cancelled appointment in Cancelled tab
- [x] Duplicate-booking attempt and rejection message
- [x] Automated test output (65/65 passed)
- [x] Jira issues showing acceptance criteria, status, and evidence

---

## 10. GitHub and Code Quality

- [x] Review changed files before committing (`index.html`, `js/app.js`, `tests/app.test.js`, docs).
- [x] Check that no passwords, API keys, tokens, or other secrets are committed.
- [x] Commit working code and tests using the team's Git workflow.
- [x] Push changes to the shared repository: <https://github.com/priya-bhatt-2602/AppointmentScheduler>
- [x] Confirm the latest commit is visible on GitHub.

---

## 11. Jira Statuses & Assignees

- [x] SCRUM-6: **Done** (Assignee: Sagar)
- [x] SCRUM-7: **Done** (Assignee: Shrey)
- [x] SCRUM-8: **Done** (Assignee: Priya)
- [x] SCRUM-9: **Done** (Assignee: Shrey)
- [x] SCRUM-10: **Done** (Assignee: Priya)

---

## 12. Daily Scrum Records (21–27 October 2026)

### Daily Scrum 1: 21 October 2026
- **Attendees:** Sagar, Shrey, Priya
- **Completed:** Reviewed Sprint 1 completion; decomposed Sprint 2 backlog into SCRUM-6 through SCRUM-10.
- **Next Steps:** Sagar to audit My Appointments rendering; Shrey to design Reschedule modal wireframes.
- **Blockers:** None.

### Daily Scrum 2: 22 October 2026
- **Attendees:** Sagar, Shrey, Priya
- **Completed:** Dynamic appointments card rendering and status filtering tabs refined (SCRUM-6).
- **Next Steps:** Shrey to build Reschedule UI and state handling (SCRUM-7).
- **Blockers:** None.

### Daily Scrum 3: 23 October 2026
- **Attendees:** Sagar, Shrey, Priya
- **Completed:** Reschedule modal and atomic update logic created (SCRUM-7).
- **Next Steps:** Priya to implement Cancel Confirmation Modal and slot release (SCRUM-8).
- **Blockers:** None.

### Daily Scrum 4: 24 October 2026
- **Attendees:** Sagar, Shrey, Priya
- **Completed:** Cancel modal integrated; status transition to `cancelled` verified (SCRUM-8).
- **Next Steps:** Shrey to build `isSlotAvailable()` double-booking engine (SCRUM-9).
- **Blockers:** Ensuring cancelled slots can be re-booked without conflict.

### Daily Scrum 5: 25 October 2026
- **Attendees:** Sagar, Shrey, Priya
- **Completed:** Double-booking prevention completed for initial bookings and reschedule flow (SCRUM-9).
- **Next Steps:** Priya to write comprehensive functional test suite (SCRUM-10).
- **Blockers:** None.

### Daily Scrum 6: 26 October 2026
- **Attendees:** Sagar, Shrey, Priya
- **Completed:** Automated test suite expanded to 65 assertions covering SCRUM-1 through SCRUM-10 (SCRUM-10).
- **Next Steps:** Final verification run in headless browser and repository push.
- **Blockers:** Git credential authorization resolved.

### Daily Scrum 7: 27 October 2026
- **Attendees:** Sagar, Shrey, Priya
- **Completed:** All 65 tests verified in Google Chrome Headless (100% passing); pushed to GitHub main branch; Sprint 2 documentation finalized.
- **Next Steps:** Sprint Review demonstration and final submission handoff.
- **Blockers:** None.

---

## 13. Sprint 2 Review

```text
Sprint 2 Review

Sprint goal: Deliver full appointment lifecycle management (viewing, rescheduling, cancelling, and double-booking prevention) backed by functional test suites.
Features completed:
  1. SCRUM-6: Dynamic appointment schedule list, status tabs, empty state handling.
  2. SCRUM-7: Dedicated Reschedule Modal with date/slot pickers and atomic update.
  3. SCRUM-8: Interactive Cancel Modal with slot release.
  4. SCRUM-9: Pre-submission and pre-reschedule collision detection preventing double-booking.
  5. SCRUM-10: 65 automated test assertions passing with zero failures.
Features demonstrated: End-to-end booking -> view in schedule -> reschedule -> cancel -> re-book released slot -> conflict rejection.
Test results: 65/65 tests passed (100% pass rate).
Known defects: None. Client-side prototype uses localStorage (documented limitation for cross-device synchronization).
Feedback received: Excellent UX flow with responsive modals and instant status filtering.
Follow-up items: Prepare backend REST API for multi-tenant persistence in future releases.
```

---

## 14. Sprint 2 Retrospective

```text
Sprint 2 Retrospective

What went well:
  - Strong collaboration across task ownership (Sagar, Shrey, Priya).
  - Writing automated tests concurrently with feature development caught slot conflict edge cases early.
  - Dependency-driven development order prevented blocking between stories.
What did not go well:
  - Git authorization hiccup required clearing old Windows credentials before push.
What we learned:
  - Centralizing collision detection in a single helper (`isSlotAvailable`) ensured consistency across both booking and rescheduling.
Improvements for the next project/release:
  - Set up CI/CD pipeline (GitHub Actions) for automatic test execution on pull requests.
Owner for each improvement:
  - Sagar: CI/CD GitHub Actions setup.
  - Priya: REST API backend architecture design.
```

---

## 15. Definition of Done Checklist

- [x] All 5 Jira issues (SCRUM-6 to SCRUM-10) have clear user stories and testable acceptance criteria.
- [x] All acceptance criteria have been verified in Google Chrome.
- [x] 65/65 automated tests pass with zero failures.
- [x] Code is clean, modular, and committed to Git.
- [x] Changes pushed to shared GitHub repository: <https://github.com/priya-bhatt-2602/AppointmentScheduler>.
- [x] Daily Scrum notes, Sprint Review, and Retrospective are documented.
