const $=s=>$d.querySelector(s),$d=document;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let D;
async function load(){D=await(await fetch('/data.json',{cache:'no-cache'})).json();return D}
const fmt=n=>Number(n||0).toLocaleString('en-US')+' '+D.currency;
const art=t=>`<div class="art" style="background-image:${t.img?`url('${esc(t.img)}')`:`linear-gradient(135deg,${esc(t.c1)},${esc(t.c2)})`}">${t.img?'':`<b>${esc(t.title)}</b>`}<span class="tag">${esc(t.cat)}</span></div>`;
const card=t=>`<a class="cd" href="/templates/${encodeURIComponent(t.id)}">${art(t)}<div class="info"><b style="color:var(--ink)">${esc(t.title)}</b><br>${esc(t.desc)}</div></a>`;
const head=()=>`<a class="brand" href="/">${esc(D.brand)}</a>`;
const foot=()=>`<footer>${esc(D.footer)}</footer>`;
function toast(m){const d=$d.createElement('div');d.className='toast';d.textContent=m;$d.body.append(d);setTimeout(()=>d.remove(),2600)}
