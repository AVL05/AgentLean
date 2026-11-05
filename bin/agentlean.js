#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { mkdirSync, openSync, closeSync, writeSync, readFileSync } from 'node:fs';
import { resolve, relative, join, sep } from 'node:path';
import { randomUUID } from 'node:crypto';
import { collector, summary } from '../src/summary.js';

const help = `AgentLean v0.1.0
Usage:
  agentlean run [--full] -- <executable> [args...]
  agentlean logs <path>
  agentlean help

Full original stdout/stderr is saved in .agentlean/logs/.
--full streams original output instead of a summary.
Exit codes are preserved; no automatic test skipping or network requests.
`;
const fail = (m, n=2) => { console.error('agentlean: ' + m); process.exitCode=n; };
async function run(args) {
  let full = false;
  if (args[0] === '--full') { full=true; args=args.slice(1); }
  if (args[0] === '--') args=args.slice(1);
  if (!args.length || args[0].startsWith('--')) return fail('expected executable after --');

  const dir=resolve('.agentlean/logs');
  let path='', fd, bytes=0;
  try {
    mkdirSync(dir,{recursive:true,mode:0o700});
    path=join(dir,new Date().toISOString().replace(/[:.]/g,'-')+'-'+randomUUID().slice(0,8)+'.log');
    fd=openSync(path,'wx',0o600);
  } catch {
    full=true; console.error('agentlean: cannot save log; streaming complete output');
  }
  const stats=collector(), start=Date.now();
  let logging=true;
  const output=chunk => {
    bytes+=chunk.length;
    if (fd!==undefined && logging) {
      try { writeSync(fd,chunk); }
      catch { logging=false; full=true; console.error('agentlean: log write error; streaming subsequent output'); }
    }
    if (full) process.stdout.write(chunk);
    else stats.push(chunk);
  };
  const child=spawn(args[0],args.slice(1),{shell:false,stdio:['inherit','pipe','pipe'],env:process.env});
  child.stdout?.on('data',output);
  child.stderr?.on('data',output);
  let spawnError;
  child.on('error',e=>{spawnError=e;console.error('agentlean: '+e.message);});
  const forward=s=>{if(!child.killed)child.kill(s);};
  process.on('SIGINT',forward); process.on('SIGTERM',forward);
  const ended=await new Promise(done=>child.on('close',(code,signal)=>done({code,signal})));
  process.off('SIGINT',forward);process.off('SIGTERM',forward);
  if(fd!==undefined)try{closeSync(fd);}catch{}
  const code=spawnError?127:ended.code??(ended.signal?128:1);
  if(!full)process.stdout.write(summary({code,signal:ended.signal,ms:Date.now()-start,bytes,log:relative(process.cwd(),path),stats:stats.result()}));
  else if(logging && path)console.error('agentlean: full log: '+relative(process.cwd(),path));
  process.exitCode=code;
}
async function main(){
  const [op,...args]=process.argv.slice(2);
  if(!op||op==='help'||op==='--help')return process.stdout.write(help);
  if(op==='run')return run(args);
  if(op==='logs'){
    if(args.length!==1)return fail('usage: agentlean logs <path>');
    const p=resolve(args[0]),root=resolve('.agentlean/logs');
    if(!p.startsWith(root+sep))return fail('log must be inside .agentlean/logs');
    try{process.stdout.write(readFileSync(p));}catch(e){fail(e.message);}
    return;
  }
  fail('unknown command: '+op);
}
main().catch(e=>fail(e.message,1));
