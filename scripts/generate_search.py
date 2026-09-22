import json, pathlib, re
root=pathlib.Path(__file__).resolve().parents[1]
rows=[]
def flatten(x):
    if isinstance(x,str): return x
    if isinstance(x,(int,float,bool)) or x is None:return ''
    if isinstance(x,list): return ' '.join(flatten(v) for v in x)
    if isinstance(x,dict): return ' '.join(flatten(v) for v in x.values())
    return ''
def add(kind,title,subtitle,href,text):
    rows.append({'kind':kind,'title':title,'subtitle':subtitle,'href':href,'text':re.sub(r'\s+',' ',text).strip()[:18000]})
# guided
for p in sorted((root/'content/instructor').glob('*.json')):
    if p.name in ('meta.json','search-index.json'):continue
    d=json.loads(p.read_text());
    for l in d['lessons']:
        add('guided lesson',l['title'],d['title'],f"/instructor/{d['slug']}/{l['slug']}",flatten(l))
# projects
pm=json.loads((root/'content/projects/meta.json').read_text())
for x in pm['projects']:
    d=json.loads((root/'content/projects'/f"{x['slug']}.json").read_text()); add('track project',d['title'],'Hands-on track project',f"/projects/{d['slug']}",flatten(d))
# foundation
for p in sorted((root/'content/foundation').glob('*.json')):
    if p.name=='meta.json':continue
    d=json.loads(p.read_text())
    for l in d.get('lessons',[]): add('foundation',l['title'],d['title'],f"/foundation/{d['slug']}/{l['slug']}",flatten(l))
# course phases
for p in sorted((root/'content/course').glob('phase-*.json')):
    d=json.loads(p.read_text())
    for l in d.get('lessons',[]): add('course lesson',l['title'],d['title'],f"/course/{d['slug']}/{l['slug']}",flatten(l))
# deep dives
for p in sorted((root/'content/deep-dives').glob('*.json')):
    if p.name=='meta.json':continue
    d=json.loads(p.read_text())
    for l in d.get('lessons',[]): add('deep dive',l['title'],d['title'],f"/deep-dives/{d['slug']}/{l['slug']}",flatten(l))
# milestones
for p in sorted((root/'content/milestones').glob('milestone-*.json')):
    d=json.loads(p.read_text()); add('milestone',d['title'],d['span'],f"/milestones/{d['slug']}",flatten(d))
# static refs
add('setup','Windows Development Environment Setup','Zero-to-ready setup and troubleshooting','/setup','PowerShell Git VS Code Node Corepack pnpm PATH ports environment variables Docker browser DevTools build Vercel setup Windows troubleshooting')
add('handbook','Commands','Command reference','/handbook/commands','pnpm git prisma docker powershell commands scripts build dev test typecheck migrations')
add('handbook','Error Playbook','Debugging reference','/handbook/errors','errors CORS 401 403 P1001 port node pnpm docker CI deployment diagnosis')
add('handbook','Glossary','Plain-language terminology','/handbook/glossary','browser server client runtime build process HTTP REST state cache ORM migration authorization authentication')
add('handbook','Architecture','TaskFlow architecture maps','/handbook/architecture','architecture browser Next.js NestJS Prisma PostgreSQL request boundary state ownership production topology')
add('themes','Theme Tokens','Visual theme selection','/themes','theme tokens colors appearance accent Moonlight Dark Aurora')
# stable unique by href
seen=set();out=[]
for r in rows:
    if r['href'] in seen:continue
    seen.add(r['href']);out.append(r)
(root/'public/search-index.json').write_text(json.dumps(out,ensure_ascii=False,separators=(',',':')))
print('search records',len(out))
