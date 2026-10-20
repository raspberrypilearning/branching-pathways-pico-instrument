## 5E - Play in the air

Move your hand without touching the instrument.

> [!CAUTION]
>
> First complete [1A - Connect and test your Pico](1A%20-%20Connect%20and%20test%20your%20Pico.md). You can explore this idea before wiring it.

## Step 1

> [!TASK]
>
> Gather a 3.3 V-compatible HC-SR04P ultrasonic sensor and four leads.
>
> Trig goes to GP20, Echo to GP21, VCC to 3V3 OUT and GND to GND. Use the HC-SR04P, not a 5 V Echo module.
>
> ![Play in the air wiring diagram from Skills Bricks](images/distance-wiring.png)

## Step 2

> [!TASK]
>
> Run the [Skills Bricks code](https://raspberrypifoundation.github.io/skills-bricks/distance/distance-pico.html) in Thonny:
>
> ```python
> from picozero import DistanceSensor
>
> sensor = DistanceSensor(
>     echo=21, trigger=20
> )
>
> distance = sensor.distance
> ```
>
> Add this underneath to see when your control detects an action:
>
> ```python
> print(distance)
> if distance is not None and distance < 0.3:
>     print("Playing action detected!")
> ```

## Test

> [!TASK]
>
> Move your hand in front of the two round parts. The number is metres; None means no echo. Try a different action or change the number in the `if` line.

## Make it yours

Make different spaces play different notes. Choose another control too if you want; each control needs its own signal pin.
