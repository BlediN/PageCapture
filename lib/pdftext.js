const a=s=>s.toString(16).toUpperCase().padStart(4,"0"),u=500,p=57344,x=63743;export class TextFont{constructor(){this.cid=new Map,this.nextAstral=57344,this.used=!1}encode(r){let e="";for(const i of r){const n=i.codePointAt(0);if(n<32&&n!==9)continue;let t=this.cid.get(n);if(t===void 0){if(n<=65535)t=n;else if(this.nextAstral<=63743)t=this.nextAstral++;else continue;this.cid.set(n,t)}e+=a(t)}return e&&(this.used=!0),e}static length(r){return r.length/4}toUnicode(){const e=[...this.cid.entries()].sort((n,t)=>n[1]-t[1]).map(([n,t])=>{let c;if(n<=65535)c=a(n);else{const o=n-65536;c=a(55296+(o>>10))+a(56320+(o&1023))}return`<${a(t)}> <${c}>`}),i=[];for(let n=0;n<e.length;n+=100){const t=e.slice(n,n+100);i.push(`${t.length} beginbfchar
${t.join(`
`)}
endbfchar`)}return`/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def
/CMapName /FullPageCapture-UCS def
/CMapType 2 def
1 begincodespacerange
<0000> <FFFF>
endcodespacerange
`+(i.join(`
`)||`0 beginbfchar
endbfchar`)+`
endcmap
CMapName currentdict /CMap defineresource pop
end
end
`}}export function textOperators(s,r){if(!s.length)return"";let e=`BT
3 Tr
`,i=0,n=0;for(const t of s){const c=TextFont.length(t.hex);if(!c)continue;const o=Math.max(1,Math.min(400,t.h*.8)),h=c*o*(500/1e3),d=Math.max(1,Math.min(1e3,t.w/h*100));Math.abs(o-i)>.01&&(e+=`/FPCT ${f(o)} Tf
`,i=o),Math.abs(d-n)>.01&&(e+=`${f(d)} Tz
`,n=d);const l=r-(t.y+t.h*.8);e+=`1 0 0 1 ${f(t.x)} ${f(l)} Tm
<${t.hex}> Tj
`}return e+`ET
`}const f=s=>(Math.round(s*100)/100).toString();
