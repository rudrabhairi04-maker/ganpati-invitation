window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader')?.classList.add('hide'),350));

const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const petals=document.querySelector('.petals');
function makePetal(){if(!petals)return;const p=document.createElement('span');p.className='petal';p.textContent=Math.random()>.5?'🌸':'🌼';p.style.left=Math.random()*100+'%';p.style.animationDuration=(5+Math.random()*6)+'s';p.style.fontSize=(11+Math.random()*12)+'px';petals.appendChild(p);setTimeout(()=>p.remove(),12000)}
setInterval(makePetal,1200);

/* Scratch card */
const canvas=document.getElementById('scratchCanvas');
const scratchCard=document.getElementById('scratchCard');
if(canvas&&scratchCard){
 const ctx=canvas.getContext('2d',{willReadFrequently:true});let drawing=false,lastX=0,lastY=0,checked=false;
 function resizeScratch(){const r=scratchCard.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const g=ctx.createLinearGradient(0,0,r.width,r.height);g.addColorStop(0,'#a96f17');g.addColorStop(.5,'#ebc75d');g.addColorStop(1,'#9c6513');ctx.fillStyle=g;ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle='rgba(255,244,213,.15)';for(let i=0;i<r.width;i+=18)ctx.fillRect(i,0,2,r.height);ctx.fillStyle='#fff1c6';ctx.font='600 14px Poppins,sans-serif';ctx.textAlign='center';ctx.fillText('SCRATCH TO REVEAL',r.width/2,r.height/2+65);checked=false}
 function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
 function scratchAt(x,y){ctx.save();ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(x,y,25,0,Math.PI*2);ctx.fill();ctx.restore();checkReveal()}
 function checkReveal(){if(checked)return;const w=canvas.width,h=canvas.height,data=ctx.getImageData(0,0,w,h).data;let transparent=0;for(let i=3;i<data.length;i+=4)if(data[i]<50)transparent++;if(transparent/(w*h)>.48){checked=true;scratchCard.classList.add('scratched');setTimeout(()=>canvas.remove(),250)}}
 canvas.addEventListener('pointerdown',e=>{drawing=true;const p=point(e);lastX=p.x;lastY=p.y;scratchAt(p.x,p.y);canvas.setPointerCapture?.(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!drawing)return;const p=point(e),dist=Math.hypot(p.x-lastX,p.y-lastY),steps=Math.max(1,Math.ceil(dist/10));for(let i=1;i<=steps;i++)scratchAt(lastX+(p.x-lastX)*i/steps,lastY+(p.y-lastY)*i/steps);lastX=p.x;lastY=p.y});
 ['pointerup','pointercancel','pointerleave'].forEach(ev=>canvas.addEventListener(ev,()=>drawing=false));
 addEventListener('resize',resizeScratch);resizeScratch();
}

/* Family carousel */
const slides=[...document.querySelectorAll('.family-slide')];
const dots=document.getElementById('familyDots');
let familyIndex=0,familyTimer;
function showFamily(i){if(!slides.length)return;familyIndex=(i+slides.length)%slides.length;slides.forEach((s,idx)=>s.classList.toggle('active',idx===familyIndex));if(dots){dots.querySelectorAll('button').forEach((b,idx)=>b.classList.toggle('active',idx===familyIndex))}}
if(slides.length&&dots){slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Show family photo ${i+1}`);b.addEventListener('click',()=>{showFamily(i);restartFamily()});dots.appendChild(b)});showFamily(0);document.querySelector('.carousel-btn.prev')?.addEventListener('click',()=>{showFamily(familyIndex-1);restartFamily()});document.querySelector('.carousel-btn.next')?.addEventListener('click',()=>{showFamily(familyIndex+1);restartFamily()});function restartFamily(){clearInterval(familyTimer);familyTimer=setInterval(()=>showFamily(familyIndex+1),3500)}restartFamily()}

/* Music */
const music=document.getElementById('bgMusic'),musicBtn=document.getElementById('musicBtn');
musicBtn?.addEventListener('click',async()=>{try{if(music.paused){await music.play();musicBtn.classList.add('playing')}else{music.pause();musicBtn.classList.remove('playing')}}catch(e){alert("Add an MP3 named 'ganpati-music.mp3' to this folder first.")}});

/* Realistic card opening */
const cardOpening=document.getElementById('cardOpening'),book=document.getElementById('invitationBook'),openBtn=document.getElementById('openCardBtn');
function openRealInvitation(){if(!book||book.classList.contains('open'))return;book.classList.add('open');setTimeout(()=>{cardOpening?.classList.add('opened');document.body.classList.remove('card-locked');window.scrollTo({top:0,behavior:'instant'})},1450)}
openBtn?.addEventListener('click',e=>{e.stopPropagation();openRealInvitation()});book?.addEventListener('click',e=>{if(e.target.closest('.seal-button'))return;openRealInvitation()});
