# Test Suite & Verification Guide

This directory contains automated verification routines and test plans for the **Appointment Scheduler** web application (CSE706 Agile Scrum Project).

---

## 📌 Scope for Sprint 1 & Sprint 2 (SCRUM-1 through SCRUM-10)

The automated test suite in [`tests/app.test.js`](app.test.js) validates all 10 user stories across **65 assertions**:

### 1. SCRUM-1: Application Shell & Navigation (9 Assertions)
- Header component exists with branding.
- Main navigation container exists with 3 core links (*Home*, *Book Appointment*, *My Appointments*).
- All 3 view sections exist (`#view-home`, `#view-book-appointment`, `#view-my-appointments`).
- Global `window.navigateTo` routing function is exposed.
- Navigation toggling properly hides and reveals views.
- Global footer shell exists.

### 2. SCRUM-2: View Available Services (6 Assertions)
- Home Dashboard displays at least 3 distinct service cards.
- Booking Step 1 displays selectable service cards (Doctor Consultation, Mentoring Session, Salon Appointment).
- Service selection updates active visual styles (`ring-primary`, `service-check` badge).
- Booking Summary sidebar updates dynamically with service name, location, and practitioner.
- Pre-selection deep linking from Home Dashboard selects the target service card.

### 3. SCRUM-3: View Available Appointment Slots (8 Assertions)
- 7-day mini calendar strip renders selectable weekday date chips.
- Weekend / off-days (Sat, Sun) are disabled and non-interactive.
- Date selection updates visual styling and booking summary callout.
- 8 timeslots displayed in Step 3.
- Full / unavailable slots are disabled with visual badge indicators.
- Slot selection updates active styles and sidebar duration/time.

### 4. SCRUM-4: Book an Appointment (7 Assertions)
- Storage helpers (`window.getBookings`, `window.triggerBookingSubmission`) are exposed.
- Initial seed appointments load into `localStorage` on first load.
- Form validation catches missing required inputs (e.g. empty phone) and renders an error banner.
- Submitting a valid booking persists the record into `localStorage`.
- Generated booking receives a unique reference ID (`#APT-YYYY-XXXX`).
- New booking receives the `"upcoming"` status.

### 5. SCRUM-5: Booking Confirmation Modal (4 Assertions)
- Confirmation modal displays automatically after successful submission.
- Confirmation modal displays real booking details (reference ID, service name, date, time).
- `closeBookingModal()` hides the modal.

### 6. SCRUM-6: View Booked Appointments & Schedule Sync (7 Assertions)
- My Appointments dynamically renders all bookings from `localStorage`.
- Newly booked appointment appears at the top of the schedule.
- Appointment cards show service name, date, time, and booking status.
- Status tabs (*All*, *Upcoming*, *Completed*, *Cancelled*) properly filter appointment cards.
- Counter badges reflect active counts.
- Empty state displayed clearly when no appointments exist.

### 7. SCRUM-7: Reschedule an Appointment (8 Assertions)
- `rescheduleAppointment` and `openRescheduleModal` APIs are exposed.
- Reschedule dialog displays current appointment details and interactive date/time selectors.
- Atomically updates appointment date and timeslot in `localStorage`.
- Keeps status as `"upcoming"`.
- My Appointments card immediately reflects rescheduled date and time.
- Closes dialog and preserves original appointment if change is cancelled.

### 8. SCRUM-8: Cancel an Appointment (6 Assertions)
- Cancel confirmation modal opens before cancelling an appointment.
- Confirming cancellation updates status to `"cancelled"` in `localStorage`.
- Cancelled tab displays the newly cancelled appointment.
- Released slot can be booked again without false conflict.

### 9. SCRUM-9: Prevent Double-Booking (7 Assertions)
- `isSlotAvailable()` accurately identifies occupied slots.
- Duplicate booking submission is rejected and displays clear error banner.
- No success confirmation is shown for rejected booking attempts.
- Rescheduling into an already-reserved slot is blocked with conflict error.

### 10. SCRUM-10: Functional Tests & Bug Fixes (3 Assertions)
- Corrupted `localStorage` data safely recovers with empty array without throwing uncaught errors.
- Active booking locks slot availability.
- Cancelling an appointment releases the slot for future bookings.

---

## 🚀 How to Run the Tests

### Method 1: Test URL Parameter (Auto-run in any Browser)
Simply append `?runTests=true` to the URL:
```text
index.html?runTests=true
```
Open Developer Tools (<kbd>F12</kbd>) → **Console** to view the live test run:
```text
=== Running Sprint 1 & Sprint 2 Full Verification (SCRUM-1 to SCRUM-10) ===
...
[SUMMARY] 65/65 tests passed (0 failed).
```

### Method 2: Headless Browser Execution (CLI)
Using Google Chrome or Microsoft Edge headless mode from PowerShell:
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --virtual-time-budget=3000 --enable-logging=stderr "file:///c:/Users/sagar/Downloads/AppointmentScheduler-main/index.html?runTests=true" 2>&1 | Select-String -Pattern "PASS|FAIL|SUMMARY|SCRUM"
```
