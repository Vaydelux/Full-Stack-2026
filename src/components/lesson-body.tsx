import {CodeBlock} from "@/components/code-block";

function isHeading(x:string){return x.length<110&&!/[.!?]$/.test(x)&&/^[A-Z0-9][A-Za-z0-9 +/&:().,_'’—<>-]+$/.test(x)}
function isCode(x:string){return /^(pnpm|npm|node|git|docker|npx|corepack|curl|Invoke-|Get-|Set-|GET |POST |PUT |PATCH |DELETE |[A-Z_][A-Z0-9_]*=|@|import |export |const |let |class |interface |type |function |async |await |uses:|with:|run:|permissions:|concurrency:|group:|cancel-in-progress:|[{}\[\]<>]|\.\/|\.github\/|apps\/|packages\/|FROM |RUN |COPY |CMD |ENTRYPOINT |WORKDIR |EXPOSE )/.test(x)}
function isBullet(x:string){return /^[•●▪◦*-]\s+/.test(x)}
function codeLabel(lines:string[]){return lines.some(x=>/^(pnpm|npm|node|git|docker|npx|corepack|curl|Invoke-|Get-|Set-)/.test(x))?"Terminal":"Code"}

export function LessonBody({text}:{text:string}){
 const blocks=text.replace(/\r/g,"").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
 return <div className="prose">{blocks.map((block,i)=>{
   const lines=block.split("\n").map(x=>x.trim()).filter(Boolean);
   if(lines.length>1&&lines.every(isBullet))return <ul key={i}>{lines.map((x,j)=><li key={j}>{x.replace(/^[•●▪◦*-]\s+/,"")}</li>)}</ul>;
   if(lines.length>1&&lines.filter(isCode).length>=Math.ceil(lines.length*.55))return <CodeBlock key={i} code={lines.join("\n")} label={codeLabel(lines)}/>;
   if(lines.length===1&&isHeading(lines[0]))return <h2 key={i}>{lines[0]}</h2>;
   if(lines.length===1&&isCode(lines[0]))return <CodeBlock key={i} code={lines[0]} label={codeLabel(lines)}/>;
   return <p className="textline" key={i}>{lines.join("\n")}</p>
 })}</div>
}
