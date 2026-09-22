import {notFound} from "next/navigation";
import Link from "next/link";
import {getGuide,getLesson,getMeta,getPhase} from "@/lib/course";
import {CompleteButton} from "@/components/progress";
import {LessonBody} from "@/components/lesson-body";
import {FlowFigure} from "@/components/learning-ui";
import {MasteryWorkshop} from "@/components/mastery-workshop";
import {LessonVisit} from "@/components/lesson-visit";

export function generateStaticParams(){const m=getMeta();return m.phases.flatMap(p=>{const ph=getPhase(p.slug)!;return ph.lessons.map(l=>({phase:p.slug,lesson:l.slug}))})}

export default async function LessonPage({params}:{params:Promise<{phase:string;lesson:string}>}){
  const a=await params; const x=getLesson(a.phase,a.lesson); if(!x)notFound();
  const {phase,lesson}=x; const g=getGuide(phase.slug); if(!g)notFound();
  const idx=phase.lessons.findIndex(l=>l.slug===lesson.slug); const prev=phase.lessons[idx-1],next=phase.lessons[idx+1];
  const step=g.labSteps[(Math.max(1,lesson.number)-1)%g.labSteps.length];
  const failure=g.failureModes[(Math.max(1,lesson.number)-1)%g.failureModes.length];
  const principle=g.principles[(Math.max(1,lesson.number)-1)%Math.max(1,g.principles.length)] ?? g.outcome;
  return <main className="lesson">
    <LessonVisit href={`/course/${phase.slug}/${lesson.slug}`} title={lesson.title} kind={`Phase ${String(phase.number).padStart(2,"0")} · ${phase.title}`}/>
    <div className="eyebrow"><Link href={`/course/${phase.slug}`}>Phase {String(phase.number).padStart(2,'0')}</Link> · Lesson {String(lesson.number).padStart(2,'0')}</div>
    <h1>{lesson.title}</h1>
    <div className="lesson-meta">≈ {Math.max(2,Math.round(lesson.wordCount/210))} min core reading · {lesson.wordCount.toLocaleString()} source/companion words</div>

    <section className="section"><div className="lesson-contract"><div><div className="eyebrow">Learning contract</div><h2>What you should be able to do after this</h2><ul><li>Explain <b>{lesson.title}</b> without relying on framework buzzwords.</li><li>Connect the lesson to the phase outcome: {g.outcome}</li><li>Reproduce the relevant behavior and verify it with evidence.</li><li>Diagnose at least one representative failure instead of guessing.</li></ul></div><aside><div className="eyebrow">Engineering principle</div><p>{principle}</p></aside></div></section>

    <FlowFigure title={`Figure ${phase.number}.${lesson.number} — TaskFlow boundary map`} steps={g.flow} caption={`This lesson belongs to Phase ${String(phase.number).padStart(2,'0')}. Keep the full request/data path visible even when today's code changes only one box.`}/>

    <section className="section"><div className="callout"><b>Instructor workflow:</b> predict first → implement the smallest slice → run it → inspect evidence → break one assumption → diagnose → explain it back. Do not copy the whole code block before understanding the first failing boundary.</div></section>

    <LessonBody text={lesson.body}/>

    {lesson.workshop&&<MasteryWorkshop workshop={lesson.workshop} figureId={`Figure ${phase.number}.${lesson.number}B`}/>}

    <section className="section lesson-studio"><div className="eyebrow">Lesson studio</div><h2>Turn the reading into skill</h2><div className="studio-grid"><article className="studio-card"><span>01</span><h3>Do it</h3><p>{step}</p><small>Use the smallest change that demonstrates this lesson. Stop after it works and capture evidence.</small></article><article className="studio-card danger"><span>02</span><h3>Break it safely</h3><p>{failure}</p><small>Predict the symptom before causing the failure. Then locate the earliest boundary where reality diverges from expectation.</small></article><article className="studio-card"><span>03</span><h3>Explain it back</h3><p>Why does this responsibility live here, what input does it trust, what output proves success, and what would go wrong if another layer owned it?</p><small>If your explanation is vague, repeat the boundary trace before moving on.</small></article></div></section>

    <section className="section"><div className="exit-ticket"><div><div className="eyebrow">Exit ticket</div><h2>Before marking complete</h2><p>Close the reference. Reproduce the core idea from memory or explain the exact request/data flow aloud. Then check your diff or notes for accidental shortcuts that bypass validation, authorization, error handling, or verification earned in earlier phases.</p></div><CompleteButton id={`${phase.slug}:${lesson.slug}`}/></div></section>

    <div className="actions lesson-actions">{prev&&<Link className="button ghost" href={`/course/${phase.slug}/${prev.slug}`}>← {prev.title}</Link>}{next&&<Link className="button" href={`/course/${phase.slug}/${next.slug}`}>{next.title} →</Link>}{!next&&<Link className="button" href={`/course/${phase.slug}`}>Phase review →</Link>}</div>
  </main>
}
