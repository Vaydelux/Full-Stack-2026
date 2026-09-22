import Link from "next/link";
import {notFound} from "next/navigation";
import {getInstructorMeta,getInstructorTrack,getTrackProject} from "@/lib/course";
import {Quiz} from "@/components/quiz";
export function generateStaticParams(){return getInstructorMeta().tracks.map(t=>({track:t.slug}))}
export default async function Page({params}:{params:Promise<{track:string}>}){
 const {track}=await params;const t=getInstructorTrack(track);if(!t)notFound();const project=getTrackProject(track);
 return <main className="shell"><section className="phase-head"><div className="eyebrow">Guided Course · {t.audience}</div><h1>{t.title}</h1><p>{t.description}</p></section>
 {project&&<section className="section"><div className="callout"><b>Track project:</b> {project.title}. Finish the lessons, then close the transcript and build the project using evidence instead of copy-paste. <Link href={`/projects/${track}`}>Open project →</Link></div></section>}
 <section className="section"><div className="lesson-list">{t.lessons.map((l,i)=><Link className="lesson-row" href={`/instructor/${t.slug}/${l.slug}`} key={l.slug}><span className="lesson-num">{String(i+1).padStart(2,"0")}</span><div><h3>{l.title}</h3><p>{l.why}</p></div><small>≈ {l.approxWordCount} words</small></Link>)}</div></section>
 {t.quiz&&<section className="section"><div className="eyebrow">Track knowledge check</div><h2>Check the mental models before the project</h2><p className="muted">Answer from memory. If two options sound similar, explain the boundary difference before choosing.</p><Quiz items={t.quiz} id={`guided-track:${t.slug}`}/></section>}
 {project&&<section className="section"><div className="pedagogy-banner"><div><div className="eyebrow">Ready to transfer the skill?</div><h2>{project.title}</h2></div><div><p>{project.goal}</p><Link className="button" href={`/projects/${track}`}>Start track project →</Link></div></div></section>}
 </main>
}
