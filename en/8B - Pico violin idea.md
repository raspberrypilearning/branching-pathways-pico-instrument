## 8B - Pico violin idea

Borrow the **separate threads plus grounded bow** idea. The threads choose notes when the bow touches them.

> [!CAUTION]
>
> Have you tested a [switch](5A%20-%20Press%20or%20squeeze.md) and [passive buzzer](3B%20-%20Passive%20buzzer.md)? Return here when each works.

## Step 1

> [!TASK]
>
Make a body and bow you can hold. Fix three **separate** conductive threads to the playing surface. Put foil or conductive thread on the bow and connect it to **GND** with a flexible lead.

## Step 2

> [!TASK]
>
Each thread is one side of a Skills Bricks button-to-GND switch: thread 1 **GP10**, thread 2 **GP0**, thread 3 **GP1**. Keep the threads from touching each other or 3V3. Passive buzzer **+ → GP9**, **− → GND**.
>
> ![Button wiring from Skills Bricks](images/button-wiring.png)
>
> ![Passive buzzer wiring from Skills Bricks](images/passive-buzzer-wiring.png)

## Step 3

> [!TASK]
>
The [Skills Bricks button code](https://raspberrypifoundation.github.io/skills-bricks/button/button-pico.html) uses `Button(10)` and `is_pressed`. The complete [Pico violin program](resources/examples/pico-violin.py) repeats that reading on three pins:
>
> ```python
> if thread.is_pressed:
>     pitch = note
>     break
> ```

## Test

> [!TASK]
>
Touch each thread with the bow. Lift it for silence. If two threads touch, the first in the code list plays. Change the contact positions or sounds.
