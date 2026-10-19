"""Copy unchanged published Skills Bricks diagrams/code and Build Lab setup assets.
Usage: python3 scripts/import-sources.py /path/to/skills-bricks /path/to/pick-a-path
"""
from pathlib import Path
import sys,re,html,json,hashlib,shutil
ROOT=Path(__file__).resolve().parents[1]
bricks=Path(sys.argv[1]); lab=Path(sys.argv[2])
ids=['button','capacitive-touch','potentiometer','ldr','distance','tilt-switch','line-sensor','toggle-switch','pir','am312-pir','temperature-sensor','temperature-probe','buzzer','passive-buzzer']
base='https://raspberrypifoundation.github.io/skills-bricks/'
records=[]; manifest=[]
def plain(s):return ' '.join(html.unescape(re.sub('<[^>]+>',' ',s)).split())
def copy(src,dest,url):
 out=ROOT/dest;out.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,out)
 manifest.append({'file':dest,'source':url,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()})
for slug in ids:
 folder=bricks/'dist'/slug; source=folder/f'{slug}-pico.html'; raw=source.read_text()
 url=base+slug+'/'+source.name
 codes=[html.unescape(x) for x in re.findall(r'<pre><code>(.*?)</code></pre>',raw,re.S)]
 assert len(codes)==1,(slug,len(codes))
 wiring=re.search(r'<div class="image-box wiring-image">\s*<img src="([^"]+)" alt="([^"]+)"',raw)
 component=re.search(r'<img src="(images/component-[^"]+)" alt="([^"]+)"',raw)
 assert wiring and component,slug
 paths={}
 for key,match in [('wiring',wiring),('component',component)]:
  dest=f'assets/bricks/{slug}-{key}{Path(match[1]).suffix}'
  copy(folder/match[1],dest,base+slug+'/'+match[1]);paths[key]=dest;paths[key+'Alt']=html.unescape(match[2])
 # Reuse Build Lab's small web copies when their original matches this card.
 for key,foldername in [('component','components'),('wiring','wiring')]:
  original=lab/'assets'/foldername/(slug+'.png'); preview=lab/'assets'/foldername/(slug+'.webp')
  if original.exists() and preview.exists() and original.read_bytes()==(ROOT/paths[key]).read_bytes():
   dest=f'assets/bricks/{slug}-{key}.webp'
   copy(preview,dest,'https://raspberrypilearning.github.io/pick-a-part/assets/'+foldername+'/'+slug+'.webp')
   paths[key+'Preview']=dest
 notes=re.search(r'<div class="note">(.*?)</div>',raw,re.S)
 title=plain(re.search(r'<h1[^>]*>(.*?)</h1>',raw,re.S)[1])
 records.append({'id':slug,'name':title,'source':url,'sourceHash':hashlib.sha256(source.read_bytes()).hexdigest(),'code':codes[0],'note':plain(notes[1]) if notes else '',**paths})
 copy(source,f'.local/source/bricks/{source.name}',url)
for name in ['pico-top-plug.png','plug-in-pico.png','thonny-switch-interpreter.jpg','thonny-manage-packages.jpg','thonny-packages-picozero.jpg','thonny-install-package.jpg','picozero-LICENSE.txt','README.md']:
 copy(lab/'assets/setup'/name,'assets/setup/'+name,'https://raspberrypilearning.github.io/pick-a-part/assets/setup/'+name)
copy(lab/'pico-setup.js','setup-help.js','https://raspberrypilearning.github.io/pick-a-part/pico-setup.js')
# Keep source workflow, images and safety instructions. Adapt only project/page names.
p=ROOT/'setup-help.js';text=p.read_text().replace('what your toy does','what your instrument does').replace('your toy program','your instrument program').replace('Get ready','Connect your Pico').replace('tick the picozero check','confirm the Pico check');p.write_text(text)
manifest=[m for m in manifest if not m['file'].startswith('.local/')]
(ROOT/'data/bricks.json').write_text(json.dumps(records,indent=2)+'\n')
(ROOT/'data/sources.json').write_text(json.dumps({'checked':'2026-10-19','assets':manifest,'setupAdaptation':'setup-help.js changes project/page names only; sourceHash is the original hash.'},indent=2)+'\n')
print(f'Imported {len(records)} cards and {len(manifest)} assets; originals unchanged.')
