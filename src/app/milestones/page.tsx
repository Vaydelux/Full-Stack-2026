import Link from "next/link";
import {getMilestoneMeta} from "@/lib/course";

export default function MilestonesPage(){
  const m=getMilestoneMeta();
  return <main className="shell narrow-shell">
    <section className="phase-head"><div className="eyebrow">Closed-reference transfer projects</div><h1>{m.title}</h1><p>{m.subtitle}</p></section>
    <section className="section"><div className="milestone-grid">{m.milestones.map(x=><Link key={x.slug} href={`/milestones/${x.slug}`} className="milestone-card"><div className="eyebrow">Milestone {String(x.number).padStart(2,'0')} · {x.span}</div><h2>{x.title}</h2><p>{x.goal}</p><span className="button ghost">Open milestone →</span></Link>)}</div></section>
  </main>
}
