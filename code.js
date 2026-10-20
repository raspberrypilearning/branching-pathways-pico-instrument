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
 const condition={potentiometer:'reading > 0.5',ldr:'reading < 0.5',distance:'reading is not None and reading < 0.3','temperature-sensor':'reading > 25','temperature-probe':'reading > 25'}[id]||'reading';
 if(id==='temperature-probe')return `${probeInit}\nfrom time import sleep_ms\n\nwhile True:\n    sensor.convert_temp()\n    sleep_ms(750)\n    reading = sensor.read_temp(probes[0])\n    print(reading)\n    if ${condition}:\n        print("Playing action detected!")\n`;
 return `from picozero import ${x.cls}\nfrom time import sleep\n\n${x.setup}\n\nwhile True:\n    reading = ${x.read}\n    print(reading)\n    if ${condition}:\n        print("Playing action detected!")\n    sleep(0.1)\n`;
}
export function joinedTestCode(id,type){
 if(!['buzzer','passive-buzzer'].includes(type))throw Error('Choose a sound maker.');
 const [setup,loop]=inputCode(id).split('\nwhile True:\n');
 const action=loop.replace('    print(reading)\n','')
  .replace('        print("Playing action detected!")','        buzzer.on()\n    else:\n        buzzer.off()');
 return `# Your control test and sound test, joined with one rule.
# Keep any pins or settings you changed in your own tests.
${setup}

# Setup from the sound test
${soundHead(type)}

try:
    while True:
${action.trimEnd().split('\n').map(line=>'    '+line).join('\n')}
finally:
    buzzer.off()
`;
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
export function exampleCode(kind,variant='distance'){
 if(kind==='theremin')return thereminCode(variant);
 if(kind==='drumkit')return `# Each metal pan goes to its own GP pin. Foil-covered sticks go to GND.
from picozero import Button, PWMBuzzer
from time import sleep

pans = [Button(10), Button(0), Button(1)]
buzzer = PWMBuzzer(9, 2000, 32768)
pitches = [220, 440, 880]
lengths = [0.12, 0.07, 0.03]
was_touching = [False, False, False]

try:
    while True:
        for i, pan in enumerate(pans):
            touching = pan.is_pressed
            if touching and not was_touching[i]:
                buzzer.freq = pitches[i]
                buzzer.on()
                sleep(lengths[i])
                buzzer.off()
            was_touching[i] = touching
        sleep(0.01)
finally:
    buzzer.off()
`;
 if(!['guitar','violin'].includes(kind))throw Error('Unknown example');
 const init='from picozero import Button, PWMBuzzer\nfrom time import sleep\n\nbuzzer = PWMBuzzer(9, 2000, 32768)\n# Keep the first switch on the Skills Bricks pin.\n# GP0, GP1 and GP2 are free in the Skills Bricks Pico pin map.\ncontacts = [Button(10), Button(0), Button(1)]\nnotes = [262, 330, 392]\n';
 if(kind==='guitar')return init+'pick = Button(2)  # Body foil; the foil pick connects to GND\n\ntry:\n    while True:\n        pitch = 220  # Open note: no fret held\n        for fret, note in zip(contacts, notes):\n            if fret.is_pressed:\n                pitch = note\n                break\n        if pick.is_pressed:\n            buzzer.freq = pitch\n            buzzer.on()\n        else:\n            buzzer.off()\n        sleep(0.01)\nfinally:\n    buzzer.off()\n';
 return init+'# Each thread goes to one contact pin. The bow goes to GND.\ntry:\n    while True:\n        pitch = None\n        for thread, note in zip(contacts, notes):\n            if thread.is_pressed:\n                pitch = note\n                break\n        if pitch is None:\n            buzzer.off()\n        else:\n            buzzer.freq = pitch\n            buzzer.on()\n        sleep(0.01)\nfinally:\n    buzzer.off()\n';
}

function thereminCode(variant){
 if(!['distance','pot','distance-pot','two-distance'].includes(variant))throw Error('Unknown theremin control');
 const useDistance=variant!=='pot',second=variant==='distance-pot'?'pot':variant==='two-distance'?'distance':null;
 const imports=`from picozero import ${[useDistance?'DistanceSensor':null,second==='pot'||variant==='pot'?'Pot':null,'PWMBuzzer'].filter(Boolean).join(', ')}\nfrom time import sleep${second?', ticks_ms, ticks_diff':''}`;
 const setup=`buzzer = PWMBuzzer(9, 2000, 32768)\n${useDistance?'hand = DistanceSensor(echo=21, trigger=20)\n':''}${variant==='pot'||second==='pot'?'dial = Pot(26)\n':''}${second==='distance'?'other_hand = DistanceSensor(echo=19, trigger=18)\n':''}${second?'beat_started = ticks_ms()\n':''}`;
 const read=useDistance?'        distance = hand.distance\n'+(second==='distance'?'        sleep(0.06)  # Give the first echo time to fade\n':'')+(second==='distance'?'        pulse_distance = other_hand.distance\n        sleep(0.06)\n':'')+'        if distance is None or distance > 0.6'+(second==='distance'?' or pulse_distance is None':'')+':\n            buzzer.off()\n            sleep(0.02)\n            continue\n        pitch = int(220 + (0.6 - distance) * 1000)\n':'        pitch = int(220 + dial.value * 660)\n';
 const action=!second?'        buzzer.freq = pitch\n        buzzer.on()\n        sleep(0.02)\n':`        ${second==='pot'?'control = dial.value':'control = min(1.0, pulse_distance / 0.6)'}
        period = int(200 + control * 700)
        now = ticks_ms()
        if ticks_diff(now, beat_started) >= period:
            beat_started = now
        buzzer.freq = pitch
        if ticks_diff(now, beat_started) < period // 2:
            buzzer.on()
        else:
            buzzer.off()
        sleep(0.02)
`;
 return `# Pico theremin: ${variant}. A passive buzzer changes pitch.
${imports}

${setup}
try:
    while True:
${read}${action}finally:
    buzzer.off()
`;
}

export function pairIssue(first,second){
 if(!byInput[first]||!byInput[second])return 'Choose two controls to explore this example.';
 if(first===second)return 'These two cards use the same pins. For repeated homemade switches, open “Add more contacts” below.';
 return '';
}
function readerCode(id,name){
 const x=byInput[id];
 const setup=id==='temperature-probe'?probeInit:`from picozero import ${x.cls}\n${x.setup}`;
 const body=id==='temperature-probe'?`sensor.convert_temp()
started = ticks_ms()
value = None
def read():
    nonlocal started, value
    now = ticks_ms()
    if ticks_diff(now, started) >= 750:
        value = sensor.read_temp(probes[0])
        sensor.convert_temp()
        started = now
    return value
return read`:`return lambda: ${x.read}`;
 return `def make_${name}():\n${(setup+'\n'+body).split('\n').map(l=>'    '+l).join('\n')}\nread_${name} = make_${name}()\n`;
}
export function pairCode(first,second,type,rule='either'){
 const issue=pairIssue(first,second);if(issue)throw Error(issue);
 if(!['buzzer','passive-buzzer'].includes(type))throw Error('Choose a sound maker.');
 if(!['either','both','pitch','rhythm'].includes(rule))throw Error('Choose a rule.');
 if(['pitch','rhythm'].includes(rule)&&!byInput[second].analogue)throw Error('Choose a changing-value second control.');
 if(rule==='pitch'&&type!=='passive-buzzer')throw Error('Pitch changes need a passive buzzer.');
 const normalise=(id,variable)=>id.startsWith('temperature-')?`(${variable} + 10) / 60`:`float(${variable})`;
 let action;
 if(rule==='either'||rule==='both')action=`if first_on ${rule==='either'?'or':'and'} second_on:\n    buzzer.on()\nelse:\n    buzzer.off()`;
 else if(rule==='pitch')action='if first_on and second_value is not None:\n    buzzer.freq = int(220 + second_value * 660)\n    buzzer.on()\nelse:\n    buzzer.off()';
 else action='if first_on and second_value is not None:\n    period = int(900 - second_value * 700)\n    if ticks_diff(now, beat_started) >= period:\n        beat_started = now\n    if ticks_diff(now, beat_started) < period // 2:\n        buzzer.on()\n    else:\n        buzzer.off()\nelse:\n    buzzer.off()\n    beat_started = now';
 return `# Two controls, your rule: ${rule}
# First: ${byInput[first].name}. Second: ${byInput[second].name}.
# Uses each Skills Bricks circuit unchanged, with a shared GND.
from time import sleep, ticks_ms, ticks_diff
${soundHead(type)}

${readerCode(first,'first')}
${readerCode(second,'second')}
# Change these thresholds after trying your own readings.
# Temperature: 0.5 means 20 C; distance: 0.5 means 0.5 m.
first_threshold = 0.5
second_threshold = 0.5
beat_started = ticks_ms()

try:
    while True:
        now = ticks_ms()
        first_raw = read_first()
        second_raw = read_second()
        first_value = None if first_raw is None else max(0.0, min(1.0, ${normalise(first,'first_raw')}))
        second_value = None if second_raw is None else max(0.0, min(1.0, ${normalise(second,'second_raw')}))
        first_on = first_value is not None and first_value >= first_threshold
        second_on = second_value is not None and second_value >= second_threshold
${action.split('\n').map(l=>'        '+l).join('\n')}
        sleep(0.01)
finally:
    buzzer.off()
`;
}
export const contactsCode=`# Any shape, three homemade contacts and a passive buzzer.
from picozero import Button, PWMBuzzer
from time import sleep

buzzer = PWMBuzzer(9, 2000, 32768)
# Each switch connects its input pin to GND when you close it.
contacts = [Button(10), Button(0), Button(1)]
notes = [262, 330, 392]  # Change these pitches. One per contact.

try:
    while True:
        pitch = None
        for contact, note in zip(contacts, notes):
            if contact.is_pressed:
                pitch = note
                break  # First closed contact wins; one note at a time.
        if pitch is None:
            buzzer.off()
        else:
            buzzer.freq = pitch
            buzzer.on()
        sleep(0.01)
finally:
    buzzer.off()
`;

export function identifyBuzzerCode(test='steady'){
 if(!['steady','pitches'].includes(test))throw Error('Choose a buzzer listening test.');
 const body=test==='steady'?'    buzzer.on()\n    sleep(0.5)':`    for pitch in (500, 1000):
        buzzer.freq = pitch
        buzzer.on()
        sleep(0.4)
        buzzer.off()
        sleep(0.2)`;
 return `# Only for a small buzzer confirmed suitable for direct 3.3 V GPIO drive.
# Same wiring for both tests: + to GP9 (pin 12), - to GND (pin 13).
${soundHead(test==='steady'?'buzzer':'passive-buzzer')}
from time import sleep

try:
${body}
finally:
    buzzer.off()
    buzzer.close()
`;
}
export function namedNoteCode(pattern='note'){
 if(!['note','tune'].includes(pattern))throw Error('Choose a note or tune.');
 const tune=pattern==='tune';
 return `# Passive piezo buzzer: GP9 (pin 12) and GND (pin 13).
# Use Speaker instead of PWMBuzzer to play note names on the same buzzer.
from picozero import Speaker

buzzer = Speaker(9, duty_factor=32768)
${tune?`
tempo = 120  # Beats per minute: change this to play faster or slower.
beat = 60 / tempo
# Each pair is (note name, length in seconds). An empty name is a rest.
my_tune = [
    ("c4", beat),
    ("e4", beat / 2),
    ("g4", beat / 2),
    ("", beat),
    ("f#4", beat),
    ("c5", beat * 2),
]
`:''}
try:
    ${tune?'buzzer.play(my_tune)':'buzzer.play("c4", duration=0.5)'}
finally:
    buzzer.off()
    buzzer.close()
`;
}
