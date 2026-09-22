import type {Metadata,Viewport} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {TopNav} from "@/components/nav";
import {ReadingTools} from "@/components/reading-tools";
import {Footer} from "@/components/footer";

export const metadata:Metadata={
 title:{default:"Full-Stack Developer 2026",template:"%s · Full-Stack Developer 2026"},
 description:"A comprehensive project-driven full-stack course: foundations, Next.js, NestJS, PostgreSQL, Prisma, auth, testing, Docker, CI/CD, deployment, and enterprise architecture.",
 applicationName:"Full-Stack Developer 2026",
};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",colorScheme:"dark"};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{const t=localStorage.getItem('course-theme');const m={"Sunset Graphite":["#ff9950","#1d1713","#2b2119"],"Dark Aurora":["#42e6be","#16111d","#21162a"],"Moonlight":["#93c5fd","#111827","#202a3a"],"Crimson Cinema":["#ff6b9a","#1e1116","#341522"],"Deep Ocean":["#38c6f4","#0e171d","#112632"],"Toxic Neon":["#a3ff3f","#141b0e","#26351a"],"Rose Dusk":["#e99ac7","#1c121b","#30202c"],"Sand Storm":["#ffd34d","#1d1911","#332816"],"Void Purple":["#bd8cff","#17101f","#271839"],"Arctic Fog":["#a5f3fc","#0f1818","#183031"],"Amber Twilight":["#ffbd59","#1c1711","#352619"],"Electric Ember":["#ff8468","#1d1412","#38201a"],"Frosted Lavender":["#d8b4fe","#18121d","#2b1d35"],"Midnight Cobalt":["#69a5ff","#111620","#19283f"],"Neon Oasis":["#42f5d1","#0d1a17","#15362e"],"Platinum Frost":["#dbeafe","#11161c","#27313d"],"Shadow Sage":["#7ee2a8","#0f1913","#173022"],"Solar Flare":["#ffe063","#1c1a0f","#343019"]};if(t&&m[t]){const r=document.documentElement;r.style.setProperty('--accent',m[t][0]);r.style.setProperty('--bg',m[t][1]);r.style.setProperty('--surface',m[t][2]);r.dataset.theme=t}}catch{}`}}/></head><body><a className="skip-link" href="#main-content">Skip to content</a><ThemeProvider><ReadingTools/><TopNav/><div id="main-content">{children}</div><Footer/></ThemeProvider></body></html>
}
