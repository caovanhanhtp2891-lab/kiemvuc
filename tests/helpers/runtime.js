'use strict';
// Node integration fixture for our own engine, not a browser or DOM emulator.
// A no-op presentation port lets tests exercise real combat and command handlers.
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const D=require('../../dist/content.js'),rules=require('../../dist/rules.js');
function runtime(profile=rules.createRules(D).profile(0,'Regression',true)){
 const listeners={},elements=new Map(),saved=new Map();
 const context=new Proxy({createRadialGradient:()=>({addColorStop(){}}),createLinearGradient:()=>({addColorStop(){}}),measureText:()=>({width:10})},{get:(o,k)=>o[k]??(()=>{}),set:(o,k,v)=>(o[k]=v,true)});
 function element(id=''){if(elements.has(id))return elements.get(id);const e={id,hidden:false,value:'',innerHTML:'',textContent:'',style:{},dataset:{},classList:{contains:()=>false,add(){},remove(){},toggle(){}},setAttribute(k,v){this[k]=v;},toDataURL:()=>"data:image/png;base64,fixture",getContext:()=>context,addEventListener(k,fn){(listeners[id+':'+k]??=[]).push(fn);},append(){},remove(){},focus(){},click(){},querySelector:sel=>element(id+sel),querySelectorAll:()=>[]};elements.set(id,e);return e;}
 const document={hidden:false,activeElement:null,querySelector:element,querySelectorAll:()=>[],createElement:()=>element('temp'+elements.size),addEventListener:(key,fn)=>(listeners[key]??=[]).push(fn)};
 saved.set('kiem-vuc-save-v2',JSON.stringify({...profile,started:true}));
 const window={KV_CONTENT:D,KV_RULES:rules,KV_PROGRESSION:require('../../dist/progression.js'),KV_PIXEL:require('../../dist/pixel-art.js'),addEventListener(){}};
 let seed=1234567;const randomMath=Object.create(Math);randomMath.random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 const env={document,window,innerWidth:1360,innerHeight:900,devicePixelRatio:1,localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},requestAnimationFrame(){},setTimeout(){},clearTimeout(){},setInterval(){},Date,Math:randomMath,console,Blob,URL,performance:{now:()=>0}};
 const source=fs.readFileSync(path.join(__dirname,'../../dist/game.js'),'utf8'),marker='const away=';
 if(source.indexOf(marker)<0)throw Error('Runtime fixture needs explicit boot boundary');
 const api=`globalThis.__runtime={get view(){return{state,hero,st,gameTime,combatMeter,target,enemies,minions,modal,dead,instance,loots,effects,pendingHits,cd,projectiles:typeof projectiles==='undefined'?[]:projectiles};},setScene(s){state=s;state.started=true;resetSession();travel(1,true);closeModal();enemies=[];},enemy(x=hero.x+60,y=hero.y){const e=makeEnemy('slime',x,y,enemies.length);Object.assign(e,{hp:1e12,maxHp:1e12,attack:1,ai:'passive',dummy:true});enemies.push(e);target=e;return e;},move(x,y){hero.x=x;hero.y=y;},tick:step,advance:advanceSimulation,skill:useSkill,gainXP,travel,guide:guideQuest,save,open:openModal,close:closeModal,stats:refreshStats,hurt:takeDamage,damage:damageEnemy,defeat,draw,spawnBoss,reset:resetSession,switchClass,useItem,startInstance,claim:claimQuest,selectItem(id){selectedItem=id;},selectGem(id){document.querySelector('#gemSelect').value=id;},suppressBasic(){lastAttack=Infinity;},lastPotionTime(){return lastPotion;},settings:demoOptions};})();`;
 vm.runInNewContext(source.slice(0,source.indexOf(marker))+api,env,{filename:'dist/game.js'});
 const a=env.__runtime;a.setScene(profile);
 return{...a,get view(){return a.view;},D,R:rules.createRules(D),element,saved,document,forceHit(){randomMath.random=()=>.99;},click(id='',dataset={}){const b={id,dataset,hasAttribute:k=>k.startsWith('data-')&&k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase()) in dataset,closest:()=>b};for(const fn of listeners.click||[])fn({target:b});},run(seconds){for(let n=0;n<Math.ceil(seconds/.05);n++)a.tick(.05);}};
}
module.exports={runtime};
