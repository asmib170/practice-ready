export function restrictionPeriodError(mode:"immediate"|"scheduled",start:string,end:string,now:number):string {
 const begins=mode==="immediate"?now:Date.parse(start),ends=Date.parse(end);
 if(mode==="scheduled"&&!Number.isFinite(begins))return "Choose a start date and time.";
 if(mode==="scheduled"&&begins<=now)return "Choose a future start time.";
 if(!Number.isFinite(ends))return "Choose an end date and time.";
 if(ends<=begins)return mode==="immediate"?"Choose an end time later than now.":"End must be after the start.";
 return "";
}
