## 3A - Active buzzer

An **active** buzzer has a built-in oscillator. It makes one pitch; you choose its rhythm and length. It cannot play different notes. Look for *active* or *built-in oscillator* on the packet.

> [!CAUTION]
>
> First complete [1A - Connect and test your Pico](1A%20-%20Connect%20and%20test%20your%20Pico.md). Unplug before wiring.

## Step 1

> [!TASK]
>
Use a small 3.3 V GPIO-compatible active buzzer. Connect **+ to GP9** (physical pin 12) and **− to GND**.
>
> ![Active buzzer wiring from Skills Bricks](images/buzzer-wiring.png)

## Step 2

> [!TASK]
>
Try the [Skills Bricks code](https://raspberrypifoundation.github.io/skills-bricks/buzzer/buzzer-pico.html):
>
> ```python
> from picozero import Buzzer
>
> buzzer = Buzzer(9)
>
> buzzer.on()
> ```
>
> Add these lines underneath so the test stops by itself:
>
> ```python
> from time import sleep
> sleep(0.25)
> buzzer.off()
> ```

## Test

> [!TASK]
>
Did you hear a steady beep? If it stayed silent, check the + and − connections. If its pitch changes when you change a number, you probably have a **passive** buzzer; try [3B](3B%20-%20Passive%20buzzer.md).

Try [beeps and rhythms](4A%20-%20Beeps%20and%20rhythms.md) next, or choose a control first.
