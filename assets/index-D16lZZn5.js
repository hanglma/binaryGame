(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();function l(i){let e="";for(let n=0;n<i;n++)e+=Math.round(Math.random()).toString();return e}function u(i){return parseInt(i,2)}function s(i){const e=document.getElementById("binary-container");e.innerHTML="";for(const n of i){const o=document.createElement("div");o.className="circle",n==="1"&&o.classList.add("active"),e.appendChild(o)}}function a(i){const e=document.getElementById("decimal-value");e.textContent=i.toString()}function d(i,e){const n=u(i),o=document.getElementById("result");e===n?(o.textContent="Correct!",o.style.color="green"):(o.textContent=`Incorrect. The correct answer was ${n}.`,o.style.color="red")}document.addEventListener("DOMContentLoaded",()=>{let e=l(6);s(e);const n=document.getElementById("decimal-slider");n.addEventListener("input",()=>{a(Number(n.value))}),document.addEventListener("keydown",t=>{let r=Number(n.value);t.key==="ArrowUp"||t.key==="ArrowRight"?r<63&&(n.value=(r+1).toString(),a(r+1)):t.key==="ArrowDown"||t.key==="ArrowLeft"?r>0&&(n.value=(r-1).toString(),a(r-1)):t.key==="Enter"&&(d(e,Number(n.value)),e=l(6),s(e))}),document.getElementById("check-answer").addEventListener("click",()=>{d(e,Number(n.value)),e=l(6),s(e)})});
