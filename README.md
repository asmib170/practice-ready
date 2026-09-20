# Practice Ready

**Practice Ready** is an HCI/UI-UX prototype for improving Music Practice Room (MPR) booking and equipment readiness at the True School of Music.

The project addresses a practical problem faced by students: before arriving for practice, they may not have a reliable way to know whether an MPR is available, what equipment is assigned to it, where that equipment is currently located, or whether it is in working condition.

Practice Ready brings this information together so students can make a more informed room-booking decision before beginning a practice session.

## Live Links

- **Current Interactive Prototype:** https://practice-ready.asmi-battoo.workers.dev
- **HCI/UI-UX Case Study:** https://asmib170.github.io/practice-ready/

## Must-Have Features

The prototype is built around four prioritized Must-Have features:

1. **View MPR availability and daily time slots**
2. **Reserve an MPR time slot**
3. **View MPR setups and TSM equipment locations**, including default and current locations
4. **View equipment working condition**

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

## Prototype

The current responsive prototype supports the complete room-booking journey across desktop and mobile.

Users can:

- Select a date, MPR and consecutive 30-minute time slots, with a maximum booking duration of three hours.
- Review an MPR's equipment readiness before continuing with a reservation.
- View currently available equipment assigned to an MPR and search that list by equipment name or ID.
- Search the Equipment Directory by equipment name or ID.
- Browse equipment by TSM location.
- Compare Available and Unavailable equipment states.
- View default location, current location and working condition where relevant.
- Search for alternatives when assigned equipment is unavailable.
- Recover from equipment-availability issues without implying that equipment can be borrowed or relocated.
- Experience a simulated simultaneous-booking conflict through the dedicated **Booking Conflict Demo** and recover by adjusting the selected time or choosing another MPR.

Equipment search prioritizes the actual requested equipment before related label matches while preserving the established location order. Search results also avoid unintended substring matches and automatically open the Unavailable tab when no available matches exist but unavailable matches do.

The interface includes responsive light and dark themes, animated ambient backgrounds, written equipment-status labels, consistent interaction states and mobile-safe sticky actions.

## Technology

- TypeScript
- React
- Vinext
- Vite
- Tailwind CSS
- Cloudflare tooling

## Local Setup

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build the project:

```bash
pnpm build
```

Start the production build locally:

```bash
npx vinext start
```

If the server reports `http://0.0.0.0:3000`, open `http://localhost:3000` in the browser.

## Project Status

Practice Ready is a functional interactive prototype developed for HCI/UI-UX evaluation and formal usability testing.

The current version includes the complete booking happy path, equipment-readiness and alternative-search flows, equipment-directory search and location browsing, responsive desktop/mobile layouts, light and dark themes, and a deterministic Booking Conflict Demo.

Equipment, room availability, scheduling information, equipment IDs, quantities, locations and condition states used in the prototype are illustrative prototype data and should not be treated as an authoritative live inventory or booking system for the True School of Music.
