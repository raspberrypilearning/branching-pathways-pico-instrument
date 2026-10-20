"""Check generated control/sound behaviour with simulated devices and time.
These tests do not assert real circuit behaviour or replace a hardware test.
"""
import json,sys,types
class SimulationDone(Exception): pass
cases=json.load(sys.stdin)
for case in cases:
    step=[0]; devices={}; records=[]; kind=case.get('example'); duration=170
    def sample(pin=None):
        i=step[0]
        if kind in ('guitar','violin','drumkit'):
            if pin==2:return i<120
            return 20 <= i < 50 if pin==10 else 50 <= i < 80 if pin==0 else 80 <= i < 110
        if kind=='theremin':
            if pin==26:return 0.1 if i<80 else 0.9
            if pin==19:return 0.2 if i<80 else 0.5
            if pin==21:return 0.15 if i<30 else 0.35 if i<90 else 0.9
        return 0.1 if i<30 or 70<=i<110 else 0.9
    class Device:
        def __init__(self,pin,*args,**kwargs):self.pin=pin;self.output=0;self.freq=2000;devices[pin]=self
        @property
        def value(self):return sample(self.pin)
        @property
        def is_pressed(self):return bool(sample(self.pin)) if kind in ('guitar','violin','drumkit') else self.value>.5
        @property
        def is_touched(self):return self.value>.5
        @property
        def is_open(self):return self.value>.5
        @property
        def is_closed(self):return self.value>.5
        @property
        def is_active(self):return self.value>.5
        @property
        def motion_detected(self):return self.value>.5
        @property
        def temp(self):return 10 if self.value<.5 else 40
        def on(self):self.output=1
        def off(self):self.output=0
    class Distance(Device):
        def __init__(self,echo,trigger):super().__init__(echo)
        @property
        def distance(self):return None if 40<=step[0]<60 else self.value
    pico=types.ModuleType('picozero')
    for name in ['Button','Switch','TouchSensor','Pot','AnalogInputDevice','DigitalInputDevice','MotionSensor','TemperatureSensor','Buzzer','PWMBuzzer']:setattr(pico,name,Device)
    pico.DistanceSensor=Distance;sys.modules['picozero']=pico
    clock=types.ModuleType('time')
    def sleep(t):
        records.append((step[0],devices[9].output,devices[9].freq));step[0]+=1
        if step[0]>=duration:raise SimulationDone()
    clock.sleep=sleep;clock.sleep_ms=lambda ms:sleep(ms/1000);clock.ticks_ms=lambda:step[0]*10;clock.ticks_diff=lambda a,b:a-b;sys.modules['time']=clock
    machine=types.ModuleType('machine');machine.Pin=lambda n:n;sys.modules['machine']=machine
    onewire=types.ModuleType('onewire');onewire.OneWire=lambda pin:pin;sys.modules['onewire']=onewire
    class Probe:
        def __init__(self,bus):pass
        def scan(self):return [1]
        def convert_temp(self):pass
        def read_temp(self,probe):return 10 if step[0]<110 else 40
    ds=types.ModuleType('ds18x20');ds.DS18X20=Probe;sys.modules['ds18x20']=ds
    try:exec(case['code'],{})
    except SimulationDone:pass
    assert devices[9].output==0,('not silenced',case)
    assert any(r[1] for r in records),('never sounded',case)
    if case.get('mode')!='pitch':assert any(not r[1] for r in records),('never rested',case)
    if case.get('input')=='distance':assert all(r[1]==0 for r in records if 40<=r[0]<60),('missing echo',case)
    if case.get('mode')=='pitch':assert len({r[2] for r in records if r[1]})>=2,('pitch never changed',case)
    if case.get('sound')=='buzzer':assert {r[2] for r in records}=={2000},('active pitch changed',case)
    if case.get('joined'):
        for tick, output, _ in records:
            low = tick < 30 or 70 <= tick < 110
            expected = not low
            if case['input']=='ldr': expected = low
            if case['input']=='distance': expected = low and not 40 <= tick < 60
            # The probe waits for its conversion before the next output update.
            if case['input']=='temperature-probe': expected = tick >= 110
            assert bool(output)==expected,('joined rule changed',case['input'],tick,output,expected)
    if kind in ('guitar','violin'):
        expected={20:262,50:330,80:392}
        for i,pitch in expected.items():assert records[i][1:]==(1,pitch),(kind,i,records[i])
        assert records[125][1]==0,(kind,'should be quiet after release')
    if kind=='drumkit':
        assert {r[2] for r in records if r[1]}=={220,440,880},('missing drum sound',case)
        assert records[125][1]==0,('drum should stop after tapping',case)
    if kind=='theremin':
        active={r[2] for r in records if r[1]}
        assert len(active)>=2,('theremin pitch never changed',case,active)
        if case['variant']!='pot':assert all(r[1]==0 for r in records if 40<=r[0]<60),('theremin should go quiet without an echo',case)
print('Executed',len(cases),'instrument programs with simulated readings; pitch, silence, missing echo, contact notes and cleanup passed.')
