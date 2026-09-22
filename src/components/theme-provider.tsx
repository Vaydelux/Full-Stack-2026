"use client";

import {useEffect,useState} from "react";

export const THEMES=[
["Sunset Graphite","Warm orange embers","#ff9950","#1d1713","#2b2119"],["Dark Aurora","Teal + violet electric","#42e6be","#16111d","#21162a"],["Moonlight","Silver-blue minimal","#93c5fd","#111827","#202a3a"],["Crimson Cinema","Deep red velvet","#ff6b9a","#1e1116","#341522"],["Deep Ocean","Sapphire navy","#38c6f4","#0e171d","#112632"],["Toxic Neon","Acid green edge","#a3ff3f","#141b0e","#26351a"],["Rose Dusk","Dusty pink plum","#e99ac7","#1c121b","#30202c"],["Sand Storm","Caramel gold earth","#ffd34d","#1d1911","#332816"],["Void Purple","Space indigo","#bd8cff","#17101f","#271839"],["Arctic Fog","Icy cyan steel","#a5f3fc","#0f1818","#183031"],["Amber Twilight","Fireside orange glow","#ffbd59","#1c1711","#352619"],["Electric Ember","Molten magma orange","#ff8468","#1d1412","#38201a"],["Frosted Lavender","Chilled violet floral","#d8b4fe","#18121d","#2b1d35"],["Midnight Cobalt","Electric blue nebula","#69a5ff","#111620","#19283f"],["Neon Oasis","Synthetic digital cyan","#42f5d1","#0d1a17","#15362e"],["Platinum Frost","Ice metallic silver","#dbeafe","#11161c","#27313d"],["Shadow Sage","Deep herbal forest","#7ee2a8","#0f1913","#173022"],["Solar Flare","Interstellar solar corona","#ffe063","#1c1a0f","#343019"]
] as const;

function applyTheme(name:string){
 const x=THEMES.find(t=>t[0]===name)||THEMES[2];
 const r=document.documentElement;
 r.dataset.theme=x[0];
 r.style.setProperty("--accent",x[2]);
 r.style.setProperty("--bg",x[3]);
 r.style.setProperty("--surface",x[4]);
 r.style.colorScheme="dark";
}

export function ThemeProvider({children}:{children:React.ReactNode}){
 const [theme,setTheme]=useState("Moonlight");
 useEffect(()=>{
  const saved=localStorage.getItem("course-theme")||"Moonlight";
  setTheme(saved); applyTheme(saved);
  const onTheme=(e:Event)=>{const name=(e as CustomEvent<string>).detail;setTheme(name);applyTheme(name)};
  window.addEventListener("course-theme-change",onTheme);
  return()=>window.removeEventListener("course-theme-change",onTheme);
 },[]);
 useEffect(()=>{applyTheme(theme)},[theme]);
 return <div data-course-theme={theme}>{children}<a className="theme-fab" href="/themes" aria-label="Choose theme" title="Choose theme"><span aria-hidden>◐</span></a></div>
}

export function ThemeGrid(){
 const [active,setActive]=useState("Moonlight");
 useEffect(()=>setActive(localStorage.getItem("course-theme")||"Moonlight"),[]);
 function choose(name:string){localStorage.setItem("course-theme",name);setActive(name);applyTheme(name);window.dispatchEvent(new CustomEvent("course-theme-change",{detail:name}))}
 return <div className="theme-grid">{THEMES.map(t=><button type="button" key={t[0]} aria-pressed={active===t[0]} className={`theme-card ${active===t[0]?"active":""}`} style={{background:`linear-gradient(145deg,${t[4]},${t[3]})`,borderColor:`${t[2]}66`}} onClick={()=>choose(t[0])}><div className="theme-card-top"><b>{t[0]}</b>{active===t[0]&&<span className="theme-check">Selected</span>}</div><span style={{color:t[2]}}>{t[1]}</span><i aria-hidden style={{background:`linear-gradient(90deg,${t[2]} 0 30%,#080b0f 30% 63%,#f1edf4 63%)`}} /></button>)}</div>
}
