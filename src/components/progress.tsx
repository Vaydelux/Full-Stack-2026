"use client";
import {useEffect,useState} from "react";

function emit(){window.dispatchEvent(new Event("course-progress"));}
function getFlag(key:string){try{return localStorage.getItem(key)==="1"}catch{return false}}
function setFlag(key:string,value:boolean){try{localStorage.setItem(key,value?"1":"0")}catch{}emit()}

export function CompleteButton({id}:{id:string}){
 const [done,setDone]=useState(false);
 useEffect(()=>setDone(getFlag(`done:${id}`)),[id]);
 return <button type="button" aria-pressed={done} className={done?"done button":"button"} onClick={()=>{const n=!done;setDone(n);setFlag(`done:${id}`,n)}}>{done?"✓ Completed":"Mark lesson complete"}</button>
}
export function TaskCheck({id,label}:{id:string;label:string}){
 const [done,setDone]=useState(false);
 useEffect(()=>setDone(getFlag(`task:${id}`)),[id]);
 return <label className={`task-check ${done?"checked":""}`}><input type="checkbox" checked={done} onChange={e=>{setDone(e.target.checked);setFlag(`task:${id}`,e.target.checked)}}/><span>{label}</span></label>
}
