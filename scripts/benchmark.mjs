// Demonstration of output-byte reduction only. Not a token or quota benchmark.
import {spawnSync} from 'node:child_process';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const cwd=mkdtempSync(join(tmpdir(),'agentlean-bench-'));
try {
 const code='for(let i=0;i<1000;i++)console.log("progress "+i);console.log("complete")';
 const raw=spawnSync(process.execPath,['-e',code],{cwd,encoding:'utf8'});
 const lean=spawnSync(process.execPath,[resolve('bin/agentlean.js'),'run','--',process.execPath,'-e',code],{cwd,encoding:'utf8'});
 if(raw.status||lean.status)throw Error('benchmark failed');
 const a=Buffer.byteLength(raw.stdout),b=Buffer.byteLength(lean.stdout);
 console.log(JSON.stringify({scenario:'synthetic repeated stdout',rawBytes:a,summaryBytes:b,outputByteReductionPercent:+((1-b/a)*100).toFixed(2),note:'NOT measured model tokens, task quality, or subscription quota'},null,2));
} finally {rmSync(cwd,{recursive:true,force:true});}
