export const STUDENTS_KEY="practice-ready-students-v1";
export const ACCESS_KEY="practice-ready-student-access-v1";
export const ACCESS_EVENT="practice-ready-student-access-changed";
export type Student={name:string;email:string;phone:string;auth?:{salt:string;digest:string};guidelinesAcceptance?:unknown;deletedAt?:string;deletedBy?:string;deletionReason?:string};
export type IncidentKind="no-show"|"unreported-damage"|"late-return";
export type Incident={id:string;email:string;kind:IncidentKind;reference:string;description:string;explanation:string;decision:"confirmed"|"justified";review:string;at:string;by:string};
export type Restriction={scope?:"equipment"|"facilities";id:string;email:string;reason:string;start:string;end:string;by:string;at:string;revokedAt?:string;revokedBy?:string;revocationReason?:string};
export type AccessData={incidents:Incident[];restrictions:Restriction[]};
export const normalEmail=(v:string)=>v.trim().toLowerCase();
const read=<T,>(key:string,fallback:T):T=>{if(typeof localStorage==="undefined")return fallback;const raw=localStorage.getItem(key);if(!raw)return fallback;try{return JSON.parse(raw) as T;}catch{throw Error("Saved student records could not be read. Contact ATS before continuing.");}};
export function emitAccess(){if(typeof window!=="undefined")window.dispatchEvent(new Event(ACCESS_EVENT));}
export function students():Student[]{return read<Student[]>(STUDENTS_KEY,[]);}
export function rememberStudent(student:Student){const email=normalEmail(student.email),list=students(),prior=list.find(s=>s.email===email);if(prior?.deletedAt)throw Error("This account was deleted by ATS. Contact ATS for assistance.");localStorage.setItem(STUDENTS_KEY,JSON.stringify([...list.filter(s=>s.email!==email),{...prior,...student,email}]));emitAccess();}
export function migrateStudent(){const p=read<Student|null>("practice-ready-sample-profile-v1",null);if(!p?.email)return;const email=normalEmail(p.email);if(students().some(s=>s.email===email))return;const auth=read<Student["auth"]>("practice-ready-demo-credential-v1",undefined);rememberStudent({...p,email,auth});const reservations=read<any[]>("practice-ready-reservations-v1",[]);if(reservations.some(r=>!r.ownerEmail))localStorage.setItem("practice-ready-reservations-v1",JSON.stringify(reservations.map(r=>r.ownerEmail?r:{...r,ownerEmail:email,ownerName:p.name})));}
export function currentStudent():Student{if(typeof sessionStorage!=="undefined"&&sessionStorage.getItem("practice-ready-sample-session-v1")==="sample")return {name:"Asmi Battoo",email:"asmi@example.com",phone:""};return read<Student>("practice-ready-sample-profile-v1",{name:"Student",email:"",phone:""});}
export function accessData():AccessData{return read<AccessData>(ACCESS_KEY,{incidents:[],restrictions:[]});}
export function warningCount(email:string,kind:IncidentKind,data=accessData()){return data.incidents.filter(i=>i.email===normalEmail(email)&&i.kind===kind&&i.decision==="confirmed").length;}
export function activeRestriction(email:string,now=Date.now(),data=accessData()){return data.restrictions.find(r=>r.email===normalEmail(email)&&!r.revokedAt&&Date.parse(r.start)<=now&&Date.parse(r.end)>now);}
export function accessIssue(email=currentStudent().email,now=Date.now()){const student=students().find(s=>s.email===normalEmail(email));if(student?.deletedAt)return "This account was deleted by ATS. Contact ATS for assistance.";const restriction=accessData().restrictions.find(r=>r.email===normalEmail(email)&&r.scope!=="equipment"&&!r.revokedAt&&Date.parse(r.start)<=now&&Date.parse(r.end)>now);return restriction?`TSM facility access is restricted until ${new Date(restriction.end).toLocaleString("en-GB")}. You can review the reason and contact ATS in Reports & Support.`:"";}
export function recordIncident(input:Omit<Incident,"id"|"at">,period?:{start:string;end:string},now=Date.now()){
 const data=accessData(),email=normalEmail(input.email);
 if(!students().some(s=>s.email===email&&!s.deletedAt))throw Error("Choose an active student account.");
 for(const value of [input.reference,input.description,input.explanation,input.review])if(value.trim().length<5)throw Error("Include the reference, incident details, student explanation and review decision (at least 5 characters each).");
 if(input.kind!=="no-show"&&input.kind!=="unreported-damage"&&input.kind!=="late-return")throw Error("Choose an incident category.");
 if(input.decision!=="confirmed"&&input.decision!=="justified")throw Error("Choose a review decision.");
 if(data.incidents.some(i=>i.email===email&&i.kind===input.kind&&i.reference.trim().toLowerCase()===input.reference.trim().toLowerCase()))throw Error("This incident reference was already reviewed for this student and category.");
 if(input.kind==="late-return"&&!lateReturnCandidates(email,data).some(c=>c.reference===input.reference))throw Error("Choose an unreviewed late equipment return.");
 const nextCount=warningCount(email,input.kind,data)+(input.decision==="confirmed"?1:0);
 let restriction:Restriction|undefined;
 if(input.decision==="confirmed"&&nextCount>=3){const start=Date.parse(period?.start||""),end=Date.parse(period?.end||"");if(!Number.isFinite(start)||!Number.isFinite(end)||start<now-60000||end<=Math.max(start,now))throw Error("The third and later confirmed incidents require a restriction starting now or later and ending after its start.");restriction={id:crypto.randomUUID(),email,scope:input.kind==="late-return"?"equipment":"facilities",reason:`${incidentLabel(input.kind)}: ${input.review.trim()}`,start:new Date(start).toISOString(),end:new Date(end).toISOString(),by:input.by,at:new Date(now).toISOString()};}
 const incident:Incident={...input,email,id:crypto.randomUUID(),at:new Date(now).toISOString()};
 localStorage.setItem(ACCESS_KEY,JSON.stringify({incidents:[...data.incidents,incident],restrictions:restriction?[...data.restrictions,restriction]:data.restrictions}));emitAccess();return incident;
}
export function liftRestriction(id:string,by:string,reason:string){if(reason.trim().length<5)throw Error("Explain why the restriction is being lifted.");const data=accessData();localStorage.setItem(ACCESS_KEY,JSON.stringify({...data,restrictions:data.restrictions.map(r=>r.id===id?{...r,revokedAt:new Date().toISOString(),revokedBy:by,revocationReason:reason.trim()}:r)}));emitAccess();}
export function deleteStudent(email:string,by:string,reason:string){email=normalEmail(email);if(reason.trim().length<5)throw Error("Enter the reason for account deletion.");const list=students(),student=list.find(s=>s.email===email);if(!student||student.deletedAt)throw Error("This account is no longer active.");const records=read<any[]>("practice-ready-reservations-v1",[]);if(records.some(r=>r.ownerEmail===email&&!r.cancelled&&Date.parse(r.end)>Date.now()))throw Error("Cancel or end this student’s upcoming and active reservations before deleting the account.");const moves=read<any[]>("practice-ready-relocations-v1",[]);if(moves.some(m=>m.by===student.name&&m.expectedReturn&&[...moves].reverse().find(n=>n.equipmentId===m.equipmentId)?.id===m.id))throw Error("Resolve this student’s outstanding equipment moves before deleting the account.");const next=list.map(s=>s.email===email?{...s,auth:undefined,deletedAt:new Date().toISOString(),deletedBy:by,deletionReason:reason.trim()}:s);localStorage.setItem(STUDENTS_KEY,JSON.stringify(next));localStorage.setItem("practice-ready-reservations-v1",JSON.stringify(records.map(r=>({...r,participants:r.participants?.map((p:any)=>p.email===email&&(p.status==="accepted"||p.status==="invited")?{...p,status:"left",respondedAt:new Date().toISOString()}:p)}))));if(normalEmail(read<Student|null>("practice-ready-sample-profile-v1",null)?.email||"")===email)localStorage.removeItem("practice-ready-demo-credential-v1");emitAccess();}
export function canManageSession(r:{ownerEmail?:string;sample?:boolean},email=currentStudent().email){return !r.sample&&!!email&&(!r.ownerEmail||normalEmail(r.ownerEmail)===normalEmail(email));}
export function belongsToStudent(r:{ownerEmail?:string;participants?:{email:string;status:string}[]},email=currentStudent().email){return !r.ownerEmail||normalEmail(r.ownerEmail)===normalEmail(email)||!!r.participants?.some(p=>p.email===normalEmail(email)&&p.status==="accepted");}

