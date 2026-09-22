import Link from "next/link";
import {notFound} from "next/navigation";
import {getTrackProject,getTrackProjectMeta} from "@/lib/course";
import {Checklist,NumberedSteps} from "@/components/learning-ui";

export function generateStaticParams(){return getTrackProjectMeta().projects.map(p=>({track:p.slug}))}

export default async function ProjectPage({params}:{params:Promise<{track:string}>}){
 const {track}=await params; const p=getTrackProject(track); if(!p)notFound();
 return <main className="lesson lesson-wide"><Link className="back-link" href="/projects">← Track projects</Link>
  <section className="phase-head"><div className="eyebrow">Track project · {String(p.number).padStart(2,"0")}</div><h1>{p.title}</h1><p>{p.goal}</p></section>
  <section className="section"><div className="eyebrow">Definition of done</div><h2>What you are building</h2><Checklist title="Deliverables" items={p.deliverables} idPrefix={`project:${p.slug}:deliverables`}/></section>
  <section className="section"><div className="eyebrow">Build plan</div><h2>Work through it one observable step at a time</h2><NumberedSteps items={p.steps}/></section>
  <section className="section"><div className="eyebrow">Evidence</div><h2>Do not rely on “it seems to work”</h2><Checklist title="Evidence to collect" items={p.evidence} idPrefix={`project:${p.slug}:evidence`}/></section>
  <section className="section"><div className="eyebrow">Project exit ticket</div><h2>Close the project only when these are true</h2><Checklist title="Completion" items={p.completion} idPrefix={`project:${p.slug}:complete`}/></section>
 </main>
}
