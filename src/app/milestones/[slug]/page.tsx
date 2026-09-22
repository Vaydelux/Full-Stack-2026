import {notFound} from "next/navigation";
import Link from "next/link";
import {getMilestone,getMilestoneMeta} from "@/lib/course";
import {NumberedSteps} from "@/components/learning-ui";
import {CompleteButton} from "@/components/progress";
import {LessonVisit} from "@/components/lesson-visit";

export function generateStaticParams(){return getMilestoneMeta().milestones.map(x=>({slug:x.slug}))}

export default async function MilestonePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const x=getMilestone(slug); if(!x)notFound();
  return <main className="lesson">
    <LessonVisit href={`/milestones/${x.slug}`} title={x.title} kind="Mastery milestone"/>
    <div className="eyebrow"><Link href="/milestones">Mastery milestones</Link> · {x.span}</div>
    <h1>{x.title}</h1><p className="mastery-lead">{x.goal}</p>
    <section className="section"><div className="two-col"><article className="mastery-card"><div className="eyebrow">Required deliverables</div><h3>What you must ship</h3><ul>{x.deliverables.map((d,i)=><li key={i}>{d}</li>)}</ul></article><article className="mastery-card danger"><div className="eyebrow">Constraints</div><h3>Rules that make the project meaningful</h3><ul>{x.constraints.map((d,i)=><li key={i}>{d}</li>)}</ul></article></div></section>
    <section className="section"><div className="eyebrow">Execution sequence</div><h2>Build without following a transcript</h2><NumberedSteps items={x.steps}/></section>
    <section className="section"><div className="eyebrow">Evidence packet</div><h2>Prove that the milestone works</h2><div className="exercise-grid">{x.evidence.map((e,i)=><div className="exercise-card" key={i}><b>{String(i+1).padStart(2,'0')}</b><p>{e}</p></div>)}</div></section>
    <section className="section"><div className="eyebrow">Review rubric</div><h2>What good looks like</h2><div className="rubric-grid">{x.rubric.map((r,i)=><article className="rubric-card" key={i}><h3>{r.name}</h3><p>{r.description}</p></article>)}</div></section>
    <section className="section"><div className="exit-ticket compact"><div><div className="eyebrow">Milestone progress</div><h2>Mark complete only after the evidence packet</h2><p>A milestone is complete when the deliverables, failure testing, and review rubric are satisfied without following a transcript.</p></div><CompleteButton id={`milestone:${x.slug}`}/></div></section>
    <div className="actions"><Link className="button ghost" href="/milestones">← All milestones</Link><Link className="button" href="/dashboard">Open progress dashboard →</Link></div>
  </main>
}
