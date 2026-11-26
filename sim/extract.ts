import { CAMPAIGNS } from '../src/data/campaigns';
import { initGame } from '../src/game/gameLogic';
import { resolveChoice } from '../src/game/resolveChoice';
import { getChapters } from '../src/data/constants';
import * as fs from 'fs';
const out:any={};
for(const [pid,encs] of Object.entries(CAMPAIGNS)){
  const chapters=getChapters(pid);
  out[pid]={chapters,encs:encs.map((e,idx)=>{
    const gs:any={...initGame(pid),phase:'encounter',currentEncIdx:idx};
    return {id:e.id,title:e.title,type:e.type,chapter:e.chapter,flavor:e.flavor,
      cond:e.conditional?e.conditional.toString():null,
      signals:(e.signals||[]).map(s=>({type:s.type,text:s.text,reveal:s.reveal})),
      choices:e.choices.map((c,i)=>{
        const r=(t?:number)=>{try{const x=resolveChoice(gs,i,t);return x.outcome;}catch(err:any){return {msg:'ERR '+err.message}}};
        return {label:c.label,desc:c.desc,hidden:!!c.hidden,requires:c.requires||null,dice:c.useDice?{stat:c.diceStat,th:c.diceThreshold}:null,
          discovery:c.discovery||[],cb:c.companionBonus||null,bb:c.boonBonus||null,minigame:c.minigame||null,
          ok:c.useDice?r(99):r(),fail:c.useDice?r(-99):null};
      })};
  })};
}
fs.writeFileSync('/tmp/extract.json',JSON.stringify(out,null,1));
console.log('ok');
