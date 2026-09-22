"use client";

import {useEffect,useState} from "react";

export function ReadingTools(){
  const [progress,setProgress]=useState(0);
  const [showTop,setShowTop]=useState(false);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const max=document.documentElement.scrollHeight-window.innerHeight;
        setProgress(max>0?Math.min(100,Math.max(0,(window.scrollY/max)*100)):0);
        setShowTop(window.scrollY>650);
      });
    };
    update(); window.addEventListener("scroll",update,{passive:true}); window.addEventListener("resize",update);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update)};
  },[]);
  return <>
    <div className="reading-progress" aria-hidden="true"><i style={{width:`${progress}%`}}/></div>
    <button type="button" className={`back-top ${showTop?"show":""}`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">↑</button>
  </>
}
