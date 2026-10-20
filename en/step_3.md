## 5B - Touch a pad

A light touch can start a sound.

> [!CAUTION]
>
> First complete [1A - Connect and test your Pico](1A%20-%20Connect%20and%20test%20your%20Pico.md). You can explore this idea before wiring it.

## Step 1

> [!TASK]
>
> Gather a TTP223 touch module and three leads.
>
> SIG goes to GP17, VCC to 3V3 OUT, and GND to GND.
>
> ![Touch a pad wiring diagram from Skills Bricks](images/capacitive-touch-wiring.png)

## Step 2

> [!TASK]
>
> Run the [Skills Bricks code](https://raspberrypifoundation.github.io/skills-bricks/capacitive-touch/capacitive-touch-pico.html) in Thonny:
>
> ```python
> from picozero import TouchSensor
>
> touch = TouchSensor(17)
>
> touched = touch.is_touched
> ```
>
> Add this underneath to see when your control detects an action:
>
> ```python
> print(touched)
> if touched:
>     print("Playing action detected!")
> ```

## Test

> [!TASK]
>
> Touch and release the pad. A bare foil or thread contact uses the switch page instead. Try a different action or change the number in the `if` line.

## Make it yours

Hide the pad behind a thin covering, then test again. Choose another control too if you want; each control needs its own signal pin.
