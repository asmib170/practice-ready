# Practice Ready

**Practice Ready** is an HCI/UI-UX prototype for improving Music Practice Room (MPR) booking and equipment readiness at the True School of Music.

The project addresses a practical problem faced by students: before arriving for practice, they may not have a reliable way to know whether an MPR is available, what equipment is assigned to it, where that equipment is currently located, or whether it is in working condition.

Practice Ready brings this information together so students can make a more informed room-booking decision before beginning a practice session.

## Live Links

- **Current Interactive Prototype:** https://practice-ready.asmi-battoo.workers.dev
- **HCI/UI-UX Case Study:** https://asmib170.github.io/practice-ready/

## Original MVP Scope

The original HCI/UI-UX MVP prioritised four Must-Have features:

1. **View MPR availability and daily time slots**
2. **Reserve an MPR time slot**
3. **View MPR setups and TSM equipment locations**, including default and current locations
4. **View equipment working condition**

Later development expanded the prototype with student reservation management, equipment movements and returns, reports, FTS administration, student access reviews, joint practice and a room-availability calendar. These additions do not change the original MVP prioritisation.

## Design Process

The project was developed through an iterative HCI/UI-UX process involving:

- User interviews
- Information architecture
- Open hierarchical card sorting
- Tree testing and IA refinement
- Feature prioritization
- Skeletal wireframing
- Nielsen heuristic inspection
- Interactive prototyping
- Informal usability testing and iterative refinement

The interface was refined around principles including visibility of system status, error prevention, consistency and standards, recognition rather than recall, clear affordances, and user control and freedom.

## Student Flow

The current responsive prototype supports the complete room-booking journey across desktop and mobile.

Users can:

- Inspect room availability before starting a booking, then select a date, room and consecutive 30-minute slots. Room selection opens **Choose Your Time Slots** directly; there is no separate time-period selection page.
- Book for up to **three hours**, including a continuous reservation across midnight, within the current student booking window described below.
- Use period tabs as secondary navigation on the time-slot page. Switching periods preserves selected slots so a continuous reservation can cross period boundaries, within the three-hour maximum.
- Change the selected room from the time-slot page without losing the current selection when the same room is retained.
- Preserve the selected slot range when returning to the same room, while clearing room-specific slot selections when a different room is chosen. Existing selections determine the opening period when revisiting time slots.
- Review an MPR's equipment readiness before continuing with a reservation.
- View currently available equipment assigned to an MPR and search that list by equipment name or ID.
- Search the Equipment Directory by equipment name, type, ID or common descriptive terms.
- Browse equipment by TSM location.
- Compare Available and Unavailable equipment states.
- View default location, current location and working condition where relevant.
- Search for alternatives when assigned equipment is unavailable.
- Recover from equipment-availability issues through contextual alternative searches or explicitly continue without an affected item.
- Manage Upcoming, Active and History reservations, including rescheduling, cancellation and ending an active session early.
- Open the equipment directory from an upcoming or active reservation to record a linked equipment movement. Before the 30-minute eligibility window, Record a move remains visible but locked. Contextual reservation and booking routes show lock feedback; the first eligible visit plays an unlock animation once for that context in the browser session. Direct Equipment Directory visits do not play these lock animations.
- Review current and historical movements, record returns and distinguish Returned from Returned late.
- Submit room or equipment reports and review their updates.
- Invite registered students to joint practice from reservation details. The organiser must attend; booking a room for an absent friend is not permitted.
- Accept or decline session invitations and view accepted joint sessions alongside personal reservations.
- Add practice-journal notes and optional photos to completed sessions.
- Experience a simulated simultaneous-booking conflict through the dedicated **Booking Conflict Demo** and recover by adjusting the selected time or choosing another MPR.

Equipment search supports meaningful partial terms, word prefixes, common aliases and equipment-specific combinations across the Equipment Directory, MPR equipment lists, location browsing and contextual alternative searches. Results prioritize the actual requested equipment type before related accessories or label matches, preserve the established location order, avoid unintended substring matches and automatically open the Unavailable tab when no available matches exist but unavailable matches do.

For broad equipment queries, results are also contextually ranked. For example, a search for **guitar** prioritizes acoustic, electric and bass guitars before related amplifiers, instrument cables, individual stands and floor racks.

