import Link from "next/link";
import {getMeta} from "@/lib/course";
import {TopNavClient} from "@/components/top-nav";

export function TopNav(){return <TopNavClient/>}

function PhaseLinks({current}:{current?:number}){
 const m=getMeta();
 return <>{m.volumes.map(v=><div key={v.number} className="volume"><b>V{String(v.number).padStart(2,"0")} · {v.title}</b>{v.phases.map(n=>{const p=m.phases.find(x=>x.number===n)!;return <Link className={current===n?"active":""} aria-current={current===n?"page":undefined} href={`/course/${p.slug}`} key={n}><span>{String(n).padStart(2,"0")}</span><em>{p.title}</em></Link>})}</div>)}</>
}

export function CourseSidebar({current}:{current?:number}){
 return <>
  <aside className="sidebar desktop-sidebar" aria-label="Course phases"><div className="sidebar-title"><div className="eyebrow">37-phase pathway</div><Link href="/course">Course map</Link></div><PhaseLinks current={current}/></aside>
  <details className="mobile-course-nav"><summary><span><b>Course navigation</b><small>{current!==undefined?`Phase ${String(current).padStart(2,"0")}`:"37 phases"}</small></span><i aria-hidden>⌄</i></summary><div className="mobile-course-nav-body"><PhaseLinks current={current}/></div></details>
 </>
}
