# Practice Ready

**Practice Ready** is an HCI/UI-UX prototype for improving Music Practice Room (MPR) booking and equipment readiness at the True School of Music.

The project addresses a practical problem faced by students: before arriving for practice, they may not have a reliable way to know whether an MPR is available, what equipment is assigned to it, where that equipment is currently located, or whether it is in working condition.

Practice Ready brings this information together so students can make a more informed room booking before beginning a practice session.

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

The current prototype supports the complete room-booking journey as well as supporting interactions for checking room setups, equipment locations, equipment working conditions, and equipment reference information.

It also includes alternative and error states, such as equipment-availability issues and a simulated simultaneous-booking conflict, to demonstrate how users can understand and recover from problems during the booking process.

The interface is designed to work across desktop and mobile layouts.

## Technology

- TypeScript
- React
- Vinext
- Vite
- Tailwind CSS
- Cloudflare tooling

## Local Setup

Install dependencies:

    pnpm install

Build the project:

    pnpm build

## Project Status

Practice Ready is currently a functional interactive prototype developed for HCI/UI-UX evaluation and usability testing.

Equipment, room availability, scheduling information, and equipment status used in the prototype are illustrative prototype data and should not be treated as an authoritative live inventory or booking system for the True School of Music.
