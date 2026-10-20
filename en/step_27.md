## 8C - Pico drumkit idea

Borrow the **pots and pans as switches** idea. Foil-covered chopsticks or pencils become your drumsticks. The pans clang too; the Pico adds electronic sounds.

> [!CAUTION]
>
> Have you tested a [switch](5A%20-%20Press%20or%20squeeze.md) and [passive buzzer](3B%20-%20Passive%20buzzer.md)? Return here when each works.

## Step 1

> [!TASK]
>
Arrange three metal pots or pans so they do not touch. Cover each stick tip with foil and connect both foil tips to **GND** using flexible leads. Use clean, cool, dry pans; keep the Pico away from food and water.

## Step 2

> [!TASK]
>
Each pan is a separate Skills Bricks button-to-GND switch: pan 1 **GP10**, pan 2 **GP0**, pan 3 **GP1**. A foil stick touches a pan to close its switch. Passive buzzer **+ → GP9**, **− → GND**. Exposed metal goes only to GP inputs or GND, never 3V3.
>
> ![Button wiring from Skills Bricks](images/button-wiring.png)
>
> ![Passive buzzer wiring from Skills Bricks](images/passive-buzzer-wiring.png)

## Step 3

> [!TASK]
>
The [Skills Bricks button snippet](https://raspberrypifoundation.github.io/skills-bricks/button/button-pico.html) reads `button.is_pressed`. The complete [Pico drumkit program](resources/examples/pico-drumkit.py) plays once when a stick first touches a pan:
>
> ```python
> if touching and not was_touching[i]:
>     buzzer.freq = pitches[i]
>     buzzer.on()
> ```

## Test

> [!TASK]
>
Tap each pan, then lift the stick. If a coated pan does not make contact, add a foil patch. Change the pitches, sound lengths or number of pans.
