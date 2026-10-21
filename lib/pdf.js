function j(e){const u=new Uint8Array(e.length);for(let o=0;o<e.length;o++)u[o]=e.charCodeAt(o)&255;return u}function C(e){return e.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[^\x20-\x7e]/g,"?")}function D(e){if(!/[^\x20-\x7e]/.test(e))return`(${C(e)})`;let u="FEFF";for(const o of e){const s=o.codePointAt(0);if(s>65535){const $=s-65536;u+=(55296+($>>10)).toString(16).padStart(4,"0"),u+=(56320+($&1023)).toString(16).padStart(4,"0")}else u+=s.toString(16).padStart(4,"0")}return`<${u}>`}const r=e=>(Math.round(e*100)/100).toString();export function buildPdf(e,{title:u="Screenshot",band:o=null,info:s=null,font:$=null}={}){const S=[],F=[];let y=0;const n=t=>{const c=typeof t=="string"?j(t):t;S.push(c),y+=c.length},i=t=>{F[t]=y,n(`${t} 0 obj
`)};let d=3;const P=o?d++:0,p=!!($&&$.used&&e.some(t=>t.text)),m=p?d:0;p&&(d+=4);const R=[],A=e.map(t=>{const c={imageNum:d++,contentNum:d++,annotNums:[]},l=(t.links?t.links.length:0)+(t.band&&t.band.links?t.band.links.length:0);for(let x=0;x<l;x++)c.annotNums.push(d++);return c.pageNum=d++,R.push(c.pageNum),c}),N=d++,h=d;if(n(`%PDF-1.4
%ÿÿÿÿ
`),i(1),n(`<< /Type /Catalog /Pages 2 0 R >>
endobj
`),i(2),n(`<< /Type /Pages /Count ${e.length} /Kids [`+R.map(t=>`${t} 0 R`).join(" ")+`] >>
endobj
`),p){const t=$.toUnicode();i(m),n(`<< /Type /Font /Subtype /Type0 /BaseFont /FullPageCapture /Encoding /Identity-H /DescendantFonts [${m+1} 0 R] /ToUnicode ${m+3} 0 R >>
endobj
`),i(m+1),n(`<< /Type /Font /Subtype /CIDFontType2 /BaseFont /FullPageCapture /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${m+2} 0 R /DW 500 /CIDToGIDMap /Identity >>
endobj
`),i(m+2),n(`<< /Type /FontDescriptor /FontName /FullPageCapture /Flags 4 /FontBBox [0 -200 1000 900] /ItalicAngle 0 /Ascent 900 /Descent -200 /CapHeight 700 /StemV 80 >>
endobj
`),i(m+3);const c=j(t);n(`<< /Length ${c.length} >>
stream
`),n(c),n(`
endstream
endobj
`)}o&&(i(P),n(`<< /Type /XObject /Subtype /Image /Width ${o.pxW} /Height ${o.pxH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /DecodeParms << /Predictor 12 /Colors 3 /BitsPerComponent 8 /Columns ${o.pxW} >> /Length ${o.flate.length} >>
stream
`),n(o.flate),n(`
endstream
endobj
`)),e.forEach((t,c)=>{const l=A[c],{pageW:x,pageH:b}=t;i(l.imageNum);const T=t.flate||t.jpeg,H=t.flate?`/DecodeParms << /Predictor 12 /Colors 3 /BitsPerComponent 8 /Columns ${t.pxW} >> `:"";n(`<< /Type /XObject /Subtype /Image /Width ${t.pxW} /Height ${t.pxH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter `+(t.flate?"/FlateDecode ":"/DCTDecode ")+H+`/Length ${T.length} >>
stream
`),n(T),n(`
endstream
endobj
`);const O=t.imgX||0,W=b-(t.imgY||0)-t.imgH;let g=`q
${r(t.imgW)} 0 0 ${r(t.imgH)} ${r(O)} ${r(W)} cm
/Im0 Do
Q
`;if(o&&t.band){const a=b-t.band.y-t.band.h;g+=`q
${r(t.band.w)} 0 0 ${r(t.band.h)} ${r(t.band.x)} ${r(a)} cm
/Im1 Do
Q
`}p&&t.text&&(g+=t.text),i(l.contentNum);const I=j(g);n(`<< /Length ${I.length} >>
stream
`),n(I),n(`endstream
endobj
`),(t.links||[]).concat(t.band&&t.band.links?t.band.links:[]).forEach((a,U)=>{const E=a.x,M=a.x+a.w,X=b-a.y,v=b-(a.y+a.h);i(l.annotNums[U]),n(`<< /Type /Annot /Subtype /Link /Border [0 0 0] /Rect [${r(E)} ${r(v)} ${r(M)} ${r(X)}] /A << /Type /Action /S /URI /URI (${C(a.href)}) >> >>
endobj
`)}),i(l.pageNum);const w=`/Im0 ${l.imageNum} 0 R`+(o&&t.band?` /Im1 ${P} 0 R`:""),L=p&&t.text?` /Font << /FPCT ${m} 0 R >>`:"";let B=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${r(x)} ${r(b)}] /Resources << /XObject << ${w} >>${L} >> /Contents ${l.contentNum} 0 R`;l.annotNums.length&&(B+=` /Annots [${l.annotNums.map(a=>`${a} 0 R`).join(" ")}]`),n(B+` >>
endobj
`)}),i(N);let f=`<< /Title ${D(u)} /Producer (FullPage Capture)`;if(s){s.creator&&(f+=` /Creator ${D(s.creator)}`),s.subject&&(f+=` /Subject ${D(s.subject)}`),s.keywords&&(f+=` /Keywords (${C(s.keywords)})`),s.creationDate&&(f+=` /CreationDate (${s.creationDate}) /ModDate (${s.creationDate})`);for(const[t,c]of Object.entries(s.custom||{}))f+=` /${t} (${String(c).replace(/[^A-Za-z0-9+/=]/g,"")})`}n(f+` >>
endobj
`);const k=y;n(`xref
0 ${h}
`),n(`0000000000 65535 f 
`);for(let t=1;t<h;t++)n(`${String(F[t]).padStart(10,"0")} 00000 n 
`);return n(`trailer
<< /Size ${h} /Root 1 0 R /Info ${N} 0 R >>
startxref
${k}
%%EOF
`),new Blob(S,{type:"application/pdf"})}
