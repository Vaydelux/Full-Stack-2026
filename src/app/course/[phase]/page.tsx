import {notFound} from "next/navigation";
import Link from "next/link";
import {getGuide,getMeta,getPhase} from "@/lib/course";
import {CourseSidebar} from "@/components/nav";
import {Quiz} from "@/components/quiz";
import {Checklist,FailureCards,FlowFigure,NumberedSteps} from "@/components/learning-ui";
import {CodeBlock} from "@/components/code-block";

export function generateStaticParams(){return getMeta().phases.map(p=>({phase:p.slug}))}

export default async function PhasePage({params}:{params:Promise<{phase:string}>}){
  const {phase:slug}=await params;
  const p=getPhase(slug); if(!p)notFound();
  const g=getGuide(slug); if(!g)notFound();
  return <div className="course-layout"><CourseSidebar current={p.number}/><main>
    <section className="phase-head">
      <div className="eyebrow">Volume {String(p.volume).padStart(2,'0')} · Phase {String(p.number).padStart(2,'0')}</div>
      <h1>{p.title}</h1>
      <p>{g.outcome}</p>
      <div className="metrics"><div className="metric"><b>{p.lessonCount}</b><span>lessons + labs</span></div><div className="metric"><b>{Math.round(p.wordCount/1000)}k</b><span>lesson words</span></div><div className="metric"><b>{p.references.length}</b><span>source references</span></div></div>
    </section>

    <section className="section">
      <div className="eyebrow">What you will ship</div><h2>Phase outcome and project increment</h2>
      <div className="two-col"><div className="card"><h3>Learning outcome</h3><p>{g.outcome}</p></div><div className="card"><h3>Concrete deliverable</h3><p>{g.artifact}</p></div></div>
      <FlowFigure title={`Figure ${p.number}.1 — Where this phase lives in TaskFlow`} steps={g.flow} caption="Trace the flow left-to-right for implementation and right-to-left for debugging. At every arrow, ask what data crosses the boundary and what proves it is trustworthy."/>
    </section>

    <section className="section">
      <div className="eyebrow">Instructor mental model</div><h2>Principles to keep while coding</h2>
      <div className="principle-grid">{g.principles.map((x,i)=><article className="principle" key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{x}</p></article>)}</div>
    </section>

    <section className="section">
      <div className="eyebrow">Code-along path</div><h2>Guided phase lab</h2>
      <p className="muted">Do these in order. Each step should end with evidence before the next one starts.</p>
      <NumberedSteps items={g.labSteps}/>
      {g.commands.length>0&&<><CodeBlock code={g.commands.join("\n")} label="Terminal" caption="Verification commands"/><p className="code-guidance">Predict what each command proves before running it. A command is useful only when its output answers a question.</p></>}
    </section>

    <section className="section">
      <div className="eyebrow">Debugging studio</div><h2>Failures you should know how to diagnose</h2>
      <FailureCards items={g.failureModes}/>
    </section>

    <section className="section">
      <div className="eyebrow">Watch-order style</div><h2>Lessons</h2>
      <p className="muted">The source chapters come first. Every phase now ends with a guided build, a debugging workshop, and an independent challenge so reading turns into transferable skill.</p>
      <div className="lesson-list">{p.lessons.map(l=><Link className={`lesson-row ${l.generatedCompanion?'companion':''}`} key={l.slug} href={`/course/${p.slug}/${l.slug}`}><span className="lesson-num">{l.generatedCompanion?'LAB':String(l.number).padStart(2,'0')}</span><div><h3>{l.title}</h3><p>{l.summary.slice(0,190)}</p></div><small>{Math.max(2,Math.round(l.wordCount/210))} min</small></Link>)}</div>
    </section>

    <section className="section"><div className="eyebrow">Practice ladder</div><h2>Exercises that increase independence</h2><div className="exercise-grid">{p.exercises.map((e,i)=><div className="exercise-card" key={`${i}-${e}`}><b>{i===0?'Guided':i===1?'Practice':i===2?'Debug':i===3?'Independent':'Explain-back'}</b><p>{e.replace(/^[^:]+:\s*/,"")}</p></div>)}</div></section>

    <section className="section"><div className="eyebrow">Mastery gate</div><h2>Do not leave the phase only because you reached the bottom</h2><Checklist title="Phase exit criteria" items={g.mastery} idPrefix={`${p.slug}:mastery`}/></section>

    <section className="section"><div className="eyebrow">Knowledge check</div><h2>Scenario and concept quiz</h2><p className="muted">These questions test engineering choices rather than whether you remember a lesson title.</p><Quiz id={`${p.slug}:phase-quiz`} items={p.quiz}/></section>

    {p.references.length>0&&<section className="section"><div className="eyebrow">Source snapshot</div><h2>Reference files</h2><p className="muted">Attempt the work first. Use snapshots to compare a checkpoint, not as a substitute for understanding.</p>{p.references.slice(0,40).map(r=><details className="source-details" key={r.path}><summary>{r.path}</summary><pre>{r.preview||'Binary or empty reference file.'}</pre></details>)}</section>}
  </main></div>
}