The prototype also includes an expanded illustrative equipment inventory across practice rooms and performance spaces, including wired and wireless microphones, PA speakers, guitar stands and racks, amplifiers, cables and other rehearsal equipment.

## Booking Dates and Overnight Sessions

- Each availability-calendar date shows its actual **12:00 AM–midnight** timeline in 30-minute slots. The final slot is 11:30 PM–12:00 AM.
- Students can start a reservation **within the next hour**, including the unfinished part of the current available half-hour. A start exactly one hour ahead is eligible. This rolling window replaces the earlier daily 6:00 AM release rule and applies throughout the day and night.
- The **three-hour maximum** remains unchanged. Later consecutive slots can extend an eligible start beyond the one-hour start window, subject to availability and the duration limit. The calendar marks eligible continuation slots **Available to extend**; these cannot be selected as a new booking’s start time.
- Future free slots outside the start window show **Opens at [time]**; they cannot start a booking yet. Actual bookings retain their booked state. The earlier separate time-period page and its **Not open** period cards have been removed.
- The calendar keeps each date separate. Tomorrow can be inspected without making all of its slots bookable. The booking selector includes a separately dated next-day late-night section for continuous overnight selection.
- A booking can cross midnight, for example 11:00 PM today–2:00 AM tomorrow, when its start is eligible and all selected slots are available.
- Overnight summaries identify the end date below the time range. Matching AM/PM markers appear once; ranges crossing AM/PM retain both markers.
- Elapsed slots cannot be booked. An ongoing available half-hour slot starts at the current time when confirmed and ends at the selected boundary.
- Confirmation rechecks start eligibility, consecutive slots, the duration limit and overlapping local reservations using actual timestamps.
- FTS rescheduling can select starts beyond the student one-hour window, within its existing window through **6:00 AM tomorrow**. It retains the **three-hour maximum**, and booked times are disabled in its selectors.

## Time-Slot Page Opening and Navigation

After confirming a room, students go directly to its time-slot page on phone and laptop. For a new selection, the page opens the period containing the ongoing or first eligible half-hour and automatically brings that row beneath the sticky header. It does **not** select a slot automatically. Earlier slots remain accessible by scrolling back.

When revisiting an existing selection, its first slot determines the initial period and scroll target. Period tabs remain available for browsing and extending a consecutive range; switching tabs does not clear the selection. Back returns through the booking route without an intermediate time-period page. The room-change action returns to time slots after a room is confirmed.

TypeScript and targeted source checks passed for this change. Physical-iPhone verification of the new automatic scroll positioning remains outstanding.

## Room Availability Calendar

The day calendar covers **MPR 2, MPR 3, MPR 4, MPR 5, MP Lab 2, Live Room and Studio**. Desktop compares all seven rooms; mobile shows one selected room at a time. The current version has a day view only.

Students can select an eligible available half-hour slot to continue into the existing booking and setup flow. FTS can switch between List and Calendar in Reservations and open booking details from a calendar block. FTS search highlights matching bookings while retaining the other bookings for context.

The date button displays the selected date with a calendar icon and opens an app-styled picker. Students can browse dates from **16 September 2026** through tomorrow; later dates are disabled. FTS can browse from the same launch date into future dates. Browsing a date does not make its slots bookable.

The legend uses outlined circular swatches and written labels for Available, Booked and Your booking, with hatching for elapsed slots. In the student view, free slots eligible only as a continuation show **Available to extend**. Other free slots whose starts are not yet eligible use muted text, show their opening time and have no booking hover action. FTS retains its purple availability styling. The Now line remains at the actual current time, with label backgrounds keeping text readable where the line crosses a booking or availability label.

Both student and FTS calendars have a compact fullscreen control. Fullscreen fills the viewport with the timetable, retaining room headings, the mobile room selector and an exit control. Page headings, date/search controls, the legend and global sound/theme/account controls are hidden in this view. Exiting restores the normal calendar layout and timetable scroll position; Escape also exits fullscreen.

The timetable opens near the current time on today’s date and at the early hours on tomorrow’s date. A Now marker identifies the current time, and booking labels remain visible while their blocks scroll. In the normal student and FTS calendar layouts, the timetable uses the remaining viewport height, with vertical scrolling inside the timetable rather than an extra blank area below the page.

