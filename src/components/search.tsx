"use client";

import Link from "next/link";
import {useEffect,useMemo,useRef,useState} from "react";
type Row={kind:string;title:string;subtitle:string;href:string;text:string};

export function CourseSearch(){
 const [q,setQ]=useState("");const [rows,setRows]=useState<Row[]>([]);const [loading,setLoading]=useState(true);const [kind,setKind]=useState("All");const inputRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{const ctrl=new AbortController();fetch("/search-index.json",{signal:ctrl.signal}).then(r=>{if(!r.ok)throw new Error("Search index failed");return r.json()}).then(setRows).catch(()=>setRows([])).finally(()=>setLoading(false));return()=>ctrl.abort()},[]);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();inputRef.current?.focus()}else if(e.key==="/"&&document.activeElement?.tagName!=="INPUT"&&document.activeElement?.tagName!=="TEXTAREA"){e.preventDefault();inputRef.current?.focus()}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);
 const kinds=useMemo(()=>["All",...Array.from(new Set(rows.map(r=>r.kind))).sort()], [rows]);
 const results=useMemo(()=>{const needle=q.trim().toLowerCase();if(needle.length<2)return [];const terms=needle.split(/\s+/).filter(Boolean);return rows.map(r=>{if(kind!=="All"&&r.kind!==kind)return {r,score:0};const title=r.title.toLowerCase(),subtitle=r.subtitle.toLowerCase(),hay=`${title} ${subtitle} ${r.text}`.toLowerCase();const score=terms.reduce((n,t)=>n+(title===t?10:0)+(title.includes(t)?5:0)+(subtitle.includes(t)?3:0)+(hay.includes(t)?1:0),0);return {r,score}}).filter(x=>x.score>=terms.length).sort((a,b)=>b.score-a.score||a.r.title.localeCompare(b.r.title)).slice(0,40)},[q,rows,kind]);
 const searching=q.trim().length>=2;
 return <div className="course-search">
  <div className="search-box"><span aria-hidden>⌕</span><input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search concepts, errors, commands, phases…" aria-label="Search course"/>{q&&<button type="button" className="search-clear" onClick={()=>{setQ("");inputRef.current?.focus()}} aria-label="Clear search">×</button>}<kbd>/</kbd></div>
  <div className="search-meta"><span>{loading?"Loading search index…":`${rows.length.toLocaleString()} records ready`}</span>{searching&&<b>{results.length} shown</b>}</div>
  <div className="filter-chips" aria-label="Filter search results">{kinds.map(x=><button type="button" key={x} className={kind===x?"active":""} aria-pressed={kind===x} onClick={()=>setKind(x)}>{x}</button>)}</div>
  {!searching?<div className="search-hints"><p className="muted">Try a working problem instead of a chapter title.</p><div>{["Prisma P1001","CORS 403","useQuery staleTime","Docker networking","JWT authorization","EXPLAIN ANALYZE"].map(x=><button type="button" key={x} onClick={()=>setQ(x)}>{x}</button>)}</div></div>:<div className="search-results" aria-live="polite">{results.map(({r})=><Link href={r.href} key={`${r.kind}:${r.href}`} className="search-result"><span className="search-kind">{r.kind}</span><div><b>{r.title}</b><p>{r.subtitle}</p></div><span className="search-arrow" aria-hidden>→</span></Link>)}{!loading&&results.length===0&&<div className="empty-state"><b>No matching lesson found.</b><p>Try fewer terms, a framework name, an error code, or switch the content filter back to All.</p></div>}</div>}
 </div>
}
