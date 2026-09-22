"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";

type Unit={number:number;slug:string;title:string;lessonCount:number};
type LastVisited={href:string;title:string;kind:string;at:number}|null;

export function ProgressDashboard({phases,foundation,instructor,deep,milestones,totalCourseLessons,totalFoundationLessons,totalInstructorLessons,totalDeepLessons}:{phases:Unit[];foundation:Unit[];instructor:Unit[];deep:Unit[];milestones:Unit[];totalCourseLessons:number;totalFoundationLessons:number;totalInstructorLessons:number;totalDeepLessons:number}){
 const [done,setDone]=useState<string[]>([]);
 const [tasks,setTasks]=useState<string[]>([]);
 const [last,setLast]=useState<LastVisited>(null);
 useEffect(()=>{
  const load=()=>{
   const d:string[]=[];const t:string[]=[];
   try{
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i); if(!k)continue;
      if(k.startsWith("done:")&&localStorage.getItem(k)==="1")d.push(k.slice(5));
      if(k.startsWith("task:")&&localStorage.getItem(k)==="1")t.push(k.slice(5));
    }
    const raw=localStorage.getItem("course:last-visited"); if(raw)setLast(JSON.parse(raw));
   }catch{}
   setDone(d);setTasks(t);
  };
  load();window.addEventListener("course-progress",load);window.addEventListener("storage",load);
  return()=>{window.removeEventListener("course-progress",load);window.removeEventListener("storage",load)};
 },[]);

 const counts={
  instructor:done.filter(x=>x.startsWith("instructor:")).length,
  foundation:done.filter(x=>x.startsWith("foundation:")).length,
  course:done.filter(x=>x.startsWith("phase-")).length,
  deep:done.filter(x=>x.startsWith("deep:")).length,
  milestones:done.filter(x=>x.startsWith("milestone:")).length,
 };
 const pct=(n:number,total:number)=>Math.round(n/Math.max(1,total)*100);
 function exportProgress(){
  const payload:Record<string,string>={};
  try{for(let n=0;n<localStorage.length;n++){const k=localStorage.key(n);if(k&&(k.startsWith("done:")||k.startsWith("task:")||k.startsWith("quiz:")||k==="course:last-visited")){payload[k]=localStorage.getItem(k)||""}}}catch{}
  const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),data:payload},null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="fs26-learning-progress.json";a.click();URL.revokeObjectURL(url);
 }
 function resetProgress(){
  if(!window.confirm("Reset all lesson, lab, milestone, and quiz progress stored in this browser? Your theme will be kept."))return;
  try{const keys:string[]=[];for(let n=0;n<localStorage.length;n++){const k=localStorage.key(n);if(k&&(k.startsWith("done:")||k.startsWith("task:")||k.startsWith("quiz:")||k==="course:last-visited"))keys.push(k)}keys.forEach(k=>localStorage.removeItem(k))}catch{}
  setDone([]);setTasks([]);setLast(null);window.dispatchEvent(new Event("course-progress"));
 }
 const primaryPct=pct(counts.instructor,totalInstructorLessons);
 const phaseStats=useMemo(()=>phases.map(p=>{const n=done.filter(x=>x.startsWith(`${p.slug}:`)).length;return {...p,done:n,pct:pct(n,p.lessonCount)}}),[done,phases]);
 const foundationStats=useMemo(()=>foundation.map(m=>{const n=done.filter(x=>x.startsWith(`foundation:${m.slug}:`)).length;return {...m,done:n,pct:pct(n,m.lessonCount)}}),[done,foundation]);
 const instructorStats=useMemo(()=>instructor.map(m=>{const n=done.filter(x=>x.startsWith(`instructor:${m.slug}:`)).length;return {...m,done:n,pct:pct(n,m.lessonCount)}}),[done,instructor]);
 const deepStats=useMemo(()=>deep.map(m=>{const n=done.filter(x=>x.startsWith(`deep:${m.slug}:`)).length;return {...m,done:n,pct:pct(n,m.lessonCount)}}),[done,deep]);
 const milestoneStats=useMemo(()=>milestones.map(m=>{const n=done.includes(`milestone:${m.slug}`)?1:0;return {...m,done:n,pct:n?100:0}}),[done,milestones]);

 return <>
  <section className="progress-hero">
    <div><div className="eyebrow">Learning dashboard</div><h1>{primaryPct}% Guided Course</h1><p className="muted">{counts.instructor} of {totalInstructorLessons} guided lessons complete · {tasks.length} lab/mastery checks recorded locally.</p><div className="mini-stats"><span>Foundation <b>{pct(counts.foundation,totalFoundationLessons)}%</b></span><span>Original course <b>{pct(counts.course,totalCourseLessons)}%</b></span><span>Deep dives <b>{pct(counts.deep,totalDeepLessons)}%</b></span><span>Milestones <b>{counts.milestones}/{milestones.length}</b></span></div><div className="progress-actions"><button type="button" className="button ghost" onClick={exportProgress}>Export progress</button><button type="button" className="text-button danger-text" onClick={resetProgress}>Reset progress</button></div>{last&&<Link className="continue-card" href={last.href}><span>Continue learning</span><b>{last.title}</b><small>{last.kind}</small></Link>}</div>
    <div className="ring" style={{"--p":`${primaryPct}%`} as React.CSSProperties}><b>{primaryPct}%</b><span>Guided</span></div>
  </section>

  <ProgressSection eyebrow="Recommended route" title="Guided Course" prefix="Track" base="/instructor" rows={instructorStats}/>
  <ProgressSection eyebrow="Beginner track" title="Foundation progress" prefix="F" base="/foundation" rows={foundationStats}/>
  <ProgressSection eyebrow="TaskFlow source path" title="Original 37-phase course" prefix="Phase" base="/course" rows={phaseStats}/>
  <ProgressSection eyebrow="Supplemental mastery" title="Deep-dive progress" prefix="D" base="/deep-dives" rows={deepStats}/>
  <ProgressSection eyebrow="Closed-reference transfer" title="Mastery milestones" prefix="M" base="/milestones" rows={milestoneStats}/>
 </>
}

function ProgressSection({eyebrow,title,prefix,base,rows}:{eyebrow:string;title:string;prefix:string;base:string;rows:(Unit&{done:number;pct:number})[]}){
 return <section className="section"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><div className="phase-progress-grid">{rows.map(m=><Link href={`${base}/${m.slug}`} className="progress-card" key={m.slug}><div className="progress-row"><b>{prefix} {String(m.number).padStart(2,"0")}</b><span>{m.done}/{m.lessonCount}</span></div><h3>{m.title}</h3><div className="progress-track" aria-label={`${m.pct}% complete`}><i style={{width:`${m.pct}%`}}/></div></Link>)}</div></section>
}
