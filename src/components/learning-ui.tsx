import {TaskCheck} from "@/components/progress";

export function FlowFigure({title,steps,caption}:{title:string;steps:string[];caption?:string}){
  return <figure className="flow-figure"><div className="figure-title">{title}</div><div className="flow-row">{steps.map((s,i)=><div className="flow-node-wrap" key={`${i}-${s}`}><div className="flow-node">{s}</div>{i<steps.length-1&&<div className="flow-arrow" aria-hidden="true">→</div>}</div>)}</div>{caption&&<figcaption>{caption}</figcaption>}</figure>
}

export function Checklist({title,items,idPrefix}:{title:string;items:string[];idPrefix:string}){
  return <div className="check-card"><h3>{title}</h3>{items.map((x,i)=><TaskCheck key={i} id={`${idPrefix}:${i}`} label={x}/>)}</div>
}

export function NumberedSteps({items}:{items:string[]}){
  return <ol className="step-list">{items.map((x,i)=><li key={i}><span>{String(i+1).padStart(2,"0")}</span><p>{x}</p></li>)}</ol>
}

export function FailureCards({items}:{items:string[]}){
  return <div className="failure-grid">{items.map((x,i)=><article className="failure-card" key={i}><div className="eyebrow">Failure drill {i+1}</div><h3>{x}</h3><p>Predict the symptom, capture evidence at the nearest boundary, change one variable, and verify the same reproduction after the fix.</p></article>)}</div>
}
