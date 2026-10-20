## 5F - Tip or rock it

A tilt switch notices when you rock the body.

> [!CAUTION]
>
> First complete [1A - Connect and test your Pico](1A%20-%20Connect%20and%20test%20your%20Pico.md). You can explore this idea before wiring it.

## Step 1

> [!TASK]
>
> Gather a ball tilt switch and two leads.
>
> Connect GP8 through the switch to GND.
>
> ![Tip or rock it wiring diagram from Skills Bricks](images/tilt-switch-wiring.png)

## Step 2

> [!TASK]
>
> Run the [Skills Bricks code](https://raspberrypifoundation.github.io/skills-bricks/tilt-switch/tilt-switch-pico.html) in Thonny:
>
> ```python
> from picozero import Switch
>
> tilt = Switch(8)
>
> tilted = tilt.is_open
> ```
>
> Add this underneath to see when your control detects an action:
>
> ```python
> print(tilted)
> if tilted:
>     print("Playing action detected!")
> ```

## Test

> [!TASK]
>
> Tip slowly. The reading may flicker while the ball rolls. Try a different action or change the number in the `if` line.

## Make it yours

Make a rocking instrument or a sound creature. Choose another control too if you want; each control needs its own signal pin.
