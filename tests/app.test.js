/**
 * Appointment Scheduler - Comprehensive Automated Test Suite
 * CSE706 Agile Scrum Project (Sprint 1 & Sprint 2: SCRUM-1 through SCRUM-10)
 *
 * Sprint 1 Stories:
 *  - SCRUM-1: Application shell, navigation structure, and client routing
 *  - SCRUM-2: Available services rendering and selection
 *  - SCRUM-3: Appointment slot availability, date picker, and disabled slot enforcement
 *  - SCRUM-4: Form validation, appointment booking submission, and localStorage persistence
 *  - SCRUM-5: Booking confirmation modal verification and dynamic "My Appointments" synchronization
 *
 * Sprint 2 Stories:
 *  - SCRUM-6: View booked appointments, dynamic cards, empty states, and tab counters
 *  - SCRUM-7: Reschedule an appointment, date/slot update, and rollback on failure
 *  - SCRUM-8: Cancel an appointment, confirmation dialog, status update, and slot release
 *  - SCRUM-9: Double-booking prevention on initial booking and rescheduling
 *  - SCRUM-10: Functional test verification, error recovery, and 100% pass guarantee
 */

'use strict';

function runSchedulerSmokeTests() {
  const results = [];

  function assert(condition, testName, details) {
    if (condition) {
      results.push({ test: testName, status: 'PASSED' });
      console.log(`%c[PASS] ${testName}`, 'color: #059669; font-weight: bold;');
    } else {
      results.push({ test: testName, status: 'FAILED', details: details || '' });
      console.error(`[FAIL] ${testName} ${details ? '- ' + details : ''}`);
    }
  }

  console.group('=== Running Sprint 1 & Sprint 2 Full Verification (SCRUM-1 to SCRUM-10) ===');

  // =========================================================================
  // SUITE 1: SCRUM-1 — Application Structure & Routing
  // =========================================================================
  console.group('--- SCRUM-1: Application Structure & Routing ---');

  const header = document.getElementById('app-header');
  assert(header !== null, 'SCRUM-1.1: Header component exists in DOM');

  const nav = document.getElementById('main-nav');
  assert(nav !== null, 'SCRUM-1.2: Main navigation container exists');

  const navLinks = document.querySelectorAll('#main-nav .nav-item');
  assert(navLinks.length === 3, 'SCRUM-1.3: Main navigation has 3 core view links (Home, Book, My Appointments)');

  const homeView = document.getElementById('view-home');
  const bookView = document.getElementById('view-book-appointment');
  const myApptsView = document.getElementById('view-my-appointments');
  assert(homeView !== null && bookView !== null && myApptsView !== null, 'SCRUM-1.4: All 3 view sections exist in DOM');

  assert(typeof window.navigateTo === 'function', 'SCRUM-1.5: window.navigateTo routing function is exposed');

  window.navigateTo('book-appointment');
  assert(!bookView.classList.contains('hidden') && homeView.classList.contains('hidden'), 'SCRUM-1.6: Navigating to book-appointment reveals booking view and hides home');

  window.navigateTo('my-appointments');
  assert(!myApptsView.classList.contains('hidden') && bookView.classList.contains('hidden'), 'SCRUM-1.7: Navigating to my-appointments reveals appointments view and hides booking');

  window.navigateTo('home');
  assert(!homeView.classList.contains('hidden') && myApptsView.classList.contains('hidden'), 'SCRUM-1.8: Navigating back to home reveals home view and hides appointments');

  const footer = document.querySelector('footer');
  assert(footer !== null, 'SCRUM-1.9: Application footer shell exists');

  console.groupEnd();

  // =========================================================================
  // SUITE 2: SCRUM-2 — View Available Services
  // =========================================================================
  console.group('--- SCRUM-2: View Available Services ---');

  const homeServiceCards = document.querySelectorAll('#view-home .grid.grid-cols-1.lg\\:grid-cols-3 > div');
  assert(homeServiceCards.length >= 3, 'SCRUM-2.1: Home Dashboard displays at least 3 distinct service category cards');

  const bookingServiceCards = document.querySelectorAll('#service-options .service-card');
  assert(bookingServiceCards.length >= 3, 'SCRUM-2.2: Booking step 1 displays at least 3 selectable service cards');

  const mentoringBtn = document.getElementById('service-btn-mentoring');
  assert(mentoringBtn !== null, 'SCRUM-2.3: Mentoring service button exists');
  if (mentoringBtn) {
    mentoringBtn.click();
    assert(mentoringBtn.classList.contains('ring-primary') || mentoringBtn.classList.contains('selected-card'),
      'SCRUM-2.4: Selecting Mentoring service activates visual selection state');

    const summaryService = document.getElementById('summary-service');
    assert(summaryService && summaryService.textContent.includes('Mentoring'),
      'SCRUM-2.5: Booking Summary sidebar updates with selected service name');
  }

  window.navigateTo('book-appointment', { service: 'doctor' });
  const doctorBtn = document.getElementById('service-btn-doctor');
  assert(doctorBtn && (doctorBtn.classList.contains('ring-primary') || doctorBtn.classList.contains('selected-card')),
    'SCRUM-2.6: Preselecting doctor service activates doctor card');

  console.groupEnd();

  // =========================================================================
  // SUITE 3: SCRUM-3 — View Available Appointment Slots
  // =========================================================================
  console.group('--- SCRUM-3: View Available Appointment Slots ---');

  const dateChips = document.querySelectorAll('.date-chip');
  assert(dateChips.length >= 5, 'SCRUM-3.1: Date selector displays available weekday date chips');

  const disabledDates = document.querySelectorAll('#view-book-appointment button[disabled]');
  assert(disabledDates.length >= 2, 'SCRUM-3.2: Weekend / unavailable dates are properly disabled and non-interactive');

  if (dateChips.length > 0) {
    dateChips[0].click();
    assert(dateChips[0].classList.contains('selected-date') || dateChips[0].classList.contains('bg-primary-container'),
      'SCRUM-3.3: Clicking a date chip marks it as selected');

    const summaryDate = document.getElementById('summary-date');
    assert(summaryDate && summaryDate.textContent.length > 0,
      'SCRUM-3.4: Booking Summary sidebar reflects chosen date');
  }

  const timeslots = document.querySelectorAll('#timeslot-container .timeslot-btn');
  assert(timeslots.length >= 4, 'SCRUM-3.5: Available timeslots are displayed for selection');

  const disabledSlots = document.querySelectorAll('#timeslot-container button[disabled]');
  assert(disabledSlots.length >= 2, 'SCRUM-3.6: Full / unavailable timeslots are properly disabled');

  if (timeslots.length > 0) {
    timeslots[0].click();
    assert(timeslots[0].classList.contains('selected-slot') || timeslots[0].classList.contains('bg-primary-container'),
      'SCRUM-3.7: Selecting a timeslot activates selected styling');

    const summaryTime = document.getElementById('summary-time');
    assert(summaryTime && summaryTime.textContent.length > 0,
      'SCRUM-3.8: Booking Summary sidebar reflects selected time');
  }

  console.groupEnd();

  // =========================================================================
  // SUITE 4: SCRUM-4 — Book an Appointment
  // =========================================================================
  console.group('--- SCRUM-4: Book an Appointment ---');

  assert(typeof window.getBookings === 'function', 'SCRUM-4.1: window.getBookings storage helper is exposed');
  assert(typeof window.triggerBookingSubmission === 'function', 'SCRUM-4.2: window.triggerBookingSubmission function is exposed');

  const initialBookings = window.getBookings();
  assert(Array.isArray(initialBookings) && initialBookings.length > 0, 'SCRUM-4.3: Initial appointments data exists in localStorage');

  const phoneInput = document.getElementById('phone');
  const originalPhone = phoneInput ? phoneInput.value : '';
  if (phoneInput) {
    phoneInput.value = '';
    window.triggerBookingSubmission();

    const errBanner = document.getElementById('validation-errors');
    assert(errBanner && !errBanner.classList.contains('hidden'), 'SCRUM-4.4: Validation catches missing required phone and shows error');

    phoneInput.value = originalPhone || '+1 (555) 987-6543';
  }

  window.navigateTo('book-appointment');
  const docService = document.getElementById('service-btn-doctor');
  if (docService) docService.click();

  if (dateChips.length > 1) dateChips[1].click();
  if (timeslots.length > 1) timeslots[1].click();

  const preCount = window.getBookings().length;
  window.triggerBookingSubmission();
  const postBookings = window.getBookings();

  assert(postBookings.length === preCount + 1, 'SCRUM-4.5: Submitting valid booking increments saved bookings in localStorage');

  const newestBooking = postBookings[0];
  assert(newestBooking && newestBooking.id && newestBooking.id.startsWith('APT-'), 'SCRUM-4.6: New booking received a unique reference ID');
  assert(newestBooking.status === 'upcoming', 'SCRUM-4.7: New booking status is saved as "upcoming"');

  console.groupEnd();

  // =========================================================================
  // SUITE 5: SCRUM-5 — Display Confirmation Modal
  // =========================================================================
  console.group('--- SCRUM-5: Display Confirmation Modal ---');

  const confirmModal = document.getElementById('booking-confirmation-modal');
  assert(confirmModal && !confirmModal.classList.contains('hidden'), 'SCRUM-5.1: Booking confirmation modal is displayed after successful submission');

  const confirmRefId = document.getElementById('confirm-ref-id');
  assert(confirmRefId && confirmRefId.textContent.includes(newestBooking.id),
    'SCRUM-5.2: Confirmation modal displays real booking reference ID matching saved record');

  const confirmService = document.getElementById('confirm-service');
  assert(confirmService && confirmService.textContent === newestBooking.service,
    'SCRUM-5.3: Confirmation modal displays exact chosen service name');

  window.closeBookingModal();
  assert(confirmModal.classList.contains('hidden'), 'SCRUM-5.4: closeBookingModal hides the confirmation modal');

  console.groupEnd();

  // =========================================================================
  // SUITE 6: SCRUM-6 — View Booked Appointments & Schedule Sync
  // =========================================================================
  console.group('--- SCRUM-6: View Booked Appointments ---');

  window.navigateTo('my-appointments');
  const appointmentCards = document.querySelectorAll('#appointments-stack [data-booking-id]');
  assert(appointmentCards.length === postBookings.length,
    'SCRUM-6.1: My Appointments view dynamically renders all saved bookings from localStorage');

  const renderedTopId = appointmentCards[0].getAttribute('data-booking-id');
  assert(renderedTopId === newestBooking.id,
    'SCRUM-6.2: Newly booked appointment appears at the top of the schedule');

  // Verify card fields
  const topCard = appointmentCards[0];
  assert(topCard.textContent.includes(newestBooking.service), 'SCRUM-6.3: Appointment card displays correct service name');
  assert(topCard.textContent.includes(newestBooking.timeSlot), 'SCRUM-6.4: Appointment card displays correct time slot');

  // Test Tab Switching & Filtering
  window.switchTab('upcoming');
  const upcomingCards = document.querySelectorAll('#appointments-stack [data-status="upcoming"]');
  assert(upcomingCards.length > 0, 'SCRUM-6.5: Upcoming tab filters and displays upcoming bookings');

  window.switchTab('completed');
  const completedCards = document.querySelectorAll('#appointments-stack [data-status="completed"]');
  assert(completedCards.length >= 2, 'SCRUM-6.6: Completed tab filters and displays completed sessions');

  window.switchTab('all');

  // Empty state verification: test with empty array
  const currentSaved = window.getBookings();
  window.saveBookings([]);
  window.renderAppointments('all');
  const emptyStateEl = document.getElementById('tab-empty-state');
  assert(emptyStateEl && !emptyStateEl.classList.contains('hidden'), 'SCRUM-6.7: Empty state appears clearly when no appointments exist');

  // Restore saved bookings
  window.saveBookings(currentSaved);
  window.renderAppointments('all');

  console.groupEnd();

  // =========================================================================
  // SUITE 7: SCRUM-7 — Reschedule an Appointment
  // =========================================================================
  console.group('--- SCRUM-7: Reschedule an Appointment ---');

  assert(typeof window.rescheduleAppointment === 'function', 'SCRUM-7.1: window.rescheduleAppointment API is exposed');
  assert(typeof window.openRescheduleModal === 'function', 'SCRUM-7.2: window.openRescheduleModal is exposed');

  // Open reschedule modal for top booking
  window.openRescheduleModal(newestBooking.id);
  const rescheduleModal = document.getElementById('reschedule-modal');
  assert(rescheduleModal && !rescheduleModal.classList.contains('hidden'),
    'SCRUM-7.3: openRescheduleModal reveals reschedule dialog with current booking information');

  // Select a new date and slot
  const newTargetDate = 'Friday, Oct 24, 2025';
  const newTargetSlot = '03:30 PM - 04:00 PM';

  const updatedBooking = window.rescheduleAppointment(newestBooking.id, newTargetDate, newTargetSlot);
  assert(updatedBooking && updatedBooking.date === newTargetDate, 'SCRUM-7.4: Reschedule updates appointment date in localStorage');
  assert(updatedBooking.timeSlot === newTargetSlot, 'SCRUM-7.5: Reschedule updates appointment timeSlot in localStorage');
  assert(updatedBooking.status === 'upcoming', 'SCRUM-7.6: Rescheduled appointment preserves upcoming status');

  window.closeRescheduleModal();
  assert(rescheduleModal.classList.contains('hidden'), 'SCRUM-7.7: closeRescheduleModal hides the dialog');

  // Verify card in My Appointments displays the new date/time
  window.renderAppointments('all');
  const rescheduledCard = document.querySelector('#appointments-stack [data-booking-id="' + newestBooking.id + '"]');
  assert(rescheduledCard && rescheduledCard.textContent.includes('03:30 PM'),
    'SCRUM-7.8: My Appointments card immediately reflects rescheduled date and time');

  console.groupEnd();

  // =========================================================================
  // SUITE 8: SCRUM-8 — Cancel an Appointment
  // =========================================================================
  console.group('--- SCRUM-8: Cancel an Appointment ---');

  assert(typeof window.cancelAppointment === 'function', 'SCRUM-8.1: window.cancelAppointment function is exposed');
  assert(typeof window.openCancelModal === 'function', 'SCRUM-8.2: window.openCancelModal is exposed');

  window.openCancelModal(newestBooking.id);
  const cancelModal = document.getElementById('cancel-confirm-modal');
  assert(cancelModal && !cancelModal.classList.contains('hidden'),
    'SCRUM-8.3: openCancelModal displays confirmation dialog before cancellation');

  window.confirmCancelAppointment();
  assert(cancelModal.classList.contains('hidden'), 'SCRUM-8.4: confirmCancelAppointment hides the cancel modal');

  const afterCancelBookings = window.getBookings();
  const targetCanceled = afterCancelBookings.find(b => b.id === newestBooking.id);
  assert(targetCanceled && targetCanceled.status === 'cancelled',
    'SCRUM-8.5: Cancelled booking status is updated to "cancelled" in localStorage');

  window.switchTab('cancelled');
  const cancelledCards = document.querySelectorAll('#appointments-stack [data-status="cancelled"]');
  assert(cancelledCards.length >= 1, 'SCRUM-8.6: Cancelled tab displays the newly cancelled appointment');

  window.switchTab('all');

  console.groupEnd();

  // =========================================================================
  // SUITE 9: SCRUM-9 — Prevent Double-Booking
  // =========================================================================
  console.group('--- SCRUM-9: Prevent Double-Booking ---');

  assert(typeof window.isSlotAvailable === 'function', 'SCRUM-9.1: window.isSlotAvailable helper is exposed');

  // Identify an active booking
  const activeBookings = window.getBookings().filter(b => b.status === 'upcoming');
  assert(activeBookings.length > 0, 'SCRUM-9.2: Active booking exists to test slot conflict');
  const occupiedBooking = activeBookings[0];

  // Test slot availability check
  const isOccupiedAvailable = window.isSlotAvailable(occupiedBooking.service, occupiedBooking.date, occupiedBooking.timeSlot);
  assert(isOccupiedAvailable === false, 'SCRUM-9.3: isSlotAvailable correctly identifies occupied slot as unavailable');

  // Test booking collision rejection in booking form
  window.navigateTo('book-appointment');
  window.selectService(occupiedBooking.service, occupiedBooking.location, occupiedBooking.duration, occupiedBooking.timeSlot);
  window.selectDate(occupiedBooking.date);
  window.selectSlot(occupiedBooking.timeSlot);

  const preDoubleCount = window.getBookings().length;
  window.triggerBookingSubmission();
  const postDoubleCount = window.getBookings().length;

  assert(postDoubleCount === preDoubleCount, 'SCRUM-9.4: Submitting duplicate booking does NOT increment bookings count');

  const validationErrorBox = document.getElementById('validation-errors');
  assert(validationErrorBox && !validationErrorBox.classList.contains('hidden') && validationErrorBox.textContent.includes('already booked'),
    'SCRUM-9.5: System rejects duplicate slot and displays clear conflict error banner');

  const confirmModalAfterConflict = document.getElementById('booking-confirmation-modal');
  assert(confirmModalAfterConflict.classList.contains('hidden'),
    'SCRUM-9.6: Confirmation modal is NOT shown when double-booking attempt is rejected');

  // Test reschedule collision rejection
  let rescheduleConflictThrown = false;
  const clashBooking = {
    id: 'APT-CLASH-TEST',
    service: occupiedBooking.service,
    location: occupiedBooking.location,
    duration: occupiedBooking.duration,
    practitioner: occupiedBooking.practitioner,
    date: 'Monday, Oct 20, 2025',
    timeSlot: '09:00 AM - 09:30 AM',
    phone: '+1 555-9999',
    notes: 'Clash test',
    status: 'upcoming',
    createdAt: new Date().toISOString()
  };
  const preClashList = window.getBookings();
  preClashList.push(clashBooking);
  window.saveBookings(preClashList);

  try {
    window.rescheduleAppointment('APT-CLASH-TEST', occupiedBooking.date, occupiedBooking.timeSlot);
  } catch (e) {
    rescheduleConflictThrown = true;
  }
  window.saveBookings(window.getBookings().filter(b => b.id !== 'APT-CLASH-TEST'));
  assert(rescheduleConflictThrown, 'SCRUM-9.7: Rescheduling into an already-reserved slot is blocked and throws conflict error');

  console.groupEnd();

  // =========================================================================
  // SUITE 10: SCRUM-10 — Functional Tests, Error Handling & Bug Fixes
  // =========================================================================
  console.group('--- SCRUM-10: Functional Tests & Bug Fixes ---');

  // Test corrupt localStorage handling
  const backup = localStorage.getItem('scheduler_appointments');
  localStorage.setItem('scheduler_appointments', 'NOT_VALID_JSON{[');
  const recovered = window.getBookings();
  assert(Array.isArray(recovered), 'SCRUM-10.1: Corrupted localStorage data safely recovers with empty array without throwing uncaught errors');
  localStorage.setItem('scheduler_appointments', backup);

  // Test appointment cancellation releases the slot for re-booking
  const releaseTestService = 'Doctor Consultation';
  const releaseTestDate = 'Thursday, Oct 23, 2025';
  const releaseTestSlot = '10:00 AM - 10:30 AM';

  const testBooking = {
    id: 'APT-TEST-RELEASE',
    service: releaseTestService,
    location: 'Campus Health Center',
    duration: '30 mins',
    practitioner: 'Dr. Sarah Jenkins, MD',
    date: releaseTestDate,
    timeSlot: releaseTestSlot,
    phone: '+1 555-0000',
    notes: 'Release Test',
    status: 'upcoming',
    createdAt: new Date().toISOString()
  };

  const curr = window.getBookings();
  curr.unshift(testBooking);
  window.saveBookings(curr);

  assert(!window.isSlotAvailable(releaseTestService, releaseTestDate, releaseTestSlot),
    'SCRUM-10.2: Active test booking locks slot availability');

  window.cancelAppointment('APT-TEST-RELEASE');

  assert(window.isSlotAvailable(releaseTestService, releaseTestDate, releaseTestSlot),
    'SCRUM-10.3: Cancelling the test appointment successfully releases the slot for future bookings');

  // Clean up release test booking
  const cleaned = window.getBookings().filter(b => b.id !== 'APT-TEST-RELEASE');
  window.saveBookings(cleaned);
  window.renderAppointments('all');

  console.groupEnd();

  console.groupEnd();

  const passedCount = results.filter(r => r.status === 'PASSED').length;
  const failedCount = results.filter(r => r.status === 'FAILED').length;

  console.log(`%c[SUMMARY] ${passedCount}/${results.length} tests passed (${failedCount} failed).`,
    failedCount === 0 ? 'color: #059669; font-weight: bold; font-size: 14px;' : 'color: #dc2626; font-weight: bold; font-size: 14px;');

  return { total: results.length, passed: passedCount, failed: failedCount, results };
}

// Auto-run if opened with test query parameter (e.g. ?runTests=true)
if (typeof window !== 'undefined') {
  window.runSchedulerSmokeTests = runSchedulerSmokeTests;
  if (window.location && window.location.search.includes('runTests=true')) {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(runSchedulerSmokeTests, 300);
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = { runSchedulerSmokeTests };
}