FTS uses a compact heading/view toggle and guidance that reflects the selected room. Student Back and Home share a row on mobile. Both views have compact date controls.

## FTS Flow

The Facilities and Technical Support interface includes:

- Overview, Reservations, Equipment, Equipment moves, Reports & Support, and Students.
- Reservation details, rescheduling, cancellation and ending an active session with a reason.
- Equipment creation, editing and archiving, with default/current locations and working-condition updates.
- Recording equipment movements for a student’s linked reservation or another purpose, and recording returns.
- Separate attribution for the original mover and the FTS member who recorded a return.
- Report updates and history. Resolved reports are read-only; in-progress reports allow a further update through an explicit action.
- Action-led recent updates with relevant record details, the FTS member, and a timestamp. Identifiers remain available in detail views. Opening a linked record and closing its details returns to Overview at the same scroll position.
- Updated mobile form text sizing to avoid input-focus zoom on supported iPhone browsers; physical-device verification remains necessary.
- Responsive navigation: a sidebar on desktop and a section selector in the page heading on mobile.
- Shared Back navigation restores the previous section, relevant filters and scroll position, including routes opened from Overview.
- Student cards with contact details, separate misconduct counts, links to that student’s reservations and equipment movements, incident history and account actions.
- Responsive report lists: two equal-height cards per row on laptop, with footer actions aligned; one card per row on mobile. Equipment-specific history tabs count the filtered movements rather than all equipment movements.

Equipment movement cards emphasise return deadlines, use the correct overdue/late-return status, and keep status beside the equipment name. Student equipment moves retain their separate three-hour return limit. Ending or cancelling a reservation does not automatically record a physical equipment return.

## Student Access and Misconduct Reviews

FTS can review two categories independently: **no-shows** and **unreported equipment damage**. Each category has its own confirmed-incident count.

- A review records the reservation/incident reference, what happened, the student’s explanation and FTS reasoning. When no response has been received, FTS records its contact attempt and the absence of a response.
- FTS must explicitly confirm an incident or accept the student’s explanation. An accepted explanation does not add a warning.
- The first two confirmed incidents in a category receive warnings. The third and later confirmed incidents require a restriction period with start and end times set by FTS. Promptly reported accidental damage is distinct from failing to report damage.
- During an active restriction, the prototype blocks new reservations and equipment moves. Students can still report problems and return outstanding equipment. Restrictions expire at their end time; FTS can also lift one with a reason.
- Misconduct reviews open in a scrollable modal with a fixed header and action footer. The form displays the decision’s consequence before saving and requests confirmation before discarding an unsaved review.
- Student cards show two per row on laptop and one per row on mobile. Mobile actions use the shorter **Reservations** and **Equipment moves** labels; incident history expands within the card. Delete account remains in the three-dot menu.
- Account deletion removes sign-in access while retaining reservation, movement and incident records. Active/upcoming owned reservations and outstanding equipment movements must be resolved first. No account-restoration control is provided.
- Opening reservations from a student card displays the student’s name in search while retaining an exact email-based identity filter, so matching names do not mix records.

These controls operate on local demo records. They require authenticated, server-enforced permissions and shared storage before use as real disciplinary or account-management controls.

## Joint Practice

A reservation remains under its organiser’s name, and the organiser must attend. Other registered students can join through invitations rather than booking through an absent friend’s account.

- The organiser can invite or remove participants; invitees can accept or decline, and accepted participants can leave a live session.
- Invitation acceptance checks account restrictions and overlapping personal or accepted joint sessions. Reservation changes remain under the organiser’s control.
- **Joint practice** is a collapsed disclosure in reservation details, with participant/invitation counts where relevant. Expanding it reveals the organiser, participants and permitted actions. The invitation field and button share a row on laptop and stack on mobile.
- Completed and cancelled sessions retain read-only participant information without live invitation actions or attendance reminders. Unanswered invitations are identified as not accepted before the session ended or was cancelled. Acceptance records an invitation response, not proof of attendance.
- Invitations appear for the invited account in the same local browser environment; email delivery and cross-device invitation syncing are not implemented.

## Signup and Booking & Equipment Guidelines

