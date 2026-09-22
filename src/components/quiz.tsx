"use client";

import {useEffect,useMemo,useState} from "react";
type Q={question:string;options:string[];answer:number;explanation?:string};

function hash(items:Q[]){let h=5381;const s=items.map(x=>x.question).join("|");for(let i=0;i<s.length;i++)h=((h<<5)+h)^s.charCodeAt(i);return (h>>>0).toString(36)}

export function Quiz({items,id}:{items:Q[];id?:string}){
 const storageKey=useMemo(()=>`quiz:${id||hash(items)}`,[id,items]);
 const [sel,setSel]=useState<Record<number,number>>({});
 const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(storageKey);if(raw)setSel(JSON.parse(raw))}catch{}setReady(true)},[storageKey]);
 useEffect(()=>{if(!ready)return;try{localStorage.setItem(storageKey,JSON.stringify(sel))}catch{}},[ready,sel,storageKey]);
 const answered=Object.keys(sel).length;
 const score=useMemo(()=>Object.entries(sel).reduce((n,[i,a])=>n+(a===items[Number(i)]?.answer?1:0),0),[sel,items]);
 const complete=items.length>0&&answered===items.length;
 if(!items.length)return <p className="muted">Knowledge checks will appear when this phase has assessment material.</p>;
 return <div className="quiz">
  <div className="quiz-toolbar"><div className="quiz-score"><b>{score}/{answered}</b><span> correct · {answered}/{items.length} answered</span></div><button type="button" className="text-button" onClick={()=>setSel({})} disabled={!answered}>Reset quiz</button></div>
  <div className="quiz-progress" aria-label={`${answered} of ${items.length} questions answered`}><i style={{width:`${Math.round(answered/items.length*100)}%`}}/></div>
  {items.map((q,i)=><article className="quiz-q" key={`${i}-${q.question}`}><div className="quiz-question"><span>{String(i+1).padStart(2,"0")}</span><b>{q.question}</b></div><div className="quiz-options" role="group" aria-label={`Question ${i+1}`}>{q.options.map((o,j)=>{const chosen=sel[i]===j;const answeredThis=sel[i]!==undefined;const cls=answeredThis?(j===q.answer?"correct":chosen?"wrong":""):"";return <button type="button" aria-pressed={chosen} key={`${j}-${o}`} onClick={()=>setSel(v=>({...v,[i]:j}))} className={cls}><span className="option-letter">{String.fromCharCode(65+j)}</span><span>{o}</span></button>})}</div>{sel[i]!==undefined&&<div className={`feedback ${sel[i]===q.answer?"good":"needs-work"}`} role="status"><b>{sel[i]===q.answer?"Correct reasoning":"Review the reasoning"}</b><p>{q.explanation??`The best answer is: ${q.options[q.answer]}`}</p></div>}</article>)}
  {complete&&<div className="quiz-complete"><b>Quiz complete: {score}/{items.length}</b><p>{score===items.length?"You answered every question correctly. Explain the hardest answer out loud before moving on.":"Review the questions you missed, then reset and try again without reopening the lesson."}</p></div>}
 </div>
}
