## 4C - Slide between pitches

Make a passive buzzer climb, fall or wobble between pitches.

> [!TIP]
>
Have you wired and tested [3B - Passive buzzer](3B%20-%20Passive%20buzzer.md)? An active buzzer keeps its built-in pitch.

## Step 1

> [!TASK]
>
Keep the [Skills Bricks passive-buzzer circuit](https://raspberrypifoundation.github.io/skills-bricks/passive-buzzer/passive-buzzer-pico.html) on GP9 and GND.
>
> ![Passive buzzer wiring](images/passive-buzzer-wiring.png)

## Step 2

> [!TASK]
>
Start with the Skills Bricks `PWMBuzzer` lines, then change its frequency a little at a time:
>
> ```python
> from picozero import PWMBuzzer
> from time import sleep
>
> buzzer = PWMBuzzer(9, 2000, 32768)
> try:
>     buzzer.on()
>     for pitch in range(300, 1200, 20):
>         buzzer.freq = pitch
>         sleep(0.02)
> finally:
>     buzzer.off()
> ```

## Test

> [!TASK]
>
Swap `300` and `1200` and make the step negative to slide down. What happens if you change `0.02`?
