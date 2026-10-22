"use client";
import {useId,useState} from "react";
import AdminDateFilter from "@/components/admin-date-filter";
import AdminSelect from "@/components/admin-select";
const pad=(n:number)=>String(n).padStart(2,"0");
const control="!h-11 !min-h-11 w-full min-w-0 rounded-xl border border-slate-300 bg-white !px-3 !py-0 !text-base text-slate-900 dark:text-slate-100 dark:border-slate-600 dark:bg-[#171D2D]";
export default function RestrictionDateTime({label,value,onChange,minDate}:{label:string;value:string;onChange:(value:string)=>void;minDate:string}){
 const id=useId();
 const [draft,setDraft]=useState(()=>{const now=new Date();return `${pad(now.getHours())}:${pad(now.getMinutes())}`;});
 const date=value.split("T")[0]||"",time=value.split("T")[1]||draft;
 const [hour,minute]=time.split(":").map(Number),period=hour>=12?"PM":"AM";
 const updateTime=(h:number,m:number)=>{const next=`${pad(h)}:${pad(m)}`;setDraft(next);if(date)onChange(`${date}T${next}`);};
 return <fieldset className="min-w-0 space-y-2"><legend className="mb-1 text-sm font-medium">{label}</legend>
 <AdminDateFilter value={date} onChange={next=>onChange(next?`${next}T${time}`:"")} className={control} allowClear={false} ariaLabel={`${label}: choose date`} minDate={minDate} triggerLabel={date?undefined:"Choose date"} portalled={false}/>
 <div className="grid grid-cols-3 gap-2">
 <label className="min-w-0 text-xs text-slate-500 dark:text-slate-300" htmlFor={`${id}-hour`}>Hour<AdminSelect id={`${id}-hour`} aria-label={`${label}: hour`} portalled={false} className={`${control} mt-1`} value={String(hour%12||12)} onChange={e=>updateTime(Number(e.target.value)%12+(period==="PM"?12:0),minute)}>{Array.from({length:12},(_,i)=><option key={i+1} value={String(i+1)}>{pad(i+1)}</option>)}</AdminSelect></label>
 <label className="min-w-0 text-xs text-slate-500 dark:text-slate-300" htmlFor={`${id}-minute`}>Minute<AdminSelect id={`${id}-minute`} aria-label={`${label}: minute`} portalled={false} className={`${control} mt-1`} value={String(minute)} onChange={e=>updateTime(hour,Number(e.target.value))}>{Array.from({length:60},(_,i)=><option key={i} value={String(i)}>{pad(i)}</option>)}</AdminSelect></label>
 <label className="min-w-0 text-xs text-slate-500 dark:text-slate-300" htmlFor={`${id}-period`}>AM/PM<AdminSelect id={`${id}-period`} aria-label={`${label}: AM or PM`} portalled={false} className={`${control} mt-1`} value={period} onChange={e=>updateTime(hour%12+(e.target.value==="PM"?12:0),minute)}><option value="AM">AM</option><option value="PM">PM</option></AdminSelect></label>
 </div></fieldset>;
}
