# Pico theremin: distance. A passive buzzer changes pitch.
from picozero import DistanceSensor, PWMBuzzer
from time import sleep

buzzer = PWMBuzzer(9, 2000, 32768)
hand = DistanceSensor(echo=21, trigger=20)

try:
    while True:
        distance = hand.distance
        if distance is None or distance > 0.6:
            buzzer.off()
            sleep(0.02)
            continue
        pitch = int(220 + (0.6 - distance) * 1000)
        buzzer.freq = pitch
        buzzer.on()
        sleep(0.02)
finally:
    buzzer.off()
