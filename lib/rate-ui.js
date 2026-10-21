import{reviewAsk as I,reviewUrl as w,markShown as L,declineReview as z,finishReview as p,starPulse as N,starDone as B,FEEDBACK_URL as A,COPY as S}from"./rate.js";import{t as x}from"../shared/i18n.js";const o=(t,e)=>x(t)||e,D=`
.rv-card {
  position: fixed;
  right: 24px;
  bottom: var(--rv-bottom, 24px);
  width: 340px;
  max-width: calc(100vw - 48px);
  display: flex;
  flex-direction: column;
  padding: 20px 20px 16px;
  background: var(--ground);
  border: 1px solid var(--hairline);
  border-radius: 20px;
  box-shadow:
    0 20px 56px rgba(15, 20, 25, 0.18),
    0 2px 10px rgba(15, 20, 25, 0.08);
  z-index: 65;
  overflow: hidden;
  animation: rv-in 560ms cubic-bezier(0.2, 0.9, 0.25, 1.15) both;
}
.rv-card::before, .rv-card::after {
  content: ''; position: absolute; border-radius: 50%; pointer-events: none;
}
.rv-card::before {
  width: 6px; height: 6px; top: 10px; left: 16px;
  background: #34c98e;
  box-shadow: 14px 14px 0 -2px #6aa8ff, 282px 2px 0 -1px #ff8fa3,
    296px 20px 0 -2px #f5a524, -2px 30px 0 -2px #ffd76e, 262px 38px 0 -2px #34c98e;
  opacity: 0.85;
}
.rv-card::after {
  width: 4px; height: 4px; top: 64px; left: 12px;
  background: #6aa8ff;
  box-shadow: 292px 6px 0 0 #ffd76e, 6px 46px 0 -1px #ff8fa3, 284px 52px 0 -1px #6aa8ff;
  opacity: 0.75;
}
.rv-card[hidden] { display: none; }
@keyframes rv-in {
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  60% { transform: translateY(-4px) scale(1); }
  to { opacity: 1; transform: translateY(0); }
}
.rv-step { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
.rv-step[hidden] { display: none; }
.rv-title { font-size: 16.5px; letter-spacing: -0.015em; line-height: 1.25; margin-top: 2px; }
.rv-sub { font-size: 13.5px; line-height: 1.45; color: var(--ink-2); }
.rv-stars { display: flex; gap: 6px; padding: 10px 0 6px; }
.rv-star {
  width: 44px; height: 44px; border: 0; background: none; padding: 0; cursor: pointer;
  display: grid; place-items: center; border-radius: 12px;
  animation: rv-pop 480ms cubic-bezier(0.2, 0.9, 0.3, 1.4) both;
}
.rv-star:nth-child(1) { animation-delay: 80ms; }
.rv-star:nth-child(2) { animation-delay: 150ms; }
.rv-star:nth-child(3) { animation-delay: 220ms; }
.rv-star:nth-child(4) { animation-delay: 290ms; }
.rv-star:nth-child(5) { animation-delay: 360ms; }
@keyframes rv-pop {
  from { opacity: 0; transform: scale(0.3); }
  70% { transform: scale(1.15); }
  to { opacity: 1; transform: scale(1); }
}
.rv-star .ic {
  width: 34px; height: 34px; fill: none;
  stroke: #c9cdd2; stroke-width: 1.6; color: transparent;
  transition: transform 140ms ease, color 120ms ease, stroke 120ms ease;
}
.rv-star .ic * { fill: currentColor; stroke: inherit; }
.rv-star:hover .ic { transform: scale(1.18) rotate(-6deg); }
.rv-star.lit .ic { color: #ffb300; stroke: #eda200; }
.rv-stars.settled .rv-star { animation: none; }
.rv-stars:not(:hover):not(.settled) .rv-star:nth-child(5) .ic {
  animation: rv-nudge 2.6s ease-in-out 1.4s infinite;
}
@keyframes rv-nudge {
  0%, 78%, 100% { transform: none; }
  84% { transform: scale(1.2) rotate(-8deg); }
  90% { transform: scale(1) rotate(6deg); }
  95% { transform: scale(1.1) rotate(0deg); }
}
.rv-hearts { width: 46px; height: 46px; border-radius: 50%; margin-bottom: 2px;
  background: #d7f5e9; color: #00875c;
  display: grid; place-items: center; }
.rv-hearts .ic { width: 24px; height: 24px; fill: currentColor; }
.rv-actions { display: flex; gap: 8px; width: 100%; margin-top: 8px; }
.rv-card .pill { height: 38px; font-size: 13.5px; flex: 1; justify-content: center; }
.rv-card .pill.rv-cta {
  border: 0; color: #fff; font-weight: 700;
  background: var(--green, #00ba7c);
  transition: background 120ms ease;
}
.rv-card .pill.rv-cta:hover { background: #00a76f; }
.rv-card .pill.ghost { border-color: transparent; color: var(--ink-2); flex: none; padding: 0 12px; }
.rv-card .pill.ghost:hover { color: var(--ink); }
.rv-later { margin-top: 4px; }
.rv-close { position: absolute; top: 10px; right: 10px; z-index: 1; }
.rv-star-live { position: relative; color: #f5a524; }
.rv-star-live::after {
  content: ''; position: absolute; top: 4px; right: 4px; width: 8px; height: 8px;
  border-radius: 50%; background: #f4212e; box-shadow: 0 0 0 0 rgba(244, 33, 46, 0.6);
  animation: rv-pulse 1.6s ease-out infinite;
}
@keyframes rv-pulse {
  0% { box-shadow: 0 0 0 0 rgba(244, 33, 46, 0.55); }
  100% { box-shadow: 0 0 0 9px rgba(244, 33, 46, 0); }
}
`,i=t=>`<svg class="ic"><use href="../shared/icons.svg#${t}" /></svg>`,P=`
  <div class="rv-step" data-step="ask">
    <b class="rv-title" data-rv="title"></b>
    <span class="rv-sub" data-rv="text"></span>
    <div class="rv-stars" data-rv="stars">
      <button class="rv-star" data-star="1" title="${o("rateStar1","Terrible")}">${i("star")}</button>
      <button class="rv-star" data-star="2" title="${o("rateStar2","Poor")}">${i("star")}</button>
      <button class="rv-star" data-star="3" title="${o("rateStar3","Okay")}">${i("star")}</button>
      <button class="rv-star" data-star="4" title="${o("rateStar4","Good")}">${i("star")}</button>
      <button class="rv-star" data-star="5" title="${o("rateStar5","Excellent")}">${i("star")}</button>
    </div>
    <button class="pill ghost rv-later" data-rv="later">${o("rateNotNow","Not now")}</button>
  </div>
  <div class="rv-step" data-step="meh" hidden>
    <div class="rv-hearts">${i("pencil-line")}</div>
    <b class="rv-title">${o("rateSorry","Sorry about that")}</b>
    <span class="rv-sub">${o("reportSub","Tell us what went wrong or what is missing. We read every report and fix things fast.")}</span>
    <div class="rv-actions">
      <a class="pill rv-cta" data-rv="feedback" href="#" target="_blank" rel="noopener">${o("rateTellUs","Tell us")}</a>
      <button class="pill ghost" data-rv="skip">${o("rateSkip","Skip")}</button>
    </div>
  </div>
  <button class="round sm muted rv-close" data-rv="close" title="${x("rateDoNotAsk")||"Do not ask again"}">${i("x")}</button>
`,u="fpcReviewLive";let s=null,l=null,v=null,m=!1,$=!1;function R(){if(document.getElementById("rv-styles"))return;const t=document.createElement("style");t.id="rv-styles",t.textContent=D,document.head.appendChild(t)}function g(t){l&&l.classList.toggle("rv-star-live",t)}let E=!1;function c(){s&&(s.hidden=!0),E=!0;try{sessionStorage.removeItem(u)}catch{}}function b(){B().catch(()=>{}),g(!1)}function C(t){if(!s||m)return;m=!0;const e=r=>s.querySelector(`[data-rv="${r}"]`),d=r=>{s.querySelectorAll(".rv-step").forEach(a=>{a.hidden=a.dataset.step!==r})},n=S[Math.min(t,S.length-1)];e("title").textContent=x(n.title)||n.fbTitle,e("text").textContent=x(n.text)||n.fbText,e("feedback").href=A;const f=e("stars"),y=[...f.querySelectorAll(".rv-star")],h=r=>y.forEach((a,T)=>a.classList.toggle("lit",T<r));y.forEach((r,a)=>{r.onmouseenter=()=>h(a+1),r.onfocus=()=>h(a+1),r.onclick=()=>{f.classList.add("settled"),h(a+1),a>=3?(window.open(w(),"_blank","noopener"),p("rated"),b(),setTimeout(c,260)):setTimeout(()=>d("meh"),260)}}),f.onmouseleave=()=>{f.classList.contains("settled")||h(0)},e("later").onclick=()=>{z(),c()},e("feedback").onclick=r=>{p("feedback"),b(),c();const a=document.getElementById("btn-report")||document.getElementById("reportBtn");a&&(r.preventDefault(),a.click())},e("skip").onclick=()=>{p("unhappy-skip"),c()},e("close").onclick=()=>{p("dismissed"),c()},d("ask"),s.hidden=!1,g(!0);let k=null;try{k=sessionStorage.getItem(u)}catch{}if(!k){L().catch(()=>{});try{sessionStorage.setItem(u,String(t))}catch{}}}export async function installReviewPrompt({star:t,bottom:e}={}){if($||($=!0,R(),l=t||null,l&&(l.href=w(),l.addEventListener("click",()=>{p("rated-header"),b(),c()})),s=document.createElement("div"),s.className="rv-card",s.hidden=!0,s.innerHTML=P,e&&s.style.setProperty("--rv-bottom",e),document.body.appendChild(s),N().then(n=>{n&&g(!0)}).catch(()=>{}),v=await I(),!v))return;let d=null;try{d=sessionStorage.getItem(u)}catch{}setTimeout(()=>C(v.round),d!==null?250:1200)}export function reviewMoment(){!v||E||m||setTimeout(()=>C(v.round),600)}
