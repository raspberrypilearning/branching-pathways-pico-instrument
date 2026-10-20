## 8A - Pico guitar idea

Borrow the **frets plus a pick switch** idea. Your body, notes and playing movement can be different.

> [!TIP]
>
Have you tested a [switch](5A%20-%20Press%20or%20squeeze.md) and [passive buzzer](3B%20-%20Passive%20buzzer.md)? Return here when each works.

## Step 1

> [!TASK]
>
Try a card body and neck. Put three firm buttons along it. A foil patch on the body connects to **GP2**; foil on your pick connects to **GND** with a flexible lead. Touching them closes the pick switch.

## Step 2

> [!TASK]
>
Repeat the Skills Bricks button-to-GND circuit: fret 1 **GP10**, fret 2 **GP0**, fret 3 **GP1**. The other side of every button goes to **GND**. Passive buzzer **+ → GP9**, **− → GND**. Keep the foil away from 3V3.
>
> ![Button wiring from Skills Bricks](images/button-wiring.png)
>
> ![Passive buzzer wiring from Skills Bricks](images/passive-buzzer-wiring.png)

## Step 3

> [!TASK]
>
The [Skills Bricks button code](https://raspberrypifoundation.github.io/skills-bricks/button/button-pico.html) begins `button = Button(10)`. Repeat that idea for each fret and the pick. The complete [Pico guitar program](resources/examples/pico-guitar.py) uses this rule:
>
> ```python
> if pick.is_pressed:
>     buzzer.freq = pitch
>     buzzer.on()
> else:
>     buzzer.off()
> ```

## Test

> [!TASK]
>
Hold a fret and touch the pick to the body. Try the open note with no fret held. Change the notes or shape to make the idea yours.
