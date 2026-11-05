import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,readdirSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const cli=resolve('bin/agentlean.js');
function temp(run){const cwd=mkdtempSync(join(tmpdir(),'agentlean-'));try{run(cwd);}finally{rmSync(cwd,{recursive:true,force:true});}}
test('successful command preserves its full log',()=>temp(cwd=>{
  const x=spawnSync(process.execPath,[cli,'run','--',process.execPath,'-e','console.log("hello");console.log("world")'],{cwd,encoding:'utf8'});
  assert.equal(x.status,0,x.stderr);assert.match(x.stdout,/Status: PASS/);
  const name=readdirSync(join(cwd,'.agentlean','logs'))[0];
  assert.equal(readFileSync(join(cwd,'.agentlean','logs',name),'utf8'),'hello\nworld\n');
}));
test('failed command preserves failure status and diagnostic',()=>temp(cwd=>{
  const x=spawnSync(process.execPath,[cli,'run','--',process.execPath,'-e','console.error("Error: broken");process.exit(7)'],{cwd,encoding:'utf8'});
  assert.equal(x.status,7);assert.match(x.stdout,/Status: FAIL/);assert.match(x.stdout,/Error: broken/);
}));
test('full mode preserves stdout',()=>temp(cwd=>{
  const x=spawnSync(process.execPath,[cli,'run','--full','--',process.execPath,'-e','console.log("original")'],{cwd,encoding:'utf8'});
  assert.equal(x.status,0);assert.match(x.stdout,/original/);assert.doesNotMatch(x.stdout,/Status: PASS/);
}));
test('missing command returns 127',()=>temp(cwd=>{
  const x=spawnSync(process.execPath,[cli,'run','--','nonexistent-agentlean-executable-xyz'],{cwd,encoding:'utf8'});
  assert.equal(x.status,127);
}));
test('unrelated files cannot be read with logs command',()=>temp(cwd=>{
  const x=spawnSync(process.execPath,[cli,'logs',join(cwd,'private.txt')],{cwd,encoding:'utf8'});
  assert.equal(x.status,2);
}));
