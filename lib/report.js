import{t as g}from"../shared/i18n.js";import{SITE_ORIGIN as T}from"./env.js";import{getAccount as w,proState as k}from"./account.js";const a=(e,t)=>g(e)||t;export const REPORT_ENDPOINT=T+"/api/report";const z=`
.rp-overlay {
  position: fixed; inset: 0; background: rgba(15, 20, 25, 0.45);
  display: flex; align-items: center; justify-content: center; z-index: 90;
}
.rp-overlay[hidden] { display: none; }
.rp-card {
  width: min(460px, calc(100vw - 40px)); max-height: calc(100vh - 40px); overflow-y: auto;
  background: var(--ground);
  border: 1px solid var(--hairline); border-radius: 18px;
  box-shadow: 0 20px 60px rgba(15, 20, 25, 0.25); padding: 22px 22px 20px;
  animation: rp-in 260ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes rp-in { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: none; } }
.rp-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.rp-head b { font-size: 17px; letter-spacing: -0.02em; }
.rp-sub { margin: 0 0 14px; font-size: 13.5px; line-height: 1.5; color: var(--ink-2); }
.rp-card textarea {
  width: 100%; min-height: 120px; resize: vertical; box-sizing: border-box;
  padding: 12px 14px; border: 1px solid var(--ctl-border); border-radius: 12px;
  font: inherit; font-size: 14px; color: var(--ink); background: var(--ground); outline: none;
}
.rp-card textarea:focus, .rp-page input:focus { border-color: var(--ink); }
.rp-page { display: block; margin: 0 0 10px; }
.rp-page span { display: block; margin: 0 0 5px; font-size: 12.5px; color: var(--ink-2); }
.rp-page input {
  width: 100%; height: 36px; box-sizing: border-box; padding: 0 12px;
  border: 1px solid var(--ctl-border); border-radius: 10px; outline: none;
  font: inherit; font-size: 13px; color: var(--ink); background: var(--ground);
  text-overflow: ellipsis;
}
.rp-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
.rp-card .pill { height: 38px; font-size: 14px; }
.rp-status { margin: 12px 0 0; font-size: 13.5px; }
/* Priority support: the green Pro already uses for "included" ($0, checks). */
.rp-pro { margin: -4px 0 12px; padding: 9px 12px; border-radius: 10px; background: #e3f7ee; color: #00714b; font-size: 13px; line-height: 1.45; }
.rp-pro[hidden], .rp-notify[hidden] { display: none; }
.rp-notify { display: flex; gap: 8px; align-items: flex-start; margin: 10px 0 0; font-size: 13.5px; line-height: 1.4; color: var(--ink-2); cursor: pointer; }
.rp-notify input { margin: 2px 0 0; flex: none; accent-color: var(--ink); }
.rp-status.ok { color: #00ba7c; }
/* The trigger itself, for a Pro member: the same green, so priority support
   is visible before the dialog is opened. A control with a label carries the
   word; one that is an icon alone carries the colour. */
.rp-flag {
  margin-left: 7px; padding: 2px 7px; border-radius: 999px;
  background: #e3f7ee; color: #00714b;
  font-size: 11px; font-weight: 600; line-height: 1.5; letter-spacing: 0.01em; white-space: nowrap;
}
.rp-trigger-pro { white-space: nowrap; }  /* the word never wraps off its label */
.rp-trigger-pro.rp-icon-only { color: #00714b; }
.rp-trigger-pro.rp-icon-only:hover { background: #e3f7ee; }
.rp-status.err { color: #f4212e; }
`,C=e=>`<svg class="ic"><use href="../shared/icons.svg#${e}" /></svg>`;function O(){const e=navigator.userAgent,t=e.match(/(Edg|OPR|Brave|Vivaldi|Chrome)\/([\d.]+)/);return t?`${{Edg:"Edge",OPR:"Opera",Chrome:"Chrome",Brave:"Brave",Vivaldi:"Vivaldi"}[t[1]]||t[1]} ${t[2]}`:e.slice(0,60)}function R(){const e=navigator.userAgent;return/Windows NT 10/.test(e)?"Windows 10/11":/Windows/.test(e)?"Windows":/Mac OS X ([\d_]+)/.test(e)?`macOS ${e.match(/Mac OS X ([\d_]+)/)[1].replace(/_/g,".")}`:/CrOS/.test(e)?"ChromeOS":/Android/.test(e)?"Android":/Linux/.test(e)?"Linux":navigator.platform||"unknown"}export function collectContext(e){let t="";try{t=chrome.runtime.getManifest().version}catch{}let s="";try{s=Intl.DateTimeFormat().resolvedOptions().timeZone}catch{}return{date:new Date().toISOString(),version:t,browser:O(),os:R(),language:navigator.language,timeZone:s,pageUrl:e||""}}export function pageAddress(e){const t=String(e||"").trim();return t?/^[a-z][a-z0-9+.-]*:/i.test(t)?t.slice(0,2e3):/^[^\s/]+\.[a-z]{2,}(?:[/?#:]|$)/i.test(t)?("https://"+t).slice(0,2e3):t.slice(0,2e3):""}export async function sendReport(e,t){const s=await fetch(REPORT_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}},body:JSON.stringify(e)});if(!s.ok){const i=new Error(`report ${s.status}`);throw i.status=s.status,i}return s}function E(e){return Array.from(e.childNodes).some(t=>(t.nodeType===3||t.nodeType===1&&t.tagName.toLowerCase()!=="svg")&&t.textContent.trim()!=="")}let P=!1;export function installReportIssue({trigger:e,getPageUrl:t}={}){if(P||!e)return;P=!0;const s=document.createElement("style");s.textContent=z,document.head.appendChild(s);const i=document.createElement("div");i.className="rp-overlay",i.hidden=!0,i.innerHTML=`
    <div class="rp-card" role="dialog" aria-label="${a("actionReport","Report an issue")}">
      <div class="rp-head"><b>${a("actionReport","Report an issue")}</b>
        <button class="round sm muted" data-rp="close" title="${a("edClose","Close")}">${C("x")}</button></div>
      <p class="rp-sub">${a("reportSub","Tell us what went wrong or what is missing. We read every report and fix things fast.")}</p>
      <p class="rp-pro" data-rp="pro" hidden></p>
      <label class="rp-page"><span>${a("reportPage","Page link")}</span>
        <input type="text" inputmode="url" spellcheck="false" autocomplete="off" data-rp="page" placeholder="${a("reportPageHint","Paste the link to the page")}"></label>
      <textarea data-rp="text" placeholder="${a("reportPlaceholder","What happened? What did you expect?")}"></textarea>
      <label class="rp-notify" data-rp="notifyRow" hidden><input type="checkbox" data-rp="notify" checked><span>${a("reportNotify","Email me when this page captures correctly")}</span></label>
      <p class="rp-status" data-rp="status" hidden></p>
      <div class="rp-actions">
        <button class="pill" data-rp="cancel">${a("actionCancel","Cancel")}</button>
        <button class="pill primary" data-rp="send">${C("check")}${a("reportSend","Send report")}</button>
      </div>
    </div>`,document.body.appendChild(i);const o=r=>i.querySelector(`[data-rp="${r}"]`),m=e.getAttribute("title")||"",x=!E(e);e.classList.toggle("rp-icon-only",x);const u=r=>{e.classList.toggle("rp-trigger-pro",!!r);const n=e.querySelector(".rp-flag");if(r&&!x&&!n){const p=document.createElement("span");p.className="rp-flag",p.textContent=a("reportPriority","Priority"),e.appendChild(p)}else!r&&n&&n.remove();r?e.setAttribute("title",a("reportPriorityTitle","Priority support: a person answers within one business day")):m?e.setAttribute("title",m):e.removeAttribute("title")},y=async()=>{try{const r=await w();return!!(r&&k(r).pro)}catch{return!1}};y().then(u);try{chrome.storage.onChanged.addListener((r,n)=>{n==="local"&&r.fpcAccount&&y().then(u)})}catch{}const d=()=>{i.hidden=!0};let c=null;const f=()=>{o("notifyRow").hidden=!(c&&/^https?:\/\//.test(pageAddress(o("page").value)))},$=async()=>{o("status").hidden=!0,o("send").disabled=!1,o("text").value="",o("page").value=t&&t()||"",c=null,o("pro").hidden=!0,o("notify").checked=!0,f(),i.hidden=!1,setTimeout(()=>o("text").focus(),50);try{const r=await w();if(!r||!k(r).pro){u(!1);return}c={token:r.token,email:r.email||""},u(!0),o("pro").textContent=g("reportPro",[c.email])||`Priority support: a person answers within one business day, at ${c.email}.`,o("pro").hidden=!1,f()}catch{}};o("page").addEventListener("input",f),e.addEventListener("click",r=>{r.preventDefault(),$()}),o("close").onclick=d,o("cancel").onclick=d,i.addEventListener("click",r=>{r.target===i&&d()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&!i.hidden&&d()}),o("send").onclick=async()=>{const r=o("text").value.trim(),n=o("status");if(r.length<5){n.textContent=a("reportEmpty","Please describe the problem in a few words."),n.className="rp-status err",n.hidden=!1;return}o("send").disabled=!0,n.textContent=a("reportSending","Sending..."),n.className="rp-status",n.hidden=!1;try{let p=pageAddress(o("page").value);if(!p&&!t)try{const h=await chrome.storage.local.get("fpcRecentPages"),v=Array.isArray(h.fpcRecentPages)?h.fpcRecentPages:[];v.length&&(p=`(recent) ${v.slice(0,5).join(" | ")}`.slice(0,1900))}catch{}const b={...collectContext(p),comment:r};c&&(b.notify=!o("notifyRow").hidden&&o("notify").checked);const S=await sendReport(b,c&&c.token);let l=null;try{l=await S.json()}catch{l=null}l&&l.priority&&l.ticket?(n.textContent=g("reportProSent",[l.ticket])||`Received - request ${l.ticket}. We will answer by email.`,n.className="rp-status ok",setTimeout(d,3600)):(n.textContent=a("reportThanks","Thank you. Your report was sent."),n.className="rp-status ok",setTimeout(d,1400))}catch(p){n.textContent=p&&p.status===429?a("reportLimited","That is the most reports for today. Please write to us by email instead."):a("reportFailed","Could not send the report. Please check your connection and try again."),n.className="rp-status err",o("send").disabled=!1}}}
