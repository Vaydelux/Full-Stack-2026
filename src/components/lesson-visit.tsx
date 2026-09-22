"use client";
import {useEffect} from "react";
export function LessonVisit({href,title,kind}:{href:string;title:string;kind:string}){
 useEffect(()=>{try{localStorage.setItem("course:last-visited",JSON.stringify({href,title,kind,at:Date.now()}))}catch{}},[href,title,kind]);
 return null;
}