export function incidentLabel(kind:IncidentKind){return kind==="no-show"?"No-show":kind==="late-return"?"Late equipment return":"Unreported equipment damage";}
export function equipmentMoveIssue(email=currentStudent().email,now=Date.now()){
 const issue=accessIssue(email,now);if(issue)return issue;
 const r=accessData().restrictions.find(r=>r.email===normalEmail(email)&&r.scope==="equipment"&&!r.revokedAt&&Date.parse(r.start)<=now&&Date.parse(r.end)>now);
 return r?`New equipment moves are restricted until ${new Date(r.end).toLocaleString("en-GB")}. Returns and room bookings remain available.`:"";
}
export function lateReturnCandidates(email:string,data=accessData()){
 type Move={id:string;equipmentId:string;expectedReturn?:string;at:string;ownerEmail?:string;by:string;actorRole?:string;eventType?:string;to:string};
 const records=read<Move[]>("practice-ready-relocations-v1",[]),people=students();email=normalEmail(email);
 return records.flatMap((m,index)=>{
  if(!m.expectedReturn||m.actorRole==="fts")return [];
  const owner=m.ownerEmail?normalEmail(m.ownerEmail):people.filter(s=>s.name===m.by).length===1?people.find(s=>s.name===m.by)?.email:"";
  if(owner!==email)return [];
  const next=records.slice(index+1).find(n=>n.equipmentId===m.equipmentId&&n.eventType!=="location-correction");
  if(!next||next.expectedReturn||!(Date.parse(next.at)>Date.parse(m.expectedReturn)))return [];
  const reference=`MOVE:${m.id}`;
  if(data.incidents.some(i=>i.kind==="late-return"&&i.reference===reference))return [];
  return [{reference,equipmentId:m.equipmentId,description:`${m.equipmentId}: return deadline ${new Date(m.expectedReturn).toLocaleString("en-GB")}; return recorded ${new Date(next.at).toLocaleString("en-GB")}. Move ${m.id}.`}];
 });
}
