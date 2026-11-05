/* Original pixel choreography: fourteen schools, eight authored compositions each. */
(function(root){
'use strict';
const TAU=Math.PI*2;
const SCHOOL_DEFS={
 kiem:{name:'Kiếm Khách',theme:'Kiếm trận thanh ngọc',palette:['#24596b','#69dce3','#e7ffff'],motifs:['triple-cut','sword-dash','sword-guard','sword-orbit','sword-execution','sword-vortex','sky-greatsword','sword-sanctuary'],labels:['Ba lưỡi kiếm giao nhau','Kiếm ảnh xuyên tuyến','Bốn kiếm hộ thân','Ngự kiếm xoay vòng','Một kiếm xuyên tâm','Lốc xoáy kiếm trận','Thiên kiếm giáng xuống','Kiếm thánh và bát kiếm']},
 dao:{name:'Bá Đao',theme:'Đại đao và địa chấn',palette:['#763e43','#f69b63','#fff0b7'],motifs:['blade-sweep','ground-rupture','iron-rampart','berserker-flames','overlord-cleave','blade-cyclone','sky-splitter','overlord-impact'],labels:['Đại đao quét ngang','Địa chấn rạn đất','Thiết bích giáp nặng','Cuồng nộ bốc lửa','Bá vương bổ xuống','Sáu vòng đao xoáy','Đao xé trời','Cự đao và chấn địa']},
 cung:{name:'Thần Xạ',theme:'Ưng tiễn và gió lục',palette:['#315f4f','#a7e88b','#f6ffd0'],motifs:['twin-arrows','piercing-wind','eagle-eye','arrow-shower','heaven-arrow','explosive-fan','arrow-lattice','eagle-constellation'],labels:['Song tiễn lông ưng','Tiễn xuyên gió','Mắt ưng mở cánh','Mưa tên xiên','Thần tiễn cự đại','Ngũ tiễn nổ','Lưới tiễn xanh','Ưng tinh và thiên tiễn']},
 phap:{name:'Pháp Sư',theme:'Hỏa liên, băng tinh, lôi chớp',palette:['#75529e','#cca0ff','#fff1ff'],motifs:['fireball','ice-prison','arcane-lightning','prism-barrier','meteor-field','frost-nova','heaven-lightning','inferno-lotus'],labels:['Hỏa cầu đuôi lửa','Ngục băng tinh thể','Sét phép chia nhánh','Khiên lăng kính','Thiên thạch bốc cháy','Băng nở sáu cánh','Lôi trụ tím','Hỏa liên nở nhiều tầng']},
 bua:{name:'Đạo Sĩ',theme:'Phù triện, bát quái, linh hồ',palette:['#396c65','#91ead1','#fff0b3'],motifs:['poison-talisman','spring-leaves','spirit-fox','binding-seal','five-thunder-talismans','poison-scroll-fan','celestial-seal','supreme-rebirth'],labels:['Linh phù độc','Lá xuân hồi phục','Linh hồ ba đuôi','Phù định thân','Ngũ phù dẫn lôi','Bảy lá phù độc','Thiên sư bát quái','Bát quái hồi xuân']},
 thich:{name:'Thích Khách',theme:'Song chủy, ảnh bộ, phân thân',palette:['#30476c','#92bdf6','#eef3ff'],motifs:['crossed-daggers','shadow-step','stealth-smoke','triple-kunai','assassin-mark','dagger-tornado','shadow-clones','invisible-execution'],labels:['Song chủy bốn nhịp','Ảnh bộ tam bóng','Khói ẩn thân','Tam phi đao','Ấn ám sát chữ thập','Lốc chủy thủ','Phân thân bao vây','Ảnh sát liên kích']},
 loi:{name:'Lôi Chấn Hiệp',theme:'Lôi côn và thiên phạt',palette:['#335e8c','#7ad9ff','#fff5b8'],motifs:['thunder-staff','electric-step','electric-body','thunder-chain','thunder-pillar','electric-domain','nine-thunder-columns','heaven-judgement'],labels:['Lôi côn vạch chớp','Đường lướt điện giật','Điện giáp quanh thân','Liên hoàn lôi xanh','Lôi trụ bổ dọc','Lôi vực ô điện','Chín cột thiên lôi','Thiên phạt cự lôi']},
 coquan:{name:'Cơ Quan Sư',theme:'Đồng cơ, bánh răng, pháo trận',palette:['#665144','#dbb879','#e9f5db'],motifs:['repeating-crossbow','powder-bomb','bronze-armour','minefield','divine-cannon','gear-storm','turret-volley','celestial-artillery'],labels:['Liên nỗ cơ khí','Lựu đạn hỏa dược','Đồng giáp bánh răng','Mìn cơ quan','Nòng pháo thần cơ','Bánh răng cắt xoáy','Ba ụ nỗ bắn loạt','Pháo trận sáu nòng']},
 anha:{name:'Ảnh Nha Khách',theme:'Hắc vũ và đàn quạ',palette:['#3c325b','#ad88d9','#ead7ff'],motifs:['raven-claws','black-wing-dash','feather-blades','death-feather-seal','soul-raven','raven-swarm','black-wings','raven-devouring'],labels:['Ba vệt nha trảo','Cánh quạ lướt bóng','Lông vũ phi tiêu','Ấn lông vũ tử thần','Quạ đoạt hồn','Đàn quạ xoáy','Hắc dực mở rộng','Quạ khổng lồ phệ hồn']},
 thuan:{name:'Huyền Thuẫn Tướng',theme:'Thuẫn trận và Huyền Vũ',palette:['#36595b','#83c8ba','#fff1b8'],motifs:['shield-bash','shield-charge','diamond-bulwark','army-banner','mountain-shield','lance-wall','immovable-guardian','black-tortoise'],labels:['Thuẫn kích hình khiên','Thuẫn xung mở đường','Kim cương thuẫn lục giác','Quân kỳ hộ trận','Tường thuẫn chấn sơn','Hàng thương sau khiên','Tượng hộ pháp bất động','Huyền Vũ che trời']},
 camy:{name:'Cẩm Y Vệ',theme:'Tú xuân, mật lệnh, mai hoa',palette:['#713d52','#e7908e','#ffe4b0'],motifs:['sleeve-bolts','embroidered-sabre','secret-eye-token','plum-needles','pursuit-crossbow','imperial-net','pursuing-rain','imperial-execution'],labels:['Tụ tiễn kim đỏ','Tú xuân đao hồng','Mật lệnh nhãn','Mai hoa châm sáu cánh','Nỗ truy mệnh','Lưới ấn Cẩm Y','Tiễn truy hồn đỏ','Mật lệnh trảm quyết']},
 thuong:{name:'Long Thương Tướng',theme:'Long ảnh và thương vàng',palette:['#854c3b','#efb76f','#fff3c2'],motifs:['spear-thrust','returning-spear','dragon-charge','spear-formation','sweeping-dragon','five-spear-thrusts','war-spirit','dragon-roar'],labels:['Thương đâm tuyến thẳng','Hồi mã vòng thương','Long kỵ xung phong','Thương trận bốn hướng','Long ảnh quét vòng','Ngũ liên đột thích','Chiến hồn giáp thương','Kim long hống thiên']},
 cam:{name:'Thiên Âm Cầm Sư',theme:'Dây đàn, âm phù, phượng khúc',palette:['#754771','#f0b0db','#fff0ea'],motifs:['sound-wave','pure-melody','soul-score','phoenix-song','heart-strings','ambush-score','night-song','demonic-symphony'],labels:['Âm ba dây đàn','Thanh tâm nốt nhạc','Nhạc phổ loạn hồn','Phượng minh tam âm','Dây đàn hộ tâm','Âm phù thập diện','Trăng tĩnh dạ tư','Đại phổ Thiên Ma']},
 liem:{name:'U Minh Liêm Sư',theme:'Hồn xích, huyết liêm, quỷ môn',palette:['#3d4a60','#9fd5ba','#eee1fc'],motifs:['soul-hook','blood-scythe','ghost-step','chain-prison','devouring-skull','underworld-tide','hundred-ghosts','yama-verdict'],labels:['Móc hồn xích','Huyết liêm lưỡi cong','Quỷ bộ tàn hồn','Ngục hồn xích','Đầu lâu phệ hồn','U minh triều dâng','Bách quỷ xuất hiện','Quỷ môn Diêm La']}
};
const LEVEL_STYLE=Object.freeze({pillarSeconds:1.4,pillarHeight:260,pillarWidth:34,ringSeconds:.9,ringStart:5,ringEnd:90,particleCount:26,particleSeconds:1,bannerHold:2,bannerFade:.52,raysSize:320});
function createSchoolFX(data){
 const skills=new Map(),basic=new Map();
 for(const c of data.classes){const d=SCHOOL_DEFS[c.class_id];if(!d)throw Error('Missing pixel school '+c.class_id);basic.set(c.class_id,{classId:c.class_id,slot:0,skillId:c.class_id+'_basic',motif:d.motifs[0],label:d.labels[0],type:'basic',basic:true});for(const sk of data.skills.filter(s=>s.class_id===c.class_id)){const slot=sk.slot-1;skills.set(sk.skill_id,Object.freeze({classId:c.class_id,slot,skillId:sk.skill_id,motif:d.motifs[slot],label:d.labels[slot],type:sk.mechanic_type,signature:c.class_id+'/'+d.motifs[slot]}));}}
 function visual(sk){return typeof sk==='string'?skills.get(sk):skills.get(sk?.skill_id);}
 function pen(c,grid=2){const snap=n=>Math.round(n/grid)*grid;
  const p={rect(x,y,w,h,col){c.fillStyle=col;c.fillRect(snap(x),snap(y),Math.max(grid,snap(w)),Math.max(grid,snap(h)));}};
  p.dot=(x,y,col)=>p.rect(x,y,grid,grid,col);
  p.line=(x,y,xx,yy,col,width=grid)=>{x=Math.round(x/grid);y=Math.round(y/grid);xx=Math.round(xx/grid);yy=Math.round(yy/grid);let dx=Math.abs(xx-x),sx=x<xx?1:-1,dy=-Math.abs(yy-y),sy=y<yy?1:-1,err=dx+dy;for(let n=0;n<900;n++){p.rect(x*grid,y*grid,width,width,col);if(x===xx&&y===yy)break;const e=err*2;if(e>=dy){err+=dy;x+=sx;}if(e<=dx){err+=dx;y+=sy;}}};
  p.poly=(v,col,edge)=>{const ys=v.map(a=>a[1]);for(let y=Math.min(...ys);y<=Math.max(...ys);y+=grid){const xs=[];for(let i=0,j=v.length-1;i<v.length;j=i++){const a=v[i],b=v[j];if((a[1]>y)!==(b[1]>y))xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));}xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2)p.rect(xs[i],y,xs[i+1]-xs[i],grid,col);}if(edge)for(let i=0;i<v.length;i++)p.line(...v[i],...v[(i+1)%v.length],edge);};
  p.ellipse=(x,y,rx,ry,col)=>{for(let yy=-Math.ceil(ry);yy<=ry;yy+=grid){const w=rx*Math.sqrt(Math.max(0,1-yy*yy/(ry*ry||1)));p.rect(x-w,y+yy,w*2,grid,col);}};
  return p;
 }
 function local(p,x,y,s=1,a=0){const cs=Math.cos(a),sn=Math.sin(a),v=(xx,yy)=>[x+(xx*cs-yy*sn)*s,y+(xx*sn+yy*cs)*s];const q={};q.line=(xx,yy,xxx,yyy,c,w=1)=>p.line(...v(xx,yy),...v(xxx,yyy),c,w*s);q.poly=(points,c,o)=>p.poly(points.map(z=>v(...z)),c,o);q.rect=(xx,yy,w,h,c)=>q.poly([[xx,yy],[xx+w,yy],[xx+w,yy+h],[xx,yy+h]],c);q.dot=(xx,yy,c)=>p.dot(...v(xx,yy),c);q.ellipse=(xx,yy,rx,ry,c)=>p.ellipse(...v(xx,yy),rx*s,ry*s,c);return q;}
 function path(p,pts,col,w=2){for(let i=1;i<pts.length;i++)p.line(...pts[i-1],...pts[i],col,w);}
 function ellipse(p,x,y,rx,ry,col,dash=false){const n=Math.max(16,Math.min(90,Math.round(rx)));let prev;for(let i=0;i<=n;i++){const a=i/n*TAU,v=[x+Math.cos(a)*rx,y+Math.sin(a)*ry];if(prev&&(!dash||i%4<2))p.line(...prev,...v,col,2);prev=v;}}
 function star(p,x,y,s,c){p.line(x-s,y,x+s,y,c,2);p.line(x,y-s,x,y+s,c,2);}
 function polygon(p,x,y,r,n,col,a=0,flat=.6){const v=Array.from({length:n},(_,i)=>[x+Math.cos(a+i/n*TAU)*r,y+Math.sin(a+i/n*TAU)*r*flat]);path(p,[...v,v[0]],col,2);}
 function sword(p,x,y,s,a,pal,broad=false){const q=local(p,x,y,s,a);q.poly([[-2,9],[-3,-10],[0,-16],[3,-10],[2,9]],pal[1],pal[0]);q.line(0,-12,0,7,pal[2],2);q.line(-5,7,5,7,pal[1],2);q.line(0,9,0,15,pal[0],3);if(broad)q.poly([[2,-13],[8,-10],[8,-3],[2,6]],pal[1],pal[0]);}
 function arrow(p,x,y,s,a,pal){const q=local(p,x,y,s,a);q.line(-15,0,10,0,pal[1],2);q.poly([[15,0],[6,-5],[8,0],[6,5]],pal[2]);q.line(-11,0,-16,-4,pal[1],2);q.line(-11,0,-16,4,pal[1],2);}
 function bolt(p,x,y,s,pal){const q=local(p,x,y,s);q.poly([[3,-18],[-8,0],[-1,-1],[-6,17],[9,-4],[2,-3],[8,-18]],pal[1],pal[0]);q.line(3,-13,-2,-1,pal[2],2);q.line(0,0,-3,10,pal[2],2);}
 function shield(p,x,y,s,pal,hex=false){const q=local(p,x,y,s);const v=hex?[[-13,-8],[0,-15],[13,-8],[13,6],[0,16],[-13,6]]:[[-12,-12],[0,-16],[12,-12],[10,6],[0,17],[-10,6]];q.poly(v,pal[0],pal[1]);q.poly(v.map(([a,b])=>[a*.68,b*.68]),'#142b3b',pal[2]);q.line(0,-8,0,9,pal[1],3);q.line(-6,-1,6,-1,pal[1],2);}
 function raven(p,x,y,s,phase,pal){const q=local(p,x,y,s);const flap=Math.sin(phase*TAU)*5;q.poly([[0,1],[-6,-5],[-19,-9-flap],[-14,1],[-5,6],[0,3]],pal[0],pal[1]);q.poly([[0,1],[6,-5],[19,-9-flap],[14,1],[5,6],[0,3]],pal[0],pal[1]);q.poly([[-3,1],[0,-7],[4,-5],[6,0],[2,7],[0,12],[-3,7]],pal[0],pal[1]);q.dot(3,-4,pal[2]);q.line(5,-2,9,-1,pal[2],2);}
 function gear(p,x,y,r,a,pal){for(let j=0;j<10;j++){const aa=a+j/10*TAU,q=local(p,x+Math.cos(aa)*r*.85,y+Math.sin(aa)*r*.85,r/16,aa);q.rect(-3,-3,6,6,pal[1]);}ellipse(p,x,y,r*.74,r*.74,pal[1]);ellipse(p,x,y,r*.5,r*.5,pal[0]);ellipse(p,x,y,r*.2,r*.2,pal[2]);for(let j=0;j<4;j++){const aa=a+j/4*TAU;p.line(x+Math.cos(aa)*r*.24,y+Math.sin(aa)*r*.24,x+Math.cos(aa)*r*.65,y+Math.sin(aa)*r*.65,pal[1],3);}}
 function talisman(p,x,y,s,a,pal){const q=local(p,x,y,s,a);q.poly([[-7,-13],[7,-13],[7,11],[3,14],[-7,11]],'#f8dfa2',pal[0]);q.line(-5,-9,5,-9,'#bf6a64',2);path(q,[[0,-6],[-2,-2],[3,1],[-2,5],[2,9]],'#b15563',2);q.line(-3,2,4,2,'#b15563',1);}
 function note(p,x,y,s,a,pal){const q=local(p,x,y,s,a);q.line(0,-12,0,7,pal[1],2);q.line(0,-12,10,-9,pal[2],3);q.line(10,-9,10,8,pal[1],2);q.ellipse(-3,8,4,3,pal[1]);q.ellipse(7,9,4,3,pal[2]);}
 function skull(p,x,y,s,pal){const q=local(p,x,y,s);q.poly([[-9,-7],[-5,-12],[5,-12],[10,-7],[9,2],[5,4],[5,10],[-5,10],[-5,4],[-9,2]],pal[1],pal[0]);q.rect(-6,-5,4,4,'#1e293b');q.rect(3,-5,4,4,'#1e293b');q.poly([[0,0],[-2,3],[2,3]],pal[0]);for(let j=-3;j<=3;j+=3)q.line(j,6,j,10,pal[0],1);}
 function chain(p,x,y,xx,yy,n,pal){for(let j=0;j<n;j++){const t=j/(n-1||1),a=Math.atan2(yy-y,xx-x);polygon(p,x+(xx-x)*t,y+(yy-y)*t,5,4,pal[j%2?1:2],a,1);}}
 function spear(p,x,y,s,a,pal){const q=local(p,x,y,s,a);q.line(-20,0,15,0,pal[0],3);q.line(-20,-1,15,-1,pal[1]);q.poly([[23,0],[10,-5],[13,0],[10,5]],pal[2],pal[1]);q.poly([[11,1],[7,11],[14,5],[18,8]],'#df7e69');}
 function dragon(p,x,y,s,t,pal){let prev;for(let j=14;j>=0;j--){const u=j/14,xx=x+(u-.5)*s*120,yy=y+Math.sin(u*TAU*1.2+t*6)*s*19;ellipse(p,xx,yy,s*(4+u*3),s*(4+u*3),pal[1]);if(prev)p.line(...prev,xx,yy,pal[0],s*5);if(j%3===0)p.line(xx,yy,xx-4*s,yy-10*s,pal[2],s*2);prev=[xx,yy];}const q=local(p,x-s*62,y+Math.sin(t*6)*s*19,s);q.poly([[0,-7],[-12,-8],[-19,-3],[-20,3],[-11,8],[1,6],[6,0]],pal[1],pal[0]);q.line(-5,-7,-7,-17,pal[2],2);q.line(2,-5,5,-14,pal[2],2);q.dot(-11,-2,pal[2]);q.line(-15,6,-24,11,pal[1]);}
 function scythe(p,x,y,s,a,pal){const q=local(p,x,y,s,a);q.line(0,-16,0,20,pal[0],3);q.line(1,-16,1,20,pal[1]);q.poly([[0,-17],[12,-18],[22,-10],[23,3],[17,-5],[9,-10],[0,-9]],pal[1],pal[0]);q.line(3,-16,12,-14,pal[2],2);}
 function lotus(p,x,y,r,t,pal){for(let layer=0;layer<2;layer++)for(let i=0;i<6;i++){const a=i/6*TAU+layer*.5+t*.25,q=local(p,x,y,r/24,a);q.poly([[0,2],[6,-9],[3,-21],[-3,-24],[-8,-13]],layer?pal[1]:pal[0],layer?pal[2]:pal[1]);}star(p,x,y,r*.3,pal[2]);}
 function feather(p,x,y,s,a,pal){const q=local(p,x,y,s,a);q.poly([[0,-15],[-6,-9],[-7,1],[-2,10],[1,14],[5,2],[5,-9]],pal[0],pal[1]);q.line(0,-12,0,17,pal[2]);for(let j=-6;j<9;j+=5)q.line(-4,j-1,0,j+3,pal[1]);}
 function token(p,x,y,s,pal){const q=local(p,x,y,s);q.poly([[-7,-12],[0,-17],[8,-12],[8,10],[0,14],[-7,10]],pal[0],pal[1]);q.line(-4,-9,4,-9,pal[2]);q.line(0,-7,0,7,pal[2],2);q.line(-4,-3,4,-3,pal[2],2);q.line(-4,2,4,2,pal[2]);q.line(0,14,-5,21,'#dc797f',2);q.line(0,14,4,21,'#dc797f',2);}
 const render={};
 render.kiem=(p,o)=>{const {x,y,r,t,n,pal}=o,s=r/65;
  if(n===1){for(let j=0;j<4;j++)sword(p,x-r*.8+j*r*.5,y-j*4,s*.6,Math.PI/2,pal);return;}
  if(n===4){sword(p,x,y-35*(1-t),s*2.1,0,pal);path(p,[[x-r*.3,y+r*.3],[x,y],[x+r*.3,y-r*.3]],pal[2],3);return;}
  if(n===6){for(let j=-1;j<=1;j++)sword(p,x+j*r*.45,y-60*(1-t),s*1.5,j*.16,pal);return;}
  const count=[3,4,4,7,1,9,3,8][n];for(let j=0;j<count;j++){const a=n===0?-.8+j*.8:j/count*TAU+t*(n===5?4:1),rr=n===0?r*.4:r*(n===2?.55:.7);sword(p,x+Math.cos(a)*rr,y+Math.sin(a)*rr*.5,s*(n===7?.85:.6),a+(n===0?o.a:Math.PI/2),pal);}if(n===7)sword(p,x,y-r*.15,s*1.8,0,pal);
 };
 render.dao=(p,o)=>{const {x,y,r,t,n,pal}=o,s=r/58;
  if(n===6){sword(p,x+r*.15,y-r*.1,s*1.8,.3+t*.8,pal,true);for(let j=0;j<3;j++)path(p,[[x-r*.9,y-r*.6+j*7],[x,y+j*7],[x+r*.9,y+r*.5+j*7]],j===1?pal[2]:pal[1],j===1?4:2);return;}
  if([1,6,7].includes(n)){for(let j=0;j<7;j++){const a=j/7*TAU,pts=[[x,y],[x+Math.cos(a)*r*.35,y+Math.sin(a)*r*.22],[x+Math.cos(a+.14)*r*.65,y+Math.sin(a+.14)*r*.43],[x+Math.cos(a)*r,y+Math.sin(a)*r*.65]];path(p,pts,pal[0],5);path(p,pts,pal[1],2);}sword(p,x,y-r*.25,s*(n===7?2:1.25),-.4+t*.9,pal,true);return;}
  if(n===2){for(let j=-1;j<=1;j++){shield(p,x+j*r*.38,y,s*.7,pal);p.rect(x+j*r*.38-8,y+r*.3,16,5,pal[0]);}return;}
  if(n===3){for(let j=0;j<8;j++){const a=j/8*TAU,xx=x+Math.cos(a)*r*.6,yy=y+Math.sin(a)*r*.3;path(p,[[xx-7,yy],[xx,yy-28-t*20],[xx+6,yy-7]],pal[1],5);}sword(p,x,y,s,Math.PI/4,pal,true);return;}
  const count=n===5?6:n===4?1:2;for(let j=0;j<count;j++){const a=o.a+t*TAU*(n===5?1:.2)+j/count*TAU;sword(p,x+Math.cos(a)*r*.3,y+Math.sin(a)*r*.22,s*(n===4?1.7:.85),a+Math.PI/2,pal,true);}if(n===4)path(p,[[x-r*.6,y-r*.5],[x+r*.7,y+r*.4]],pal[2],5);
 };
 render.cung=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===2){raven(p,x,y,r/30,t,pal);ellipse(p,x,y,14*r/45,8*r/45,pal[2]);p.dot(x,y,pal[0]);return;}
  if(n===7){raven(p,x,y-r*.5,r/45,t,pal);for(let j=0;j<8;j++){const a=j/8*TAU;arrow(p,x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.42,r/80,a+Math.PI/2,pal);}return;}
  const count=n===0?2:n===1||n===4?1:n===5?5:n===6?15:9;
  for(let j=0;j<count;j++){const a=n===5?o.a+(j-2)*.25:o.a,xx=n===3||n===6?x+((j*47)%101/100-.5)*r*1.5:x+(t-.5)*r*.7,yy=n===3||n===6?y+((j*23)%71/70-.5)*r*.7:(j-(count-1)/2)*r*.22+y;arrow(p,xx,yy,r/(n===4?35:n===1?45:85),n===3||n===6?1.8:a,pal);if(n===1||n===4)for(let k=0;k<3;k++)p.line(xx-r*.8,yy-7+k*7,xx-r*.1,yy-7+k*7,pal[k%2],2);}
 };
 render.phap=(p,o)=>{let {x,y,r,t,n}=o;const fire=['#a5484a','#ff984f','#fff2b3'],ice=['#326b9b','#88e1f5','#e5ffff'],purple=['#63539d','#c6a7ff','#fff1ff'];
  if(n===0){for(let j=4;j>=0;j--)p.ellipse(x-j*r*.19,y+Math.sin(j+t*8)*r*.12,r*(.28-j*.04),r*(.28-j*.04),j>1?fire[0]:fire[1]);p.ellipse(x,y,r*.17,r*.17,fire[2]);return;}
  if(n===1||n===5){const count=n===1?6:12;for(let j=0;j<count;j++){const a=j/count*TAU,q=local(p,x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.3,r/55,a);q.poly([[0,10],[-5,-9],[0,-28*t-7],[7,-10]],ice[1],ice[0]);q.line(0,-22*t,0,6,ice[2],2);}polygon(p,x,y,r*.8,6,ice[1],t*.1);return;}
  if(n===2||n===6){for(let j=0;j<(n===6?7:3);j++){const xx=x+(j-(n===6?3:1))*r*.24;path(p,[[xx+6,y-r*.8],[xx-10,y-r*.35],[xx+4,y-r*.4],[xx-6,y+r*.25]],purple[1],5);path(p,[[xx+6,y-r*.8],[xx-10,y-r*.35],[xx+4,y-r*.4],[xx-6,y+r*.25]],purple[2],2);}return;}
  if(n===3){polygon(p,x,y,r*.7,6,purple[1],-.5,1);polygon(p,x,y,r*.5,4,purple[2],Math.PI/4,1);for(let j=0;j<6;j++){const a=j/6*TAU;star(p,x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.7,r*.08,purple[2]);}return;}
  if(n===4){for(let j=0;j<7;j++){const xx=x+((j*47)%101/100-.5)*r*1.4,yy=y+((j*23)%71/70-.5)*r*.7-(1-(t+j*.13)%1)*r*.4;p.line(xx+18,yy-50,xx,yy,fire[0],8);p.line(xx+12,yy-32,xx,yy,fire[1],5);p.ellipse(xx,yy,7,7,fire[2]);}return;}
  lotus(p,x,y,r*.75,t,fire);for(let j=0;j<8;j++){const a=j/8*TAU;path(p,[[x+Math.cos(a)*r*.8,y+Math.sin(a)*r*.45],[x+Math.cos(a)*r*.6,y+Math.sin(a)*r*.3-35*t]],fire[1],4);}
 };
 function bagua(p,x,y,r,t,pal){ellipse(p,x,y,r,r*.55,pal[1]);ellipse(p,x,y,r*.68,r*.37,pal[2]);for(let j=0;j<8;j++){const a=j/8*TAU+t*.3,q=local(p,x+Math.cos(a)*r*.84,y+Math.sin(a)*r*.46,r/75,a);for(let k=0;k<3;k++){if(j&(1<<k)){q.line(-8,k*4,8,k*4,pal[2],2);}else{q.line(-8,k*4,-2,k*4,pal[1],2);q.line(2,k*4,8,k*4,pal[1],2);}}}}
 render.bua=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===1||n===7){bagua(p,x,y+r*.12,r*.7,t,pal);for(let j=0;j<7;j++){const a=j/7*TAU+t*2,q=local(p,x+Math.cos(a)*r*.5,y+Math.sin(a)*r*.2-r*t*.4,r/55,a);q.poly([[0,0],[-5,-4],[0,-14],[5,-4]],pal[1],pal[2]);}if(n===7)talisman(p,x,y-r*.25,r/45,0,pal);return;}
  if(n===2){const q=local(p,x,y,r/45);for(let j=-1;j<=1;j++)q.poly([[-4,7],[-22+j*9,-2],[-20+j*11,19],[-7,16]],pal[1],pal[0]);q.poly([[-12,-2],[-12,-18],[-5,-10],[7,-11],[15,-20],[14,-1],[7,8],[-5,8]],pal[1],pal[0]);q.dot(-5,-3,pal[2]);q.dot(8,-3,pal[2]);q.poly([[0,2],[4,2],[2,5]],pal[0]);bagua(p,x,y+r*.5,r*.55,t,pal);return;}
  if(n===0||n===5){const count=n===0?1:7;for(let j=0;j<count;j++){const a=(j-(count-1)/2)*.22;talisman(p,x+Math.cos(a)*(t-.3)*r*.7,y+Math.sin(a)*r*.8,r/55,a+t*.3,pal);}return;}
  bagua(p,x,y,r*.7,t,pal);const count=n===4?5:n===6?8:4;for(let j=0;j<count;j++){const a=j/count*TAU+t*.3,xx=x+Math.cos(a)*r*.72,yy=y+Math.sin(a)*r*.4;talisman(p,xx,yy,r/90,a,pal);if(n===4)bolt(p,xx,yy-r*.2,r/110,pal);}if(n===3||n===6)talisman(p,x,y-r*.1,r/(n===6?28:40),0,pal);
 };
 function shadow(p,x,y,s,pal){const q=local(p,x,y,s);q.poly([[-7,15],[-5,-5],[0,-13],[6,-5],[9,15],[3,12],[0,17],[-3,12]],pal[0],pal[1]);q.line(-3,-3,-1,-3,pal[2],2);q.line(2,-3,4,-3,pal[2],2);}
 render.thich=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===1||n===2||n===6){const count=n===1?3:n===2?1:5;for(let j=0;j<count;j++){const a=n===6?j/count*TAU:t*.4;shadow(p,x+(n===1?(j-1)*r*.45:Math.cos(a)*r*.6),y+(n===6?Math.sin(a)*r*.3:0),r/(n===2?32:55),pal);}if(n===2)for(let j=0;j<10;j++)p.rect(x+Math.sin(j*5)*r*.5,y+Math.cos(j*3)*r*.4,6,4,pal[0]);return;}
  const count=n===3?3:n===5?8:n===7?7:2;for(let j=0;j<count;j++){const a=n===3?o.a:n===0?o.a+(j?.7:-.7):j/count*TAU+t*4,xx=x+(n===3?(t-.3)*r*.8:Math.cos(a)*r*.45),yy=y+(n===3?(j-1)*r*.25:Math.sin(a)*r*.3);sword(p,xx,yy,r/(n===4?35:85),a+Math.PI/4,pal);if(n===7)shadow(p,xx,yy,r/90,pal);}if(n===4){path(p,[[x-r*.65,y-r*.4],[x+r*.65,y+r*.4]],pal[2],4);path(p,[[x+r*.65,y-r*.4],[x-r*.65,y+r*.4]],pal[1],4);}
 };
 render.loi=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===0){spear(p,x,y,r/45,o.a,pal);for(let j=-1;j<=1;j++)bolt(p,x+j*r*.4,y,r/100,pal);return;}
  if(n===1){const pts=Array.from({length:9},(_,j)=>[x-r+j*r*.25,y+(j%2?12:-12)]);path(p,pts,pal[0],8);path(p,pts,pal[2],3);return;}
  if(n===2||n===5){polygon(p,x,y,r*.7,6,pal[1],0);for(let j=0;j<6;j++){const a=j/6*TAU;bolt(p,x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.35,r/100,pal);}if(n===5)for(let j=-2;j<=2;j++)path(p,[[x-r*.6,y+j*r*.14],[x-r*.3,y+j*r*.14-7],[x+r*.6,y+j*r*.14]],pal[0],2);return;}
  const count=n===3?4:n===4?1:n===6?9:3;for(let j=0;j<count;j++){const xx=x+(j-(count-1)/2)*r/(count>5?5:2),yy=y+(j%2)*r*.12;bolt(p,xx,yy-r*.15,r/(n===7?20:n===4?24:70),pal);if(n===7)star(p,xx,yy+r*.45,r*.1,pal[2]);}
 };
 function cannon(p,x,y,s,a,pal){const q=local(p,x,y,s,a);q.poly([[-15,-7],[9,-7],[14,-4],[14,4],[9,7],[-15,7]],pal[0],pal[1]);q.rect(-9,-5,17,3,pal[2]);q.rect(10,-8,4,16,pal[1]);q.rect(12,-4,3,8,'#192b36');q.line(-5,9,0,13,pal[1],3);q.line(4,9,0,13,pal[1],3);}
 render.coquan=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===2){gear(p,x,y,r*.6,t,pal);shield(p,x,y,r/45,pal,true);return;}
  if(n===1||n===3){const count=n===1?1:7;for(let j=0;j<count;j++){const xx=x+(count===1?0:((j*37)%79/78-.5)*r*1.4),yy=y+(count===1?0:((j*19)%47/46-.5)*r*.7);polygon(p,xx,yy,r/(count===1?3:8),6,pal[1],t,1);p.rect(xx-3,yy-12,6,7,pal[2]);for(let k=0;k<4;k++){const a=k/4*TAU;p.line(xx+Math.cos(a)*10,yy+Math.sin(a)*10,xx+Math.cos(a)*(17+t*12),yy+Math.sin(a)*(17+t*12),pal[1],3);}}return;}
  if(n===5){for(let j=0;j<5;j++){const a=j/5*TAU+t*2;gear(p,x+Math.cos(a)*r*.6,y+Math.sin(a)*r*.36,r*.22,a,pal);}return;}
  const count=n===6?3:n===7?6:1;for(let j=0;j<count;j++){const a=n===7?j/count*TAU+t*.1:0,xx=x+(n===7?Math.cos(a)*r*.65:(j-(count-1)/2)*r*.5),yy=y+(n===7?Math.sin(a)*r*.4:0);cannon(p,xx,yy,r/(n===4?35:n===7?85:60),n===7?a+Math.PI:o.a,pal);for(let k=0;k<(n===0?3:1);k++){const aa=n===7?a+Math.PI:o.a,rr=(t+.2)*r*.5+k*10;p.rect(xx+Math.cos(aa)*rr,yy+Math.sin(aa)*rr,6,4,pal[2]);}}
 };
 render.anha=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===0||n===4){for(let j=-1;j<=1;j++)path(p,[[x-r*.6,y-r*.45+j*10],[x+r*.1,y+j*10],[x+r*.5,y+r*.22+j*10]],j===0?pal[2]:pal[1],3);if(n===4)raven(p,x,y-r*.25,r/50,t,pal);return;}
  if(n===1||n===6||n===7){raven(p,x,y-r*.12,r/(n===7?20:n===6?25:40),t,pal);if(n===7)for(let j=0;j<6;j++){const a=j/6*TAU+t*3;raven(p,x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.4,r/100,t+j*.1,pal);}return;}
  const count=n===2?5:n===3?4:10;for(let j=0;j<count;j++){const a=j/count*TAU+t*(n===5?3:.3),xx=x+Math.cos(a)*r*.55,yy=y+Math.sin(a)*r*.35;if(n===5)raven(p,xx,yy,r/95,t+j*.15,pal);else feather(p,xx,yy,r/70,a,pal);}if(n===3)skull(p,x,y,r/65,pal);
 };
 render.thuan=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===7){const q=local(p,x,y,r/55);q.ellipse(0,0,28,17,pal[0]);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)polygon(q,a*14,b*8,9,6,pal[1],0,.7);q.poly([[27,-4],[38,-6],[44,0],[37,7],[27,5]],pal[1],pal[2]);for(const xx of [-19,19])for(const yy of [-16,16])q.poly([[xx,yy*.7],[xx-7,yy*1.3],[xx+4,yy*1.2]],pal[1],pal[2]);return;}
  if(n===3){p.line(x,y-r*.7,x,y+r*.6,pal[2],4);p.poly([[x,y-r*.7],[x+r*.55,y-r*.55],[x,y-r*.2]],pal[1],pal[2]);for(let j=-1;j<=1;j++)shield(p,x+j*r*.45,y+r*.3,r/75,pal);return;}
  if(n===5){for(let j=-2;j<=2;j++){spear(p,x+j*r*.25,y-r*.15,r/65,-Math.PI/2,pal);shield(p,x+j*r*.25,y+r*.2,r/100,pal);}return;}
  const count=n===4?5:n===6?3:1;for(let j=0;j<count;j++)shield(p,x+(j-(count-1)/2)*r*.35,y-(n===1?t*r*.3:0),r/(n===2?25:n===0?40:60),pal,n===2||n===6);if(n===4||n===6)for(let j=-2;j<=2;j++)p.rect(x+j*r*.3-8,y+r*.3,16,8,pal[0]);
 };
 function plum(p,x,y,r,pal){for(let j=0;j<5;j++){const a=j/5*TAU;p.ellipse(x+Math.cos(a)*r*.45,y+Math.sin(a)*r*.45,r*.32,r*.32,pal[1]);}star(p,x,y,r*.15,pal[2]);}
 render.camy=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===1){sword(p,x,y,r/35,-.9+t*1.8,pal,true);for(let j=0;j<3;j++)plum(p,x+(j-1)*r*.5,y+r*.3,r*.13,pal);return;}
  if(n===2||n===7){token(p,x,y-r*.15,r/(n===7?25:35),pal);if(n===7)for(let j=0;j<6;j++){const a=j/6*TAU;arrow(p,x+Math.cos(a)*r*.65,y+Math.sin(a)*r*.35,r/85,a+Math.PI,pal);}return;}
  if(n===5){for(let j=-2;j<=2;j++){p.line(x-r*.6+j*r*.15,y-r*.4,x+r*.6+j*r*.15,y+r*.4,pal[1],2);p.line(x+r*.6+j*r*.15,y-r*.4,x-r*.6+j*r*.15,y+r*.4,pal[1],2);}for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5])token(p,x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.4,r/100,pal);return;}
  const count=n===0?2:n===3?6:n===6?12:1;for(let j=0;j<count;j++){const a=n===3?j/count*TAU:o.a,xx=n===6?x+((j*41)%97/96-.5)*r*1.5:x+Math.cos(a)*r*.35,yy=n===6?y+((j*17)%71/70-.5)*r*.7:y+(n===0?(j-.5)*r*.25:Math.sin(a)*r*.3);arrow(p,xx,yy,r/(n===4?40:90),n===6?1.9:a,pal);if(n===3)plum(p,xx,yy,r*.11,pal);}
 };
 render.thuong=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===2||n===4||n===7){dragon(p,x,y,r/(n===7?65:90),t,pal);if(n===2)spear(p,x+r*.5,y,r/45,o.a,pal);if(n===7)for(let j=-1;j<=1;j++)spear(p,x+j*r*.5,y-r*.45,r/75,-Math.PI/2,pal);return;}
  if(n===6){shield(p,x,y,r/35,pal);for(let j=-1;j<=1;j++)spear(p,x+j*r*.45,y,r/65,-Math.PI/2,pal);return;}
  const count=n===3?4:n===5?5:n===1?2:1;for(let j=0;j<count;j++){const a=n===3?j/count*TAU+t*.2:o.a+(n===1?(j-.5)*1.5:0),xx=x+(n===5?(j-2)*r*.12:Math.cos(a)*r*.2),yy=y+(n===5?(j-2)*r*.13:Math.sin(a)*r*.25);spear(p,xx,yy,r/(n===0?35:n===1?48:70),a,pal);if(n===5)p.line(xx-r*.6,yy,xx,yy,pal[1],2);}
 };
 render.cam=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===3){raven(p,x,y-r*.1,r/35,t,pal);for(let j=-1;j<=1;j++)note(p,x+j*r*.5,y+r*.35,r/65,j*.3,pal);return;}
  if(n===4){for(let j=-2;j<=2;j++){const pts=Array.from({length:12},(_,k)=>{const a=-Math.PI+k/11*Math.PI;return[x+Math.cos(a)*(r*.7+j*3),y+Math.sin(a)*(r*.9+j*4)];});path(p,pts,pal[j%2?1:2],2);}note(p,x,y-r*.2,r/55,0,pal);return;}
  if(n===6){ellipse(p,x,y-r*.3,r*.25,r*.25,pal[2]);for(let j=0;j<4;j++)p.line(x-r*.45+j*r*.3,y-r*.5,x-r*.45+j*r*.3,y+r*.45,pal[1],2);note(p,x,y,r/40,0,pal);return;}
  for(let line=0;line<5;line++){const pts=Array.from({length:17},(_,j)=>[x-r*.8+j/16*r*1.6,y+line*5-10+Math.sin(j*.5+t*8)*(n===7?18:7)]);path(p,pts,pal[line%2?1:0],2);}
  const count=n===0?2:n===1?5:n===2?7:n===5?12:9;for(let j=0;j<count;j++){const xx=x+((j*43)%101/100-.5)*r*1.5,yy=y+Math.sin(j*2+t*TAU)*r*.35-(n===1?t*r*.45:0);note(p,xx,yy,r/(n===7?65:85),Math.sin(j+t)*.2,pal);}if(n===7)lotus(p,x,y+r*.2,r*.35,t,pal);
 };
 render.liem=(p,o)=>{const {x,y,r,t,n,pal}=o;
  if(n===0){chain(p,x-r*.7,y,x+r*.4,y,8,pal);scythe(p,x+r*.5,y,r/60,-Math.PI/2,pal);return;}
  if(n===1){scythe(p,x,y,r/30,-1+t*2,pal);path(p,[[x-r*.6,y+r*.3],[x,y-r*.25],[x+r*.7,y]],'#e28a9c',3);return;}
  if(n===2||n===6){const count=n===2?3:8;for(let j=0;j<count;j++){const a=j/count*TAU+t*.6,xx=n===2?x+(j-1)*r*.5:x+Math.cos(a)*r*.65,yy=n===2?y:y+Math.sin(a)*r*.4;skull(p,xx,yy-r*.15,r/70,pal);path(p,[[xx-8,yy],[xx,yy+24*(1-t)],[xx+8,yy]],pal[0],3);}return;}
  if(n===7){for(const side of [-1,1]){p.rect(x+side*r*.55-8,y-r*.8,16,r*1.2,pal[0]);p.line(x+side*r*.55-8,y-r*.8,x+side*r*.55-8,y+r*.4,pal[1],3);}chain(p,x-r*.55,y-r*.7,x+r*.55,y-r*.7,10,pal);skull(p,x,y-r*.65,r/35,pal);scythe(p,x,y,r/35,-.25,pal);for(let j=-1;j<=1;j++)skull(p,x+j*r*.35,y+r*.35,r/100,pal);return;}
  if(n===4){skull(p,x,y,r/30,pal);for(let j=0;j<6;j++){const a=j/6*TAU;chain(p,x+Math.cos(a)*r*.75,y+Math.sin(a)*r*.4,x,y,4,pal);}return;}
  const count=n===3?6:8;for(let j=0;j<count;j++){const a=j/count*TAU;chain(p,x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.4,x+Math.cos(a+.6)*r*.7,y+Math.sin(a+.6)*r*.4,5,pal);}if(n===5)for(let j=-1;j<=1;j++)scythe(p,x+j*r*.4,y,r/85,t+j,pal);
 };
 function draw(c,e,hero){const v=e.visual;if(!v||!render[v.classId])return false;const def=SCHOOL_DEFS[v.classId],elapsed=Math.max(0,e.max-e.life),t=e.kind==='schoolAura'?(elapsed%2)/2:Math.min(1,elapsed/(e.max||1));const anchor=e.kind==='schoolAura'?hero:e.follow&&e.follow.alive!==false?e.follow:e;let x=anchor.x,y=anchor.y-24,r=e.r||90;
  c.save();c.globalAlpha=Math.min(1,e.life/.18);const p=pen(c);
  if(e.kind==='schoolLink'||e.kind==='beam'){
   const xx=e.tx,yy=e.ty-24;if(v.classId==='bua'){for(let j=0;j<5;j++)talisman(p,x+(xx-x)*j/4,y+(yy-y)*j/4,.6,Math.sin(t*4+j)*.3,def.palette);}else{const steps=v.classId==='loi'?12:7,pts=Array.from({length:steps+1},(_,j)=>[x+(xx-x)*j/steps+(j&&j<steps?Math.sin(j*4+t*13)*(v.classId==='loi'?13:7):0),y+(yy-y)*j/steps]);path(p,pts,def.palette[0],v.classId==='loi'?9:6);path(p,pts,def.palette[1],v.classId==='loi'?5:3);path(p,pts,def.palette[2],2);if(v.classId==='loi')for(let j=1;j<steps;j+=3)bolt(p,pts[j][0],pts[j][1],.45,def.palette);}c.restore();return true;
  }
  if(e.kind==='projectile'){projectile(c,{...e,x:e.x+(e.tx-e.x)*t,y:e.y+(e.ty-e.y)*t,vx:e.tx-e.x,vy:e.ty-e.y,visual:v});c.restore();return true;}
  if(e.kind==='schoolDash'){for(let j=0;j<4;j++){const u=(j+t)/4;c.globalAlpha=(j+1)/5*(1-t*.65);render[v.classId](p,{x:e.x+(e.tx-e.x)*u,y:e.y+(e.ty-e.y)*u-24,r:30,t,n:v.slot,pal:def.palette,a:e.angle||0});}c.restore();return true;}
  if(e.kind==='schoolAura')r=38;
  if(e.kind==='impact')r=e.crit?28:19;
  if(e.kind==='ring')r=Math.max(24,Math.min(85,r));
  if(e.kind==='schoolBasic')r=Math.min(65,r);
  const rr=r*(.72+Math.min(1,t*3)*.28);
  render[v.classId](p,{x,y,r:rr,t,n:v.slot,pal:def.palette,a:e.angle||0,type:v.type});
  c.restore();return true;
 }
 function projectile(c,e){const v=e.visual;if(!v)return false;const def=SCHOOL_DEFS[v.classId],p=pen(c),a=Math.atan2(e.vy||0,e.vx||1),q=local(p,e.x,e.y-24,1,a),pal=def.palette;const glyph={kiem:sword,dao:sword,cung:arrow,bua:talisman,thich:sword,anha:feather,thuan:shield,camy:arrow,thuong:spear,cam:note,liem:scythe}[v.classId];
  if(v.classId==='phap'){if(v.slot===4){q.poly([[-10,-6],[-3,-12],[8,-8],[12,2],[5,10],[-7,7]],'#f8a163','#a74c4a');q.poly([[-6,-4],[1,-7],[6,-3],[5,3],[-2,6]],'#ffe5a3');q.line(-22,-7,-6,0,'#ffae68',5);}else render.phap(q,{x:0,y:0,r:25,t:.4,n:v.slot,pal,a:0});}
  else if(v.classId==='coquan'){if(v.slot===1){q.poly([[-6,-7],[6,-7],[9,0],[5,8],[-5,8],[-9,0]],pal[0],pal[1]);q.line(2,-7,4,-13,pal[2],2);star(q,4,-14,3,'#ffa779');}else if(v.slot===4){q.poly([[-15,-5],[10,-5],[17,0],[10,5],[-15,5]],pal[1],pal[0]);q.rect(-8,-3,16,2,pal[2]);}else{gear(q,0,0,7,e.x*.02,pal);q.rect(-17,-2,10,4,pal[2]);}}
  else if(v.classId==='camy'){q.line(-13,0,12,0,pal[1],2);q.poly([[17,0],[8,-3],[10,0],[8,3]],pal[2]);q.line(-8,1,-14,6,'#df8195',2);if(v.slot===3)plum(q,-5,0,4,pal);if(v.slot===4)token(q,-4,0,.32,pal);}
  else if(v.classId==='cung')arrow(q,0,0,v.slot===4?1.3:v.slot===1?1.05:.8,0,pal);
  else if(v.classId==='cam'&&v.slot===3){raven(q,0,0,.65,.3,pal);for(let j=0;j<3;j++)q.line(-10,-2+j*4,-22,Math.sin(j)*5+j*4,pal[1],2);}
  else if(v.classId==='loi')bolt(q,0,0,.7,pal);
  else if(glyph){if(['cung','camy','thuong'].includes(v.classId))glyph(q,0,0,.85,0,pal);else if(['thuan'].includes(v.classId))glyph(q,0,0,.7,pal);else glyph(q,0,0,.8,Math.PI/2,pal);}
  q.line(-26,0,-15,0,pal[0],4);q.line(-20,-2,-14,-2,pal[1],2);return true;
 }
 function iconGlyph(p,id,n,x,y,s,a,pal){
  if(id==='kiem')sword(p,x,y,s,a,pal);
  if(id==='dao')sword(p,x,y,s,a,pal,true);
  if(id==='cung'){arrow(p,x,y,s,a,pal);if(n===2)raven(p,x,y,s*.65,.3,pal);}
  if(id==='phap'){if(n===0||n===4){const q=local(p,x,y,s,a);q.poly([[-10,3],[-5,-2],[-7,-12],[1,-7],[6,-10],[11,-1],[9,8],[1,12],[-7,9]],'#ee9c58','#9d4854');q.ellipse(2,3,5,6,'#ffe9b1');}else if(n===1||n===5){const q=local(p,x,y,s,a);q.poly([[0,-17],[-8,-4],[-6,8],[0,15],[8,7],[9,-4]],'#83e0ef','#427d9b');q.line(0,-12,0,10,'#e6ffff',2);q.line(-5,-2,0,3,'#e6ffff');}else if(n===2||n===6)bolt(p,x,y,s,pal);else if(n===3){polygon(p,x,y,s*14,6,pal[1],.5,1);polygon(p,x,y,s*9,4,pal[2],Math.PI/4,1);}else lotus(p,x,y,s*18,.3,['#a5484a','#ff984f','#fff2b3']);}
  if(id==='bua'){if(n===2){const q=local(p,x,y,s);q.poly([[-12,4],[-11,-14],[-4,-5],[5,-6],[13,-15],[12,5],[1,13]],pal[1],pal[0]);q.dot(-5,1,pal[2]);q.dot(6,1,pal[2]);q.line(-3,8,4,8,pal[0],2);}else talisman(p,x,y,s,a,pal);}
  if(id==='thich'){sword(p,x-3*s,y,s*.8,a-.4,pal);sword(p,x+5*s,y+2*s,s*.8,a+.5,pal);}
  if(id==='loi')bolt(p,x,y,s,pal);
  if(id==='coquan'){if([0,4,6,7].includes(n))cannon(p,x,y,s,a,pal);else gear(p,x,y,s*15,a,pal);}
  if(id==='anha'){if([0,2,3,4].includes(n))feather(p,x,y,s,a,pal);else raven(p,x,y,s,.3,pal);}
  if(id==='thuan'){if(n===7)render.thuan(p,{x,y,r:s*27,t:.3,n:7,pal,a});else shield(p,x,y,s,pal,n===2||n===6);}
  if(id==='camy'){if([2,5,7].includes(n))token(p,x,y,s,pal);else if(n===3)plum(p,x,y,s*14,pal);else arrow(p,x,y,s,a,pal);}
  if(id==='thuong'){if(n===7)dragon(p,x,y,s*.2,.4,pal);else spear(p,x,y,s,a,pal);}
  if(id==='cam')note(p,x,y,s,a,pal);
  if(id==='liem'){if(n===4||n===6||n===7)skull(p,x,y,s,pal);else scythe(p,x-4*s,y,s,a,pal);}
 }
 function paintIcon(p,sk){const v=visual(sk),def=SCHOOL_DEFS[v.classId],pal=def.palette,n=v.slot;p.rect(0,0,32,32,'#07131f');p.rect(1,1,30,30,pal[0]);p.rect(2,2,28,28,'#142532');p.line(2,2,29,2,sk.ultimate?'#f7d68a':pal[1]);p.line(2,2,2,29,pal[2]);const glyph=(x,y,s=.65,a=-.15)=>iconGlyph(p,v.classId,n,x,y,s,a,pal);
  if(n===0){glyph(16,17,.64,-.35);p.line(5,22,10,18,pal[1]);p.line(22,8,27,5,pal[2]);}
  if(n===1){glyph(18,16,.6,.65);for(let j=0;j<3;j++)p.line(4,10+j*5,10+j*2,10+j*5,pal[1],1);}
  if(n===2){glyph(16,17,.68,0);for(let j=0;j<4;j++){const a=j/4*TAU;star(p,16+Math.cos(a)*11,16+Math.sin(a)*11,2,pal[2]);}}
  if(n===3){glyph(11,13,.39,-.5);glyph(23,13,.39,.5);glyph(16,24,.39,0);path(p,[[7,22],[16,6],[26,22]],pal[0],1);}
  if(n===4){glyph(16,17,.78,.05);star(p,6,7,3,pal[2]);p.line(24,24,28,28,pal[1],2);}
  if(n===5){for(let j=0;j<4;j++){const a=j/4*TAU+.25;glyph(16+Math.cos(a)*8,16+Math.sin(a)*7,.37,a);}}
  if(n===6){for(let j=0;j<3;j++)glyph(8+j*8,13+(j%2)*6,.42,.45);p.line(5,27,27,27,pal[1]);}
  if(n===7){glyph(16,17,.75,0);star(p,6,7,2,pal[2]);star(p,26,7,2,pal[2]);p.rect(13,29,6,2,'#f1cc7c');p.dot(15,28,'#fff4c8');}
 }
 function level(c,e,hero){const elapsed=Math.max(0,e.max-e.life),x=hero.x,y=hero.y,p=pen(c),cfg=LEVEL_STYLE;c.save();
  if(elapsed<cfg.pillarSeconds){const a=1-elapsed/cfg.pillarSeconds,w=cfg.pillarWidth*(.6+.4*a);for(let h=0;h<cfg.pillarHeight;h+=4){c.globalAlpha=a*Math.min(.8,(1-h/cfg.pillarHeight)*.9);p.rect(x-w/2,y-h-4,w,4,'#ffd25a');}c.globalAlpha=a*.9;p.rect(x-w/8,y-cfg.pillarHeight*.9,w/4,cfg.pillarHeight*.9,'#fff7d5');}
  if(elapsed<cfg.ringSeconds){const t=elapsed/cfg.ringSeconds,r=cfg.ringStart+(cfg.ringEnd-cfg.ringStart)*t;c.globalAlpha=1-t;ellipse(p,x,y-18,r,r*.55,'#ffe27a');ellipse(p,x,y-18,r+3,(r+3)*.55,'#fff2b3');}
  if(elapsed<cfg.particleSeconds){c.globalAlpha=1-elapsed/cfg.particleSeconds;for(let j=0;j<cfg.particleCount;j++){const rand=n=>((Math.sin((j+1)*n*19.37)+1)*.5),xx=x-20+rand(1)*40+(-30+rand(2)*60)*elapsed,yy=y+(-240+rand(3)*160)*elapsed+25*elapsed*elapsed;p.rect(xx,yy,3,3,'#ffe27a');}}
  c.restore();
 }
 function rays(c,elapsed){c.clearRect(0,0,320,320);if(elapsed>2.52)return;const p=pen(c,2),t=elapsed/2.4,angle=t*Math.PI/2,scale=.6+Math.min(1,t)*.5;c.save();c.globalAlpha=Math.min(1,elapsed/.36)*Math.max(0,1-t)*.32;for(let j=0;j<17;j++){const a=j/17*TAU+angle;for(let band=0;band<6;band++){const r0=(25+band*14)*scale,r1=(39+band*14)*scale;c.globalAlpha=Math.min(1,elapsed/.36)*Math.max(0,1-t)*.32*(1-band/6);p.poly([[160+Math.cos(a)*r0,160+Math.sin(a)*r0],[160+Math.cos(a+.14)*r0,160+Math.sin(a+.14)*r0],[160+Math.cos(a+.14)*r1,160+Math.sin(a+.14)*r1],[160+Math.cos(a)*r1,160+Math.sin(a)*r1]],'#ffd25a');}}c.restore();}
 return {schools:SCHOOL_DEFS,visual,basic:id=>basic.get(id),all:[...skills.values()],draw,projectile,paintIcon,level,rays,levelStyle:LEVEL_STYLE};
}
const api={createSchoolFX,SCHOOL_DEFS,LEVEL_STYLE};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.KV_SCHOOLFX=api;
})(globalThis);
