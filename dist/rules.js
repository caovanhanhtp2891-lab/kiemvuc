/* Kiếm Vực game rules. Independent implementation of the documented mechanics. */
(function (g) {
'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)), round=Math.round;
const xpNeed=l=>l>=400?0:round((55*l**1.85+45*l)*(1+Math.max(0,l-200)*.06)*(1+Math.max(0,l-250)*.08)*(1+Math.max(0,l-300)*.07));
function createRules(D){
 const classes=D.classes, slots=D.equipment.equipment_slots.map(x=>x.id), creatures=Object.fromEntries(D.creatures.map(x=>[x.creature_id,x]));
 const skillsFor=id=>D.skills.filter(x=>x.class_id===id).sort((a,b)=>a.slot-b.slot);
 function gear(slot,tier=0,rarity=0,id=1){return{id,slot,tier:clamp(tier,0,34),rarity:clamp(rarity,0,5),enhance:0,gems:[],holes:0};}
 function gearStats(item){
  const t=item.tier||0,u=item.enhance||0,k=[1,1.15,1.32,1.55,1.9,2.4][item.rarity||0]*(t>27?1+(t-27)*.14:1), a={};
  const bases={weapon:{atk:12+t*18},hat:{defP:2+t*3,hp:20+t*30},armor:{defP:4+t*6,defM:2+t*4,hp:30+t*40},pants:{defP:3+t*4,defM:2+t*3},gloves:{atk:3+t*5,crit:1},boots:{defP:2+t*2,spd:4},belt:{hp:30+t*40,defM:1+t*2},necklace:{mp:20+t*25,defM:3+t*4},ring:{atk:4+t*5,crit:2},jade:{hp:20+t*25,mp:15+t*15,atk:2+t*3}};
  for(const [key,v] of Object.entries(bases[item.slot]||{}))a[key]=['crit','spd'].includes(key)?v+Math.floor(u/4):round(v*k*(1+.08*u+(u>=12?.1:0)+(u>=15?.15:0)));
  // Deterministic affixes make a dropped item reproducible after saving.
  const choices=['atkP','hpP','critD','str','agi','int','vit','defP','defM','regen'];
  for(let j=0;j<item.rarity;j++){const key=choices[((item.id||1)*7+j*3)%choices.length];a[key]=(a[key]||0)+round((key.endsWith('P')?2+Math.floor(t/2):key==='critD'?5+t*2:1+t*2)*k);}
  for(const gem of item.gems||[]){const d=D.equipment.gem_types.find(x=>x.gem_type===gem.type);if(d)a[d.affected_stat]=(a[d.affected_stat]||0)+d.values_by_gem_level[clamp(gem.level,1,5)-1];}
  return a;
 }
 function profile(classIndex=0,name='Vô Danh',demo=false){
  const c=classes[classIndex]||classes[0],level=demo?400:1;
  const s={version:2,started:false,demo,name,classId:classIndex,faction:'long',level,xp:0,gold:demo?1e11:200,kills:0,bossKills:0,zone:0,x:900,y:800,hp:null,mp:null,attrs:{str:c.starting_strength,agi:c.starting_agility,int:c.starting_intelligence,vit:c.starting_vitality},points:0,skillPoints:demo?999:0,skillLevels:{},learnedCount:0,items:[],equipped:{},bag:{hp1:10,mp1:8},stored:[],quest:0,questActive:true,qProgress:0,maxForge:0,titles:[],petsOwned:[],petLevels:{},pet:null,xpBoostSeconds:0,mountsOwned:[],mount:null,riding:false,party:[],arenaWins:0,dungeonWins:0,bounty:null,daily:'',lastSave:Date.now(),settings:{sound:false,particles:true,autoStats:true}};
  const ss=skillsFor(c.class_id);ss.forEach((sk,i)=>s.skillLevels[sk.skill_id]=demo?10:i===0?1:0);
  if(demo){s.attrs[c.primary_stat]+=3*(level-1);s.attrs.vit+=2*(level-1);s.bag={hp4:200,mp4:200,luyen1:300,luyen2:300,luyen3:300,baohiem:300,kimduoc:300,khoan:100,thucan:200};for(const gem of D.equipment.gem_types)for(let l=1;l<=5;l++)s.bag[`gem_${gem.gem_type}_${l}`]=10;s.party=['kiếm vệ','y sư','thần xạ','hộ pháp'];s.petsOwned=D.companions.pets.map(x=>x.id);s.mountsOwned=D.companions.mounts.map(x=>x.id);}
  for(const [i,slot] of (demo?slots:['weapon']).entries()){const e=gear(slot,demo?34:0,demo?5:0,i+1);e.enhance=demo?15:0;s.items.push(e);s.equipped[slot]=e.id;}
  if(demo)s.maxForge=15;
  return s;
 }
 function stats(s,buffs=[]){
  const c=classes[s.classId]||classes[0],a={...s.attrs},b={};
  const add=o=>{for(const [key,v] of Object.entries(o||{})){if(key in a)a[key]+=v;else b[key]=(b[key]||0)+v;}};
  for(const id of Object.values(s.equipped)){const item=s.items.find(x=>x.id===id);if(item)add(gearStats(item));}
  add(D.companions.factions.find(x=>x.id===s.faction)?.stat_bonuses);
  const pet=D.companions.pets.find(x=>x.id===s.pet?.id);if(pet)add(Object.fromEntries(Object.entries(pet.stat_bonuses).map(([k,v])=>[k,v*(1+(s.pet.level||1)/15)])));
  const temp={};for(const v of buffs)for(const [key,n] of Object.entries(v.values||{}))temp[key]=(temp[key]||0)+n;
  const L=s.level,h=a[c.primary_stat],defFactor=1+((b.defPpct||0)+(temp.defP||0))/100;
  const r={attrs:a,maxHp:round((100+16*L+12*a.vit+(b.hp||0))*(1+(b.hpP||0)/100)),mp:round(40+6*L+7*a.int+(b.mp||0)),attack:round((2.2*L+2.4*h+.3*(a.str+a.agi+a.int-h)+(b.atk||0))*(1+((b.atkP||0)+(temp.atkP||0))/100)),defP:round((.9*a.vit+.6*L+(b.defP||0)+(b.def||0))*defFactor),defM:round((.5*a.int+.4*a.vit+.5*L+(b.defM||0)+(b.def||0))*defFactor),crit:Math.min(75,5+.25*a.agi+(b.crit||0)+(temp.crit||0)),critD:150+(b.critD||0)+(temp.critD||0),dodge:Math.min(45,.15*a.agi+(b.dodge||0)),regen:2+.3*a.vit+(b.regen||0),aspd:1+.004*a.agi+(temp.aspd||0)/100,speed:150*(1+((b.spd||0)+(s.riding?(D.companions.mounts.find(x=>x.id===s.mount)?.movement_speed_bonus_percent||0):0))/100),expP:b.expP||0,goldP:b.goldP||0};
  r.defense=round((r.defP+r.defM)/2);r.power=round(r.attack*(1+r.crit/100*(r.critD/100-1))*Math.min(r.aspd,2)*2+(r.defP+r.defM)*1.5+r.maxHp/4+r.mp/10+r.dodge*10+r.regen*4);return r;
 }
 function hit(r,mult,defense,roll=.5,critRoll=1){const crit=critRoll<r.crit/100;return{crit,amount:round(Math.max(1,r.attack*mult*(.9+.2*roll)*(crit?r.critD/100:1)-defense*.5))};}
 function awardXP(s,n){if(s.level>=400){s.xp=0;return 0;}s.xp+=Math.max(0,round(n));let gained=0;const c=classes[s.classId];while(s.level<400&&s.xp>=xpNeed(s.level)){s.xp-=xpNeed(s.level);s.level++;s.points+=5;s.skillPoints++;if(s.settings.autoStats){s.attrs[c.primary_stat]+=3;s.attrs.vit+=2;s.points-=5;}gained++;}if(s.level===400)s.xp=0;return gained;}
 function skillPlan(sk,level){const p=sk.mechanical_parameters||{},type=sk.mechanic_type,scale=1+.12*(Math.max(1,level)-1);return{type,scale,mult:(sk.damage_multiplier_at_skill_level_1||0)*scale,hits:p.hit_count||(['proj','chain','rain'].includes(type)?p.count_parameter||1:1),radius:p.radius_world_units||110,duration:p.duration_seconds||8,parameters:p,buffs:Object.fromEntries(Object.entries(p.temporary_stat_bonuses||{}).map(([k,v])=>[k,round(v*scale)]))};}
 function selectPet(s,id){if(!s.petsOwned.includes(id))return false;s.petLevels??={};if(s.pet)s.petLevels[s.pet.id]=s.pet.level;s.pet={id,level:s.petLevels[id]||1};return true;}
 function feedPet(s){if(!s.pet||s.pet.level>=100||!(s.bag.thucan>0))return false;s.bag.thucan--;s.pet.level++;s.petLevels??={};s.petLevels[s.pet.id]=s.pet.level;return true;}
 function expireBounty(s,today){if(s.bounty&&s.bounty.day!==today)s.bounty=null;}
 function giveGear(s,item){item.id=Math.max(0,...s.items.map(x=>x.id),...s.stored.map(x=>x.id))+1;if(s.items.length<150){s.items.push(item);return 'bag';}if(s.stored.length<60){s.stored.push(item);return 'storage';}return false;}
 function segmentDistance(point,start,end){const dx=end.x-start.x,dy=end.y-start.y,l=dx*dx+dy*dy,t=l?clamp(((point.x-start.x)*dx+(point.y-start.y)*dy)/l,0,1):0;return Math.hypot(point.x-start.x-t*dx,point.y-start.y-t*dy);}
 function questProgress(s){const q=D.quests[s.quest];if(!q)return 1;switch(q.objective_type){case'forge':return Math.min(q.target_count,s.maxForge);case'learn':return Math.min(1,s.learnedCount);case'party':return Math.min(q.target_count,s.party.length);case'collect':return Math.min(q.target_count,s.bag[q.target_item_id]||0);default:return Math.min(q.target_count||1,s.qProgress||0);}}
 function event(s,kind,id){if(!s.questActive)return;const q=D.quests[s.quest];if(!q)return;if((q.objective_type==='kill'||q.objective_type==='boss')&&kind==='kill'&&q.target_creature_id===id)s.qProgress++;if(q.objective_type==='talk'&&kind==='talk'&&q.mechanical_requirements.npc===id)s.qProgress=1;}
 function claim(s){const q=D.quests[s.quest];if(!q||!s.questActive||s.level<q.required_character_level||questProgress(s)<(q.target_count||1))return false;const rewardGear=q.rewards.equipment_spec;if(rewardGear&&s.items.length>=150&&s.stored.length>=60)return false;if(q.objective_type==='collect')s.bag[q.target_item_id]-=q.target_count;s.gold+=q.rewards.gold;awardXP(s,q.rewards.exp);for(const [k,n] of q.rewards.item_quantities)s.bag[k]=(s.bag[k]||0)+n;const e=q.rewards.equipment_spec;if(e){const id=Math.max(0,...s.items.map(x=>x.id),...s.stored.map(x=>x.id))+1;(s.items.length<150?s.items:s.stored).push(gear(e.slot,e.tier,e.r,id));}if(q.mechanical_requirements.title)s.titles.push(q.mechanical_requirements.title);s.quest++;s.qProgress=0;s.questActive=true;return true;}
 function forge(s,item,protect=false,boost=false,roll=Math.random()){
  if(!item||item.enhance>=15)return{ok:false,reason:'Trang bị đã đạt +15.'};const u=item.enhance,mat=u<5?'luyen1':u<10?'luyen2':'luyen3',cost=round((item.tier+1)*35*(u+1));
  if(s.gold<cost||(s.bag[mat]||0)<1||protect&&!(s.bag.baohiem>0)||boost&&!(s.bag.kimduoc>0))return{ok:false,reason:'Thiếu ngân lượng hoặc nguyên liệu.'};
  s.gold-=cost;s.bag[mat]--;if(protect)s.bag.baohiem--;if(boost)s.bag.kimduoc--;const chance=Math.min(100,D.equipment.enhancement_success_percent_from_level_0_to_14[u]+(boost?10:0));const success=roll*100<chance;
  if(success)item.enhance++;else if(!protect)item.enhance=Math.max(0,item.enhance-1);s.maxForge=Math.max(s.maxForge,item.enhance);return{ok:true,success,chance,cost};
 }
 function migrate(old){const s=profile([0,3,2][old.classId]||0,old.name||'Vô Danh');s.started=!!old.started;s.level=clamp(old.level||1,1,400);s.xp=Math.max(0,old.xp||0);s.gold=Math.max(0,old.gold||0);s.kills=old.kills||0;s.bossKills=old.bossKills||0;s.zone=[1,2,6][old.zone]||0;s.attrs[classes[s.classId].primary_stat]+=3*(s.level-1);s.attrs.vit+=2*(s.level-1);s.skillPoints=s.level-1;s.bag.hp1=old.potions||5;s.settings={...s.settings,...old.settings};s.daily=old.daily||'';
  if(Array.isArray(old.items)&&old.items.length){s.items=old.items.slice(0,150).map(i=>{const tier=Math.max(0,D.equipment.equipment_tier_level_thresholds.findLastIndex(l=>l<=Math.max(1,i.level||1))),e=gear(['weapon','armor','jade'][i.slot]||'weapon',tier,[0,2,3,4][i.rarity]||0,i.id);e.enhance=clamp(i.enhance||0,0,15);return e;});s.equipped={};(old.equipped||[]).forEach((id,j)=>{if(s.items.some(i=>i.id===id))s.equipped[['weapon','armor','jade'][j]]=id;});s.maxForge=Math.max(0,...s.items.map(i=>i.enhance));}
  return s;
 }
 function normalize(raw){
  if(!raw||raw.version!==2||!Array.isArray(raw.items)||!raw.attrs||!raw.skillLevels)throw new Error('Invalid save');
  const num=(n,a,b,f=a)=>Number.isFinite(Number(n))?clamp(Number(n),a,b):f,ci=Math.floor(num(raw.classId,0,13)),s={...profile(ci),...raw};s.version=2;s.demo=false;s.classId=ci;s.started=!!raw.started;s.questActive=true;s.name=String(raw.name||'Vô Danh').slice(0,18);s.level=Math.floor(num(raw.level,1,400));s.zone=Math.floor(num(raw.zone,0,47));s.quest=Math.floor(num(raw.quest,0,86));s.gold=num(raw.gold,0,1e14);s.xp=s.level===400?0:num(raw.xp,0,xpNeed(s.level)-1);s.points=Math.floor(num(raw.points,0,100000));s.skillPoints=Math.floor(num(raw.skillPoints,0,100000));s.attrs=Object.fromEntries(['str','agi','int','vit'].map(k=>[k,num(raw.attrs[k],1,100000)]));s.settings={...profile().settings,...raw.settings};
  const ids=new Set();let uid=1;const parseGear=(list,max)=>list.slice(0,max).filter(i=>i&&slots.includes(i.slot)).map(i=>{let id=Math.floor(num(i.id,1,1e9));if(ids.has(id)){while(ids.has(uid))uid++;id=uid;}ids.add(id);return{...gear(i.slot,Math.floor(num(i.tier,0,34)),Math.floor(num(i.rarity,0,5)),id),enhance:Math.floor(num(i.enhance,0,15)),holes:Math.floor(num(i.holes,0,3)),gems:(Array.isArray(i.gems)?i.gems:[]).slice(0,Math.floor(num(i.holes,0,3))).filter(x=>D.equipment.gem_types.some(g=>g.gem_type===x.type)).map(x=>({type:x.type,level:Math.floor(num(x.level,1,5))}))};});
  s.items=parseGear(raw.items,150);s.stored=parseGear(Array.isArray(raw.stored)?raw.stored:[],60);s.equipped=Object.fromEntries(Object.entries(raw.equipped||{}).filter(([slot,id])=>s.items.some(i=>i.id===id&&i.slot===slot)));s.skillLevels={};for(const sk of D.skills)s.skillLevels[sk.skill_id]=Math.floor(num(raw.skillLevels[sk.skill_id],0,10));
  const allowed=new Set(D.equipment.fixed_base_items.map(i=>i.item_id));s.bag=Object.fromEntries(Object.entries(raw.bag||{}).filter(([k])=>allowed.has(k)||/^gem_(hoa|thuy|moc|kim|tho)_[1-5]$/.test(k)).map(([k,n])=>[k,Math.floor(num(n,0,100000))]));s.party=[...new Set(Array.isArray(raw.party)?raw.party:[])].filter(x=>['kiếm vệ','y sư','thần xạ','hộ pháp'].includes(x)).slice(0,4);s.petsOwned=(Array.isArray(raw.petsOwned)?raw.petsOwned:[]).filter(id=>D.companions.pets.some(p=>p.id===id));s.mountsOwned=(Array.isArray(raw.mountsOwned)?raw.mountsOwned:[]).filter(id=>D.companions.mounts.some(m=>m.id===id));s.petLevels=Object.fromEntries(s.petsOwned.map(id=>[id,Math.floor(num(raw.petLevels?.[id],1,100))]));s.xpBoostSeconds=num(raw.xpBoostSeconds,0,86400);s.pet=raw.pet&&s.petsOwned.includes(raw.pet.id)?{id:raw.pet.id,level:Math.floor(num(raw.pet.level,1,100))}:null;if(s.pet)s.petLevels[s.pet.id]=s.pet.level;s.mount=s.mountsOwned.includes(raw.mount)?raw.mount:null;s.faction=D.companions.factions.some(f=>f.id===raw.faction)?raw.faction:'long';s.titles=Array.isArray(raw.titles)?raw.titles.filter(x=>typeof x==='string').slice(0,100):[];for(const k of ['kills','bossKills','qProgress','learnedCount','arenaWins','dungeonWins'])s[k]=Math.floor(num(raw[k],0,1e12));s.maxForge=Math.floor(num(raw.maxForge,0,15));s.lastSave=num(raw.lastSave,0,Date.now(),Date.now());s.x=num(raw.x,40,D.maps[s.zone].width_tiles*32-40,D.maps[s.zone].width_tiles*16);s.y=num(raw.y,85,D.maps[s.zone].height_tiles*32-40,D.maps[s.zone].height_tiles*20);s.hp=raw.hp==null?null:num(raw.hp,0,1e14);s.mp=raw.mp==null?null:num(raw.mp,0,1e14);for(const k of ['sound','particles','autoStats'])s.settings[k]=Boolean(s.settings[k]);s.riding=!!s.mount&&!!raw.riding;s.bounty=raw.bounty&&creatures[raw.bounty.target]?{target:raw.bounty.target,count:Math.floor(num(raw.bounty.count,0,10)),day:String(raw.bounty.day||''),done:!!raw.bounty.done}:null;return s;
 }
 return{classes,slots,creatures,skillsFor,gear,gearStats,profile,stats,hit,awardXP,skillPlan,selectPet,feedPet,expireBounty,giveGear,segmentDistance,questProgress,event,claim,forge,migrate,normalize,xpNeed};
}
const api={createRules,xpNeed,clamp};if(typeof module!=='undefined'&&module.exports)module.exports=api;else g.KV_RULES=api;
})(globalThis);
