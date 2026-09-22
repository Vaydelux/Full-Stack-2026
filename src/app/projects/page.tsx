import Link from "next/link";
import {getTrackProjectMeta} from "@/lib/course";

export default function ProjectsPage(){
 const meta=getTrackProjectMeta();
 return <main className="shell">
  <section className="hero"><div><div className="eyebrow">Hands-on projects</div><h1>{meta.title}</h1><p>{meta.subtitle}</p><div className="actions"><Link className="button" href={`/projects/${meta.projects[0].slug}`}>Start the first project →</Link><Link className="button ghost" href="/milestones">Open milestone projects</Link></div></div><aside className="hero-card"><div className="eyebrow">How to use projects</div><p>Finish the related guided track first. Then try the project with the lesson tabs closed. Reopen the course only when you can name the exact gap you need to review.</p><p className="muted">A project is complete when you can show working evidence, explain the main boundary decisions, and reproduce at least one important part without copying.</p></aside></section>
  <section className="section"><div className="eyebrow">Track projects</div><h2>Build something at the end of every major topic.</h2><div className="grid cards">{meta.projects.map(p=><Link className="card big-card" key={p.slug} href={`/projects/${p.slug}`}><div className="eyebrow">Project {String(p.number).padStart(2,"0")}</div><h3>{p.title}</h3><p className="muted">{p.goal}</p><small>Open project →</small></Link>)}</div></section>
 </main>
}
