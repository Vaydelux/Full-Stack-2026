const errors=[
 ["Command not found / wrong version","Environment","Run Get-Command/which and version output. Confirm fresh terminal PATH before reinstalling anything."],
 ["Port already in use","Process/OS","Find the listening PID, identify the process, then stop or reconfigure the correct service."],
 ["CORS error","Browser/network boundary","Check the actual browser Origin, API allow-list, credentials mode, preflight response, and whether the request reaches the API."],
 ["401 Unauthorized","Authentication","Verify Authorization/cookie presence, token format, expiry, issuer/project, and server-side verification."],
 ["403 Forbidden","Authorization","Identity is usually known; inspect resource membership/role/permission evidence and policy decision."],
 ["404 for known record","Routing or disclosure policy","First prove route/method; then verify resource lookup and whether authorization intentionally masks existence."],
 ["Prisma P1001 / connection failure","Database connectivity","Check host/port/DNS, connection mode/pooler, credentials, firewall/service status, then retry a minimal connection."],
 ["Migration drift/conflict","Schema history","Compare migration history, target database state, and branch changes. Do not delete migrations casually in shared environments."],
 ["Stale TanStack Query UI","Server-state cache","Inspect query key, staleTime, mutation invalidation/update, filter params, and whether data was copied into local state."],
 ["Optimistic item snaps back","Mutation reconciliation","Inspect snapshot/rollback, server response, invalidation timing, temporary IDs, and concurrent mutation ordering."],
 ["Docker container exits immediately","Container process","Read docker logs, inspect command/entrypoint/env, and run the process interactively if safe."],
 ["GitHub Actions works locally but fails CI","Reproducibility","Compare Node/pnpm versions, frozen lockfile, workspace scripts, environment/secrets, OS assumptions, and path case sensitivity."],
 ["Production works in preview but not custom domain","Deployment boundary","Check DNS/TLS, configured origins/redirect URLs, public API base URL, CORS, and environment selection."],
];
export default function Errors(){return <main className="shell narrow-shell"><section className="phase-head"><div className="eyebrow">Handbook · error playbook</div><h1>Locate the failing boundary before changing code.</h1><p>Start from the exact symptom. The first question is not “what fix should I paste?” but “which layer can actually produce this symptom?”</p></section><section className="section"><div className="error-playbook">{errors.map(([e,b,a],i)=><article className="error-card" key={e}><div className="eyebrow">{String(i+1).padStart(2,'0')} · {b}</div><h3>{e}</h3><p>{a}</p></article>)}</div></section><section className="section"><div className="callout"><b>Universal loop:</b> reproduce → capture exact evidence → locate earliest failing boundary → one hypothesis → one change → rerun same reproduction → document root cause.</div></section></main>}
