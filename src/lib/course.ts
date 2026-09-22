import fs from "node:fs";
import path from "node:path";

export type QuizItem={question:string;options:string[];answer:number;explanation?:string};
export type CodeExample={language:string;caption:string;code:string};
export type TroubleshootingItem={symptom:string;investigation:string};
export type MasteryWorkshop={topic:string;objectives:string[];why:string;mentalModel:string[];steps:string[];example:CodeExample;verify:string[];breakIt:string[];troubleshooting:TroubleshootingItem[];challenge:string;review:string[]};
export type FoundationPractice={objectives:string[];setup:string[];steps:string[];example:CodeExample;expected:string[];breakIt:string;explainBack:string[];checkpoint:string};
export type Lesson={number:number;slug:string;title:string;summary:string;body:string;wordCount:number;generatedCompanion?:boolean;workshop?:MasteryWorkshop};
export type Phase={number:number;slug:string;title:string;volume:number;readme:string;lessons:Lesson[];references:{path:string;preview:string}[];exercises:string[];quiz:QuizItem[];lessonCount:number;wordCount:number};
export type Meta={title:string;subtitle:string;volumes:{number:number;title:string;phases:number[]}[];phases:{number:number;slug:string;title:string;volume:number;lessonCount:number;wordCount:number}[];courseLocks:string[]};
export type FoundationLesson=Lesson&{objectives:string[];generatedLab?:boolean;practice?:FoundationPractice};
export type FoundationModule={number:number;slug:string;title:string;description:string;lessons:FoundationLesson[];lessonCount:number;wordCount:number;quiz:QuizItem[]};
export type FoundationMeta={title:string;subtitle?:string;modules:{number:number;slug:string;title:string;description:string;lessonCount:number;wordCount:number}[]};
export type PhaseGuide={number:number;slug:string;title:string;outcome:string;artifact:string;flow:string[];labSteps:string[];failureModes:string[];mastery:string[];commands:string[];principles:string[];prerequisites:string[];quiz:QuizItem[]};
export type Milestone={number:number;slug:string;title:string;span:string;goal:string;deliverables:string[];constraints:string[];steps:string[];evidence:string[];rubric:{name:string;description:string}[]};
export type MilestoneMeta={title:string;subtitle:string;milestones:{number:number;slug:string;title:string;span:string;goal:string}[]};

const courseRoot=path.join(process.cwd(),"content/course");
const foundationRoot=path.join(process.cwd(),"content/foundation");
const guideRoot=path.join(process.cwd(),"content/guides");
const milestoneRoot=path.join(process.cwd(),"content/milestones");
const deepDiveRoot=path.join(process.cwd(),"content/deep-dives");

export function getMeta():Meta{return JSON.parse(fs.readFileSync(path.join(courseRoot,"meta.json"),"utf8"));}
export function getPhase(slug:string):Phase|null{try{return JSON.parse(fs.readFileSync(path.join(courseRoot,`${slug}.json`),"utf8"));}catch{return null}}
export function getLesson(phaseSlug:string,lessonSlug:string){const p=getPhase(phaseSlug);if(!p)return null;const l=p.lessons.find(x=>x.slug===lessonSlug);return l?{phase:p,lesson:l}:null;}
export function getFoundationMeta():FoundationMeta{return JSON.parse(fs.readFileSync(path.join(foundationRoot,"meta.json"),"utf8"));}
export function getFoundationModule(slug:string):FoundationModule|null{try{return JSON.parse(fs.readFileSync(path.join(foundationRoot,`${slug}.json`),"utf8"));}catch{return null}}
export function getFoundationLesson(moduleSlug:string,lessonSlug:string){const m=getFoundationModule(moduleSlug);if(!m)return null;const l=m.lessons.find(x=>x.slug===lessonSlug);return l?{module:m,lesson:l}:null;}
export function getGuide(slug:string):PhaseGuide|null{try{return JSON.parse(fs.readFileSync(path.join(guideRoot,`${slug}.json`),"utf8"));}catch{return null}}
export function getPrinciples(phase:number):string[]{try{const p=JSON.parse(fs.readFileSync(path.join(courseRoot,"pedagogy.json"),"utf8"));return p[String(phase)]??[];}catch{return []}}
export function getMilestoneMeta():MilestoneMeta{return JSON.parse(fs.readFileSync(path.join(milestoneRoot,"meta.json"),"utf8"));}
export function getMilestone(slug:string):Milestone|null{try{return JSON.parse(fs.readFileSync(path.join(milestoneRoot,`${slug}.json`),"utf8"));}catch{return null}}

