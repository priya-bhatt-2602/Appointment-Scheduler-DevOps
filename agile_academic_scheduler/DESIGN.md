---
name: Agile Academic Scheduler
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006243'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d57'
  on-tertiary-container: '#bdffdc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system is engineered for a student-centered Agile Scrum environment, bridging academic rigor with modern product utility. Its aesthetic balances purposeful minimalism with approachable modern corporate craft. The interface evokes feelings of order, clarity, punctuality, and calm efficiency, reducing the cognitive friction students and advisors face during sprint syncs, office hours, and agile team cadences.

Visual principles prioritize unpretentious realism:
- **Clarity over ornament:** Decoration is strictly functional. Visual boundaries and typography carry the hierarchy.
- **Academic pragmatism:** The experience feels like professional-grade software—reliable, responsive, and legible at speed under varying lighting conditions across campus labs and laptop screens.
- **Agile rhythm:** Layouts support quick status scanning, dense information management, and immediate actionable states (booking, status shifting, sprint tracking).

## Colors

The palette establishes an intentional light-mode visual hierarchy built around high-contrast legibility, calm base surfaces, and semantic feedback loops.

### Roles and Application
- **Canvas & Surfaces:**
  - Base canvas (`#FFFFFF`): Primary background for focus zones and clean reading.
  - Surface subtle (`#F8FAFC`): Application backdrop, sidebars, and sub-navigation panels.
  - Surface muted (`#F1F5F9`): Well-defined containers, data grid headers, and table track lines.
- **Text & Content Hierarchy:**
  - Primary text (`#0F172A`): Core titles, dynamic values, table content, and interactive states.
  - Secondary text (`#1E293B`): Form labels, body paragraphs, and secondary headers.
  - Muted text (`#64748B`): Timestamps, helper text, breadcrumbs, and inactive metadata.
- **Primary & Interactive Accents:**
  - Interactive primary (`#2563EB`): Active buttons, highlighted booking windows, and selected filter segments.
  - Interactive hover (`#1D4ED8`): Focused interactions and active hover states.
  - Interactive soft (`#EFF6FF`): Hover backgrounds on active list items and subtle pill foundations.
- **Structural Lines:**
  - Border subtle (`#E2E8F0`): Primary card borders, inputs, and tab dividers.
  - Border focus (`#CBD5E1`): Card separation lines and hover states on secondary controls.
- **Agile & Status Semantics:**
  - Scheduled / Upcoming: `#2563EB` text on `#EFF6FF` background.
  - Confirmed / In-Sprint: `#059669` text on `#ECFDF5` background.
  - Completed: `#475569` text on `#F1F5F9` background.
  - Cancelled / Blocked: `#E11D48` text on `#FFF1F2` background.
  - Rescheduled / Review: `#D97706` text on `#FFFBEB` background.

## Typography

The typography uses Inter across headlines, body copy, and UI metadata to establish systematic legibility and consistent vertical metrics.

- **Numerics & Scannability:** Ensure `font-feature-settings: 'tnum' on, 'cv05' on` is applied for appointment times, calendar days, student IDs, and sprint estimations to avoid layout jitter during data updates.
- **Hierarchy:** High-order headers deploy tight tracking (`-0.02em` to `-0.025em`) to project intentional structure without requiring heavy decorative weights. Body copy remains at zero tracking for uninterrupted readability.
- **Form & Metadata Labels:** Field labels utilize `label-md` with medium weights, keeping instructions distinct from user input text.

## Layout & Spacing

The layout is built on a responsive 12-column fluid grid paired with an absolute 4px/8px incremental spacing rhythm.

### Grid Breakpoints & Behavior
- **Mobile (< 768px):** 4 fluid columns, `1rem` outer canvas margin, `1rem` column gutter. Single-column card stacking. Bottom-anchored actions for booking confirmation sheets.
- **Tablet (768px - 1023px):** 8 fluid columns, `1.5rem` canvas margin, `1rem` gutter. Dual-column layouts for split calendar and appointment slot selection.
- **Desktop (>= 1024px):** 12 fluid columns constrained to a max-width of `1280px`, centered with `2rem` outer margins and `1.5rem` gutters. Layout supports a fixed 260px Agile navigation rail, a flexible schedule canvas, and contextual inspection panels.

### Spacing Application
- Components deploy `space-sm` (8px) for internal micro-gaps (badge icons, button labels).
- Form rows, filter pills, and meta groups standardize on `space-md` (16px).
- Card interiors and major structural sections separate via `space-lg` (24px) and `space-xl` (32px).

## Elevation & Depth

Visual hierarchy uses flat structural boundaries combined with ambient micro-shadows, ensuring screens avoid heavy visual weight or muddy contrasts.

