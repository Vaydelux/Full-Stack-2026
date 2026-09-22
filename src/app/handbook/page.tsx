import Link from "next/link";
const items=[
 ["Commands","A quick operational reference for repository, pnpm, Prisma, Docker, Git, and verification workflows.","/handbook/commands"],
 ["Error Playbook","Diagnose environment, HTTP, auth, Prisma, database, Docker, CI, and deployment failures by boundary.","/handbook/errors"],
 ["Glossary","Plain-language definitions for the vocabulary that appears throughout the 37-phase system.","/handbook/glossary"],
 ["Architecture","The recurring TaskFlow request path, responsibility map, state ownership, and production topology.","/handbook/architecture"],
];
export default function Handbook(){return <main className="shell"><section className="phase-head"><div className="eyebrow">Course companion</div><h1>A reference you keep after finishing the course.</h1><p>The main path teaches in dependency order. The handbook is for jumping directly to a command, failure pattern, term, or architecture map while you build.</p></section><section className="section"><div className="module-grid">{items.map(([t,d,h])=><Link className="module-card" href={h} key={h}><div className="eyebrow">Reference</div><h3>{t}</h3><p>{d}</p><small>Open →</small></Link>)}</div></section></main>}
