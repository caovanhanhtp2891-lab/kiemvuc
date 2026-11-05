/* Original pixel artwork for Kiếm Vực. Integer raster sprites, no external images. */
(function (root) {
'use strict';
function createPixelArt(data, document) {
 const FX=(typeof module!=='undefined'&&module.exports?require('./school-fx.js'):root.KV_SCHOOLFX).createSchoolFX(data);
 const cache=new Map(),INK='#101c27',WHITE='#fff3c4';
 const colors=['#79d9e4','#f49565','#99df9b','#b9a2f4','#8de1d0','#a0b7e4','#ffda72','#87c5e6','#c19ae6','#83bcbf','#d5ad79','#e8998c','#f0b5d9','#b5a0ed'];
 const classes=Object.fromEntries(data.classes.map((c,i)=>[c.class_id,{...c,pixelColor:colors[i]}]));
 const shade=(hex,n)=>'#'+[1,3,5].map(i=>Math.max(0,Math.min(255,parseInt(hex.slice(i,i+2),16)+n)).toString(16).padStart(2,'0')).join('');
 function image(w,h,paint){const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
  const p={rect(x,y,w,h,col){ctx.fillStyle=col;ctx.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));}};
  p.blit=(img,x,y,w,h)=>ctx.drawImage(img,x,y,w,h);
  p.dot=(x,y,col)=>p.rect(x,y,1,1,col);
  p.line=(x0,y0,x1,y1,col,width=1)=>{x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,err=dx+dy;for(let n=0;n<512;n++){p.rect(x0,y0,width,width,col);if(x0===x1&&y0===y1)break;const e=err*2;if(e>=dy){err+=dy;x0+=sx;}if(e<=dx){err+=dx;y0+=sy;}}};
  p.ellipse=(x,y,rx,ry,col)=>{for(let j=-Math.ceil(ry);j<=ry;j++){const w=Math.floor(rx*Math.sqrt(Math.max(0,1-j*j/(ry*ry))));p.rect(x-w,y+j,w*2+1,1,col);}};
  p.poly=(points,col,outline)=>{const xs=points.map(v=>v[0]),ys=points.map(v=>v[1]);for(let y=Math.floor(Math.min(...ys));y<=Math.ceil(Math.max(...ys));y++)for(let x=Math.floor(Math.min(...xs));x<=Math.ceil(Math.max(...xs));x++){let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;}if(inside)p.dot(x,y,col);}if(outline)points.forEach((a,i)=>{const b=points[(i+1)%points.length];p.line(a[0],a[1],b[0],b[1],outline);});};
  p.block=(x,y,w,h,col)=>{p.rect(x-1,y-1,w+2,h+2,INK);p.rect(x,y,w,h,col);};
  p.star=(x,y,col)=>{p.line(x-2,y,x+2,y,col);p.line(x,y-2,x,y+2,col);p.dot(x,y,WHITE);};
  paint(p);return canvas;
 }
 function cached(key,w,h,paint){if(!cache.has(key))cache.set(key,image(w,h,paint));return cache.get(key);}
 function asImage(canvas,cls='pixel-icon',size=24){return `<img class="${cls}" src="${canvas.toDataURL('image/png')}" width="${size}" height="${size}" alt="" aria-hidden="true" draggable="false">`;}
 function weapon(p,id,x=23,y=23,attack=false,col='#9de5dc'){
  const metal='#c0e1dc',gold='#e2ba68',edge=INK,off=attack?3:0;
  if(['kiem','thich'].includes(id)){p.line(x-1,y+6,x+off+5,y-14,edge,3);p.line(x,y+4,x+off+6,y-14,metal);p.line(x+1,y+2,x+off+6,y-12,WHITE);p.line(x-3,y+2,x+4,y+4,gold);p.line(x,y+4,x-1,y+8,'#a07b55',2);if(id==='thich'){p.line(5,y+7,2,y-5,metal,2);p.line(2,y-4,5,y+3,WHITE);}}
  else if(id==='dao'){p.line(x,y+9,x+2,y-13,edge,3);p.line(x+1,y+8,x+3,y-12,'#ae8559');p.poly([[x+2,y-13],[x+10,y-15],[x+10,y-5],[x+4,y]],metal,edge);p.line(x+10,y-12,x+9,y-5,WHITE);}
  else if(['cung','coquan','camy'].includes(id)){p.poly([[x,y-12],[x+5,y-8],[x+7,y],[x+5,y+8],[x,y+12],[x+3,y]],gold,edge);p.line(x,y-11,x,y+11,'#e4d9a4');p.line(x-3,y,x+11,y,metal);if(id!=='cung')p.block(x-6,y-2,15,3,'#aa8563');p.poly([[x+14,y],[x+9,y-2],[x+9,y+2]],metal);}
  else if(['phap','loi'].includes(id)){p.line(x,y+12,x,y-12,edge,3);p.line(x+1,y+12,x+1,y-12,gold);if(id==='phap'){p.ellipse(x+1,y-15,5,6,edge);p.ellipse(x+1,y-16,3,4,col);p.dot(x,y-18,WHITE);p.rect(x-2,y-11,7,2,gold);}else p.poly([[x+5,y-22],[x-4,y-12],[x+1,y-12],[x-2,y-4],[x+9,y-15],[x+3,y-15]],'#f4df83',edge);}
  else if(id==='bua'){p.poly([[x,y+5],[x-8,y-7],[x-6,y-14],[x+2,y-17],[x+11,y-11],[x+10,y-5]],'#d0e4bc',edge);for(let k=-2;k<3;k++)p.line(x,y+5,x+k*4,y-12+k*k,gold);p.star(x+2,y-8,col);}
  else if(id==='anha'){for(let k=0;k<3;k++){p.line(x-3+k*3,y+5,x-2+k*4,y-9,edge,2);p.line(x-2+k*3,y+5,x-1+k*4,y-9,metal);}p.block(x-4,y+4,10,3,'#696d97');}
  else if(id==='thuan'){p.poly([[x-7,y-9],[x+6,y-9],[x+8,y+3],[x,y+12],[x-8,y+4]],gold,edge);p.poly([[x-5,y-6],[x+4,y-6],[x+5,y+2],[x,y+8],[x-5,y+2]],col,edge);p.line(x,y-5,x,y+5,WHITE);p.line(x-3,y,x+3,y,WHITE);}
  else if(id==='thuong'){p.line(x,y+13,x+4,y-21,edge,3);p.line(x+1,y+13,x+5,y-21,gold);p.poly([[x+6,y-27],[x,y-18],[x+4,y-20],[x+8,y-17]],metal,edge);p.poly([[x+4,y-17],[x+13,y-13],[x+8,y-9]],'#df7763');}
  else if(id==='cam'){p.ellipse(x,y+1,7,10,edge);p.ellipse(x,y,5,8,'#b38460');p.ellipse(x,y+2,3,4,'#dfbe84');p.block(x-1,y-18,3,14,'#b38460');for(let j=-1;j<=1;j++)p.line(x+j,y-18,x+j,y+7,WHITE);}
  else if(id==='liem'){p.line(x,y+13,x,y-19,edge,3);p.line(x+1,y+13,x+1,y-19,'#b4a0d6');p.poly([[x,y-20],[x+9,y-21],[x+14,y-15],[x+13,y-5],[x+10,y-12],[x+4,y-15],[x,y-14]],metal,edge);p.line(x+3,y-20,x+8,y-19,WHITE);}
 }
 function humanSprite(id,frame=0,attack=false,npcColor,back=false){
  const conf=classes[id]||classes.kiem,col=npcColor||conf.pixelColor;
  return cached(`human23:${id}:${frame}:${attack}:${col}:${back}`,56,64,p=>{
   const step=[0,1,2,0,-1,-2][frame%6],dark=shade(col,-75),mid=shade(col,-32),light=shade(col,32),skin='#f4c79c',skinD='#bb7e68',gold='#e9c47e',hair=['liem','anha'].includes(id)?'#33304f':id==='cam'?'#4a354e':'#203041',heavy=['dao','thuan','thuong'].includes(id),rogue=['thich','anha','coquan','camy'].includes(id),arcane=['phap','bua','cam','liem'].includes(id),lean=Number(attack)>2?-1:Number(attack)>1?2:attack?3:0;
   // Four-tone cloth, layered armour, hair and a trailing silhouette for every school.
   p.ellipse(26,61,16,2,'#14232c');p.ellipse(26,60,12,2,'#203442');
   if(!rogue){p.poly([[16,27],[34,27],[40+step,54],[31,57],[25,53],[15-step,57],[11,51]],dark,INK);p.poly([[16,29],[20,29],[18-step,52],[14-step,53]],mid);p.line(34,31,37+step,51,mid);p.line(13-step,53,18-step,54,gold);p.line(32,54,37+step,52,gold);}
   if(back)weapon(p,id,39,40,!!attack,col);
   for(const [x,dy] of [[19,step],[29,-step]]){p.block(x,49+dy,6,10,rogue?'#354859':'#344453');p.rect(x,51+dy,2,6,mid);p.block(x-1,58+dy,8,3,'#293344');p.line(x,58+dy,x+5,58+dy,gold);}
   p.poly([[17+lean,28],[32+lean,28],[36,47],[30,53],[23,51],[16,53],[14,46]],mid,INK);p.poly([[18+lean,29],[25+lean,30],[23,49],[17,48]],col);p.poly([[26+lean,30],[32+lean,29],[34,46],[28,49]],dark);p.line(19,34,18,46,light);p.line(30,35,32,45,col);
   p.poly([[18+lean,28],[25+lean,34],[30+lean,28],[28,40],[24,42],[21,38]],'#ecdfbd',INK);p.line(22,31,27,36,'#fbf1d2');p.line(26,34,22,41,dark);p.rect(16,44,19,3,'#41485a');p.rect(17,44,17,1,gold);p.block(24,44,4,4,gold);p.dot(25,45,WHITE);p.line(29,47,33,54,'#eac388');p.rect(31,53,3,3,'#d48464');
   if(heavy){p.poly([[16,27],[22,29],[21,34],[12,34],[10,31]],'#465c6b',INK);p.poly([[31,28],[37,27],[41,32],[37,36],[32,33]],'#536a75',INK);p.line(12,30,19,30,light);p.line(34,30,38,32,gold);p.rect(18,36,15,6,'#455b69');for(let i=0;i<5;i++)p.line(19+i*3,37,20+i*3,40,gold);}
   const armY=Number(attack)>2?24:Number(attack)>1?29:attack?34:34+step;
   p.poly([[13,30],[18,32],[15,43+step],[11,42+step],[10,36]],dark,INK);p.line(12,34,12,40+step,col);p.block(11,41+step,4,5,skinD);p.rect(12,41+step,3,3,skin);
   p.poly([[33,30],[38,31],[41,armY+7],[37,armY+10],[33,38]],col,INK);p.line(36,33,38,armY+5,light);p.block(37,armY+7,4,5,skinD);p.rect(38,armY+7,3,3,skin);
   p.block(22+lean,24,8,6,skinD);p.rect(23+lean,24,6,4,skin);
   // Hair behind the face, including distinct loose hair, buns and ribbons.
   p.poly([[16+lean,14],[19+lean,9],[31+lean,9],[36+lean,15],[35,31],[39+step,40],[31,37],[30,25],[17,27]],hair,INK);
   p.block(18+lean,14,16,13,skinD);p.rect(20+lean,14,14,11,skin);p.rect(29+lean,15,4,5,'#ffddb4');p.rect(20+lean,23,11,3,'#dfad89');
   if(!back){p.rect(24+lean,19,2,2,INK);p.rect(31+lean,19,2,2,INK);p.dot(24+lean,19,'#fff4d3');p.line(27+lean,24,30+lean,24,'#a96466');}
   p.poly([[16+lean,15],[18+lean,10],[23+lean,8],[32+lean,10],[36+lean,15],[31+lean,14],[27+lean,12],[22+lean,15]],hair,INK);p.line(20+lean,11,25+lean,10,'#4c5969');p.line(18+lean,15,19+lean,24,hair,2);
   if(back){p.rect(18+lean,15,17,12,hair);p.line(30+lean,13,32+lean,24,'#4b5268');p.poly([[22,22],[30,21],[32+step,40],[27,45],[24,39]],hair,INK);p.line(26,25,28,39,'#4a5267');}
   if(id==='phap'||id==='bua'){p.poly([[16,12],[23,2],[28,0],[33,11],[38,14],[14,14]],id==='phap'?'#55517c':'#294d57',INK);p.line(22,8,31,8,gold);p.rect(25,3,3,5,gold);p.dot(26,4,WHITE);}
   else if(heavy){p.poly([[17,14],[18,9],[24,6],[32,9],[35,15]],'#4b6070',INK);p.line(20,10,29,9,light);p.line(17,14,35,14,gold);p.poly([[24,8],[25,2],[29,6],[28,9]],'#cc7871',INK);}
   else if(id==='cam'){for(const x of [16,34]){p.ellipse(x,12,4,4,INK);p.ellipse(x,11,3,3,hair);p.line(x-2,10,x+1,10,'#e6a9c9');}p.star(35,13,'#f4c4df');p.line(16,15,12+step,29,'#de9ec1');}
   else if(id==='liem'){p.poly([[16,14],[18,6],[26,3],[34,8],[37,17],[32,13],[26,10],[20,14]],'#4c4264',INK);p.line(20,9,32,10,'#a28cc8');p.dot(27,7,'#e9d5ff');}
   else if(id==='anha'||id==='thich'){p.rect(19+lean,22,15,5,dark);p.line(20+lean,22,32+lean,22,col);p.poly([[17,18],[8-step,16],[10,20],[16,22]],col,INK);}
   else{p.block(23,4,7,5,hair);p.line(21,11,34,12,col,2);p.line(30,12,36+step,24,dark,2);p.dot(28,6,gold);}
   if(id==='cung'||id==='camy'){p.line(14,28,27,46,'#a17e5b',2);p.line(14,29,26,45,gold);p.block(13,30,4,12,'#506455');}
   if(id==='coquan'){p.block(11,30,6,11,'#927653');p.line(12,32,16,32,gold);p.line(12,35,16,35,'#d6bc8b');}
   if(id==='loi'){p.line(17,35,19,39,'#f4dc8a');p.line(19,39,17,42,'#fff2bb');p.dot(34,15,'#ffe5a0');}
   if(arcane&&!back){p.line(17,49,18,52,gold);p.line(28,50,32,51,gold);}
   if(!back){if(attack){const a=Number(attack)>2?-.2:Number(attack)>1?.55:.95,cs=Math.cos(a),sn=Math.sin(a),rot=(x,y)=>[35+(x-35)*cs-(y-37)*sn,37+(x-35)*sn+(y-37)*cs],q={...p};q.line=(x,y,xx,yy,c,w=1)=>p.line(...rot(x,y),...rot(xx,yy),c,w);q.poly=(v,c,o)=>p.poly(v.map(v=>rot(...v)),c,o);q.rect=(x,y,w,h,c)=>q.poly([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],c);q.ellipse=(x,y,rx,ry,c)=>p.ellipse(...rot(x,y),rx,ry,c);q.dot=(x,y,c)=>p.dot(...rot(x,y),c);q.block=(x,y,w,h,c)=>{q.rect(x-1,y-1,w+2,h+2,INK);q.rect(x,y,w,h,c);};q.star=(x,y,c)=>{q.line(x-2,y,x+2,y,c);q.line(x,y-2,x,y+2,c);};weapon(q,id,35,37,true,col);}else weapon(p,id,39,39,false,col);}
  });
 }
 function drawSprite(ctx,img,x,y,scale=2,face=1,anchor='feet'){ctx.save();ctx.imageSmoothingEnabled=false;const w=Math.round(img.width*scale),h=Math.round(img.height*scale);ctx.translate(Math.round(x/2)*2,Math.round(y/2)*2);if(face<0)ctx.scale(-1,1);ctx.drawImage(img,-Math.floor(w/2),anchor==='center'?-Math.floor(h/2):-h,w,h);ctx.restore();}
 function classPortrait(id){return asImage(humanSprite(id,0,false),'class-sprite',72);}
 function hero(ctx,id,x,y,options={}){drawSprite(ctx,humanSprite(id,Math.floor((options.walk||0)*.8)%6,options.attack,options.color,options.back),x,y,1.5*(options.scale||1),options.face||1);}
 function uiSprite(name){return cached('ui:'+name,20,20,p=>{const c='#daca92',l='#f4e5b2',g='#8ac4ab';
  if(['sword','swords','bow','staff','shield','charm','spark','flame','ring','rain','wind','moon'].includes(name)){const id={sword:'kiem',swords:'thich',bow:'cung',staff:'phap',shield:'thuan',charm:'bua',spark:'loi',flame:'dao',ring:'cam',rain:'camy',wind:'thuong',moon:'liem'}[name];weapon(p,id,8,10,false,g);}
  else if(['user','armor','bag','potion'].includes(name)){if(name==='user'){p.ellipse(10,5,3,3,c);p.poly([[6,10],[13,10],[16,17],[4,17]],g,INK);}if(name==='armor')p.poly([[6,3],[9,5],[12,3],[18,7],[15,11],[13,10],[13,18],[5,18],[5,10],[3,11],[1,7]],g,c);if(name==='bag'){p.block(3,6,14,12,g);p.line(6,5,6,2,c);p.line(6,2,13,2,c);p.line(13,2,13,5,c);p.rect(8,8,3,5,c);}if(name==='potion'){p.block(7,1,6,3,c);p.poly([[8,5],[12,5],[16,11],[16,17],[13,19],[6,19],[3,16],[4,11]],'#be6572',INK);p.rect(5,12,10,4,'#df9490');p.rect(6,7,2,5,l);}}
  else if(['map','compass','mountain','snow'].includes(name)){p.poly([[1,4],[7,2],[13,5],[18,2],[18,16],[13,19],[7,16],[1,18]],'#3a7163',c);p.line(7,3,7,16,c);p.line(13,5,13,18,c);p.star(11,10,l);}
  else if(name==='close'){p.line(5,5,15,15,c,2);p.line(15,5,5,15,c,2);}
  else if(['plus','arrow','chevron','expand'].includes(name)){if(name==='plus'){p.rect(9,3,2,14,c);p.rect(3,9,14,2,c);}else{p.line(3,10,16,10,c,2);p.line(10,4,16,10,c,2);p.line(16,10,10,16,c,2);}}
  else if(name==='settings'){p.poly([[7,1],[13,1],[14,5],[18,6],[19,12],[15,14],[14,18],[7,19],[5,15],[1,13],[1,7],[5,5]],g,c);p.ellipse(10,10,4,4,INK);p.ellipse(10,10,2,2,c);}
  else if(name==='skull'){p.ellipse(10,8,7,7,c);p.rect(6,14,8,4,c);p.rect(5,6,4,4,INK);p.rect(12,6,4,4,INK);p.rect(9,11,2,3,INK);p.rect(9,16,1,3,INK);p.rect(12,16,1,3,INK);}
  else if(['sound','soundOff'].includes(name)){p.poly([[3,7],[7,7],[12,3],[12,17],[7,13],[3,13]],g,c);if(name==='sound')p.line(16,6,16,14,c,2);else{p.line(14,6,19,13,c);p.line(19,6,14,13,c);}}
  else if(name==='crown'){p.poly([[2,5],[7,9],[10,2],[13,9],[18,5],[16,17],[4,17]],c,INK);p.rect(5,13,11,2,l);}
  else if(name==='autoplay'){p.line(3,5,15,5,c,2);p.line(15,5,17,10,c,2);p.line(17,14,5,14,c,2);p.line(5,14,3,10,c,2);p.poly([[13,1],[19,5],[13,9]],g);p.poly([[7,10],[1,14],[7,18]],g);}
  else if(name==='help'){p.line(6,4,13,4,c,2);p.line(13,4,15,8,c,2);p.line(15,8,10,12,c,2);p.rect(9,15,3,3,l);}
  else{p.block(4,2,12,16,'#54775e');p.rect(6,5,8,1,c);p.rect(6,8,7,1,c);p.rect(6,11,8,1,c);p.rect(6,14,5,1,l);}
 });}
 function skillSprite(sk){return cached('skill24:'+sk.skill_id,32,32,p=>FX.paintIcon(p,sk));}
 function skillIcon(sk){return asImage(skillSprite(sk),'pixel-icon skill-pixel',32);}
 const familyColors={slime:'#83cb82',wolf:'#91afb6',boar:'#a98f76',qilin:'#d6b777',bird:'#a6c8c5',bat:'#a58ab6',golem:'#819bac',titan:'#a2998b',ghost:'#a7b0db',ninja:'#829fa4',demon:'#be8291',reaper:'#9d8db7',snake:'#8fc08a',hydra:'#79b6b2',dragon:'#83c5b2',mushroom:'#cd8f9f',frog:'#8cbd83',spider:'#ae8c9f',scorpion:'#d2a67b',treant:'#83ad73'};
 function creatureSprite(family,frame=0,custom){const col=custom||familyColors[family]||'#a3b4b4',dark=shade(col,-48),light=shade(col,30),step=[0,1,0,-1][frame%4];return cached(`beast:${family}:${frame}:${col}`,40,40,p=>{
  p.ellipse(20,37,13,2,'#152a2b');
  if(['wolf','boar','qilin','horse','tiger','fox','ox'].includes(family)){p.block(10,22,20,9,col);for(const x of [12,25]){p.block(x+step,30,3,6,dark);p.rect(x+step-1,35,5,2,INK);}p.poly([[28,25],[27,15],[31,10],[35,12],[36,20],[39,22],[38,27]],col,INK);p.dot(34,18,'#f6dc9b');p.dot(35,18,INK);p.rect(14,23,12,2,light);p.poly([[10,24],[3,18],[2,22],[10,29]],dark,INK);if(family==='horse')p.poly([[29,13],[28,7],[31,10],[33,6],[34,13]],dark,INK);else p.poly([[29,14],[29,7],[33,12],[36,9],[36,17]],dark,INK);if(family==='boar'){p.poly([[36,27],[39,29],[38,22]],WHITE);p.rect(17,20,9,2,dark);}if(family==='tiger')for(let j=0;j<4;j++)p.line(12+j*4,23,14+j*4,29,'#4c6370',2);if(family==='qilin'||family==='ox'){p.poly([[31,13],[30,4],[33,10],[37,2],[36,15]],'#e8c878',INK);if(family==='qilin')for(let j=0;j<4;j++)p.poly([[10+j*4,22],[12+j*4,16],[14+j*4,23]],'#d59e6e');}if(family==='fox')for(let j=0;j<3;j++)p.poly([[10,26],[2,14+j*5],[1,25+j*3]],light,INK);}
  else if(family==='slime'){p.poly([[6,34],[5,25],[9,18],[15,14],[25,14],[32,20],[35,30],[32,35]],dark,INK);p.ellipse(20,25,13,10,col);p.rect(11,20,7,3,light);p.rect(13,27,2,3,INK);p.rect(26,27,2,3,INK);p.rect(19,31,4,1,dark);}
  else if(['ninja','ghost','demon','reaper'].includes(family)){p.poly([[9,35],[11,15],[15,6],[24,5],[29,14],[32,36],[26,32],[22,37],[17,33]],dark,INK);p.rect(13,15,13,12,'#28333f');p.rect(16,18,3,2,WHITE);p.rect(23,18,3,2,WHITE);p.rect(13,28,14,2,col);p.poly([[12,11],[18,6],[26,10],[26,14]],col);if(family==='ninja'){p.rect(12,23,16,4,col);p.line(27,29,35,16,'#dde4c5',2);}if(family==='demon'){p.poly([[14,8],[9,1],[10,12]],'#e4c58a',INK);p.poly([[26,8],[31,1],[29,13]],'#e4c58a',INK);}if(family==='reaper')weapon(p,'liem',29,25,false,col);}
  else if(['golem','titan','treant'].includes(family)){p.block(10,17,19,16,dark);p.block(13,7,15,13,col);p.block(3+step,19,7,13,col);p.block(30-step,19,6,13,col);p.block(11+step,33,6,5,col);p.block(23-step,33,6,5,col);p.rect(16,13,3,2,'#f4d695');p.rect(23,13,3,2,'#f4d695');p.poly([[16,21],[25,20],[25,28],[20,30],[15,27]],light,INK);if(family==='treant'){for(const [x,y,rx,ry] of [[10,11,8,7],[22,6,11,7],[30,12,7,8]]){p.ellipse(x,y,rx+1,ry+1,INK);p.ellipse(x,y,rx,ry,col);p.rect(x-3,y-2,5,2,light);}p.rect(15,31,3,6,'#ba9670');}}
  else if(['bird','bat','phoenix'].includes(family)){const flap=frame%2*5;p.poly([[17,22],[2,10+flap],[4,23],[14,28]],dark,INK);p.poly([[23,22],[37,10+flap],[35,25],[24,29]],col,INK);p.ellipse(20,24,6,10,col);p.ellipse(24,15,5,5,light);p.poly([[28,15],[36,18],[28,19]],'#dfbd7c',INK);p.dot(26,14,INK);p.line(17,32,17,37,'#ceae77');p.line(24,32,24,37,'#ceae77');if(family==='phoenix')for(let j=0;j<3;j++)p.line(17+j*3,30,10+j*10,39,'#dfa16f',2);}
  else if(['snake','hydra','dragon'].includes(family)){p.ellipse(17,30,13,6,INK);p.ellipse(17,29,11,4,col);p.line(24,28,25,15,col,6);for(const dx of family==='hydra'?[-9,0,8]:[0]){p.line(24,24,24+dx,13,col,4);p.block(22+dx,8,9,6,col);p.dot(28+dx,10,WHITE);p.rect(25+dx,14,4,1,dark);}if(family==='dragon'){p.poly([[20,23],[8,10],[11,25]],dark,INK);p.poly([[25,23],[36,8],[36,24]],col,INK);p.poly([[25,9],[22,2],[28,7],[32,1],[31,9]],'#ead19c',INK);p.line(10,30,2,35,col,4);}}
  else if(['spider','scorpion'].includes(family)){for(let j=0;j<3;j++)for(const side of [-1,1]){p.line(20+side*4,24,20+side*(13+j),20+j*5,dark,2);p.line(20+side*(13+j),20+j*5,20+side*(16+j),31+j*2,dark,2);}p.ellipse(18,26,9,7,INK);p.ellipse(18,25,8,6,col);p.block(25,23,7,6,dark);p.dot(29,24,'#efc180');p.dot(26,24,'#efc180');if(family==='scorpion'){p.line(10,25,5,16,col,4);p.line(5,16,9,6,col,4);p.poly([[8,5],[16,8],[10,11]],'#e5c58d',INK);}}
  else if(family==='mushroom'){p.block(16,23,10,13,'#dfd2ab');p.poly([[4,22],[7,12],[15,6],[26,6],[34,14],[37,24]],dark,INK);p.ellipse(21,19,15,7,col);p.rect(10,15,5,3,WHITE);p.rect(24,12,4,3,WHITE);p.rect(27,20,5,2,WHITE);p.dot(19,29,INK);p.dot(24,29,INK);}
  else if(family==='frog'){p.ellipse(20,29,14,8,INK);p.ellipse(20,28,13,7,col);for(const x of [11,28]){p.ellipse(x,20,5,6,dark);p.ellipse(x,19,3,4,WHITE);p.dot(x+1,19,INK);}p.line(9,31,4,36,dark,3);p.line(30,31,36,36,dark,3);p.line(14,30,25,30,INK);}
  else if(family==='turtle'){for(const [x,y] of [[9,22],[27,22],[9,33],[27,33]])p.block(x,y,5,3,'#bfc68a');p.block(29,23,9,7,'#bfc68a');p.ellipse(19,26,13,10,INK);p.ellipse(19,25,12,9,col);p.poly([[13,19],[22,17],[28,23],[25,30],[17,33],[10,28]],dark,light);p.line(12,23,26,26,light);p.line(19,18,19,32,light);p.dot(35,25,INK);}
 });}
 function creature(ctx,e){if(e.dummy){drawSprite(ctx,cached('dummy',32,40,p=>{p.ellipse(16,38,10,2,'#162c2a');p.block(15,15,2,23,'#aa8a5e');p.line(2,23,29,23,'#bfa074',3);p.block(9,15,16,15,'#c4b07a');for(let y=17;y<30;y+=3)p.line(10,y,23,y,'#8e805a');p.ellipse(17,9,6,7,INK);p.ellipse(17,9,5,6,'#e1cb92');p.dot(15,8,INK);p.dot(20,8,INK);}),e.x,e.y,2,e.dir);return;}const family=e.family||'slime';drawSprite(ctx,creatureSprite(family,Math.floor(e.walk*1.8)%4),e.x,e.y,e.boss?3.2:2,e.dir);if(e.hit>0){ctx.globalAlpha=.7;worldStar(ctx,e.x,e.y-(e.boss?90:50),'#fff2bd');ctx.globalAlpha=1;}}
 function npc(ctx,n,quest){const ids=['kiem','phap','cam','thuong'],col=['#e3bc77','#9bd2cf','#d6a1cc','#b9cf7e'][n.i%4];drawSprite(ctx,humanSprite(ids[n.i%4],0,false,col),n.x,n.y,1.35);ctx.fillStyle='#f3dda1';ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#16383b';ctx.strokeText(n.display_name,Math.round(n.x),Math.round(n.y-88));ctx.fillText(n.display_name,Math.round(n.x),Math.round(n.y-88));if(quest){ctx.fillStyle=quest===2?'#f4d776':'#91ddb4';ctx.font='bold 18px monospace';ctx.fillText('!',Math.round(n.x),Math.round(n.y-102));}}
 function companion(ctx,id,x,y,walk=0,scale=1,face=1){const map={soi:'wolf',hac:'bird',ho:'tiger',linhho:'fox',kylan:'qilin',phuong:'phoenix',rua:'turtle',thanhlong:'dragon',ngua1:'horse',ngua2:'horse',ngua3:'horse',heo:'boar',bo:'ox',trau:'ox',kimquy:'turtle',rong:'dragon'},pal={ngua1:'#b28d67',ngua2:'#d1d9c0',ngua3:'#bf8587',kimquy:'#d2b963',rong:'#dfc06e',phuong:'#d99971',ho:'#d6c7a0'};drawSprite(ctx,creatureSprite(map[id]||'wolf',Math.floor(walk*1.8)%4,pal[id]),x,y,scale*2,face);}
 function decorSprite(kind,biome=0,seed=0){return cached(`decor:${kind}:${biome}:${seed%3}`,kind==='house'?80:kind==='gate'?64:['tree','cherry'].includes(kind)?64:48,kind==='house'?88:kind==='gate'?64:['tree','cherry'].includes(kind)?96:72,p=>{const green=biome===2?['#4d8087','#7caaa2','#bdd7bb']:biome>2?['#435f70','#789695','#b2c798']:['#36754a','#67a54f','#a6cf67'];
  if(['tree','cherry','bamboo'].includes(kind)){if(kind==='bamboo'){for(let n=0;n<5;n++){const x=9+n*7,top=9+n%3*5;p.line(x,65,x-2,top,'#244239',3);p.line(x+1,64,x-1,top,'#77a06a');for(let y=top+8;y<62;y+=11){p.line(x-2,y,x+2,y,'#afbd79');p.poly([[x,y],[x-12,y-9],[x-8,y-1]],green[2]);p.poly([[x,y],[x+13,y-12],[x+8,y-2]],green[1]);}}return;}p.ellipse(33,90,27,4,'#183736');p.ellipse(34,89,20,3,'#203c3b');
   p.poly([[25,89],[28,48],[35,43],[39,88],[46,91],[34,89],[18,93]],'#65554b',INK);p.poly([[29,54],[33,51],[34,87],[29,88]],'#b4996b');p.line(28,71,19,61,'#78654d',4);p.line(34,65,44,52,'#aa8e62',3);p.line(36,76,37,86,'#3f4940',2);p.rect(28,80,3,2,'#d4b37e');p.line(29,89,22,92,'#a79160');
   const pal=kind==='cherry'?['#a35d86','#d780a2','#f6adbd','#ffe1cb']:biome===2?['#426d7f','#659897','#a1c8bf','#f2f7e4']:biome>2?['#365a68','#618a88','#8eb79e','#c2d99f']:['#2c6340','#4e923f','#88bc55','#c9df84'];
   const clumps=[[13,53,13,12],[47,51,15,15],[27,54,19,17],[17,35,16,14],[44,32,17,17],[31,18,18,16],[31,38,19,16]];
   clumps.forEach(([x,y,rx,ry],k)=>{const shape=[[x-rx,y-3],[x-rx+3,y-ry+3],[x-3,y-ry],[x+rx-4,y-ry+3],[x+rx,y-2],[x+rx-2,y+ry-4],[x+4,y+ry],[x-rx+4,y+ry-2]];p.poly(shape,pal[0],INK);p.poly(shape.map(([xx,yy])=>[x+(xx-x)*.92,y+(yy-y)*.84-2]),pal[1]);p.poly([[x-rx+3,y-4],[x-rx+6,y-ry+4],[x,y-ry+2],[x+rx-5,y-ry+4],[x+rx-3,y-4],[x+3,y],[x-5,y-3]],pal[2]);
    for(let j=0;j<22;j++){const xx=x-rx+3+(j*7+seed*3+k)%Math.max(1,rx*2-6),yy=y-ry+3+(j*11+seed+k*5)%Math.max(1,ry*2-6);if((xx-x)**2/rx**2+(yy-y)**2/ry**2<.63){p.rect(xx,yy,j%3?2:3,1,j%4?pal[2]:pal[3]);if(j%6===0)p.dot(xx+1,yy-1,pal[3]);}}
    p.line(x-rx+4,y+ry-4,x-rx+8,y+ry-3,pal[0]);
   });if(kind==='cherry'){for(let j=0;j<9;j++){const x=9+j*5,y=36+(j*7)%31;p.dot(x,y,'#ffe3c8');p.dot(x+1,y+1,'#f7b7b8');}}}

  else if(kind==='rock'){p.ellipse(25,67,18,3,'#173631');p.poly([[7,64],[10,52],[20,46],[34,48],[41,61],[34,67],[13,67]],'#9bafa0',INK);p.poly([[11,53],[21,48],[32,50],[27,58],[13,60]],'#d0dbc0');p.line(29,60,35,65,'#728a82');}
  else if(kind==='lantern'){p.line(23,66,23,22,INK,3);p.line(24,64,24,20,'#a58c61');p.line(23,20,35,20,'#b39a6e',2);p.line(34,21,34,30,'#c6a56e');p.block(29,31,10,16,'#b46552');p.rect(31,33,6,11,'#edba6d');p.rect(33,33,2,11,'#ffe1a0');p.line(32,48,35,52,'#d7a162');p.rect(29,30,10,2,'#674f48');p.rect(29,46,10,2,'#674f48');}
  else if(kind==='house'){p.ellipse(40,82,37,4,'#183b36');p.block(10,43,60,35,'#dcc692');p.rect(14,47,50,27,'#f3dfad');for(let n=0;n<5;n++)p.rect(12+n*12,45,3,33,'#957e58');p.block(31,56,17,23,'#4d6858');p.rect(40,58,1,20,'#96a173');p.rect(16,53,11,11,'#526d59');p.rect(53,53,11,11,'#526d59');p.line(21,53,21,64,'#d9c78d');p.line(58,53,58,64,'#d9c78d');p.poly([[2,44],[12,35],[23,16],[55,16],[69,36],[78,45]],'#3c7886',INK);for(let y=23;y<42;y+=5){const inset=12+(42-y)/2;p.line(inset,y,79-inset,y,y%2?'#91bcb0':'#639e9f',2);}p.line(23,15,55,15,'#d5dfb4',3);p.line(4,45,76,45,'#d8cc9c',2);p.block(24,80,32,3,'#a0a488');}
  else if(kind==='gate'){p.block(10,28,7,34,'#9b7d58');p.block(46,28,7,34,'#9b7d58');p.block(7,23,49,6,'#c1a46d');p.poly([[2,23],[12,16],[19,7],[45,7],[53,17],[61,23]],'#49848b',INK);p.line(19,8,45,8,'#b6bd8e',2);p.line(9,19,55,19,'#7e9a84',2);p.block(23,25,18,10,'#34554c');p.line(27,29,37,29,'#dec98e');p.rect(7,61,13,3,'#bac09b');p.rect(43,61,13,3,'#bac09b');}
  else if(kind==='bridge'){for(let y=30;y<66;y+=5){p.block(0,y,48,4,'#9d8c67');p.line(2,y+1,46,y+1,'#c8af7a');}for(const x of [2,44]){p.rect(x,18,3,53,'#493e31');for(let y=20;y<66;y+=12)p.block(x-1,y,5,7,'#ad9a6c');}}
 });}
 function decor(ctx,o,biome=0){const img=decorSprite(o.kind,biome,o.seed||0);drawSprite(ctx,img,o.x,o.y,(['tree','cherry'].includes(o.kind)?1.6:2)*(o.scale||1));}
 function ground(canvas,W,H,z,index){
  canvas.width=W;canvas.height=H;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
  const palettes=[['#78ae59','#8dbd64','#bedc85','#e0c68e','#3d98b6'],['#b79b67','#c7ae78','#e1c996','#efd8a5','#64abba'],['#bed7d2','#d1e3d4','#eef1df','#e2dfbf','#69a9c2'],['#708b80','#88a792','#bed1a5','#c5bc91','#478ea9'],['#958395','#b29aa8','#d6bac2','#dac8aa','#6c8eae'],['#689a8c','#82b4a0','#b6d6a7','#d6cda5','#3d90ae']];
  const pal=palettes[z.biome]||palettes[0],T=32;
  const roadAt=(x,y)=>Math.abs(x-(W*.48+Math.sin(y/H*5)*W*.025))<42||Math.abs(y-(H*.58+Math.sin(x/W*7)*18))<34;
  const waterAt=(x,y)=>z.biome!==1&&x<W*.15+Math.sin(y/160)*34;
  const tile=(type,v)=>cached(`tile23:${z.biome}:${type}:${v}`,16,16,p=>{
   p.rect(0,0,16,16,pal[type==='water'?4:type==='road'?3:type==='stone'?2:0]);
   if(type==='grass'){if(v<5){for(let n=0;n<3;n++){let x=(n*7+v*3)%16,y=(n*11+v*5)%16;p.line(x,y,x-1,y-2,pal[1]);p.dot(x+1,y-1,pal[2]);}}if(v===4){p.dot(10,6,'#efd28f');p.dot(11,5,'#f7e8b8');}if(v===9)for(let n=0;n<6;n++)p.rect((n*7)%16,(n*3)%16,4,2,pal[1]);}
   if(type==='road'){for(let n=0;n<5;n++)p.rect((n*7+v)%16,(n*3+v*5)%16,n%2?1:2,1,'#bea974');if(v%3===0){p.poly([[3,5],[8,3],[12,6],[11,10],[5,11]],'#e4ce9e');p.line(4,5,8,4,'#fff0c8');p.line(7,11,11,10,'#c6ad7e');}}
   if(type==='stone'){p.rect(0,0,16,16,'#7a9d87');for(const [x,y,w,h] of [[1,1,13,6],[-3,9,9,6],[8,9,9,6]]){p.rect(x,y,w,h,v%3?'#a3bf9b':'#aec8a2');p.line(x+1,y,x+w-2,y,'#d9dfb8');p.line(x,y+h-1,x+w-1,y+h-1,'#71937f');}if(v%4===0)p.line(4,2,6,5,'#7a9d87');if(v===3)p.rect(1,8,3,1,'#9dbd77');}
   if(type==='water'){p.rect(0,0,16,16,pal[4]);for(let n=0;n<3;n++){const y=2+n*5;p.line((n*5+v)%10,y,Math.min(15,(n*5+v)%10+4),y,shade(pal[4],n===1?18:8));}if(v===7)p.dot(10,6,'#74b8bb');}
  });
  for(let ty=0;ty<H/T;ty++)for(let tx=0;tx<W/T;tx++){
   const x=tx*T+16,y=ty*T+16;let type=waterAt(x,y)?'water':roadAt(x,y)?'road':'grass';
   if(Math.hypot((x-W*.5)/1.4,y-H*.58)<(z.safe_town?180:65))type='stone';
   const v=(tx*13+ty*7+index+Math.floor(tx/4)*3)%12;c.drawImage(tile(type,v),tx*T,ty*T,T,T);
   if(type==='water'&&!waterAt(x+T,y)){c.fillStyle='#89bd86';c.fillRect(tx*T+26,ty*T,6,T);c.fillStyle=pal[2];c.fillRect(tx*T+30,ty*T,2,T);for(let k=0;k<4;k++){c.fillStyle=pal[1];c.fillRect(tx*T+24+k%2*4,ty*T+k*8,4,4);}}
   if(type==='grass'&&roadAt(x+T,y)){c.fillStyle=pal[2];for(let k=0;k<3;k++)c.fillRect(tx*T+28-k%2*4,ty*T+k*10,4,2);}
  }
  // Flowers, moss patches and pebbles follow a deterministic map seed.
  let seed=913+index*187;const rng=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
  for(let n=0;n<430;n++){const x=Math.floor(rng()*W/2)*2,y=Math.floor(rng()*H/2)*2;if(waterAt(x,y)||roadAt(x,y)||Math.hypot((x-W*.5)/1.4,y-H*.58)<(z.safe_town?190:80))continue;const flower=n%9===0&&z.biome!==1;c.fillStyle=pal[1];c.fillRect(x,y,2,4);c.fillRect(x+4,y-2,2,6);c.fillStyle=flower?(n%2?'#edb6ac':'#e5d391'):pal[2];c.fillRect(x+2,y-4,flower?4:2,2);if(flower){c.fillStyle='#fff0c4';c.fillRect(x+3,y-3,2,2);}}
 }
 // World effects use a two-world-unit raster grid. No gradients or soft glow.
 const snap=n=>Math.round(n/2)*2;
 function worldPixel(c,x,y,col,size=2){c.fillStyle=col;c.fillRect(snap(x),snap(y),Math.max(2,snap(size)),Math.max(2,snap(size)));}
 function worldLine(c,x0,y0,x1,y1,col,size=2){x0=Math.round(x0/2);y0=Math.round(y0/2);x1=Math.round(x1/2);y1=Math.round(y1/2);let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,err=dx+dy;for(let n=0;n<1600;n++){worldPixel(c,x0*2,y0*2,col,size);if(x0===x1&&y0===y1)break;const e=2*err;if(e>=dy){err+=dy;x0+=sx;}if(e<=dx){err+=dx;y0+=sy;}}}
 function ring(c,x,y,rx,ry,col,dashed=false){const n=Math.max(20,Math.min(120,Math.ceil(rx*1.7)));for(let j=0;j<n;j++){if(dashed&&j%4>1)continue;const a=j/n*Math.PI*2;worldPixel(c,x+Math.cos(a)*rx,y+Math.sin(a)*ry,col,2);}}
 function worldStar(c,x,y,col){worldLine(c,x-4,y,x+4,y,col);worldLine(c,x,y-4,x,y+4,col);worldPixel(c,x,y,WHITE);}
 const schools={kiem:'ice',dao:'fire',cung:'nature',phap:'arcane',bua:'talisman',thich:'shadow',loi:'lightning',coquan:'steel',anha:'shadow',thuan:'ward',camy:'steel',thuong:'fire',cam:'sound',liem:'shadow'};
 const fxPal={ice:['#4285a6','#81e1ef','#d2ffff'],fire:['#a53f55','#fa965b','#ffe6a3'],nature:['#357c68','#8cdd9b','#e4f5af'],arcane:['#665399','#c39bfa','#f1d9ff'],talisman:['#378b84','#83e4ce','#f7ebae'],shadow:['#5d437e','#b798f3','#e7ddff'],lightning:['#aa772f','#ffd76c','#fff9cf'],steel:['#547e98','#a5daee','#edffff'],ward:['#4b8e8f','#84dcd7','#f6f2b8'],sound:['#9c5b8b','#efb3dc','#fff0f3']};
 function runeCircle(c,x,y,r,t,col){ring(c,x,y,r,r*.52,col);ring(c,x,y,r*.82,r*.43,col,true);for(let j=0;j<8;j++){const a=j*Math.PI/4+t*.35,xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r*.52;worldLine(c,xx-3,yy-3,xx+3,yy+3,col);worldLine(c,xx-3,yy+3,xx+3,yy-3,col);}for(let j=0;j<4;j++){const a=j*Math.PI/2-t*.25,b=a+Math.PI/2;worldLine(c,x+Math.cos(a)*r*.6,y+Math.sin(a)*r*.31,x+Math.cos(b)*r*.6,y+Math.sin(b)*r*.31,col);}}
 function shard(c,x,y,size,col){worldLine(c,x,y-size,x+size*.4,y,col,3);worldLine(c,x+size*.4,y,x,y+size*.25,col,3);worldLine(c,x,y+size*.25,x-size*.4,y,col,3);worldLine(c,x-size*.4,y,x,y-size,col,3);worldLine(c,x,y-size*.7,x,y,col,2);}
 function effect(c,e,hero){
  if(e.kind==='level'){FX.level(c,e,hero);return;}if(e.visual&&FX.draw(c,e,hero))return;
  const t=Math.min(1,1-e.life/e.max),style=e.style||schools[e.classId]||'ice',pal=fxPal[style]||fxPal.ice,col=e.color||pal[1],bright=pal[2],x=e.kind==='shield'?hero.x:e.x,y=(e.kind==='shield'?hero.y:e.y)-20;
  c.save();c.globalAlpha=Math.min(1,e.life/.16);
  if(e.kind==='click'){ring(c,x,y+20,10+t*18,5+t*9,'#e6dbab',true);worldStar(c,x,y+20,'#a8dfba');}
  if(e.kind==='slash'||e.kind==='wave'){
   const r=(e.r||80)*(.55+t*.45),a=e.angle||0,arc=e.kind==='wave'?1.35:.95;
   for(let layer=3;layer>=0;layer--){const rr=r-layer*5,offset=-layer*.09;for(let j=-20;j<=20;j++){const ang=a+j/20*arc+offset,tip=1-Math.abs(j)/24;worldPixel(c,x+Math.cos(ang)*rr,y+Math.sin(ang)*rr*.68,layer===0?bright:layer===1?col:pal[0],(layer===1?7:3)*tip+2);}}
   for(let j=0;j<7;j++){const ang=a-arc+j/6*arc*2,xx=x+Math.cos(ang)*r,yy=y+Math.sin(ang)*r*.68;if(style==='fire'){worldLine(c,xx,yy,xx-Math.cos(ang)*12,yy-14*(1-t),col,4);worldPixel(c,xx,yy-8,bright,2);}else if(style==='ice')shard(c,xx,yy,8*(1-t)+3,bright);else worldStar(c,xx,yy,col);}
  }
  if(e.kind==='ring'||e.kind==='level'){
   const r=(e.r||100)*Math.min(1,t*3);c.globalAlpha=.3*(1-t);ring(c,x,y+20,r+8,(r+8)*.55,pal[0]);c.globalAlpha=Math.min(1,e.life/.2);runeCircle(c,x,y+20,r,t,col);
   for(let n=0;n<8;n++){const a=n*Math.PI/4+t*.5,xx=x+Math.cos(a)*r*.75,yy=y+20+Math.sin(a)*r*.4;worldStar(c,xx,yy-t*40,bright);if(style==='ice')shard(c,xx,yy,8+t*10,col);if(style==='sound'){worldLine(c,xx,yy-15,xx,yy-4,col,2);worldLine(c,xx,yy-15,xx+5,yy-13,bright,2);worldPixel(c,xx-3,yy-4,col,4);}}
   if(e.kind==='level')for(let n=0;n<9;n++){const xx=x-36+n*9,yy=y-100*(1-t)+n%3*14;worldLine(c,xx,yy,xx,yy-25,bright,2);worldStar(c,xx,yy-28,col);}
  }
  if(e.kind==='danger'){const r=e.r||100;c.globalAlpha=.16;for(let yy=-r*.6;yy<r*.6;yy+=6)for(let xx=-r;xx<r;xx+=6)if((xx/r)**2+(yy/(r*.67))**2<1)worldPixel(c,x+xx,y+20+yy,'#d15b63',4);c.globalAlpha=1;ring(c,x,y+20,r,r*.67,'#fb806d',true);ring(c,x,y+20,r*t,r*t*.67,'#ffd0a0');worldLine(c,x,y+9,x,y+24,'#ffe0ac',3);worldPixel(c,x,y+29,'#fff5c7',4);}
  if(e.kind==='beam'){
   let px=x,py=y;for(let j=1;j<=12;j++){const nx=x+(e.tx-e.x)*j/12+(j<12?Math.sin(j*7+t*25)*12:0),ny=y+(e.ty-e.y)*j/12;worldLine(c,px,py,nx,ny,pal[0],8);worldLine(c,px,py,nx,ny,col,4);worldLine(c,px,py,nx,ny,bright,2);if(j%3===0)worldLine(c,nx,ny,nx+14,ny-18,col,2);px=nx;py=ny;}worldStar(c,e.tx,e.ty-20,bright);
  }
  if(e.kind==='shield'){
   const pulse=Math.sin(t*e.max*4);ring(c,x,y+4,31+pulse,42,bright);ring(c,x,y+4,35+pulse,46,col,true);for(let j=0;j<6;j++){const a=j*Math.PI/3+t*2;worldStar(c,x+Math.cos(a)*34,y+4+Math.sin(a)*43,col);}runeCircle(c,x,y+20,42,t,col);worldLine(c,x-13,y-28,x-20,y-17,bright,3);worldLine(c,x+17,y+12,x+21,y+3,bright,3);
  }
  if(e.kind==='heal'){runeCircle(c,x,y+20,24+t*35,t,'#83d7ab');for(let j=0;j<7;j++){const a=j*2.4+t*2,px=x+Math.cos(a)*32,py=y+10-t*70+j%3*15;worldLine(c,px-4,py,px+4,py,'#8fe2ac',4);worldLine(c,px,py-4,px,py+4,'#f0ffcc',2);}}
  if(e.kind==='projectile'){const px=x+(e.tx-e.x)*t,py=y+(e.ty-e.y)*t;for(let j=4;j>=0;j--)worldPixel(c,px-18+j*4,py+2,col,2+j%2*2);worldLine(c,px-8,py,px+3,py,bright,3);worldStar(c,px,py,bright);}
  if(e.kind==='dash'){for(let j=0;j<6;j++){const px=x+(e.tx-e.x)*j/6,py=y+(e.ty-e.y)*j/6;c.globalAlpha=(j+1)/9*(1-t);heroArt(c,e.classId,px,py+20,.95);worldLine(c,px-20,py,px+10,py,col,3);}c.globalAlpha=1;worldStar(c,e.tx,e.ty-25,bright);}
  if(e.kind==='rain'){
   runeCircle(c,x,y+20,e.r||100,t,col);for(let j=0;j<14;j++){const phase=(t*2.4+j/14)%1,xx=x+((j*67)%97/97-.5)*(e.r||100)*1.5,yy=y+((j*31)%59/59-.5)*(e.r||100)*.6,top=yy-150+phase*150;worldLine(c,xx+12,top-30,xx,top,col,4);worldLine(c,xx+10,top-26,xx,top,bright,2);if(phase>.65){const rr=(phase-.65)*50;ring(c,xx,yy+20,rr,rr*.5,col);if(style==='ice')shard(c,xx,yy+10,18*(1-phase),bright);else if(style==='fire'){worldLine(c,xx,yy,xx-8,yy-30*(1-phase),col,4);worldPixel(c,xx,yy-8,bright,4);}}}
  }
  if(e.kind==='impact'){
   const r=(e.crit?28:15)*(t+.3);for(let j=0;j<8;j++){const a=j*Math.PI/4;worldLine(c,x+Math.cos(a)*r*.4,y+Math.sin(a)*r*.6,x+Math.cos(a)*r,y+Math.sin(a)*r,col,e.crit?4:2);}worldStar(c,x,y,bright);if(style==='ice')shard(c,x+8,y,12*(1-t),bright);if(e.crit)ring(c,x,y,r*1.3,r*.8,bright);
  }
  c.restore();
 }
 function heroArt(c,id,x,y,scale){hero(c,id||'kiem',x,y,{scale});}
 function aura(c,e,time){
  for(const d of e.dots||[]){const color=d.kind==='poison'?'#98df8d':'#ffad6f';for(let j=0;j<3;j++){const a=j*2.1+time*2,xx=e.x+Math.cos(a)*18,yy=e.y-18-(time*20+j*14)%40;worldPixel(c,xx,yy,color,4);worldPixel(c,xx+2,yy-4,'#f1e9b2',2);}}
  if(e.stun>0)for(let j=0;j<3;j++){const a=time*4+j*Math.PI*2/3;worldStar(c,e.x+Math.cos(a)*16,e.y-(e.boss?115:70)+Math.sin(a)*5,'#ffe5a0');}
  if(e.slow>time){ring(c,e.x,e.y,24,10,'#99ddec',true);for(let j=0;j<3;j++)shard(c,e.x-15+j*14,e.y,7,'#c2f4f3');}
 }
 function projectile(c,p){if(p.visual&&FX.projectile(c,p))return;const angle=Math.round(Math.atan2(p.vy,p.vx)/(Math.PI/4)),col=p.color||'#b0d1bc',family=p.family||'arrow';const img=cached(`projectile:${family}:${angle}:${col}`,24,24,q=>{
  if(['fire','meteor','orb'].includes(family)){q.ellipse(13,12,family==='meteor'?7:6,6,INK);q.ellipse(13,12,family==='meteor'?6:5,5,shade(col,-45));q.ellipse(14,11,4,4,col);q.ellipse(15,10,2,2,WHITE);for(let j=0;j<3;j++){const a=angle*Math.PI/4;q.rect(12-Math.cos(a)*(11-j*3),12-Math.sin(a)*(11-j*3),3,2,j%2?col:shade(col,-25));}}
  else if(family==='tal'){q.block(8,6,8,12,'#e4d2a0');q.line(11,8,14,13,'#bb7468');q.line(12,11,10,15,'#bb7468');}
  else{const a=angle*Math.PI/4,cs=Math.cos(a),sn=Math.sin(a),rot=(x,y)=>[12+Math.round(x*cs-y*sn),12+Math.round(x*sn+y*cs)],v=rot(-9,0),w=rot(8,0);q.line(...v,...w,col,family==='giantarrow'?3:1);const tip=rot(10,0),l=rot(4,-3),r=rot(4,3);q.poly([tip,l,r],WHITE,INK);}
 });drawSprite(c,img,p.x,p.y-24,2,1,'center');}
 function loot(c,l,time){const col=['#b2c3b9','#83c9a0','#7ebce1','#c4a0e4','#ecc574','#e9a9cc'][l.item?.rarity||0],img=cached('loot:'+(l.kind==='gold'?'gold':l.item?.rarity),14,18,p=>{if(l.kind==='gold'){p.ellipse(7,12,6,4,INK);p.ellipse(7,11,5,3,'#c89b56');p.ellipse(7,9,5,3,'#f2d184');p.line(6,8,6,11,'#a57b49');}else{p.poly([[7,1],[12,7],[10,13],[7,16],[2,11],[1,7]],col,INK);p.line(7,3,4,8,WHITE);p.line(4,8,7,13,shade(col,-40));}});drawSprite(c,img,l.x,l.y+Math.floor(Math.sin(time*3)*2)*2,1.5);if(l.kind==='item'){c.globalAlpha=.5;worldLine(c,l.x,l.y-45,l.x,l.y-20,col,2);c.globalAlpha=1;}}
 function creaturePortrait(family){return asImage(creatureSprite(family),'codex-sprite',64);}
 return {schoolFX:FX,visualFor:FX.visual,basicVisual:FX.basic,fxColor:(id,style)=>fxPal[style||schools[id]||'ice'][1],aura,creaturePortrait,icon:name=>asImage(uiSprite(name)),skillIcon,skillSprite,classPortrait,hero,creature,npc,companion,decor,ground,effect,projectile,loot,ring,worldStar,cache};
}
const api={createPixelArt};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.KV_PIXEL=api;
})(globalThis);
