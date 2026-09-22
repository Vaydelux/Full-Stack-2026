"use client";

import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import {useEffect,useState} from "react";

const links=[
  ["Learn","/instructor"],
  ["Foundation","/foundation"],
  ["Course","/course"],
  ["Projects","/projects"],
  ["Progress","/dashboard"],
  ["Setup","/setup"],
  ["Handbook","/handbook"],
  ["Themes","/themes"],
] as const;

function isActive(pathname:string,href:string){return pathname===href||pathname.startsWith(`${href}/`)}

export function TopNavClient(){
  const pathname=usePathname();
  const router=useRouter();
  const [open,setOpen]=useState(false);

  useEffect(()=>setOpen(false),[pathname]);
  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){
        event.preventDefault();
        router.push("/search");
      }
      if(event.key==="Escape")setOpen(false);
    };
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[router]);
  useEffect(()=>{
    document.body.classList.toggle("nav-open",open);
    return()=>document.body.classList.remove("nav-open");
  },[open]);

  return <>
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" href="/" aria-label="Full-Stack Developer 2026 home">FS<span>26</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label,href])=><Link key={href} className={isActive(pathname,href)?"active":""} href={href}>{label}</Link>)}
        </nav>
        <div className="topbar-actions">
          <Link href="/search" className="nav-search" aria-label="Search course"><span aria-hidden>⌕</span><kbd>Ctrl K</kbd></Link>
          <button className="menu-button" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(v=>!v)}>
            <span/><span/><span/>
          </button>
        </div>
      </div>
    </header>
    <div className={`mobile-nav-backdrop ${open?"open":""}`} onClick={()=>setOpen(false)} aria-hidden="true"/>
    <aside id="mobile-menu" className={`mobile-nav ${open?"open":""}`} aria-hidden={!open}>
      <div className="mobile-nav-head"><b>Navigate</b><button type="button" onClick={()=>setOpen(false)} aria-label="Close navigation">×</button></div>
      <nav aria-label="Mobile navigation">
        {links.map(([label,href])=><Link key={href} className={isActive(pathname,href)?"active":""} href={href}>{label}<span aria-hidden>→</span></Link>)}
        <Link className={isActive(pathname,"/search")?"active":""} href="/search">Search<span aria-hidden>⌕</span></Link>
      </nav>
      <p className="mobile-nav-tip"><kbd>Ctrl</kbd> + <kbd>K</kbd> opens search from anywhere.</p>
    </aside>
  </>
}
