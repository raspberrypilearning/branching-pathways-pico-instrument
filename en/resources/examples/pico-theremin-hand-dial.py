# Pico theremin: distance-pot. A passive buzzer changes pitch.
from picozero import DistanceSensor, Pot, PWMBuzzer
from time import sleep, ticks_ms, ticks_diff

buzzer = PWMBuzzer(9, 2000, 32768)
hand = DistanceSensor(echo=21, trigger=20)
dial = Pot(26)
beat_started = ticks_ms()

try:
    while True:
        distance = hand.distance
        if distance is None or distance > 0.6:
            buzzer.off()
            sleep(0.02)
            continue
        pitch = int(220 + (0.6 - distance) * 1000)
        control = dial.value
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
finally:
    buzzer.off()
