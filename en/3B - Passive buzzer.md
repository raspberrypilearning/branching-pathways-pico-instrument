## 3B - Passive buzzer

A **passive** buzzer needs a changing signal. You can change its pitch as well as its rhythm. Look for *passive* or *external drive* on the packet. On [4B - Play named notes](4B%20-%20Play%20named%20notes.md), picozero's `Speaker` lets you write `"c4"` instead of a frequency such as `262`.

> [!TIP]
>
First complete [1A - Connect and test your Pico](1A%20-%20Connect%20and%20test%20your%20Pico.md). Use only one buzzer on GP9 at a time.

## Step 1

> [!TASK]
>
Use a small 3.3 V GPIO-compatible passive piezo buzzer. Connect **+ to GP9** (physical pin 12) and **− to GND**.
>
> ![Passive buzzer wiring from Skills Bricks](images/passive-buzzer-wiring.png)

## Step 2

> [!TASK]
>
Try the [Skills Bricks code](https://raspberrypifoundation.github.io/skills-bricks/passive-buzzer/passive-buzzer-pico.html):
>
> ```python
> from picozero import PWMBuzzer
>
> # GP9, 2000 Hz, 50% duty
> buzzer = PWMBuzzer(9, 2000, 32768)
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
Did you hear a steady tone? Put `buzzer.freq = 440` **before** `buzzer.on()`, then run it again. If the pitch does not change, check whether your part is an [active buzzer](3A%20-%20Active%20buzzer.md).

Next, try [named notes](4B%20-%20Play%20named%20notes.md), a [pitch slide](4C%20-%20Slide%20between%20pitches.md), or any control.