- Student signup accepts only an email ending in **@vijaybhoomi.edu.in**. Other domains cannot proceed. This is format/domain validation, not proof of university email ownership; verification email delivery is not implemented.
- Signup has three steps: personal details, password, then **Booking & equipment guidelines**. Account creation requires the agreement checkbox and the **Agree & create account** action.
- The guidelines cover booking and reservation changes, equipment movements and return deadlines, equipment care, reporting problems, what FTS can see and do, and the demo’s privacy/storage limits. They also explain organiser attendance, joint practice, separate misconduct warnings, FTS-set restriction periods and account deletion.
- Agreement metadata records the guidelines version, acceptance timestamp and email in the local profile. Existing accounts are not forced through signup again.
- The same guidelines remain accessible in **Reports & Support**, using an open-book/check icon. Reopening them does not require another agreement.
- The signup reading page omits the hero strip, retains the authentication wave background and places Back and the step indicator on one row. Mobile uses a shorter introduction and tighter bullet spacing in both signup and Reports & Support; desktop retains its reading layout.
- FTS can access student contact details, reservations, movement/return records and submitted reports, including relevant descriptions and photos. Its interface does not show passwords or personal practice-journal notes/photos. This describes the prototype interface, not server-enforced access controls.

## Local Records and Sample Data

Reservations, joint-practice invitations, registered student profiles, misconduct reviews, restrictions, equipment movements, report updates, FTS activity and practice journals currently use **local browser storage**. Student and FTS flows can read the same records in that local environment. They do **not** share live records across different devices or browser profiles.

The normal student calendar and booking selector no longer add automatic illustrative bookings. Their occupied times come from saved local reservations; the explicit Booking Conflict Demo remains separate.

Sample modes use illustrative, view-only records. FTS calendar samples include bookings across all seven rooms, and mobile guidance reflects the selected room rather than bookings elsewhere. These samples are not saved as real reservations.

A one-time migration cleans up completed/cancelled reservation history and returned movement history from the older date model, while retaining active/upcoming reservations and outstanding movements. The interface improvements continue to apply to future records.

Sample sign-in, profiles and role screens demonstrate the intended experience. They are not production authentication or server-enforced permissions. A shared backend, authenticated student/FTS roles and an atomic booking check are still required for a multi-user deployment. Publishing the prototype does not add these capabilities.

## Audio Experience

Practice Ready includes a subtle music-focused audio layer designed to support the atmosphere of the prototype without interfering with task completion.

- Smooth-jazz background music plays on the Home screen at the main listening level.
- The same track continues at a lower volume on internal task-focused screens.
- On desktop/laptop, the Home music level is approximately **23%** and internal pages are approximately **15%**.
- On mobile, the Home music level is approximately **23%** and internal pages are approximately **13%**.
- Successful-booking and conflict/error final screens remain at the same lower internal-page music level rather than increasing back to the Home level.
- A short three-note success chime provides additional confirmation feedback when a booking is completed.
- A soft descending two-note conflict tone plays once when the booking-conflict/error state appears, giving clear negative-state feedback without using a harsh buzzer or alarm sound.
- Enabled buttons throughout the interface use a very subtle rounded interaction tone rather than a conventional click sound.
- **Record a move** lock animations have quiet, synchronised audio: a muted click during the locking feedback and a slightly brighter click as the shackle unlocks. One sound plays for the contextual page-entry animation, rather than one per equipment card.
- Lock sounds follow the existing animation rules: direct Equipment Directory visits do not trigger them, and unlocking feedback plays only on the first eligible visit for that context in the browser session. Leaving the context cancels a pending sound.
- These short lock clips use the existing preloaded HTMLAudio playback approach on mobile and desktop. Like the other interface feedback, they remain available when background music is muted.
- The animated time-period intro on the **Choose Your Time Slots** screen uses a quiet ascending bar-chime sequence synchronized with the existing cascading tab animation.
- The bar-chime sequence plays only during that intro animation. Manually switching between time periods continues to use the standard subtle button-interaction tone instead.
- The music control mutes and unmutes the **background jazz only**. Interface feedback sounds—including the rounded button tone, booking-success chime, booking-conflict/error tone and animated time-period bar chimes—remain available when the background music is muted.
- In the student mobile flow, the music control is shown on the Home screen. FTS exposes its controls in the header.
- On desktop/laptop, the music control remains accessible throughout the interface.
- Web Audio gain control is used for reliable background-music volume changes, while the short UI feedback sounds are preloaded audio assets for more consistent playback across supported mobile and desktop browsers, including iPhone.

