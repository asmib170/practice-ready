// Shared storage boundary: previews use throwaway records, normal flows use browser storage.
export type RestrictionPreviewMode="facilities"|"equipment";
let preview:Storage|null=null;
export const previewStudent={name:"Demo Student",email:"restriction-demo@vijaybhoomi.edu.in",phone:"+91 90000 00000"};
function memoryStorage():Storage{const values=new Map<string,string>();return {get length(){return values.size;},clear(){values.clear();},getItem(key){return values.get(key)??null;},key(index){return [...values.keys()][index]??null;},removeItem(key){values.delete(key);},setItem(key,value){values.set(String(key),String(value));}};}
const serverStorage=memoryStorage();
export function appStorage():Storage{return preview||(typeof window!=="undefined"?window.localStorage:serverStorage);}
export function isRestrictionPreview(){return preview!==null;}
export function beginRestrictionPreview(mode:RestrictionPreviewMode){
 preview=memoryStorage();const now=Date.now();
 preview.setItem("practice-ready-sample-profile-v1",JSON.stringify(previewStudent));
 preview.setItem("practice-ready-students-v1",JSON.stringify([previewStudent]));
 preview.setItem("practice-ready-student-access-v1",JSON.stringify({incidents:Array.from({length:3},(_,index)=>({id:`demo-incident-${index+1}`,email:previewStudent.email,kind:mode==="equipment"?"late-return":"no-show",reference:`DEMO-${mode}-${index+1}`,description:mode==="equipment"?"Equipment returned after the recorded deadline.":"Student did not attend the reserved session.",explanation:"No valid justification provided after ATS review.",decision:"confirmed",review:"Confirmed after reviewing the recorded times and student explanation.",by:"ATS demo",at:new Date(now-(3-index)*86400000).toISOString()})),restrictions:[{id:"demo-restriction",email:previewStudent.email,scope:mode,start:new Date(now-60000).toISOString(),end:new Date(now+86400000).toISOString(),reason:mode==="equipment"?"Repeated confirmed late equipment returns — sample restriction.":"Repeated confirmed no-shows — sample facility restriction.",by:"ATS demo",at:new Date(now).toISOString()}]}));
 preview.setItem("practice-ready-relocations-v1",JSON.stringify([{id:"demo-outstanding-move",equipmentId:"MIC-01",from:"MPR 3",to:"Studio",expectedReturn:new Date(now+3600000).toISOString(),note:"Sample outstanding equipment: returns remain available.",by:previewStudent.name,ownerEmail:previewStudent.email,at:new Date(now-600000).toISOString()}]));
}
export function endRestrictionPreview(){preview=null;}
