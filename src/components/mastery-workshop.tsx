import {FlowFigure,NumberedSteps} from "@/components/learning-ui";
import {CodeBlock} from "@/components/code-block";

export type Workshop={topic:string;objectives:string[];why:string;mentalModel:string[];steps:string[];example:{language:string;caption:string;code:string};verify:string[];breakIt:string[];troubleshooting:{symptom:string;investigation:string}[];challenge:string;review:string[]};

export function MasteryWorkshop({workshop,figureId}:{workshop:Workshop;figureId:string}){
  return <section className="mastery-workshop section">
    <div className="eyebrow">Executable lesson studio · {workshop.topic}</div>
    <h2>Now turn the explanation into engineering skill.</h2>
    <p className="mastery-lead">{workshop.why}</p>

    <div className="mastery-objectives">
      <h3>By the end, you should be able to</h3>
      <ul>{workshop.objectives.map((x,i)=><li key={i}>{x}</li>)}</ul>
    </div>

    <FlowFigure title={`${figureId} — Mental model`} steps={workshop.mentalModel} caption="Read left-to-right while implementing. When debugging, walk right-to-left until the first observed fact differs from your prediction."/>

    <div className="mastery-block">
      <div className="eyebrow">Code-along sequence</div><h3>One coherent change at a time</h3>
      <NumberedSteps items={workshop.steps}/>
    </div>

    <CodeBlock code={workshop.example.code} label={workshop.example.language} caption={workshop.example.caption}/>
    <p className="code-guidance">Do not copy this as a finished answer. Predict what each boundary does, type the smallest useful slice, run it, then compare the result with your prediction.</p>

    <div className="mastery-grid">
      <article className="mastery-card"><div className="eyebrow">Verification</div><h3>Prove the happy path</h3><ol>{workshop.verify.map((x,i)=><li key={i}>{x}</li>)}</ol></article>
      <article className="mastery-card danger"><div className="eyebrow">Break it on purpose</div><h3>Build debugging memory</h3><ol>{workshop.breakIt.map((x,i)=><li key={i}>{x}</li>)}</ol></article>
    </div>

    <div className="troubleshoot-table"><div className="troubleshoot-head"><b>Symptom</b><b>Investigation path</b></div>{workshop.troubleshooting.map((x,i)=><div className="troubleshoot-row" key={i}><strong>{x.symptom}</strong><p>{x.investigation}</p></div>)}</div>

    <div className="independent-challenge"><div className="eyebrow">Closed-reference challenge</div><h3>Can you transfer the idea?</h3><p>{workshop.challenge}</p></div>

    <div className="review-questions"><div className="eyebrow">Explain-back</div><h3>Answer these without reopening the solution</h3><ol>{workshop.review.map((x,i)=><li key={i}>{x}</li>)}</ol></div>
  </section>
}
