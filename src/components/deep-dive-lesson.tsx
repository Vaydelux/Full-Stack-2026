import {Checklist,FlowFigure,NumberedSteps} from "@/components/learning-ui";
import type {DeepDiveLesson} from "@/lib/course";
import {CodeBlock} from "@/components/code-block";

export function DeepDiveLessonView({lesson,figureId}:{lesson:DeepDiveLesson;figureId:string}){
return <div>
<section className="phase-head"><div className="eyebrow">Deep Instruction · {lesson.audience}</div><h1>{lesson.title}</h1><p>{lesson.why}</p></section>
<section className="section"><div className="eyebrow">Learning contract</div><h2>What you must be able to do</h2><Checklist title="Objectives" items={lesson.objectives} idPrefix={`deep:${figureId}:obj`}/></section>
<section className="section"><div className="eyebrow">Mental model</div><h2>Understand the idea before syntax</h2><p>{lesson.mentalModel}</p><FlowFigure title={`${figureId} — Evidence loop`} steps={["predict","implement","run","observe","locate first mismatch","repair","re-run"]} caption="When the result differs from your prediction, debugging starts at the first boundary where evidence diverges—not at the last visible symptom."/></section>
<section className="section"><div className="eyebrow">Before you code</div><h2>Establish a healthy baseline</h2><NumberedSteps items={lesson.beforeYouCode}/></section>
<section className="section"><div className="eyebrow">Instructor code-along</div><h2>Small change, immediate evidence</h2><NumberedSteps items={lesson.steps}/><CodeBlock code={lesson.example.code} label={lesson.example.language||"Code"} caption="Working example"/><div className="expected-evidence"><b>Expected evidence</b><p>{lesson.example.expected}</p></div></section>
<section className="section"><div className="eyebrow">Break it on purpose</div><h2>{lesson.breakIt}</h2><p>Do not fix it immediately. Capture the compiler error, request/response, stack trace, database state, browser output, or CI log first. Debugging skill grows from comparing evidence with a prior prediction.</p><div className="card"><h3>Investigation checklist</h3><ol>{lesson.debugChecklist.map((x,i)=><li key={i}>{x}</li>)}</ol></div></section>
<section className="section"><div className="eyebrow">Transfer challenge</div><h2>Now work without the transcript</h2><p>{lesson.challenge}</p></section>
<section className="section"><div className="eyebrow">Exit ticket</div><h2>Continue only when these are true</h2><Checklist title="Mastery evidence" items={lesson.exitTicket} idPrefix={`deep:${figureId}:exit`}/></section>
</div>}
