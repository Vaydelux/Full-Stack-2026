"use client";

import {useState} from "react";

export function CodeBlock({code,label="Code",caption,className=""}:{code:string;label?:string;caption?:string;className?:string}){
  const [copied,setCopied]=useState(false);
  async function copy(){
    try{
      await navigator.clipboard.writeText(code);
    }catch{
      const el=document.createElement("textarea");
      el.value=code; el.style.position="fixed"; el.style.opacity="0";
      document.body.appendChild(el); el.select(); document.execCommand("copy"); el.remove();
    }
    setCopied(true); window.setTimeout(()=>setCopied(false),1400);
  }
  return <div className={`code-block ${className}`}>
    <div className="code-block-head"><div><span>{label}</span>{caption&&<b>{caption}</b>}</div><button type="button" onClick={copy} aria-label="Copy code to clipboard">{copied?"Copied ✓":"Copy"}</button></div>
    <pre><code>{code}</code></pre>
    <span className="sr-only" aria-live="polite">{copied?"Copied to clipboard":""}</span>
  </div>
}
