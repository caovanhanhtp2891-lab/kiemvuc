/* Local progression systems. Rewards are claimed once and travel with the save. */
(function(root){
'use strict';
const DAILY=[
 {id:'hunt',name:'Dẹp loạn giang hồ',description:'Hạ 30 quái',key:'kills',target:30,gold:250,exp:.06,items:{hp1:5}},
 {id:'practice',name:'Chuyên tâm luyện chiêu',description:'Thi triển 15 kỹ năng',key:'skills',target:15,gold:200,exp:.04,items:{mp1:5}},
 {id:'treasure',name:'Thu gom chiến lợi phẩm',description:'Nhặt 10 đống vàng hoặc trang bị',key:'loot',target:10,gold:250,exp:.04,items:{luyen1:3}},
 {id:'boss',name:'Thách thức thủ lĩnh',description:'Hạ 1 boss',key:'bosses',target:1,gold:500,exp:.08,items:{baohiem:1}},
 {id:'dungeon',name:'Vượt cửa sinh tử',description:'Hoàn thành 1 phó bản',key:'dungeons',target:1,gold:500,exp:.08,items:{khoan:1}}
];
const ACHIEVEMENTS=[
 ['first','Bước chân giang hồ','kills',1,300],['hunter','Bách chiến','kills',100,1000],['veteran','Thiên chiến','kills',1000,5000],
 ['boss1','Đối đầu thủ lĩnh','bossKills',1,500],['boss10','Thợ săn thủ lĩnh','bossKills',10,2000],
 ['level10','Sơ nhập võ lâm','level',10,800],['level50','Cao thủ một phương','level',50,3000],['level100','Danh chấn giang hồ','level',100,6000],['level400','Đỉnh phong võ đạo','level',400,30000],
 ['quest10','Người giữ lời','quest',10,1000],['quest30','Dấu chân hành hiệp','quest',30,3000],['quest86','Một đời giang hồ','quest',86,20000],
 ['forge5','Thợ rèn tập sự','maxForge',5,1200],['forge10','Thần binh xuất thế','maxForge',10,4000],
 ['dungeon1','Phá vòng vây','dungeonWins',1,1000],['dungeon10','Bậc thầy vượt ải','dungeonWins',10,5000],
 ['arena5','Kiếm hội','arenaWins',5,1500],['skills8','Bát thức tinh thông','skills',8,2000],['codex20','Nhà thám hiểm','codex',20,2500]
].map(([id,name,key,target,gold])=>({id,name,key,target,gold}));
const DEFAULT_AUTO={hp:40,mp:35,boss:true,quest:true,loot:true,skills:true,slots:Array(8).fill(true)};
function createProgression(D,R){
 const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)?s:'';
 const n=(v,max=1e12)=>Number.isFinite(Number(v))?Math.max(0,Math.min(max,Math.floor(Number(v)))):0;
 function normalize(s){
  const a=s.activities||{};s.activities={date:validDate(a.date),kills:n(a.kills),bosses:n(a.bosses),skills:n(a.skills),loot:n(a.loot),dungeons:n(a.dungeons),claims:[...new Set(Array.isArray(a.claims)?a.claims:[])].filter(id=>DAILY.some(d=>d.id===id)),loginLast:validDate(a.loginLast||s.daily),streak:n(a.streak??(validDate(a.loginLast||s.daily)?1:0),1e6)};
  s.achievements=[...new Set(Array.isArray(s.achievements)?s.achievements:[])].filter(id=>ACHIEVEMENTS.some(a=>a.id===id));
  s.codex=Object.fromEntries(Object.entries(s.codex||{}).filter(([id,v])=>D.creatures.some(c=>c.creature_id===id)&&n(v)>0).map(([id,v])=>[id,n(v)]));
  const c=s.autoConfig||{};s.autoConfig={...DEFAULT_AUTO,hp:Math.min(90,Math.max(10,n(c.hp??40,90))),mp:Math.min(90,Math.max(10,n(c.mp??35,90))),slots:Array.from({length:8},(_,i)=>c.slots?.[i]!==false)};
  for(const k of ['boss','quest','loot','skills'])s.autoConfig[k]=c[k]!==false;
  return s;
 }
 function ensure(s,today){if(!s.activities||!s.autoConfig||!s.codex||!s.achievements)normalize(s);if(validDate(today)&&today>s.activities.date){const {loginLast,streak}=s.activities;s.activities={date:today,kills:0,bosses:0,skills:0,loot:0,dungeons:0,claims:[],loginLast,streak};}return s.activities;}
 function record(s,event,id,today){const a=ensure(s,today);if(s.demo)return;if(['kills','bosses','skills','loot','dungeons'].includes(event))a[event]++;if(event==='kills'&&R.creatures[id])s.codex[id]=(s.codex[id]||0)+1;}
 function reward(s,gold,exp=0,items={}){s.gold+=gold;const levels=R.awardXP(s,exp);for(const [id,count] of Object.entries(items))s.bag[id]=(s.bag[id]||0)+count;return{gold,exp,items,levels};}
 function dailyReward(s,d){return{gold:Math.round(d.gold*(1+s.level*.12)),exp:Math.round(R.xpNeed(s.level)*d.exp),items:d.items};}
 function claimDaily(s,id,today){const a=ensure(s,today),d=DAILY.find(d=>d.id===id);if(s.demo||!d||a.claims.includes(id)||a[d.key]<d.target)return false;a.claims.push(id);const r=dailyReward(s,d);return reward(s,r.gold,r.exp,r.items);}
 function nextLogin(s,today){const a=ensure(s,today),yesterday=new Date(today+'T00:00:00Z');yesterday.setUTCDate(yesterday.getUTCDate()-1);const previous=Number.isFinite(yesterday.getTime())?yesterday.toISOString().slice(0,10):'';return a.loginLast===today?a.streak:a.loginLast===previous?a.streak+1:1;}
 function claimLogin(s,today){const a=ensure(s,today);if(s.demo||!validDate(today)||today<=a.loginLast)return false;const streak=nextLogin(s,today),day=(streak-1)%7+1;a.loginLast=today;a.streak=streak;s.daily=today;const items={hp1:10,mp1:5,...(day%3===0?{baohiem:1}:{}),...(day===7?{x2:1,khoan:2,thucan:3}:{})};return {...reward(s,Math.round((500+s.level*30)*(1+(day-1)*.15)),0,items),day};}
 function achievementProgress(s,a){if(a.key==='skills')return D.skills.filter(sk=>sk.class_id===D.classes[s.classId].class_id&&s.skillLevels[sk.skill_id]>0).length;if(a.key==='codex')return Object.keys(s.codex||{}).length;return n(s[a.key]);}
 function claimAchievement(s,id){ensure(s,'');const a=ACHIEVEMENTS.find(a=>a.id===id);if(s.demo||!a||s.achievements.includes(id)||achievementProgress(s,a)<a.target)return false;s.achievements.push(id);return reward(s,a.gold,0,{luyen1:3,baohiem:1});}
 function available(s,today){const a=ensure(s,today);return Number(!s.demo&&today>a.loginLast)+DAILY.filter(d=>a[d.key]>=d.target&&!a.claims.includes(d.id)).length+ACHIEVEMENTS.filter(x=>achievementProgress(s,x)>=x.target&&!s.achievements.includes(x.id)).length;}
 return{DAILY,ACHIEVEMENTS,normalize,ensure,record,dailyReward,claimDaily,nextLogin,claimLogin,achievementProgress,claimAchievement,available};
}
const api={createProgression};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.KV_PROGRESSION=api;
})(globalThis);
