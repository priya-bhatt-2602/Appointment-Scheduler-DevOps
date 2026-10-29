/**
 * Appointment Scheduler - Core Application Script
 * CSE706 Agile Scrum Project (Sprint 1 & Sprint 2: SCRUM-1 through SCRUM-10)
 *
 * Sprint 1 Features (SCRUM-1 to SCRUM-5):
 *  - Client-side hash-based view routing & navigation states
 *  - Booking state management (service, date, slot, contact info)
 *  - localStorage persistence for appointments
 *  - Form validation with user feedback
 *  - Confirmation modal populated with real booking details
 *
 * Sprint 2 Features (SCRUM-6 to SCRUM-10):
 *  - SCRUM-6: View booked appointments, dynamic cards, empty states, and tab filters
 *  - SCRUM-7: Reschedule an appointment with new date/time selection, modal UI, and atomic updates
 *  - SCRUM-8: Cancel an appointment with confirmation dialog, status update, and slot release
 *  - SCRUM-9: Robust double-booking prevention on initial booking and rescheduling
 *  - SCRUM-10: Error handling, edge-case recovery, and comprehensive verification suite
 */

'use strict';

(function () {
  // ==================================================================
  // 1. CONSTANTS & CONFIGURATION
  // ==================================================================
  const VALID_VIEWS = ['home', 'book-appointment', 'my-appointments'];
  const DEFAULT_VIEW = 'home';
  const STORAGE_KEY = 'scheduler_appointments';

  // Standard selectable timeslots for booking and rescheduling
  const STANDARD_TIMESLOTS = [
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:15 AM - 11:45 AM',
    '02:00 PM - 02:30 PM',
    '03:30 PM - 04:00 PM'
  ];

  // Standard selectable dates
  const STANDARD_DATES = [
    'Monday, Oct 20, 2025',
    'Tuesday, Oct 21, 2025',
    'Wednesday, Oct 22, 2025',
    'Thursday, Oct 23, 2025',
    'Friday, Oct 24, 2025'
  ];

  // ==================================================================
  // 2. STATE MANAGEMENT
  // ==================================================================
  // Booking state for new reservations (SCRUM-4)
  let bookingState = {
    serviceName: '',
    location: '',
    duration: '',
    practitioner: '',
    date: '',
    timeSlot: ''
  };

  // Rescheduling state (SCRUM-7)
  let rescheduleState = {
    bookingId: null,
    newDate: '',
    newSlot: ''
  };

  // Cancellation state (SCRUM-8)
  let cancelTargetId = null;

  // Active filter tab on My Appointments screen (SCRUM-6)
  let currentTab = 'all';

  // ==================================================================
  // 3. LOCALSTORAGE HELPERS & RECOVERY (SCRUM-6)
  // ==================================================================

  /** Retrieve all saved appointments from localStorage with error safety */
  function getBookings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('[Storage] Failed to parse bookings, recovering empty array:', e);
      return [];
    }
  }

  /** Overwrite the full bookings array in localStorage */
  function saveBookings(bookings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('[Storage] Error saving to localStorage:', e);
      throw new Error('Storage write failed');
    }
  }

  /** Add a single booking to the front of the list and persist */
  function addBooking(booking) {
    const bookings = getBookings();
    bookings.unshift(booking);
    saveBookings(bookings);
    return booking;
  }

  /** Generate a unique reference ID for a new booking */
  function generateRefId() {
    const year = new Date().getFullYear();
    const num = Math.floor(1000 + Math.random() * 9000);
    return 'APT-' + year + '-' + num;
  }

  /**
   * Seed sample appointments into localStorage on the very first load
   * so the "My Appointments" screen has realistic initial state.
   */
  function seedDefaults() {
    if (localStorage.getItem(STORAGE_KEY) !== null) return;

    const defaults = [
      {
        id: 'APT-2025-1001',
        service: 'Faculty Mentoring Session',
        location: 'Engineering Hall 3B',
        duration: '45 mins',
        practitioner: 'Prof. Arthur Davis',
        date: 'Tuesday, Oct 14, 2025',
        timeSlot: '2:00 PM - 2:45 PM',
        phone: '+1 (555) 234-5678',
        notes: 'Sprint Review & Course Project',
        status: 'upcoming',
        createdAt: '2025-10-10T10:00:00Z'
      },
      {
        id: 'APT-2025-1002',
        service: 'Doctor Consultation',
        location: 'Health Center Rm 204',
        duration: '30 mins',
        practitioner: 'Dr. Sarah Jenkins, MD',
        date: 'Wednesday, Oct 22, 2025',
        timeSlot: '11:15 AM - 11:45 AM',
        phone: '+1 (555) 234-5678',
        notes: 'Routine Checkup',
        status: 'upcoming',
        createdAt: '2025-10-09T14:00:00Z'
      },
      {
        id: 'APT-2025-0803',
        service: 'Academic Advising',
        location: 'Administration Wing 101',
        duration: '30 mins',
        practitioner: 'Advisor M. Patel',
        date: 'Wednesday, Oct 08, 2025',
        timeSlot: '3:00 PM - 3:30 PM',
        phone: '+1 (555) 234-5678',
        notes: 'Sprint Electives Plan',
        status: 'completed',
        createdAt: '2025-10-05T09:00:00Z'
      },
      {
        id: 'APT-2025-0204',
        service: 'Salon & Grooming',
        location: 'Union Suite 12',
        duration: '30 mins',
        practitioner: 'Studio Stylist',
        date: 'Thursday, Oct 02, 2025',
        timeSlot: '1:30 PM - 2:00 PM',
        phone: '+1 (555) 234-5678',
        notes: 'Standard Haircut',
        status: 'completed',
        createdAt: '2025-09-29T11:00:00Z'
      }
    ];

    saveBookings(defaults);
    console.log('[Storage] Seeded default sample appointments for Sprint 1/2.');
  }

  // ==================================================================
  // 4. DOUBLE-BOOKING PREVENTION ENGINE (SCRUM-9)
  // ==================================================================

  /**
   * Check if a specific time slot is available for booking.
   * A slot is considered unavailable if ANY active (status !== 'cancelled')
   * booking already occupies that service/practitioner, date, and timeslot.
   *
   * @param {string} serviceName - e.g. 'Doctor Consultation'
   * @param {string} date - e.g. 'Wednesday, Oct 22, 2025'
   * @param {string} timeSlot - e.g. '11:15 AM - 11:45 AM'
   * @param {string} [excludeBookingId] - Optional booking ID to exclude (used when rescheduling self)
   * @returns {boolean} True if available, false if conflict exists
   */
  function isSlotAvailable(serviceName, date, timeSlot, excludeBookingId) {
    if (!date || !timeSlot) return true;
    const bookings = getBookings();
    const conflict = bookings.some(function (b) {
      if (excludeBookingId && b.id === excludeBookingId) return false;
      if (b.status === 'cancelled') return false;
      return (
        b.service === serviceName &&
        b.date === date &&
        b.timeSlot === timeSlot
      );
    });
    return !conflict;
  }

  // ==================================================================
  // 5. NAVIGATION & VIEW ROUTING (SCRUM-1)
  // ==================================================================

  /**
   * Navigate to a designated view by ID.
   * @param {string} viewId - 'home', 'book-appointment', or 'my-appointments'
   * @param {Object} options - Optional params (e.g. { service: 'doctor' })
   */
  function navigateTo(viewId, options) {
    options = options || {};
    var target = VALID_VIEWS.indexOf(viewId) !== -1 ? viewId : DEFAULT_VIEW;

    // 1. Toggle view sections
    VALID_VIEWS.forEach(function (v) {
      var el = document.getElementById('view-' + v);
      if (el) {
        if (v === target) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });

    // 2. Update desktop nav links
    var desktopLinks = document.querySelectorAll('#main-nav .nav-item');
    desktopLinks.forEach(function (link) {
      var lt = link.getAttribute('data-target');
      if (lt === target) {
        link.classList.remove('text-on-surface-variant', 'hover:bg-surface-container', 'hover:text-on-surface');
        link.classList.add('bg-surface-container-high', 'text-primary', 'font-semibold');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('bg-surface-container-high', 'text-primary', 'font-semibold');
        link.classList.add('text-on-surface-variant', 'hover:bg-surface-container', 'hover:text-on-surface');
        link.removeAttribute('aria-current');
      }
    });

    // 3. Update mobile nav links
    var mobileLinks = document.querySelectorAll('#mobile-nav .mobile-nav-item');
    mobileLinks.forEach(function (link) {
      var lt = link.getAttribute('data-target');
      if (lt === target) {
        link.classList.remove('text-on-surface-variant');
        link.classList.add('bg-surface-container-high', 'text-primary', 'font-semibold');
      } else {
        link.classList.remove('bg-surface-container-high', 'text-primary', 'font-semibold');
        link.classList.add('text-on-surface-variant');
      }
    });

    // 4. Close mobile menu if open
    var mobileMenu = document.getElementById('mobile-nav');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    // 5. Update URL hash without recursive loop
    if (window.location.hash !== '#' + target) {
      history.pushState(null, '', '#' + target);
    }

    // 6. Handle optional service preselection
    if (target === 'book-appointment' && options.service) {
      preselectService(options.service);
    }

    // 7. Render dynamic appointments when navigating to that view
    if (target === 'my-appointments') {
      renderAppointments(currentTab);
    }

    // 8. Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Preselect a service card when arriving from the Home Dashboard */
  function preselectService(serviceType) {
    var serviceMap = {
      'doctor': 'service-btn-doctor',
      'mentoring': 'service-btn-mentoring',
      'salon': 'service-btn-salon'
    };
    var btnId = serviceMap[serviceType.toLowerCase()];
    if (btnId) {
      var btn = document.getElementById(btnId);
      if (btn) btn.click();
    }
  }

  // ==================================================================
  // 6. BOOKING FLOW — Step 1: Service Selection (SCRUM-2)
  // ==================================================================

  function selectService(serviceName, location, duration, time, btnElement) {
    bookingState.serviceName = serviceName;
    bookingState.location = location;
    bookingState.duration = duration;

    if (serviceName.indexOf('Doctor') !== -1) {
      bookingState.practitioner = 'Dr. Sarah Jenkins, MD';
    } else if (serviceName.indexOf('Mentoring') !== -1) {
      bookingState.practitioner = 'Prof. Arthur Davis, Agile Lead';
    } else {
      bookingState.practitioner = 'Studio Stylist Desk';
    }

    var cards = document.querySelectorAll('.service-card');
    cards.forEach(function (card) {
      card.classList.remove('ring-2', 'ring-primary', 'bg-surface-container-low', 'selected-card');
      card.classList.add('bg-surface-container-lowest');
      var check = card.querySelector('.service-check');
      if (check) {
        check.classList.add('hidden');
        check.classList.remove('flex');
      }
    });

    if (btnElement) {
      btnElement.classList.remove('bg-surface-container-lowest');
      btnElement.classList.add('ring-2', 'ring-primary', 'bg-surface-container-low', 'selected-card');
      var check = btnElement.querySelector('.service-check');
      if (check) {
        check.classList.remove('hidden');
        check.classList.add('flex');
      }
    }

    var summaryService = document.getElementById('summary-service');
    var summaryLocation = document.getElementById('summary-location');
    var summaryTime = document.getElementById('summary-time');
    var summaryPractitioner = document.getElementById('summary-practitioner');

    if (summaryService) summaryService.textContent = serviceName;
    if (summaryLocation) summaryLocation.textContent = location;
    if (summaryTime) summaryTime.textContent = time + ' (' + duration + ')';
    if (summaryPractitioner) summaryPractitioner.textContent = bookingState.practitioner;

    clearValidationErrors();
  }

  // ==================================================================
  // 7. BOOKING FLOW — Step 2: Date Selection (SCRUM-3)
  // ==================================================================

  function selectDate(dateString, btnElement) {
    bookingState.date = dateString;

    var dateChips = document.querySelectorAll('.date-chip');
    dateChips.forEach(function (chip) {
      chip.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm', 'ring-2', 'ring-primary', 'selected-date');
      chip.classList.add('bg-surface-container-low');
      var dayText = chip.querySelector('span:first-child');
      var numText = chip.querySelector('span:nth-child(2)');
      var dot = chip.querySelector('span:last-child');
      if (dayText) dayText.className = 'font-label-sm text-label-sm text-on-surface-variant uppercase';
      if (numText) numText.className = 'font-headline-sm text-headline-sm text-on-surface mt-1';
      if (dot) dot.className = 'w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5';
    });

    if (btnElement) {
      btnElement.classList.remove('bg-surface-container-low');
      btnElement.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm', 'ring-2', 'ring-primary', 'selected-date');
      var dayText = btnElement.querySelector('span:first-child');
      var numText = btnElement.querySelector('span:nth-child(2)');
      var dot = btnElement.querySelector('span:last-child');
      if (dayText) dayText.className = 'font-label-sm text-label-sm text-on-primary uppercase font-bold';
      if (numText) numText.className = 'font-headline-sm text-headline-sm text-on-primary mt-1 font-bold';
      if (dot) dot.className = 'w-1.5 h-1.5 rounded-full bg-on-primary mt-1.5';
    }

    var dateCallout = document.getElementById('selected-date-callout');
    if (dateCallout) dateCallout.textContent = dateString;

    var summaryDate = document.getElementById('summary-date');
    if (summaryDate) summaryDate.textContent = dateString;

    clearValidationErrors();
  }

  // ==================================================================
  // 8. BOOKING FLOW — Step 3: Time Slot Selection (SCRUM-3)
  // ==================================================================

  function selectSlot(timeString, btnElement) {
    bookingState.timeSlot = timeString;

    var slots = document.querySelectorAll('.timeslot-btn');
    slots.forEach(function (slot) {
      slot.classList.remove('bg-primary-container', 'text-on-primary', 'ring-2', 'ring-primary', 'selected-slot');
      slot.classList.add('bg-surface-container-low', 'text-on-surface');
      var label = slot.querySelector('span:last-child');
      if (label) {
        label.textContent = 'Available';
        label.className = 'font-label-sm text-[11px] text-tertiary';
      }
    });

    if (btnElement) {
      btnElement.classList.remove('bg-surface-container-low', 'text-on-surface');
      btnElement.classList.add('bg-primary-container', 'text-on-primary', 'ring-2', 'ring-primary', 'selected-slot');
      var label = btnElement.querySelector('span:last-child');
      if (label) {
        label.textContent = 'Selected';
        label.className = 'font-label-sm text-[11px] text-on-primary-container';
      }
    }

    var summaryTime = document.getElementById('summary-time');
    if (summaryTime) {
      var current = summaryTime.textContent;
      var durationMatch = current.match(/\(.*?\)/);
      var duration = durationMatch ? ' ' + durationMatch[0] : ' (30 mins)';
      summaryTime.textContent = timeString + duration;
    }

    clearValidationErrors();
  }

  // ==================================================================
  // 9. FORM VALIDATION & DOUBLE-BOOKING CHECK (SCRUM-4 & SCRUM-9)
  // ==================================================================

  /** Validate all required booking fields and prevent double booking */
  function validateBooking() {
    var errors = [];
    if (!bookingState.serviceName) {
      errors.push('Please select a service (Step 1).');
    }
    if (!bookingState.date) {
      errors.push('Please select a date (Step 2).');
    }
    if (!bookingState.timeSlot) {
      errors.push('Please select a time slot (Step 3).');
    }
    var phone = document.getElementById('phone');
    if (!phone || !phone.value.trim()) {
      errors.push('Please enter your phone number (Step 4).');
    }

    // SCRUM-9: Prevent double-booking
    if (bookingState.serviceName && bookingState.date && bookingState.timeSlot) {
      if (!isSlotAvailable(bookingState.serviceName, bookingState.date, bookingState.timeSlot)) {
        errors.push('Conflict: This time slot is already booked for ' + bookingState.serviceName + '. Please choose another time or date.');
      }
    }

    return errors;
  }

  /** Display validation errors in the UI */
  function showValidationErrors(errors) {
    var container = document.getElementById('validation-errors');
    if (!container) {
      container = document.createElement('div');
      container.id = 'validation-errors';
      var sidebar = document.querySelector('.sticky-summary > div');
      if (sidebar) {
        var cta = sidebar.querySelector('.flex.flex-col.gap-2');
        if (cta) {
          sidebar.insertBefore(container, cta);
        } else {
          sidebar.appendChild(container);
        }
      }
    }

    container.className = 'p-4 rounded-xl bg-error-container border border-error/30 text-on-error-container text-sm space-y-1';
    container.innerHTML =
      '<div class="flex items-center gap-2 font-bold text-error mb-1">' +
        '<span class="material-symbols-outlined text-[18px]">error</span>' +
        '<span>Booking Error / Action Required:</span>' +
      '</div>' +
      errors.map(function (e) {
        return '<p class="text-xs flex items-center gap-1.5">\u2022 ' + e + '</p>';
      }).join('');

    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function clearValidationErrors() {
    var container = document.getElementById('validation-errors');
    if (container) container.classList.add('hidden');
  }

  // ==================================================================
  // 10. BOOKING SUBMISSION (SCRUM-4 & SCRUM-5)
  // ==================================================================

  function triggerBookingSubmission() {
    var errors = validateBooking();
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    var phone = document.getElementById('phone');
    var notes = document.getElementById('notes');
    var refId = generateRefId();

    var booking = {
      id: refId,
      service: bookingState.serviceName,
      location: bookingState.location,
      duration: bookingState.duration,
      practitioner: bookingState.practitioner,
      date: bookingState.date,
      timeSlot: bookingState.timeSlot,
      phone: phone ? phone.value.trim() : '',
      notes: notes ? notes.value.trim() : '',
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };

    try {
      addBooking(booking);
      console.log('[Booking] Successfully saved appointment ' + refId + ' to localStorage.');
    } catch (err) {
      showValidationErrors(['Failed to save booking: ' + err.message + '. Please try again.']);
      return;
    }

    updateConfirmationModal(booking);

    var modal = document.getElementById('booking-confirmation-modal');
    if (modal) modal.classList.remove('hidden');

    clearValidationErrors();
  }

  function updateConfirmationModal(booking) {
    var refEl = document.getElementById('confirm-ref-id');
    var serviceEl = document.getElementById('confirm-service');
    var dateEl = document.getElementById('confirm-date');
    var timeEl = document.getElementById('confirm-time');
    var statusEl = document.getElementById('confirm-status');

    if (refEl) refEl.textContent = '#' + booking.id;
    if (serviceEl) serviceEl.textContent = booking.service;
    if (dateEl) dateEl.textContent = booking.date;
    if (timeEl) timeEl.textContent = booking.timeSlot + ' (' + booking.duration + ')';
    if (statusEl) statusEl.textContent = 'Confirmed & Active';
  }

  function closeBookingModal() {
    var modal = document.getElementById('booking-confirmation-modal');
    if (modal) modal.classList.add('hidden');
  }

  // ==================================================================
  // 11. MY APPOINTMENTS — DYNAMIC RENDERING (SCRUM-6)
  // ==================================================================

  function parseDateParts(dateStr) {
    var match = dateStr.match(/(\w+),?\s+(\w+)\s+(\d+)/);
    if (match) return { month: match[2].toUpperCase(), dayNum: match[3] };
    return { month: '—', dayNum: '—' };
  }

  function createAppointmentCard(booking) {
    var parts = parseDateParts(booking.date);
    var isUpcoming = booking.status === 'upcoming';
    var isCancelled = booking.status === 'cancelled';

    var dateBadgeBg = isUpcoming
      ? 'bg-primary-container text-on-primary'
      : isCancelled
        ? 'bg-error-container text-error'
        : 'bg-surface-container text-secondary';

    var statusPillBg = isUpcoming
      ? 'bg-primary-fixed text-on-primary-fixed-variant'
      : isCancelled
        ? 'bg-error-container text-error'
        : 'bg-surface-container-high text-secondary';

    var statusLabel = isUpcoming ? 'Upcoming' : isCancelled ? 'Cancelled' : 'Completed';
    var opacity = isUpcoming ? '' : 'opacity-90';
    var hoverBorder = isUpcoming ? 'hover:border-primary/40' : '';

    // SCRUM-7 & SCRUM-8 Action buttons
    var actionsHtml;
    if (isUpcoming) {
      actionsHtml =
        '<button class="px-3.5 py-2 rounded-lg bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer" onclick="showAppointmentDetails(\'' + booking.id + '\')">' +
          'View Details' +
        '</button>' +
        '<button class="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-xs font-semibold text-primary hover:bg-surface-container-low transition-colors cursor-pointer" onclick="openRescheduleModal(\'' + booking.id + '\')">' +
          'Reschedule' +
        '</button>' +
        '<button class="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-xs font-semibold text-error hover:bg-error-container transition-colors cursor-pointer" onclick="openCancelModal(\'' + booking.id + '\')">' +
          'Cancel' +
        '</button>';
    } else {
      actionsHtml =
        '<button class="px-3.5 py-2 rounded-lg bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer" onclick="showAppointmentDetails(\'' + booking.id + '\')">' +
          'View Summary' +
        '</button>';
    }

    var card = document.createElement('div');
    card.className = 'rounded-xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30 ' +
      hoverBorder + ' transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 ' + opacity;
    card.setAttribute('data-status', booking.status);
    card.setAttribute('data-booking-id', booking.id);

    card.innerHTML =
      '<div class="flex items-start gap-4">' +
        '<div class="w-14 h-14 rounded-xl ' + dateBadgeBg + ' flex flex-col items-center justify-center flex-shrink-0">' +
          '<span class="text-[10px] uppercase font-bold tracking-wider leading-none">' + parts.month + '</span>' +
          '<span class="text-xl font-bold leading-none mt-1">' + parts.dayNum + '</span>' +
        '</div>' +
        '<div class="space-y-1">' +
          '<div class="flex items-center gap-2 flex-wrap">' +
            '<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ' + statusPillBg + '">' + statusLabel + '</span>' +
            '<span class="text-xs text-on-surface-variant">' + booking.timeSlot + ' (' + booking.duration + ')</span>' +
          '</div>' +
          '<h3 class="text-lg font-bold text-on-surface">' + booking.service + '</h3>' +
          '<p class="text-xs text-on-surface-variant">' + booking.practitioner + ' \u2022 ' + booking.location +
            (booking.notes ? ' \u2022 ' + booking.notes : '') + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="flex items-center gap-2 self-end md:self-center">' +
        actionsHtml +
      '</div>';

    return card;
  }

  function renderAppointments(filterTab) {
    filterTab = filterTab || currentTab || 'all';
    var stack = document.getElementById('appointments-stack');
    var emptyState = document.getElementById('tab-empty-state');
    if (!stack) return;

    var bookings = getBookings();

    var filtered;
    if (filterTab === 'all') {
      filtered = bookings;
    } else {
      filtered = bookings.filter(function (b) { return b.status === filterTab; });
    }

    stack.innerHTML = '';

    if (filtered.length === 0) {
      stack.classList.add('hidden');
      if (emptyState) {
        emptyState.classList.remove('hidden');
        var heading = document.getElementById('empty-heading');
        var subtext = document.getElementById('empty-subtext');

        if (filterTab === 'cancelled') {
          if (heading) heading.textContent = 'No cancelled appointments';
          if (subtext) subtext.textContent = 'You have not cancelled any bookings. All sessions are scheduled or completed.';
        } else if (filterTab === 'upcoming') {
          if (heading) heading.textContent = 'No upcoming appointments';
          if (subtext) subtext.textContent = 'You have no upcoming bookings. Book a new appointment to get started!';
        } else if (filterTab === 'completed') {
          if (heading) heading.textContent = 'No completed appointments';
          if (subtext) subtext.textContent = 'No sessions have been completed yet.';
        } else {
          if (heading) heading.textContent = 'No appointments found';
          if (subtext) subtext.textContent = 'Book your first campus appointment to get started!';
        }
      }
    } else {
      stack.classList.remove('hidden');
      if (emptyState) emptyState.classList.add('hidden');

      filtered.forEach(function (booking) {
        stack.appendChild(createAppointmentCard(booking));
      });
    }

    updateTabCounts();
  }

  function updateTabCounts() {
    var bookings = getBookings();
    var counts = {
      all: bookings.length,
      upcoming: bookings.filter(function (b) { return b.status === 'upcoming'; }).length,
      completed: bookings.filter(function (b) { return b.status === 'completed'; }).length,
      cancelled: bookings.filter(function (b) { return b.status === 'cancelled'; }).length
    };

    ['all', 'upcoming', 'completed', 'cancelled'].forEach(function (tab) {
      var btn = document.getElementById('tab-btn-' + tab);
      if (!btn) return;
      var spans = btn.querySelectorAll('span');
      for (var i = spans.length - 1; i >= 0; i--) {
        if (spans[i].classList.contains('rounded-full')) {
          spans[i].textContent = counts[tab];
          break;
        }
      }
    });
  }

  function switchTab(tabId) {
    currentTab = tabId;
    var tabs = ['all', 'upcoming', 'completed', 'cancelled'];

    tabs.forEach(function (t) {
      var btn = document.getElementById('tab-btn-' + t);
      if (!btn) return;
      if (t === tabId) {
        btn.className = 'px-4 py-2 rounded-full text-xs font-semibold bg-primary text-on-primary shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer';
      } else {
        btn.className = 'px-4 py-2 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center gap-1.5 cursor-pointer';
      }
    });

    renderAppointments(tabId);
  }

  // ==================================================================
  // 12. APPOINTMENT RESCHEDULING ENGINE (SCRUM-7 & SCRUM-9)
  // ==================================================================

  /** Open the reschedule modal for an upcoming appointment */
  function openRescheduleModal(bookingId) {
    var bookings = getBookings();
    var booking = bookings.find(function (b) { return b.id === bookingId; });
    if (!booking) return;

    rescheduleState = {
      bookingId: bookingId,
      newDate: booking.date,
      newSlot: booking.timeSlot
    };

    var modal = document.getElementById('reschedule-modal');
    if (!modal) return;

    // Populate current info
    var svcEl = document.getElementById('reschedule-service-name');
    var schEl = document.getElementById('reschedule-current-schedule');
    if (svcEl) svcEl.textContent = booking.service + ' (' + booking.practitioner + ')';
    if (schEl) schEl.textContent = booking.date + ' \u2022 ' + booking.timeSlot;

    hideRescheduleError();

    // Populate Date Chips
    var dateContainer = document.getElementById('reschedule-date-chips');
    if (dateContainer) {
      dateContainer.innerHTML = '';
      STANDARD_DATES.forEach(function (d) {
        var parts = parseDateParts(d);
        var isSelected = d === rescheduleState.newDate;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'reschedule-date-btn flex flex-col items-center justify-center p-2.5 rounded-lg text-xs transition-colors cursor-pointer ' +
          (isSelected
            ? 'bg-primary-container text-on-primary ring-2 ring-primary font-bold'
            : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high');
        btn.innerHTML =
          '<span class="uppercase text-[10px]">' + parts.month + '</span>' +
          '<span class="text-sm font-bold mt-0.5">' + parts.dayNum + '</span>';
        btn.onclick = function () { selectRescheduleDate(d, btn); };
        dateContainer.appendChild(btn);
      });
    }

    // Populate Timeslot Buttons
    renderRescheduleTimeslots(booking.service, rescheduleState.newDate, booking.id);

    modal.classList.remove('hidden');
  }

  /** Render available and unavailable timeslots for reschedule dialog */
  function renderRescheduleTimeslots(serviceName, date, currentBookingId) {
    var slotContainer = document.getElementById('reschedule-timeslot-container');
    if (!slotContainer) return;

    slotContainer.innerHTML = '';

    STANDARD_TIMESLOTS.forEach(function (slot) {
      var available = isSlotAvailable(serviceName, date, slot, currentBookingId);
      var isCurrent = slot === rescheduleState.newSlot;

      var btn = document.createElement('button');
      btn.type = 'button';

      if (!available) {
        // Disabled slot (SCRUM-9)
        btn.className = 'p-2 rounded-lg bg-surface text-outline cursor-not-allowed opacity-50 flex flex-col items-center justify-center';
        btn.disabled = true;
        btn.innerHTML =
          '<span class="line-through text-xs">' + slot.split(' - ')[0] + '</span>' +
          '<span class="text-[9px] text-error">Booked</span>';
      } else {
        btn.className = 'reschedule-slot-btn p-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition-colors cursor-pointer ' +
          (isCurrent
            ? 'bg-primary-container text-on-primary ring-2 ring-primary'
            : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high');
        btn.innerHTML =
          '<span>' + slot.split(' - ')[0] + '</span>' +
          '<span class="text-[9px] ' + (isCurrent ? 'text-on-primary-container' : 'text-tertiary') + '">' +
            (isCurrent ? 'Selected' : 'Available') +
          '</span>';
        btn.onclick = function () { selectRescheduleSlot(slot, btn); };
      }

      slotContainer.appendChild(btn);
    });
  }

  function selectRescheduleDate(dateString, btnEl) {
    rescheduleState.newDate = dateString;
    var all = document.querySelectorAll('.reschedule-date-btn');
    all.forEach(function (b) {
      b.className = 'reschedule-date-btn flex flex-col items-center justify-center p-2.5 rounded-lg text-xs transition-colors cursor-pointer bg-surface-container-low text-on-surface hover:bg-surface-container-high';
    });
    if (btnEl) {
      btnEl.className = 'reschedule-date-btn flex flex-col items-center justify-center p-2.5 rounded-lg text-xs transition-colors cursor-pointer bg-primary-container text-on-primary ring-2 ring-primary font-bold';
    }

    var bookings = getBookings();
    var b = bookings.find(function (item) { return item.id === rescheduleState.bookingId; });
    if (b) {
      renderRescheduleTimeslots(b.service, dateString, b.id);
    }
    hideRescheduleError();
  }

  function selectRescheduleSlot(slotString, btnEl) {
    rescheduleState.newSlot = slotString;
    var all = document.querySelectorAll('.reschedule-slot-btn');
    all.forEach(function (b) {
      b.className = 'reschedule-slot-btn p-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition-colors cursor-pointer bg-surface-container-low text-on-surface hover:bg-surface-container-high';
      var last = b.querySelector('span:last-child');
      if (last) {
        last.textContent = 'Available';
        last.className = 'text-[9px] text-tertiary';
      }
    });
    if (btnEl) {
      btnEl.className = 'reschedule-slot-btn p-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition-colors cursor-pointer bg-primary-container text-on-primary ring-2 ring-primary';
      var last = btnEl.querySelector('span:last-child');
      if (last) {
        last.textContent = 'Selected';
        last.className = 'text-[9px] text-on-primary-container';
      }
    }
    hideRescheduleError();
  }

  function showRescheduleError(msg) {
    var banner = document.getElementById('reschedule-error-banner');
    var text = document.getElementById('reschedule-error-text');
    if (banner && text) {
      text.textContent = msg;
      banner.classList.remove('hidden');
    }
  }

  function hideRescheduleError() {
    var banner = document.getElementById('reschedule-error-banner');
    if (banner) banner.classList.add('hidden');
  }

  /**
   * Programmatic Reschedule API (SCRUM-7 & SCRUM-9)
   * Updates an existing appointment in localStorage after availability check.
   */
  function rescheduleAppointment(bookingId, newDate, newSlot) {
    if (!bookingId || !newDate || !newSlot) {
      throw new Error('Missing required reschedule parameters');
    }

    var bookings = getBookings();
    var target = bookings.find(function (b) { return b.id === bookingId; });
    if (!target) {
      throw new Error('Appointment not found');
    }

    // Double-booking check (SCRUM-9)
    if (!isSlotAvailable(target.service, newDate, newSlot, bookingId)) {
      throw new Error('Slot conflict: ' + newSlot + ' on ' + newDate + ' is already reserved.');
    }

    target.date = newDate;
    target.timeSlot = newSlot;
    target.rescheduledAt = new Date().toISOString();

    saveBookings(bookings);
    renderAppointments(currentTab);
    return target;
  }

  function confirmReschedule() {
    if (!rescheduleState.newDate || !rescheduleState.newSlot) {
      showRescheduleError('Please choose both a new date and a time slot.');
      return;
    }

    try {
      rescheduleAppointment(rescheduleState.bookingId, rescheduleState.newDate, rescheduleState.newSlot);
      closeRescheduleModal();
      console.log('[Reschedule] Successfully rescheduled appointment ' + rescheduleState.bookingId);
    } catch (err) {
      showRescheduleError(err.message);
    }
  }

  function closeRescheduleModal() {
    var modal = document.getElementById('reschedule-modal');
    if (modal) modal.classList.add('hidden');
  }

  // ==================================================================
  // 13. APPOINTMENT CANCELLATION ENGINE (SCRUM-8)
  // ==================================================================

  /** Open cancellation confirmation dialog (SCRUM-8) */
  function openCancelModal(bookingId) {
    var bookings = getBookings();
    var booking = bookings.find(function (b) { return b.id === bookingId; });
    if (!booking) return;

    cancelTargetId = bookingId;

    var modal = document.getElementById('cancel-confirm-modal');
    var details = document.getElementById('cancel-modal-details');

    if (details) {
      details.innerHTML =
        '<p><strong class="text-on-surface">' + booking.service + '</strong></p>' +
        '<p class="text-on-surface-variant">' + booking.date + ' \u2022 ' + booking.timeSlot + '</p>' +
        '<p class="text-[11px] text-outline font-mono mt-1">Ref: #' + booking.id + '</p>';
    }

    if (modal) modal.classList.remove('hidden');
  }

  function closeCancelModal() {
    var modal = document.getElementById('cancel-confirm-modal');
    if (modal) modal.classList.add('hidden');
    cancelTargetId = null;
  }

  /**
   * Programmatic cancellation API (SCRUM-8)
   */
  function cancelAppointment(bookingId) {
    var bookings = getBookings();
    var target = bookings.find(function (b) { return b.id === bookingId; });
    if (!target) return false;

    target.status = 'cancelled';
    target.cancelledAt = new Date().toISOString();

    saveBookings(bookings);
    renderAppointments(currentTab);
    console.log('[Booking] Cancelled appointment ' + bookingId);
    return true;
  }

  function confirmCancelAppointment() {
    if (cancelTargetId) {
      cancelAppointment(cancelTargetId);
      closeCancelModal();
    }
  }

  // ==================================================================
  // 14. APPOINTMENT DETAILS INSPECTION MODAL (SCRUM-6)
  // ==================================================================

  function showAppointmentDetails(bookingId) {
    var bookings = getBookings();
    var booking = bookings.find(function (b) { return b.id === bookingId; });
    if (!booking) return;

    var modal = document.getElementById('details-modal');
    if (!modal) return;

    var statusColor = booking.status === 'upcoming'
      ? 'text-primary'
      : booking.status === 'cancelled'
        ? 'text-error'
        : 'text-tertiary';

    var modalContent = modal.querySelector('.py-4.space-y-4');
    if (modalContent) {
      modalContent.innerHTML =
        '<div class="grid grid-cols-2 gap-3">' +
          '<div class="p-3 rounded-lg bg-surface-container-low">' +
            '<span class="text-on-surface-variant uppercase text-[10px] font-bold">Service</span>' +
            '<p class="font-bold text-sm text-on-surface mt-0.5">' + booking.service + '</p>' +
          '</div>' +
          '<div class="p-3 rounded-lg bg-surface-container-low">' +
            '<span class="text-on-surface-variant uppercase text-[10px] font-bold">Status</span>' +
            '<p class="font-bold text-sm ' + statusColor + ' mt-0.5" style="text-transform:capitalize">' + booking.status + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="grid grid-cols-2 gap-3">' +
          '<div class="p-3 rounded-lg bg-surface-container-low">' +
            '<span class="text-on-surface-variant uppercase text-[10px] font-bold">Date</span>' +
            '<p class="font-bold text-sm text-on-surface mt-0.5">' + booking.date + '</p>' +
          '</div>' +
          '<div class="p-3 rounded-lg bg-surface-container-low">' +
            '<span class="text-on-surface-variant uppercase text-[10px] font-bold">Time & Duration</span>' +
            '<p class="font-bold text-sm text-on-surface mt-0.5">' + booking.timeSlot + ' (' + booking.duration + ')</p>' +
          '</div>' +
        '</div>' +
        '<div class="grid grid-cols-2 gap-3">' +
          '<div class="p-3 rounded-lg bg-surface-container-low">' +
            '<span class="text-on-surface-variant uppercase text-[10px] font-bold">Practitioner</span>' +
            '<p class="font-bold text-sm text-on-surface mt-0.5">' + booking.practitioner + '</p>' +
          '</div>' +
          '<div class="p-3 rounded-lg bg-surface-container-low">' +
            '<span class="text-on-surface-variant uppercase text-[10px] font-bold">Location</span>' +
            '<p class="font-bold text-sm text-on-surface mt-0.5">' + booking.location + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="p-3 rounded-lg bg-surface-container-low">' +
          '<span class="text-on-surface-variant uppercase text-[10px] font-bold">Reference ID</span>' +
          '<p class="font-bold text-sm text-on-surface mt-0.5 font-mono">#' + booking.id + '</p>' +
        '</div>' +
        (booking.notes
          ? '<div class="p-3 rounded-lg bg-surface-container-low space-y-1">' +
              '<span class="text-on-surface-variant uppercase text-[10px] font-bold">Notes / Purpose</span>' +
              '<p class="text-on-surface text-xs leading-relaxed">' + booking.notes + '</p>' +
            '</div>'
          : '');
    }

    modal.classList.remove('hidden');
  }

  function toggleDetailsModal() {
    var modal = document.getElementById('details-modal');
    if (modal) modal.classList.toggle('hidden');
  }

  // ==================================================================
  // 15. EXPOSE GLOBAL INTERFACES
  // ==================================================================
  window.navigateTo = navigateTo;
  window.selectService = selectService;
  window.selectDate = selectDate;
  window.selectSlot = selectSlot;
  window.triggerBookingSubmission = triggerBookingSubmission;
  window.closeBookingModal = closeBookingModal;
  window.switchTab = switchTab;
  window.toggleDetailsModal = toggleDetailsModal;
  window.showAppointmentDetails = showAppointmentDetails;

  // Sprint 2 Management APIs (SCRUM-6 to SCRUM-10)
  window.openRescheduleModal = openRescheduleModal;
  window.closeRescheduleModal = closeRescheduleModal;
  window.selectRescheduleDate = selectRescheduleDate;
  window.selectRescheduleSlot = selectRescheduleSlot;
  window.confirmReschedule = confirmReschedule;
  window.rescheduleAppointment = rescheduleAppointment;

  window.openCancelModal = openCancelModal;
  window.closeCancelModal = closeCancelModal;
  window.confirmCancelAppointment = confirmCancelAppointment;
  window.cancelAppointment = cancelAppointment;

  window.isSlotAvailable = isSlotAvailable;
  window.getBookings = getBookings;
  window.saveBookings = saveBookings;
  window.renderAppointments = renderAppointments;

  // ==================================================================
  // 16. APPLICATION INITIALIZATION
  // ==================================================================
  document.addEventListener('DOMContentLoaded', function () {
    console.log('Appointment Scheduler: Application initialized (CSE706 Agile SCRUM-1 through SCRUM-10).');

    seedDefaults();

    var initService = document.getElementById('summary-service');
    var initLocation = document.getElementById('summary-location');
    var initPractitioner = document.getElementById('summary-practitioner');
    var initDateCallout = document.getElementById('selected-date-callout');
    var initSummaryDate = document.getElementById('summary-date');
    var initTime = document.getElementById('summary-time');

    if (initService) bookingState.serviceName = initService.textContent.trim();
    if (initLocation) bookingState.location = initLocation.textContent.trim();
    if (initPractitioner) bookingState.practitioner = initPractitioner.textContent.trim();
    if (initDateCallout) {
      bookingState.date = initDateCallout.textContent.trim();
      if (initSummaryDate) initSummaryDate.textContent = bookingState.date;
    }
    if (initTime) {
      var match = initTime.textContent.trim().match(/^(.+?)\s*\((.+?)\)$/);
      if (match) {
        bookingState.timeSlot = match[1].trim();
        bookingState.duration = match[2].trim();
      }
    }

    var initialHash = window.location.hash.replace('#', '');
    if (VALID_VIEWS.indexOf(initialHash) !== -1) {
      navigateTo(initialHash);
    } else {
      navigateTo(DEFAULT_VIEW);
    }

    window.addEventListener('hashchange', function () {
      var hash = window.location.hash.replace('#', '');
      if (VALID_VIEWS.indexOf(hash) !== -1) {
        navigateTo(hash);
      }
    });

    document.querySelectorAll('[data-navigate]').forEach(function (elem) {
      elem.addEventListener('click', function (e) {
        e.preventDefault();
        var target = elem.getAttribute('data-navigate');
        var service = elem.getAttribute('data-service');
        navigateTo(target, { service: service });
      });
    });

    var mobileBtn = document.getElementById('mobile-menu-btn');
    var mobileNav = document.getElementById('mobile-nav');
    if (mobileBtn && mobileNav) {
      mobileBtn.addEventListener('click', function () {
        mobileNav.classList.toggle('hidden');
      });
    }
  });
})();
