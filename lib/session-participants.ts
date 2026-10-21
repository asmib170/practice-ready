import {accessIssue,canManageSession,currentStudent,normalEmail,students,emitAccess} from "@/lib/student-access";
import {loadReservations,storeReservations,type Reservation} from "@/components/reservations";
export type Participant={email:string;name:string;status:"invited"|"accepted"|"declined"|"left";invitedAt:string;respondedAt?:string};
export function updateParticipant(id:string,email:string,action:"invite"|"accept"|"decline"|"leave"|"remove",now=Date.now()){
 const all=loadReservations(),r=all.find(r=>r.id===id),actor=currentStudent();email=normalEmail(email);
 if(!r||r.sample||r.cancelled||Date.parse(r.end)<=now)throw Error("This session is no longer available for participation.");
 const participants=r.participants||[],existing=participants.find(p=>p.email===email);
 if(action==="invite"||action==="remove"){
  if(!canManageSession(r,actor.email))throw Error("Only the session organiser can manage invitations.");
  if(action==="invite"){
   const issue=accessIssue(actor.email,now)||accessIssue(email,now);if(issue)throw Error(issue);
   const target=students().find(s=>s.email===email&&!s.deletedAt);if(!target)throw Error("Invite a student with an account registered in this browser.");
   if(email===normalEmail(r.ownerEmail||actor.email))throw Error("The organiser is already part of this session.");
   if(existing&&(existing.status==="invited"||existing.status==="accepted"))throw Error("This student is already invited or participating.");
  }
 }else{
  if(email!==normalEmail(actor.email)||!existing)throw Error("You can respond only to your own invitation.");
  if((action==="accept"||action==="decline")&&existing.status!=="invited")throw Error("This invitation was already answered.");
  if(action==="leave"&&existing.status!=="accepted")throw Error("You are no longer a participant.");
  if(action==="accept"){
   const issue=accessIssue(email,now);if(issue)throw Error(issue);
   if(all.some(other=>other.id!==r.id&&!other.cancelled&&Date.parse(other.start)<Date.parse(r.end)&&Date.parse(other.end)>Date.parse(r.start)&&(normalEmail(other.ownerEmail||"")===email||other.participants?.some(p=>p.email===email&&p.status==="accepted"))))throw Error("You already have an overlapping session.");
  }
 }
 let next:Participant[];
 if(action==="remove")next=participants.filter(p=>p.email!==email);
 else if(action==="invite"){const target=students().find(s=>s.email===email)!;next=[...participants.filter(p=>p.email!==email),{email,name:target.name,status:"invited",invitedAt:new Date(now).toISOString()}];}
 else next=participants.map(p=>p.email===email?{...p,status:action==="accept"?"accepted":action==="decline"?"declined":"left",respondedAt:new Date(now).toISOString()}:p);
 const updated={...r,ownerEmail:r.ownerEmail||actor.email,ownerName:r.ownerName||actor.name,participants:next};storeReservations(all.map(x=>x.id===id?updated:x));emitAccess();return updated;
}
