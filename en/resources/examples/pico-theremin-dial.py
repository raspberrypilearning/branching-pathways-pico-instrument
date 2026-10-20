# Pico theremin: pot. A passive buzzer changes pitch.
from picozero import Pot, PWMBuzzer
from time import sleep

buzzer = PWMBuzzer(9, 2000, 32768)
dial = Pot(26)

try:
    while True:
        pitch = int(220 + dial.value * 660)
        buzzer.freq = pitch
        buzzer.on()
        sleep(0.02)
finally:
    buzzer.off()
