## 5C - Turn a dial

A dial can bend pitch or change the speed of a rhythm.

> [!CAUTION]
>
> First complete [1A - Connect and test your Pico](1A%20-%20Connect%20and%20test%20your%20Pico.md). You can explore this idea before wiring it.

## Step 1

> [!TASK]
>
> Gather a 10 kΩ potentiometer and three leads.
>
> One end goes to GND, the middle to GP26, and the other end to 3V3 OUT. Check your dial’s leg order.
>
> ![Turn a dial wiring diagram from Skills Bricks](images/potentiometer-wiring.png)

## Step 2

> [!TASK]
>
> Run the [Skills Bricks code](https://raspberrypifoundation.github.io/skills-bricks/potentiometer/potentiometer-pico.html) in Thonny:
>
> ```python
> from picozero import Pot
>
> pot = Pot(26)
>
> setting = pot.value
> ```
>
> Add this underneath to see when your control detects an action:
>
> ```python
> print(setting)
> if setting > 0.5:
>     print("Playing action detected!")
> ```

## Test

> [!TASK]
>
> Turn gently. Run again at different positions; the value should move between about 0 and 1. Try a different action or change the number in the `if` line.

## Make it yours

Give the dial pitch, speed or another job. Choose another control too if you want; each control needs its own signal pin.
