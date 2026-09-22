import {ProgressDashboard} from "@/components/progress-dashboard";
import {getDeepDiveMeta,getFoundationMeta,getInstructorMeta,getMeta,getMilestoneMeta} from "@/lib/course";
export default function Dashboard(){
 const c=getMeta();const f=getFoundationMeta();const i=getInstructorMeta();const d=getDeepDiveMeta();const m=getMilestoneMeta();
 return <main className="shell"><ProgressDashboard
  phases={c.phases} foundation={f.modules} instructor={i.tracks} deep={d.tracks} milestones={m.milestones.map(x=>({number:x.number,slug:x.slug,title:x.title,lessonCount:1}))}
  totalCourseLessons={c.phases.reduce((a,p)=>a+p.lessonCount,0)}
  totalFoundationLessons={f.modules.reduce((a,m)=>a+m.lessonCount,0)}
  totalInstructorLessons={i.tracks.reduce((a,m)=>a+m.lessonCount,0)}
  totalDeepLessons={d.tracks.reduce((a,m)=>a+m.lessonCount,0)}
 /></main>
}
