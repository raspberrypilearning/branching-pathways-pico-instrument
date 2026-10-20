# Each metal pan goes to its own GP pin. Foil-covered sticks go to GND.
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
