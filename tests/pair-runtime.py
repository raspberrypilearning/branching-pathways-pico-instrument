"""Exercise independent controls, sensor names, missing echoes and slow probes."""
import json, sys, types
class Finished(Exception): pass
for case in (cases := json.load(sys.stdin)):
    step = [0]
    records = []
    devices = {}
    def reading(pin):
        i = step[0]
        if pin == 10: return 1 if 20 <= i < 180 else 0
        if pin == 6: return 1 if 100 <= i < 230 else 0
        return .2 if i < 110 else .8
    class Device:
        def __init__(self, pin, *args, **kwargs):
            self.pin = pin; self.output = 0; self.freq = 2000; devices[pin] = self
        @property
        def value(self): return reading(self.pin)
        @property
        def is_pressed(self): return bool(self.value)
        @property
        def is_closed(self): return bool(self.value)
        @property
        def temp(self): return 10 if self.value < .5 else 40
        def on(self): self.output = 1
        def off(self): self.output = 0
    class Distance(Device):
        def __init__(self, echo, trigger): super().__init__(echo)
        @property
        def distance(self): return None if 120 <= step[0] < 160 else self.value
    pico = types.ModuleType('picozero')
    for name in ['Button','Switch','Pot','Buzzer','PWMBuzzer','TemperatureSensor']: setattr(pico,name,Device)
    pico.DistanceSensor=Distance; sys.modules['picozero']=pico
    def sleep(t):
        records.append((devices[9].output, devices[9].freq)); step[0] += 1
        if step[0] >= 300: raise Finished()
    clock=types.ModuleType('time');clock.sleep=sleep;clock.ticks_ms=lambda:step[0]*10;clock.ticks_diff=lambda a,b:a-b;sys.modules['time']=clock
    machine=types.ModuleType('machine');machine.Pin=lambda n:n;sys.modules['machine']=machine
    onewire=types.ModuleType('onewire');onewire.OneWire=lambda pin:pin;sys.modules['onewire']=onewire
    class Probe:
        def __init__(self,bus): pass
        def scan(self): return [1]
        def convert_temp(self): pass
        def read_temp(self,probe): return 10 if step[0] < 110 else 40
    ds=types.ModuleType('ds18x20');ds.DS18X20=Probe;sys.modules['ds18x20']=ds
    try: exec(case['code'],{})
    except Finished: pass
    assert devices[9].output == 0, ('not silenced',case)
    assert any(x[0] for x in records), ('never sounded',case)
    assert any(not x[0] for x in records), ('never quiet',case)
    if case['second']=='toggle-switch':
        for i, (output,pitch) in enumerate(records):
            first=20<=i<180;second=100<=i<230
            expected=(first or second) if case['rule']=='either' else (first and second)
            assert output == expected, (case['rule'],i,output,expected)
    if case['second']=='distance':
        assert all(records[i][0] == (case['rule']=='either') for i in range(120,160)), ('missing echo',case)
    if case['second']=='potentiometer':
        assert all(not records[i][0] for i in range(180,300)), ('gate ignored',case)
        if case['rule']=='pitch': assert records[50] == (1,352) and records[120] == (1,748), ('pitch mapping',case)
        if case['rule']=='rhythm': assert len({records[i][0] for i in range(20,180)})==2, ('no pulses',case)
    if case['sound']=='buzzer': assert {x[1] for x in records}=={2000}, ('active pitch changed',case)
    if case['first'].startswith('temperature'):
        assert not records[50][0] and records[200][0], ('slow probe/names collide',case)
print('Executed',len(cases),'two-control scenarios; independent actions, pulse, pitch, slow probes and missing readings passed.')
