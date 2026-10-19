import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {inputs} from '../content.js';
import {fresh,restore,choose,mark,esc,route} from '../core.js';
import {combinedCode,inputCode,soundCode,exampleCode,setupCode} from '../code.js';
const root=new URL('../',import.meta.url);const cards=JSON.parse(readFileSync(new URL('data/bricks.json',root)));
test('every supported part has source code, local wiring and provenance',()=>{assert.equal(inputs.length,12);assert.equal(cards.length,14);for(const c of cards){assert.ok(c.code.trim());assert.match(c.source,/raspberrypifoundation/);assert.match(c.sourceHash,/^[0-9a-f]{64}$/);for(const field of ['component','wiring'])assert.ok(existsSync(new URL(c[field],root)));}});
test('reused source assets retain their exact bytes',()=>{const m=JSON.parse(readFileSync(new URL('data/sources.json',root)));for(const a of m.assets){if(a.file==='setup-help.js')continue;assert.equal(createHash('sha256').update(readFileSync(new URL(a.file,root))).digest('hex'),a.sha256,a.file);}});
test('changing components invalidates combined test but preserves notes and code',()=>{const p=fresh();p.notes.body='cardboard';p.draft='my code';p.checks.combined=true;p.checks.play=true;choose(p,'input','button');assert.equal(p.checks.combined,false);assert.equal(p.checks.play,false);assert.equal(p.notes.body,'cardboard');assert.equal(p.draft,'my code');p.checks.combined=true;choose(p,'input','button');assert.equal(p.checks.combined,true);mark(p,'input-button',false);assert.equal(p.checks.combined,false);});
test('project files round-trip, escape user text and reject unrelated formats',()=>{const p=fresh();p.ready=true;p.notes.body='<img onerror="oops">';p.draft='print("hi")';assert.deepEqual(restore(JSON.parse(JSON.stringify(p))),p);assert.match(esc(p.notes.body),/^&lt;/);assert.throws(()=>restore({version:2}));assert.equal(route('<script>'),'home');assert.equal(restore({version:1,checks:JSON.parse('{"__proto__":true}')}).checks.__proto__,Object.prototype);});
test('all input/sound combinations and examples parse as Python',()=>{const programs=[setupCode,exampleCode('guitar'),exampleCode('violin')];for(const i of inputs){programs.push(inputCode(i.id));for(const s of ['buzzer','passive-buzzer'])for(const b of ['hold','rhythm',...(s==='passive-buzzer'&&i.analogue?['pitch']:[])])programs.push(combinedCode(i.id,s,b));}for(const s of ['buzzer','passive-buzzer'])for(const b of ['beep','rhythm','slide'])programs.push(soundCode(s,b));const r=spawnSync(process.env.PYTHON||'python3',['-c','import ast,json,sys\nfor i,s in enumerate(json.load(sys.stdin)):\n try: ast.parse(s)\n except SyntaxError: print("PROGRAM",i,s);raise\nprint("Parsed",i+1,"programs")'],{input:JSON.stringify(programs),encoding:'utf8'});assert.equal(r.status,0,r.stdout+r.stderr);console.log(r.stdout.trim());mkdirSync(new URL('outputs',root),{recursive:true});writeFileSync(new URL('outputs/programs.json',root),JSON.stringify(programs));});
test('pitch is only offered for a passive buzzer with a changing reading',()=>{assert.throws(()=>combinedCode('button','passive-buzzer','pitch'));assert.throws(()=>combinedCode('potentiometer','buzzer','pitch'));assert.match(combinedCode('potentiometer','passive-buzzer','pitch'),/buzzer.freq/);});
test('guitar and violin preserve free input pins and use a separate ground contact',()=>{for(const kind of ['guitar','violin']){const s=exampleCode(kind);assert.match(s,/Button\(10\), Button\(0\), Button\(1\)/);assert.match(s,/PWMBuzzer\(9,/);assert.match(s,/finally:\n    buzzer.off/);}assert.match(exampleCode('guitar'),/pick = Button\(2\)/);});
test('generated programs respond to inputs and stop cleanly',()=>{const cases=[];for(const i of inputs)for(const sound of ['buzzer','passive-buzzer'])for(const mode of ['hold','rhythm',...(i.analogue&&sound==='passive-buzzer'?['pitch']:[])])cases.push({input:i.id,sound,mode,code:combinedCode(i.id,sound,mode)});for(const example of ['guitar','violin'])cases.push({example,code:exampleCode(example)});const r=spawnSync(process.env.PYTHON||'python3',['tests/runtime.py'],{input:JSON.stringify(cases),encoding:'utf8'});assert.equal(r.status,0,r.stdout+r.stderr);console.log(r.stdout.trim());});

test('control ideas accumulate, migrate from older saves and preserve personal work',async()=>{
 const {toggleInput}=await import('../core.js');const p=fresh();p.draft='my own rules';p.notes.body='soft shapes';p.checks.combined=true;
 toggleInput(p,'button');toggleInput(p,'ldr');assert.deepEqual(p.inputs,['button','ldr']);assert.equal(p.checks.combined,false);
 choose(p,'input','potentiometer');assert.deepEqual(p.inputs,['button','ldr']);toggleInput(p,'button');assert.deepEqual(p.inputs,['ldr']);
 assert.equal(p.draft,'my own rules');assert.equal(p.notes.body,'soft shapes');assert.deepEqual(restore(JSON.parse(JSON.stringify(p))),p);
 const old=restore({version:1,input:'button',body:'guitar',draft:'keep me',notes:{'body-guitar':'my foil'}});assert.deepEqual(old.inputs,['button']);assert.equal(old.draft,'keep me');assert.equal(old.notes['body-guitar'],'my foil');
});
test('pair recipes reject pin clashes and unsupported pitch rules',async()=>{
 const {pairIssue,pairCode}=await import('../code.js');assert.match(pairIssue('button','button'),/same pins/);assert.match(pairIssue('pir','am312-pir'),/GP16/);
 assert.throws(()=>pairCode('pir','am312-pir','buzzer'));assert.throws(()=>pairCode('button','toggle-switch','passive-buzzer','pitch'));assert.throws(()=>pairCode('button','potentiometer','buzzer','pitch'));
});
test('every compatible pair recipe and repeated-contact example parses as Python',async()=>{
 const {pairCode,pairIssue,contactsCode}=await import('../code.js');const programs=[contactsCode];
 for(const a of inputs)for(const b of inputs){if(pairIssue(a.id,b.id))continue;for(const s of ['buzzer','passive-buzzer'])for(const rule of ['either','both',...(b.analogue?['rhythm',...(s==='passive-buzzer'?['pitch']:[])]:[])])programs.push(pairCode(a.id,b.id,s,rule));}
 const r=spawnSync(process.env.PYTHON||'python3',['-c','import ast,json,sys\np=json.load(sys.stdin)\nfor s in p: ast.parse(s)\nprint("Parsed",len(p),"pair/contact programs")'],{input:JSON.stringify(programs),encoding:'utf8',maxBuffer:1000000});assert.equal(r.status,0,r.stdout+r.stderr);console.log(r.stdout.trim());
});
test('two-control rules respond independently, handle missing values and silence on stop',async()=>{
 const {pairCode}=await import('../code.js');const cases=[];
 for(const sound of ['buzzer','passive-buzzer'])for(const rule of ['either','both'])cases.push({first:'button',second:'toggle-switch',sound,rule,code:pairCode('button','toggle-switch',sound,rule)});
 for(const rule of ['pitch','rhythm'])cases.push({first:'button',second:'potentiometer',sound:'passive-buzzer',rule,code:pairCode('button','potentiometer','passive-buzzer',rule)});
 for(const rule of ['either','both'])cases.push({first:'button',second:'distance',sound:'buzzer',rule,code:pairCode('button','distance','buzzer',rule)});
 for(const [first,second]of [['temperature-sensor','temperature-probe'],['temperature-probe','temperature-sensor']])cases.push({first,second,sound:'passive-buzzer',rule:'pitch',code:pairCode(first,second,'passive-buzzer','pitch')});
 const r=spawnSync(process.env.PYTHON||'python3',['tests/pair-runtime.py'],{input:JSON.stringify(cases),encoding:'utf8'});assert.equal(r.status,0,r.stdout+r.stderr);console.log(r.stdout.trim());
});
