"use client";

export const GUIDELINES_VERSION = "2026-10-21";
export const GUIDELINES_TITLE = "Booking & equipment guidelines";
export const GUIDELINES_AGREEMENT = "I have read and agree to follow the booking and equipment guidelines.";

const sections = [
  {title:"Booking a room",items:[
    "Sign up with your university email (@vijaybhoomi.edu.in). Email verification is not enabled in this demo.",
    "Choose an available start within the next hour, or the remaining time in the current half-hour.",
    "Book a maximum of 3 hours in consecutive half-hour slots. The one-hour rule applies to your start, not your end, including across midnight and 6 AM.",
    "Slots show when a new start becomes bookable. Later free times may be available to extend an eligible start. Booked slots are unavailable; availability is checked again at confirmation.",
    "Book only for a session you will attend. You may not reserve a room solely for a friend. For joint practice, invite registered students to your session; they must accept using their own accounts. The organiser remains responsible and must attend."
  ]},
  {title:"Managing your reservation",items:[
    "Check the room, date and time before confirming. Find upcoming, active and past sessions in My Reservations.",
    "Cancel or reschedule upcoming sessions if plans change. Your original booking stays reserved until a reschedule is confirmed. The replacement must meet the booking rules.",
    "You can end an active session early. Ending or cancelling a session does not record equipment returns."
  ]},
  {title:"Attendance and misconduct reviews",items:[
    "Attend your booking or cancel it if you cannot come. ATS reviews a reported no-show and the student’s explanation before deciding whether it counts.",
    "Report equipment damage or breakage promptly to ATS. Promptly reported accidental damage does not count as unreported damage. ATS reviews the facts and the student’s explanation before confirming an unreported-damage incident.",
    "No-shows and unreported equipment damage have separate warning counts. In each category, the first two confirmed, unjustified incidents receive warnings. A third confirmed incident in that category triggers a temporary restriction from all TSM facilities, with the start and end set by ATS. Other categories do not add to that count.",
    "ATS records the reference, student explanation, decision, reviewer and restriction dates. You can view your warnings and restriction period and contact ATS in Reports & Support to discuss a decision. Restrictions expire automatically; ATS can lift one early with a recorded reason. Historical warnings remain recorded.",
    "A restricted student cannot make or reschedule bookings, accept joint-practice invitations or record new equipment moves. Signing in, reading decisions, contacting ATS, cancelling a booking and recording equipment returns remain available. Existing bookings are not silently cancelled; ATS must review them and communicate any changes."
  ]},
  {title:"Joint practice sessions",items:[
    "The organiser books under their own account and invites other registered students. An invitation must be accepted before the student is a participant. Invited students may decline; accepted participants may leave without cancelling the organiser’s reservation.",
    "Only the organiser can reschedule, cancel or end the session. Review the date and time after an organiser or ATS change. Participation does not create a second room booking or allow bookings on behalf of an absent organiser."
  ]},
  {title:"Equipment locations and moves",items:[
    "Check current location and working condition before practice. Reference photos may differ from the actual equipment.",
    "Record a move only after physically moving the equipment. Check the item, destination, purpose and return time.",
    "Linked-session moves open 30 minutes before your session and remain available during it. Return equipment by the session end or the form’s 3-hour limit, whichever is earlier.",
    "For other moves, follow the form’s deadline. Return equipment to its default location by the recorded deadline, then record its return. Late returns stay marked in history and await ATS review. The first two confirmed late returns receive warnings; the third and later require an ATS-set restriction on new equipment moves. Returns and room bookings remain available. Late-return counts are separate from no-shows and damage.",
    "After an ATS reschedule, review linked moves, destinations and return times. A reservation change does not physically move equipment."
  ]},
  {title:"Handle equipment with care",items:[
    "Handle equipment gently and keep food, drinks and other liquids away. Keep cables tidy and walkways clear.",
    "Do not force plugs, pull cables by their wires or change unfamiliar settings. Ask ATS for help with heavy equipment, power connections or unfamiliar setups.",
    "Leave the room and equipment clean and ready for the next person. Return accessories with the correct equipment."
  ]},
  {title:"Report a problem",items:[
    "Stop using equipment that appears unsafe. Contact ATS for assistance rather than attempting repairs.",
    "Report missing, damaged or faulty equipment and room problems in Reports & Support. Give the location, item and a clear description; add a relevant photo if helpful.",
    "ATS verifies issues before changing equipment availability or condition. Check My reports for updates."
  ]},
  {title:"What ATS can see",items:[
    "ATS can see your name, university email and phone number for contact about facilities, reservations and reports.",
    "ATS can see reservation history, equipment moves and returns, and submitted reports or saved messages, including descriptions and photos. Include only relevant information in reports and photos."
  ]},
  {title:"What ATS can do",items:[
    "ATS can view schedules, reschedule or cancel reservations, and end active sessions. ATS rescheduling has a 3-hour limit but can reschedule starts beyond the next hour.",
    "ATS can record moves and returns on your behalf and correct movement records with a reason. Records distinguish who moved equipment from who recorded its return.",
    "ATS can add or edit equipment details, locations, photos and working condition, and archive or restore equipment.",
    "ATS can respond to reports and mark them Open, In progress or Resolved. ATS actions are attributed in records or update history. Review changes affecting your session.",
    "ATS can review misconduct, issue warnings, set temporary facility restrictions and lift restrictions with a reason. It can delete student sign-in access after outstanding sessions and equipment moves are resolved. Reservations, movements and misconduct records are retained for accountability; deletion is separate from a temporary restriction."
  ]},
  {title:"Privacy and this demo",items:[
    "The ATS interface does not show your password or personal practice-journal notes and photos.",
    "This demo saves your account, agreement, reservations, reports and moves in this browser. Its student and ATS views use those local records. Joint-practice invitations work only between accounts registered in this browser; no invitation email is sent. Nothing syncs across devices or reaches the real team automatically. Browser-only restrictions do not enforce access to physical facilities; shared authentication and enforcement require the backend.",
    "To contact the real team, use Email or Call in Reports & Support. This demo does not send verification or password-reset emails."
  ]}
];

export default function BookingGuidelines(){
 return <article aria-label={GUIDELINES_TITLE} className="space-y-5 text-sm leading-6 text-slate-700 dark:text-slate-200">
  <p><span className="sm:hidden">Booking rules, equipment care and what ATS can see and do.</span><span className="hidden sm:inline">Read how booking works, how to care for shared equipment, and what Audio Technical Support (ATS) can see and manage.</span></p>
  {sections.map(section=><section key={section.title} className="rounded-2xl border border-violet-200 bg-white/80 p-4 dark:border-[#30384D] dark:bg-[#1B2133]"><h3 className="text-base font-semibold text-slate-900 dark:text-white">{section.title}</h3><ul className="mt-2 list-disc space-y-1.5 pl-5 sm:space-y-2">{section.items.map(item=><li key={item}>{item.split(/(start within the next hour|maximum of 3 hours|30 minutes before|by the recorded deadline|default location|can reschedule starts beyond the next hour)/gi).map((part,index)=>index%2?<strong key={index} className="font-semibold text-slate-900 dark:text-white">{part}</strong>:part)}</li>)}</ul></section>)}
  <p className="text-xs text-slate-500 dark:text-slate-400">Version {GUIDELINES_VERSION} · You can revisit these guidelines in Reports &amp; Support.</p>
 </article>;
}
