import { CAMPAIGNS } from '../src/data/campaigns';
import * as C from '../src/data/constants';
const bad=[/Managed Payments/i,/Managed Services/i,/\bSMP\b/,/SaaS [123]\.0/,/payments_lead/,/Training Grounds/i,/\bHead of Payments joins/i];
const hits:string[]=[];
for(const [pid,encs] of Object.entries(CAMPAIGNS)) for(const e of encs){const t=JSON.stringify(e);bad.forEach(b=>{if(b.test(t))hits.push(pid+':'+e.id+' '+b)});}
const ct=JSON.stringify(C);bad.forEach(b=>{if(b.test(ct))hits.push('constants '+b)});
console.log(hits.length?hits.join('\n'):'campaign+constants clean');
// v12: no escape codes may appear as literal JSX text (they only render inside JS strings).
import * as fs from 'fs';
import { execSync } from 'child_process';
const eb = execSync("find /opt/amazon/genesis1p-tools/nodejs/lib/node_modules/tsx -name esbuild -type f -path '*bin*' 2>/dev/null | head -1 || true").toString().trim() || 'npx esbuild';
const jsxHits:string[]=[];
for (const f of ['src/components/index.tsx','src/components/Minigame.tsx','src/App.tsx']) {
  const out = execSync(`${eb} ${f} --loader:.tsx=tsx --jsx=preserve`).toString();
  // JSX text = between a tag/brace boundary and the next tag/brace. Flag any \u escape or NOW shouting there.
  const re = />([^<{"]*\\u[0-9A-Fa-f{][^<{]*)</g; let m;
  while ((m = re.exec(out))) jsxHits.push(f + ': ' + m[1].trim().slice(0, 80));
}
console.log(jsxHits.length ? 'JSX literal escapes:\n' + jsxHits.join('\n') : 'jsx text clean');
