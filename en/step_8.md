## 4A - Beeps and rhythms

Any buzzer can make a rhythm. Change the lengths of the sound and the silence.

> [!TIP]
>
Have you connected and tested an [active buzzer](3A%20-%20Active%20buzzer.md) or [passive buzzer](3B%20-%20Passive%20buzzer.md)? You can read this page first, then return to test it.

## Step 1

> [!TASK]
>
Use **one** GP9 buzzer circuit. Choose its wiring diagram:
>
> ![Active buzzer wiring](images/buzzer-wiring.png)
>
> ![Passive buzzer wiring](images/passive-buzzer-wiring.png)

## Step 2

> [!TASK]
>
Use the [Skills Bricks active-buzzer snippet](https://raspberrypifoundation.github.io/skills-bricks/buzzer/buzzer-pico.html) to start this program. For a passive buzzer, replace its first two lines with `from picozero import PWMBuzzer` and `buzzer = PWMBuzzer(9, 2000, 32768)`.
>
> ```python
> from picozero import Buzzer
> from time import sleep
>
> buzzer = Buzzer(9)
> rhythm = [(0.1, 0.15), (0.1, 0.15), (0.4, 0.5)]
>
> try:
>     for sound, silence in rhythm:
>         buzzer.on()
>         sleep(sound)
>         buzzer.off()
>         sleep(silence)
> finally:
>     buzzer.off()
> ```

## Test

> [!TASK]
>
Change one pair. Does the pattern feel different? An active buzzer keeps one pitch; a passive buzzer can change pitch on another page.
