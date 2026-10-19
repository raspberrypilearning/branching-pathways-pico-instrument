export const KEY='branching-pathways-pico-instrument-v1';
export const fresh=()=>({version:1,ready:false,checks:{},notes:{},input:null,sound:null,body:null,behaviour:'hold',name:'My instrument',draft:'',page:'home'});
export function restore(value){
 if(!value||value.version!==1)throw Error('Choose a Pico Musical Instrument project file.');
 const p=fresh();p.ready=value.ready===true;
 for(const k of ['input','sound','body'])if(value[k]===null||typeof value[k]==='string')p[k]=value[k]?.slice(0,60)||null;
 for(const k of ['name','draft','page','behaviour'])if(typeof value[k]==='string')p[k]=value[k].slice(0,k==='draft'?100000:150);
 for(const k of ['checks','notes'])if(value[k]&&typeof value[k]==='object'&&!Array.isArray(value[k]))for(const [a,b]of Object.entries(value[k])){if(!/^[a-z0-9-]{1,80}$/.test(a))continue;if(k==='checks'&&typeof b==='boolean')p[k][a]=b;if(k==='notes'&&typeof b==='string')p[k][a]=b.slice(0,10000);}
 return p;
}
export function choose(project,key,value){if(project[key]!==value){project[key]=value;project.checks.combined=false;project.checks.play=false;}}
export function mark(project,key,done){project.checks[key]=done;if(key!=='combined'&&key!=='play'){project.checks.combined=false;project.checks.play=false;}if(key==='combined')project.checks.play=false;}
export function route(value){const clean=(value||'home').replace(/^#/,'');return /^[a-z0-9/-]+$/.test(clean)?clean:'home';}
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
