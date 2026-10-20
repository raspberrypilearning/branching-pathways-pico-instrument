## 6A - Try one control

Finish this rule: **When I …, the buzzer …**. A control can start a sound, stop it or change it.

> [!CAUTION]
>
> Have you tested your chosen control and buzzer separately? If not, return to their pages in groups 5 and 3, then come back. The code below uses a [button](5A%20-%20Press%20or%20squeeze.md) and [passive buzzer](3B%20-%20Passive%20buzzer.md) as one example; your instrument can use other parts.

## Step 1

> [!TASK]
>
Join the Skills Bricks button and passive-buzzer circuits. **GP10 → switch → GND**; buzzer **+ → GP9**, **− → GND**. Unplug the Pico before wiring.
>
> ![Button wiring from Skills Bricks](images/button-wiring.png)
>
> ![Passive buzzer wiring from Skills Bricks](images/passive-buzzer-wiring.png)

## Step 2

> [!TASK]
>
The [button](https://raspberrypifoundation.github.io/skills-bricks/button/button-pico.html) and [passive buzzer](https://raspberrypifoundation.github.io/skills-bricks/passive-buzzer/passive-buzzer-pico.html) snippets supply these first lines. Add the `if` rule beneath them:
>
> ```python
> from picozero import Button, PWMBuzzer
> from time import sleep
>
> button = Button(10)
> buzzer = PWMBuzzer(9, 2000, 32768)
>
> try:
>     while True:
>         if button.is_pressed:
>             buzzer.on()
>         else:
>             buzzer.off()
>         sleep(0.01)
> finally:
>     buzzer.off()
> ```

## Test

> [!TASK]
>
Press and release. Does the sound follow your action? Try your own rule. For a dial, for example, replace the button with `Pot(26)` and test `if pot.value > 0.5:`. A distance sensor can use `if distance is not None and distance < 0.3:`.

An **active** buzzer also works for on/off: replace `PWMBuzzer(9, 2000, 32768)` with `Buzzer(9)` and import `Buzzer` instead. It cannot change pitch.
