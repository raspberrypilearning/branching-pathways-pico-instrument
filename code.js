import {byInput} from './content.js';
export const setupCode='from picozero import pico_led\nfrom time import sleep\n\npico_led.on()\nsleep(1)\npico_led.off()\nprint("Pico and picozero are ready")\n';
const soundHead=type=>type==='buzzer'?'from picozero import Buzzer\nbuzzer = Buzzer(9)':'from picozero import PWMBuzzer\nbuzzer = PWMBuzzer(9, 2000, 32768)';
export function soundCode(type,pattern='beep'){
 const pitch=type==='passive-buzzer';
 let body='    buzzer.on()\n    sleep(0.25)\n    buzzer.off()';
 if(pattern==='rhythm')body='    # Change these pairs: sound length, then silence.\n    rhythm = [(0.1, 0.15), (0.1, 0.15), (0.4, 0.5)]\n    for sound, silence in rhythm:\n        buzzer.on()\n        sleep(sound)\n        buzzer.off()\n        sleep(silence)';
 if(pattern==='slide'&&pitch)body='    # Change the start, end and step to invent a slide.\n    buzzer.on()\n    for pitch in range(300, 1200, 20):\n        buzzer.freq = pitch\n        sleep(0.02)';
 return '# Sound test — GP9, physical pin 12\n'+soundHead(type)+'\nfrom time import sleep\n\ntry:\n'+body+'\nfinally:\n    buzzer.off()\n';
}
const probeInit='from machine import Pin\nimport onewire, ds18x20\nbus = onewire.OneWire(Pin(22))\nsensor = ds18x20.DS18X20(bus)\nprobes = sensor.scan()\nassert probes, "Check probe wiring"';
export function inputCode(id){const x=byInput[id];if(!x)throw Error('Unknown input');
 if(id==='temperature-probe')return probeInit+'\nfrom time import sleep_ms\n\nwhile True:\n    sensor.convert_temp()\n    sleep_ms(750)\n    print(sensor.read_temp(probes[0]))\n';
 return `from picozero import ${x.cls}\nfrom time import sleep\n\n${x.setup}\n\nwhile True:\n    print(${x.read})\n    sleep(0.1)\n`;
}
export function combinedCode(id,type,behaviour='hold'){
 const x=byInput[id];if(!x||!['buzzer','passive-buzzer'].includes(type))throw Error('Choose an input and sound maker.');
 if(behaviour==='pitch'&&(!x.analogue||type!=='passive-buzzer'))throw Error('Pitch bending needs a changing-value input and passive buzzer.');
 let init=id==='temperature-probe'?probeInit:`from picozero import ${x.cls}\n${x.setup}`;
 let read=`    raw = ${x.read}\n`;
 if(id==='temperature-probe'){
 init+='\nsensor.convert_temp()\nconversion_started = ticks_ms()\nraw = None';
 read='    if ticks_diff(now, conversion_started) >= 750:\n        raw = sensor.read_temp(probes[0])\n        sensor.convert_temp()\n        conversion_started = now\n';
 }
 const value=id.startsWith('temperature-')?'(raw + 10) / 60':'float(raw)';
 let action;
 if(behaviour==='pitch')action='        buzzer.freq = int(220 + value * 660)\n        buzzer.on()';
 else if(behaviour==='rhythm')action='        # Higher readings make shorter gaps. Digital inputs start/stop.\n        period = int(900 - value * 700)\n        if '+(x.analogue?'True':'bool(raw)')+':\n            if ticks_diff(now, beat_started) >= period:\n                beat_started = now\n            if ticks_diff(now, beat_started) < period // 2:\n                buzzer.on()\n            else:\n                buzzer.off()\n        else:\n            buzzer.off()\n            beat_started = now';
 else action='        # Change this threshold after looking at your own readings.\n        # Temperature mapping: 0.5 is 20 degrees C. Distance: 0.5 is 0.5 m.\n        if '+(x.analogue?'value >= 0.5':'bool(raw)')+':\n            buzzer.on()\n        else:\n            buzzer.off()';
 return `# Pico Musical Instrument — ${x.name} + ${type}\n# Run this complete example on the Pico, not alongside another test.\nfrom time import sleep, ticks_ms, ticks_diff\n${soundHead(type)}\n${init}\nbeat_started = ticks_ms()\n\ntry:\n    while True:\n        now = ticks_ms()\n${read.split('\n').filter(Boolean).map(l=>'    '+l).join('\n')}\n        if raw is None:\n            buzzer.off()\n            sleep(0.01)\n            continue\n        value = max(0.0, min(1.0, ${value}))\n${action}\n        sleep(0.01)\nfinally:\n    buzzer.off()\n`;
}
export function exampleCode(kind){
 const init='from picozero import Button, PWMBuzzer\nfrom time import sleep\n\nbuzzer = PWMBuzzer(9, 2000, 32768)\n# Keep the first switch on the Skills Bricks pin.\n# GP0, GP1 and GP2 are free in the Skills Bricks Pico pin map.\ncontacts = [Button(10), Button(0), Button(1)]\nnotes = [262, 330, 392]\n';
 if(kind==='guitar')return init+'pick = Button(2)  # Body foil; the foil pick connects to GND\n\ntry:\n    while True:\n        pitch = 220  # Open note: no fret held\n        for fret, note in zip(contacts, notes):\n            if fret.is_pressed:\n                pitch = note\n                break\n        if pick.is_pressed:\n            buzzer.freq = pitch\n            buzzer.on()\n        else:\n            buzzer.off()\n        sleep(0.01)\nfinally:\n    buzzer.off()\n';
 return init+'# Each thread goes to one contact pin. The bow goes to GND.\ntry:\n    while True:\n        pitch = None\n        for thread, note in zip(contacts, notes):\n            if thread.is_pressed:\n                pitch = note\n                break\n        if pitch is None:\n            buzzer.off()\n        else:\n            buzzer.freq = pitch\n            buzzer.on()\n        sleep(0.01)\nfinally:\n    buzzer.off()\n';
}
