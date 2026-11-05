'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../dist/content.js'),R=require('../dist/rules.js').createRules(D),G=require('../dist/progression.js').createProgression(D,R);
const profile=()=>G.normalize(R.profile());
test('daily claims require completed activity and cannot be repeated after save/load',()=>{
 const s=profile();assert.equal(G.claimDaily(s,'hunt','2026-11-05'),false);
 for(let i=0;i<30;i++)G.record(s,'kills','slime','2026-11-05');
 const gold=s.gold,r=G.claimDaily(s,'hunt','2026-11-05');assert.ok(r);assert.equal(s.gold,gold+r.gold);assert.equal(s.codex.slime,30);
 const restored=G.normalize(R.normalize(JSON.parse(JSON.stringify(s))));assert.equal(G.claimDaily(restored,'hunt','2026-11-05'),false);assert.equal(restored.gold,s.gold);
});
test('daily rollover resets counters and claims, preserves codex and sign-in, and ignores a backwards date',()=>{
 const s=profile();G.claimLogin(s,'2026-11-05');G.record(s,'kills','slime','2026-11-05');G.record(s,'skills',null,'2026-11-05');G.ensure(s,'2026-11-06');
 assert.equal(s.activities.kills,0);assert.equal(s.activities.skills,0);assert.equal(s.codex.slime,1);assert.equal(s.activities.loginLast,'2026-11-05');G.record(s,'kills','slime','2026-11-06');G.ensure(s,'2026-11-04');assert.equal(s.activities.date,'2026-11-06');assert.equal(s.activities.kills,1);
});
test('sign-in follows consecutive calendar days, awards day seven once and restarts a missed streak',()=>{
 const s=profile();for(let i=1;i<=7;i++){const r=G.claimLogin(s,'2026-11-'+String(i).padStart(2,'0'));assert.equal(r.day,i);assert.equal(G.claimLogin(s,'2026-11-'+String(i).padStart(2,'0')),false);}
 assert.equal(s.activities.streak,7);assert.equal(s.bag.x2,1);assert.equal(G.claimLogin(s,'2026-11-08').day,1);assert.equal(G.claimLogin(s,'2026-11-10').day,1);assert.equal(s.activities.streak,1);assert.equal(G.claimLogin(s,'2026-11-09'),false);
});
test('v2.2 daily flag migrates without allowing a second login reward',()=>{const s=R.profile();s.daily='2026-11-05';G.normalize(s);assert.equal(G.claimLogin(s,'2026-11-05'),false);assert.ok(G.claimLogin(s,'2026-11-06'));});
test('achievement rewards are based on real progress, granted once and retained after normalization',()=>{
 const s=profile();assert.equal(G.claimAchievement(s,'boss1'),false);s.bossKills=1;const gold=s.gold;assert.ok(G.claimAchievement(s,'boss1'));assert.equal(s.gold,gold+500);const restored=G.normalize(R.normalize(JSON.parse(JSON.stringify(s))));assert.equal(G.claimAchievement(restored,'boss1'),false);assert.deepEqual(restored.achievements,['boss1']);
});
test('all daily counters remain isolated from the level-400 demo',()=>{
 const s=G.normalize(R.profile(0,'Demo',true));for(const event of ['kills','bosses','skills','loot','dungeons'])G.record(s,event,'slime','2026-11-05');assert.equal(s.activities.kills,0);assert.deepEqual(s.codex,{});assert.equal(G.claimLogin(s,'2026-11-05'),false);assert.equal(G.claimAchievement(s,'level400'),false);
});
test('corrupt new fields are bounded and only known reward and creature ids survive import',()=>{
 const s=profile();s.activities={date:'wrong',kills:Infinity,skills:-1,claims:['hunt','hunt','hacked'],loginLast:'wrong'};s.codex={slime:10,unknown:999,wolf:-2};s.achievements=['first','first','unknown'];s.autoConfig={hp:999,mp:-5,boss:false,slots:[false,true]};G.normalize(s);assert.equal(s.activities.kills,0);assert.equal(s.activities.skills,0);assert.deepEqual(s.activities.claims,['hunt']);assert.deepEqual(s.codex,{slime:10});assert.deepEqual(s.achievements,['first']);assert.equal(s.autoConfig.hp,90);assert.equal(s.autoConfig.mp,10);assert.equal(s.autoConfig.boss,false);assert.equal(s.autoConfig.slots.length,8);assert.equal(s.autoConfig.slots[0],false);
});
