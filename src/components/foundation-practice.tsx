import {NumberedSteps} from "@/components/learning-ui";
import type {FoundationPractice as Practice} from "@/lib/course";
import {CodeBlock} from "@/components/code-block";

export function FoundationPractice({practice}:{practice:Practice}){
 return <section className="foundation-practice section">
   <div className="eyebrow">Hands-on foundation studio</div><h2>Predict → build → run → break → explain</h2>
   <div className="two-col">
    <article className="mastery-card"><h3>Objectives</h3><ul>{practice.objectives.map((x,i)=><li key={i}>{x}</li>)}</ul></article>
    <article className="mastery-card"><h3>Setup</h3><ol>{practice.setup.map((x,i)=><li key={i}>{x}</li>)}</ol></article>
   </div>
   <div className="mastery-block"><h3>Do the work</h3><NumberedSteps items={practice.steps}/></div>
   <CodeBlock code={practice.example.code} label={practice.example.language} caption={practice.example.caption}/><p className="code-guidance">Type it, predict it, run it, then change one assumption. The goal is not finishing the snippet; the goal is being able to explain the result.</p>
   <div className="mastery-grid"><article className="mastery-card"><h3>Expected evidence</h3><ul>{practice.expected.map((x,i)=><li key={i}>{x}</li>)}</ul></article><article className="mastery-card danger"><h3>Intentional failure</h3><p>{practice.breakIt}</p></article></div>
   <div className="review-questions"><h3>Explain it back</h3><ol>{practice.explainBack.map((x,i)=><li key={i}>{x}</li>)}</ol></div>
   <div className="checkpoint-banner"><b>Checkpoint</b><p>{practice.checkpoint}</p></div>
 </section>
}
