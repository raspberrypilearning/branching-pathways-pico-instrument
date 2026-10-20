## 6C - Put contacts wherever you want

A button, two pieces of foil or conductive thread can all make a switch. Put contacts where they suit **your** playing movement.

> [!TIP]
>
Have you tested one [button or homemade switch](5A%20-%20Press%20or%20squeeze.md) and a [passive buzzer](3B%20-%20Passive%20buzzer.md)? Repeat the switch circuit only after that first test works.

## Step 1

> [!TASK]
>
Make three separate switches. Follow the Skills Bricks button diagram each time, changing the signal pin: contact 1 **GP10**, contact 2 **GP0**, contact 3 **GP1**. Each switch's other side goes to **GND**. Keep all exposed contacts away from 3V3. Buzzer **+ → GP9**, **− → GND**.
>
> ![Button-to-GND switch wiring](images/button-wiring.png)
>
> ![Passive buzzer wiring](images/passive-buzzer-wiring.png)

## Step 2

> [!TASK]
>
The [Skills Bricks button snippet](https://raspberrypifoundation.github.io/skills-bricks/button/button-pico.html) starts with `Button(10)`. Repeat it on the other pins and choose a note for each:
>
> ```python
> from picozero import Button, PWMBuzzer
> from time import sleep
>
> contacts = [Button(10), Button(0), Button(1)]
> notes = [262, 330, 392]
> buzzer = PWMBuzzer(9, 2000, 32768)
>
> try:
>     while True:
>         pitch = None
>         for contact, note in zip(contacts, notes):
>             if contact.is_pressed:
>                 pitch = note
>                 break
>         if pitch is None:
>             buzzer.off()
>         else:
>             buzzer.freq = pitch
>             buzzer.on()
>         sleep(0.01)
> finally:
>     buzzer.off()
> ```

## Test

> [!TASK]
>
Try each contact. Change the three pitch numbers or the contact positions. If two contacts close together, the first in the list plays.