export type DeepDiveLesson={slug:string;title:string;why:string;audience:string;objectives:string[];mentalModel:string;beforeYouCode:string[];steps:string[];example:{language:string;code:string;expected:string};breakIt:string;debugChecklist:string[];challenge:string;exitTicket:string[]};
export type DeepDiveTrack={number:number;slug:string;title:string;audience:string;description:string;lessonCount:number;lessons:DeepDiveLesson[]};
export type DeepDiveMeta={title:string;subtitle:string;tracks:{number:number;slug:string;title:string;audience:string;description:string;lessonCount:number}[]};
export function getDeepDiveMeta():DeepDiveMeta{return JSON.parse(fs.readFileSync(path.join(deepDiveRoot,"meta.json"),"utf8"));}
export function getDeepDiveTrack(slug:string):DeepDiveTrack|null{try{return JSON.parse(fs.readFileSync(path.join(deepDiveRoot,`${slug}.json`),"utf8"));}catch{return null}}
export function getDeepDiveLesson(trackSlug:string,lessonSlug:string){const t=getDeepDiveTrack(trackSlug);if(!t)return null;const l=t.lessons.find(x=>x.slug===lessonSlug);return l?{track:t,lesson:l}:null;}


export type InstructorTroubleshooting={symptom:string;investigation:string};
export type InstructorExercise={level:string;task:string};
export type InstructorCheck={question:string;answer:string;explanation:string};
export type InstructorCasualGuide={plainEnglish:string[];keyIdeas:string[];walkthrough:string[];commonMistakes:{mistake:string;fix:string}[];recap:string[]};
export type InstructorLesson={number:number;slug:string;title:string;audience:string;why:string;objectives:string[];prerequisites:string[];mentalModel:string[];currentState:string;beforeYouCode:string[];steps:string[];example:{language:string;code:string;expected:string};expectedEvidence:string[];breakIt:string;troubleshooting:InstructorTroubleshooting[];exercises:InstructorExercise[];knowledgeCheck:InstructorCheck[];productionNotes:string[];exitTicket:string[];casualGuide?:InstructorCasualGuide;approxWordCount:number};
export type InstructorTrack={number:number;slug:string;title:string;audience:string;description:string;lessonCount:number;lessons:InstructorLesson[];quiz?:QuizItem[]};
export type InstructorMeta={title:string;subtitle:string;tracks:{number:number;slug:string;title:string;audience:string;description:string;lessonCount:number}[]};
const instructorRoot=path.join(process.cwd(),"content/instructor");
export function getInstructorMeta():InstructorMeta{return JSON.parse(fs.readFileSync(path.join(instructorRoot,"meta.json"),"utf8"));}
export function getInstructorTrack(slug:string):InstructorTrack|null{try{return JSON.parse(fs.readFileSync(path.join(instructorRoot,`${slug}.json`),"utf8"));}catch{return null}}
export function getInstructorLesson(trackSlug:string,lessonSlug:string){const t=getInstructorTrack(trackSlug);if(!t)return null;const l=t.lessons.find(x=>x.slug===lessonSlug);return l?{track:t,lesson:l}:null;}

export type TrackProject={number:number;track:string;slug:string;title:string;goal:string;deliverables:string[];steps:string[];evidence:string[];completion:string[]};
export type TrackProjectMeta={title:string;subtitle:string;projects:{number:number;slug:string;track:string;title:string;goal:string}[]};
const projectRoot=path.join(process.cwd(),"content/projects");
export function getTrackProjectMeta():TrackProjectMeta{return JSON.parse(fs.readFileSync(path.join(projectRoot,"meta.json"),"utf8"));}
export function getTrackProject(slug:string):TrackProject|null{try{return JSON.parse(fs.readFileSync(path.join(projectRoot,`${slug}.json`),"utf8"));}catch{return null}}