The audio layer is supplementary and does not affect the booking workflow if background music is muted or unavailable.

## Interface

The interface includes:

- Responsive desktop and mobile layouts
- Light and dark themes
- Animated ambient backgrounds
- Written equipment-status labels
- Consistent selected and disabled states
- Mobile-safe sticky actions
- Home reservation details that close back to Home
- Sample student and FTS sign-in shortcuts without displayed passwords
- Contextual booking-state preservation
- Equipment image/detail views
- Shared semantic search behavior across equipment-related flows
- Background music and subtle audio interaction feedback

## Technology

- TypeScript
- React
- Vinext
- Vite
- Tailwind CSS
- Web Audio API
- Cloudflare tooling

## Local Setup

Install dependencies:

```bash
pnpm install
```

Build the project:

```bash
pnpm build
```

Start the production build locally:

```bash
npx vinext start
```

If the server reports `http://0.0.0.0:3000`, open:

```text
http://localhost:3000
```

For this project, the production-preview workflow above is the recommended way to preview the actual app locally.

## Redeploying the Existing Cloudflare Worker

The existing Worker is **`practice-ready`**, serving:

https://practice-ready.asmi-battoo.workers.dev/

Apply the latest source updates to this project before building. Keep its existing package, lockfile and Cloudflare configuration. Run these commands from the project root containing `package.json`.

1. Build the updated source and stop if the build fails:

   ```bash
   pnpm run build
   ```

2. Review and commit the source changes, including this README, then push to the existing Git remote:

   ```bash
   git status
   git diff
   git add app components lib README.md UPDATE-INSTRUCTIONS.txt
   git commit -m "Update Practice Ready student and FTS flows"
   git push origin main
   ```

   Stage any other intended source changes separately. Leave `node_modules`, generated `dist` output, local runtime data and credentials out of the commit. If the working tree is already clean, skip the commit. If a Git push already triggers a Cloudflare production deployment, use that configured workflow rather than deploying the same change twice.

3. For manual Wrangler deployment, publish the freshly built output to the existing Worker:

   ```bash
   pnpm exec wrangler deploy --config dist/server/wrangler.json --name practice-ready
   ```

   The explicit Worker name is important: the generated configuration may contain the starter name `site-creator-vinext-starter`. Authenticate with the Cloudflare account that owns the existing Worker if Wrangler requests sign-in. The existing `workers.dev` URL stays the same when the deployment targets this Worker in that account.

4. Confirm the terminal reports a successful deployment, then open the live URL and check the updated student and FTS flows. A failed build or deploy is not a successful publication.

`dist/server/wrangler.json` is generated by the build. The `.wrangler/deploy/config.json` file is only a pointer to that generated configuration. Rebuild after source changes instead of deploying stale output.

## Project Status

Practice Ready is a functional interactive prototype developed for HCI/UI-UX evaluation and formal usability testing.

The current version includes the booking and equipment-readiness paths, a rolling one-hour student start window, a three-hour reservation limit with overnight selection, university-email domain validation, signup agreement and shared booking/equipment guidelines, student session management, equipment movement/return records, reports, a practice journal, FTS student access reviews and restrictions, account deletion, joint-practice invitations, and the seven-room day calendar with date limits and a calendar-only fullscreen view. It supports desktop/mobile layouts, direct room-to-slot navigation with automatic initial slot positioning, light/dark themes, semantic equipment search, audio feedback and a deterministic Booking Conflict Demo.

Development checks have covered TypeScript syntax and types, production building, booking-window boundaries, midnight/year rollover, reservation overlap and sample records. Screenshot reviews informed the layout refinements. The latest student-card, misconduct-review, joint-practice and calendar-guidance refinements received source/archive checks; a fresh full-project build and physical-device verification are still required for those updates. These checks do not replace a full end-to-end usability study of the expanded app or prove production readiness.

The earlier research included three user interviews, a ten-participant card sort, a two-person V1 tree-test pilot and five V2 participants completing seven tasks each. The reported 35 direct successes belong to the V2 information-architecture test, not to the later expanded app.

Equipment, room availability, scheduling information, equipment IDs, quantities, locations and condition states used in the prototype are illustrative prototype data and should not be treated as an authoritative live inventory or booking system for the True School of Music.


Last documented update: **21 October 2026**.
