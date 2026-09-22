import Link from "next/link";
import {notFound} from "next/navigation";
import {getInstructorLesson,getInstructorMeta,getInstructorTrack} from "@/lib/course";
import {InstructorLessonView} from "@/components/instructor-lesson";
import {CompleteButton} from "@/components/progress";
import {LessonVisit} from "@/components/lesson-visit";

export function generateStaticParams(){return getInstructorMeta().tracks.flatMap(t=>{const x=getInstructorTrack(t.slug);return (x?.lessons??[]).map(l=>({track:t.slug,lesson:l.slug}))})}
export default async function Page({params}:{params:Promise<{track:string;lesson:string}>}){
 const {track,lesson}=await params;const x=getInstructorLesson(track,lesson);if(!x)notFound();
 const idx=x.track.lessons.findIndex(l=>l.slug===lesson);const prev=x.track.lessons[idx-1],next=x.track.lessons[idx+1];
 const href=`/instructor/${track}/${lesson}`;
 return <main className="lesson lesson-wide"><LessonVisit href={href} title={x.lesson.title} kind={`Instructor · ${x.track.title}`}/><Link href={`/instructor/${track}`} className="back-link">← {x.track.title}</Link><InstructorLessonView lesson={x.lesson} figureId={`I${x.track.number}.${idx+1}`}/><section className="section"><div className="exit-ticket compact"><div><div className="eyebrow">Lesson progress</div><h2>Record completion after the exit ticket</h2><p>Your completion state is stored only in this browser.</p></div><CompleteButton id={`instructor:${track}:${lesson}`}/></div></section><nav className="actions lesson-actions" aria-label="Lesson navigation">{prev&&<Link className="button ghost prev" href={`/instructor/${track}/${prev.slug}`}>← {prev.title}</Link>}{next?<Link className="button next" href={`/instructor/${track}/${next.slug}`}>{next.title} →</Link>:<Link className="button next" href={`/instructor/${track}`}>Track review →</Link>}</nav></main>
}
