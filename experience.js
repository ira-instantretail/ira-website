(()=>{const R=matchMedia('(prefers-reduced-motion:reduce)').matches,H=matchMedia('(hover:hover)').matches,$=(s,c=document)=>[...c.querySelectorAll(s)];
// 1. words rise on headings
const wrap=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3&&c.textContent.trim()){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w.trim())return f.append(w);const o=document.createElement('span'),i=document.createElement('span');o.className='xw';i.textContent=w;i.style.setProperty('--wi',wrap.n++);o.append(i);f.append(o)});c.replaceWith(f)}else if(c.nodeType===1&&c.tagName!=='BR')wrap(c)})};wrap.n=0;
const heads=$('h1,main h2').filter(h=>!h.closest('#how'));heads.forEach(h=>{wrap.n=0;wrap(h)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in','xin');io.unobserve(e.target)}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
// 2. reveal blocks
const sel='main section:not(.hero):not(#how) .wrap>*:not(h1):not(h2):not(.fx)';$(sel).forEach((e,i)=>{if(e.closest('.ira-portal-shell')&&!e.classList.contains('ira-portal-shell'))return;e.classList.add('xr');e.style.setProperty('--xd',(i%4)*.09+'s');io.observe(e)});
const start=()=>{$('h1').forEach(h=>h.classList.add('xin'));heads.filter(h=>h.tagName!=='H1').forEach(h=>io.observe(h))};
// 3. intro curtain (once per session)
if(document.documentElement.classList.contains('xi')){const c=document.createElement('div');c.className='xcur';c.innerHTML='<i><img src="assets/ira-simple-transparent.png" alt="IRA"></i>';document.body.append(c);
setTimeout(()=>{c.classList.add('go');document.documentElement.classList.remove('xi');setTimeout(start,350);setTimeout(()=>c.remove(),1100);try{sessionStorage.xi=1}catch(e){}},1500)}else start();
// 4. scroll progress + hero parallax
const bar=document.createElement('div');bar.className='xbar';document.body.append(bar);const st=document.querySelector('.machine-stage');
const sc=()=>{const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${m>0?scrollY/m:0})`;if(st&&!R&&scrollY<900)st.style.translate=`0 ${-scrollY*.07}px`};addEventListener('scroll',sc,{passive:true});sc();
if(R)return;
// 5. cursor glow, magnetic buttons, card tilt
if(H){const g=document.createElement('div');g.className='xglow';document.body.append(g);let x=0,y=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});(function l(){x+=(tx-x)*.12;y+=(ty-y)*.12;g.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(l)})();
$('.pill,.nav-cta').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
$('.gateway-card').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;b.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*6}deg) translateY(-4px)`});b.addEventListener('pointerleave',()=>b.style.transform='')})}
// 6. Four Worlds transition
const sh=document.querySelector('.ira-portal-shell');if(sh){let t;new MutationObserver(()=>{sh.classList.remove('xswap');void sh.offsetWidth;sh.classList.add('xswap');clearTimeout(t);t=setTimeout(()=>sh.classList.remove('xswap'),1200)}).observe(sh,{attributes:true,subtree:true,attributeFilter:['src']})}
})();
