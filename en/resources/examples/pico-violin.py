from picozero import Button, PWMBuzzer
from time import sleep

buzzer = PWMBuzzer(9, 2000, 32768)
# Keep the first switch on the Skills Bricks pin.
# GP0, GP1 and GP2 are free in the Skills Bricks Pico pin map.
contacts = [Button(10), Button(0), Button(1)]
notes = [262, 330, 392]
# Each thread goes to one contact pin. The bow goes to GND.
try:
    while True:
        pitch = None
        for thread, note in zip(contacts, notes):
            if thread.is_pressed:
                pitch = note
                break
        if pitch is None:
            buzzer.off()
        else:
            buzzer.freq = pitch
            buzzer.on()
        sleep(0.01)
finally:
    buzzer.off()
