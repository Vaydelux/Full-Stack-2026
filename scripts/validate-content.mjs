import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const errors=[];
const warnings=[];
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const exists=p=>fs.existsSync(path.join(root,p));
const assert=(ok,msg)=>{if(!ok)errors.push(msg)};

function unique(items,label){
 const seen=new Set();
 for(const value of items){if(seen.has(value))errors.push(`Duplicate ${label}: ${value}`);seen.add(value)}
}

const instructorMeta=read("content/instructor/meta.json");
unique(instructorMeta.tracks.map(t=>t.slug),"guided track slug");
let guidedCount=0;
for(const t of instructorMeta.tracks){
 const file=`content/instructor/${t.slug}.json`;
 assert(exists(file),`Missing guided track file: ${file}`);
 if(!exists(file))continue;
 const data=read(file);
 assert(data.slug===t.slug,`${file}: slug does not match meta`);
 assert(data.lessons.length===t.lessonCount,`${file}: lessonCount=${t.lessonCount}, actual=${data.lessons.length}`);
 unique(data.lessons.map(l=>l.slug),`${t.slug} lesson slug`);
 for(const l of data.lessons){
  guidedCount++;
  assert(Boolean(l.title&&l.why),`${t.slug}/${l.slug}: missing title/why`);
  assert(Array.isArray(l.objectives)&&l.objectives.length>=2,`${t.slug}/${l.slug}: needs objectives`);
  assert(Array.isArray(l.mentalModel)&&l.mentalModel.length>=3,`${t.slug}/${l.slug}: needs mental-model depth`);
  assert(Boolean(l.example?.code&&l.example?.expected),`${t.slug}/${l.slug}: missing worked example`);
  assert(Array.isArray(l.expectedEvidence)&&l.expectedEvidence.length>=4,`${t.slug}/${l.slug}: needs expected evidence`);
  assert(Boolean(l.breakIt),`${t.slug}/${l.slug}: missing failure lab`);
  assert(Array.isArray(l.exercises)&&l.exercises.length>=5,`${t.slug}/${l.slug}: needs five-level practice`);
  assert(Array.isArray(l.knowledgeCheck)&&l.knowledgeCheck.length>=5,`${t.slug}/${l.slug}: needs at least five knowledge checks`);
  assert(Array.isArray(l.casualGuide?.plainEnglish)&&l.casualGuide.plainEnglish.length>=2,`${t.slug}/${l.slug}: missing casual guide`);
 }
 const projectFile=`content/projects/${t.slug}.json`;
 assert(exists(projectFile),`Missing track project: ${projectFile}`);
}

const foundationMeta=read("content/foundation/meta.json");
for(const m of foundationMeta.modules){assert(exists(`content/foundation/${m.slug}.json`),`Missing foundation module ${m.slug}`)}

const courseMeta=read("content/course/meta.json");
for(const p of courseMeta.phases){assert(exists(`content/course/${p.slug}.json`),`Missing course phase ${p.slug}`)}

const deepMeta=read("content/deep-dives/meta.json");
for(const t of deepMeta.tracks){assert(exists(`content/deep-dives/${t.slug}.json`),`Missing deep-dive track ${t.slug}`)}

const projectMeta=read("content/projects/meta.json");
assert(projectMeta.projects.length===instructorMeta.tracks.length,"Track project count should match guided track count");
unique(projectMeta.projects.map(p=>p.slug),"track project slug");

const search=read("public/search-index.json");
unique(search.map(r=>r.href),"search href");
for(const t of instructorMeta.tracks){
 const data=read(`content/instructor/${t.slug}.json`);
 for(const l of data.lessons){
  const href=`/instructor/${t.slug}/${l.slug}`;
  assert(search.some(r=>r.href===href),`Search index missing ${href}`);
 }
}
for(const p of projectMeta.projects){assert(search.some(r=>r.href===`/projects/${p.slug}`),`Search index missing project ${p.slug}`)}

if(errors.length){
 console.error(`Content validation failed with ${errors.length} error(s):`);
 for(const e of errors)console.error(`- ${e}`);
 process.exit(1);
}
console.log(`Content validation passed: ${guidedCount} guided lessons, ${projectMeta.projects.length} track projects, ${search.length} search records.`);
if(warnings.length){for(const w of warnings)console.warn(`Warning: ${w}`)}
