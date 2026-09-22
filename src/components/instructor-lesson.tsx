import {Checklist,FlowFigure,NumberedSteps} from "@/components/learning-ui";
import type {InstructorLesson} from "@/lib/course";
import {CodeBlock} from "@/components/code-block";

export function InstructorLessonView({lesson,figureId}:{lesson:InstructorLesson;figureId:string}){
 const guide=lesson.casualGuide;
 return <div>
  <section className="phase-head"><div className="eyebrow">Guided Course · {lesson.audience}</div><h1>{lesson.title}</h1><p>{lesson.why}</p><p className="muted">≈ {lesson.approxWordCount.toLocaleString()} structured instructional words</p></section>

  <section className="section"><div className="eyebrow">Learning contract</div><h2>What you should be able to do</h2><Checklist title="Objectives" items={lesson.objectives} idPrefix={`i:${figureId}:obj`}/><h3>Before you start</h3><ul>{lesson.prerequisites.map((x,i)=><li key={i}>{x}</li>)}</ul></section>

  {guide&&<section className="section teaching-guide"><div className="eyebrow">Plain-English lesson</div><h2>First, understand the idea without the jargon</h2>{guide.plainEnglish.map((p,i)=><p key={i}>{p}</p>)}<div className="two-col"><div className="card"><h3>Keep these ideas in your head</h3><ul>{guide.keyIdeas.map((x,i)=><li key={i}>{x}</li>)}</ul></div><div className="card"><h3>A simple way to practice it</h3><ol>{guide.walkthrough.map((x,i)=><li key={i}>{x}</li>)}</ol></div></div></section>}

  <section className="section"><div className="eyebrow">Mental model</div><h2>Understand the boundary before the syntax</h2>{lesson.mentalModel.map((p,i)=><p key={i}>{p}</p>)}<FlowFigure title={`${figureId} — Evidence loop`} steps={["requirement","predict","small diff","run","observe","break","diagnose","repair","test","transfer"]} caption="Treat every implementation as a chain of observable boundaries. Debug the first mismatch, not the loudest downstream symptom."/></section>

  <section className="section"><div className="eyebrow">Current project state</div><h2>Know where you are before changing code</h2><p>{lesson.currentState}</p><NumberedSteps items={lesson.beforeYouCode}/></section>

  <section className="section"><div className="eyebrow">Step-by-step code-along</div><h2>Build it in small pieces you can explain</h2><NumberedSteps items={lesson.steps}/><CodeBlock code={lesson.example.code} label={lesson.example.language} caption="Worked example"/><div className="expected-evidence"><b>What you should observe</b><p>{lesson.example.expected}</p></div></section>

  <section className="section"><div className="eyebrow">Verification</div><h2>Prove that it works</h2><Checklist title="Evidence checklist" items={lesson.expectedEvidence} idPrefix={`i:${figureId}:evidence`}/></section>

  <section className="section"><div className="eyebrow">Break it on purpose</div><h2>Controlled failure lab</h2><p>{lesson.breakIt}</p><div className="table-wrap"><table><thead><tr><th>Symptom</th><th>What to inspect</th></tr></thead><tbody>{lesson.troubleshooting.map((x,i)=><tr key={i}><td>{x.symptom}</td><td>{x.investigation}</td></tr>)}</tbody></table></div></section>

  {guide&&<section className="section"><div className="eyebrow">Common mistakes</div><h2>Things that usually confuse learners</h2><div className="grid cards">{guide.commonMistakes.map((x,i)=><article className="card" key={i}><h3>{x.mistake}</h3><p><b>Better approach:</b> {x.fix}</p></article>)}</div></section>}

  <section className="section"><div className="eyebrow">Practice ladder</div><h2>Follow → modify → debug → build → defend</h2><div className="grid cards">{lesson.exercises.map((x,i)=><article className="card" key={i}><div className="eyebrow">{x.level}</div><p>{x.task}</p></article>)}</div></section>

  <section className="section"><div className="eyebrow">Knowledge check</div><h2>Answer in your own words before opening the answer</h2>{lesson.knowledgeCheck.map((q,i)=><details className="card" key={i}><summary>{q.question}</summary><p><b>Answer:</b> {q.answer}</p><p>{q.explanation}</p></details>)}</section>

  <section className="section"><div className="eyebrow">Production note</div><h2>What changes in a real application</h2>{lesson.productionNotes.map((p,i)=><p key={i}>{p}</p>)}</section>

  {guide&&<section className="section"><div className="eyebrow">Quick recap</div><h2>Before you leave this page</h2><ul>{guide.recap.map((x,i)=><li key={i}>{x}</li>)}</ul></section>}

  <section className="section"><div className="eyebrow">Exit ticket</div><h2>Continue only when these feel true</h2><Checklist title="Mastery evidence" items={lesson.exitTicket} idPrefix={`i:${figureId}:exit`}/></section>
 </div>
}