- **Base Layer (Flat):** Structural panels and page backgrounds rely purely on color transitions (`#FFFFFF` resting over `#F8FAFC`).
- **Cards & Data Modules:** Crisp border definition using `1px solid #E2E8F0` layered with a micro shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`. This creates a tactile edge without lifting the surface significantly off the plane.
- **Interactive Dropdowns & Menus:** Layered popovers, time-slot selection flyouts, and autocomplete menus introduce ambient depth: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Modals & Booking Sheets:** Central appointment confirmation dialogs use an intentional, low-contrast diffuse overlay (`rgba(15, 23, 42, 0.4)`) paired with high elevation: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)`.
- **State Changes:** Hovering over interactive appointment cards does not shift the component vertically; instead, the border transitions from `#E2E8F0` to `#CBD5E1` while the micro-shadow slightly expands to `0 4px 6px -1px rgba(15, 23, 42, 0.07)`.

## Shapes

The design system embraces a refined geometric shape language with `roundedness: 2` (base radius of `0.5rem` / 8px).

- **Micro Controls (Inputs, Buttons, Badges):** Standardized on `0.5rem` (8px). This creates crisp alignment between adjacent form controls and time chips.
- **Cards & Data Modules:** Standardized on `rounded-xl` (`0.75rem` / 12px) to softly distinguish grouped information and agile tickets from the primary background plane.
- **Status Pills:** Retain full pill geometry (`9999px`) to immediately distinguish analytical status metadata from interactive clickable buttons.
- **Dividers & Focus Rings:** Divider elements use flat 1px lines without radiused ends. Focus rings feature an offset of `2px` with a matching outer curve radius.

## Components

### Buttons
- **Primary:** Background `#2563EB`, text `#FFFFFF`, border `transparent`, `rounded-md` (8px), padding `8px 16px`. Active/Hover: `#1D4ED8`. Focus: `2px` offset ring in `#2563EB`.
- **Secondary:** Background `#FFFFFF`, text `#0F172A`, border `1px solid #E2E8F0`. Hover: `#F8FAFC` background with border `#CBD5E1`.
- **Outline / Ghost:** Background `transparent`, text `#64748B`. Hover: `#F1F5F9` background, text `#0F172A`.
- **Danger (Cancel / Reschedule alert):** Background `#FFFFFF`, text `#E11D48`, border `1px solid #FECDD3`. Hover: `#FFF1F2`.

### Status Badges & Pills
- Inline metadata labels with `rounded-full`, padding `2px 10px`, typography `label-sm`.
- **Upcoming / Queued:** Background `#EFF6FF`, border `1px solid #DBEAFE`, text `#1D4ED8`.
- **Completed / Closed:** Background `#F1F5F9`, border `1px solid #E2E8F0`, text `#475569`.
- **Active / Confirmed:** Background `#ECFDF5`, border `1px solid #A7F3D0`, text `#047857`.
- **Cancelled / Absent:** Background `#FFF1F2`, border `1px solid #FECDD3`, text `#BE123C`.

### Cards & Scrum Containers
- Encapsulated containers built with `#FFFFFF` fill, `1px solid #E2E8F0` border, `rounded-xl` (12px) corners, and internal padding of `20px`.
- Card headers provide clear visual grounding with top titles in `headline-sm`, subtitle in `body-sm` (`#64748B`), and top-right pinned status pills.

### Input Fields & Selectors
- Standard height `40px`, background `#FFFFFF`, border `1px solid #E2E8F0`, radius `8px`, typography `body-md`.
- Label placed statically above field in `label-md` (`#1E293B`) with a mandatory/optional indicator.
- Hover state transitions border to `#CBD5E1`.
- Focus state applies border `#2563EB` and a box-shadow ring `0 0 0 3px rgba(37, 99, 235, 0.15)`.
- Helper and validation error copy renders strictly via `body-sm` at `4px` below the control.

### Checkboxes & Radio Controls
- Base dimension `16px x 16px`.
- Unchecked: `#FFFFFF` fill, border `1.5px solid #CBD5E1`, radius `4px` (checkbox) or `50%` (radio).
- Checked: `#2563EB` fill, checkmark/center pip `#FFFFFF`. Focus ring adds `2px` offset.

### Lists & Appointment Rows
- Distinct, uncrowded list rows bounded by top-and-bottom border `#F1F5F9` or nested in separated card panels.
- Content structured into 3 distinct zones: Leading (avatar/calendar date block), Center (student/advisor identity and meeting topic), and Trailing (status pill and secondary disclosure menu).
- Interactive table and list rows shift to `#F8FAFC` upon cursor hover.

### Time Slot Grid Pickers
- Modular matrix of selectable buttons: `#FFFFFF` surface, border `1px solid #E2E8F0`, `label-md` font weight.
- Selected state: `#EFF6FF` background, `2px solid #2563EB` border, text `#1D4ED8`.
- Disabled state: `#F8FAFC` background, text `#94A3B8`, slash line or low opacity.
<!-- Sprint 1 Verified - 27 Oct 2026 -->
