"use client";
import {ftsAreas} from "@/lib/fts-members";
export default function FtsResponsibilities({value,onChange}:{value:string[];onChange:(value:string[])=>void}){
 return <fieldset className="min-w-0 space-y-2 sm:col-span-2"><legend className="text-sm font-medium">Areas of responsibility</legend><p className="text-xs text-slate-500 dark:text-slate-300">Select at least one area.</p><div className="grid gap-2 sm:grid-cols-2">{ftsAreas.map(area=><label key={area} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm ${value.includes(area)?"border-violet-500 bg-violet-50 dark:bg-[#211A38]":"border-slate-300 dark:border-slate-600"}`}><input type="checkbox" checked={value.includes(area)} onChange={e=>onChange(e.target.checked?[...value,area]:value.filter(item=>item!==area))} className="h-4 w-4 shrink-0 accent-violet-600"/><span>{area}</span></label>)}</div></fieldset>;
}
