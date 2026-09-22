import Link from "next/link";
import {notFound} from "next/navigation";
import {getDeepDiveLesson,getDeepDiveMeta,getDeepDiveTrack} from "@/lib/course";
import {DeepDiveLessonView} from "@/components/deep-dive-lesson";
import {CompleteButton} from "@/components/progress";
import {LessonVisit} from "@/components/lesson-visit";

export function generateStaticParams(){return getDeepDiveMeta().tracks.flatMap(t=>{const x=getDeepDiveTrack(t.slug);return (x?.lessons??[]).map(l=>({track:t.slug,lesson:l.slug}))})}
export default async function DeepLesson({params}:{params:Promise<{track:string;lesson:string}>}){
 const {track,lesson}=await params;const x=getDeepDiveLesson(track,lesson);if(!x)notFound();const idx=x.track.lessons.findIndex(l=>l.slug===lesson);const prev=x.track.lessons[idx-1],next=x.track.lessons[idx+1];
 const href=`/deep-dives/${track}/${lesson}`;
 return <main className="lesson lesson-wide"><LessonVisit href={href} title={x.lesson.title} kind={`Deep Dive · ${x.track.title}`}/><Link href={`/deep-dives/${track}`} className="back-link">← {x.track.title}</Link><DeepDiveLessonView lesson={x.lesson} figureId={`D${x.track.number}.${idx+1}`}/><section className="section"><div className="exit-ticket compact"><div><div className="eyebrow">Lesson progress</div><h2>Record this deep-dive lesson</h2><p>Mark complete only after the transfer challenge and exit ticket.</p></div><CompleteButton id={`deep:${track}:${lesson}`}/></div></section><nav className="actions lesson-actions" aria-label="Lesson navigation">{prev&&<Link className="button ghost prev" href={`/deep-dives/${track}/${prev.slug}`}>← {prev.title}</Link>}{next?<Link className="button next" href={`/deep-dives/${track}/${next.slug}`}>{next.title} →</Link>:<Link className="button next" href={`/deep-dives/${track}`}>Track review →</Link>}</nav></main>
}
