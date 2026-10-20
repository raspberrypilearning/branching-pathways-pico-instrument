## 5I - Play with warmth

A temperature sensor changes slowly with warmth.

> [!CAUTION]
>
> First complete [1A - Connect and test your Pico](1A%20-%20Connect%20and%20test%20your%20Pico.md). You can explore this idea before wiring it.

## Step 1

> [!TASK]
>
> Gather a TMP36 sensor and three leads.
>
> Flat face towards you: left to 3V3, centre to GP28, right to GND. Keep the legs apart.
>
> ![Play with warmth wiring diagram from Skills Bricks](images/temperature-sensor-wiring.png)

## Step 2

> [!TASK]
>
> Run the [Skills Bricks code](https://raspberrypifoundation.github.io/skills-bricks/temperature-sensor/temperature-sensor-pico.html) in Thonny:
>
> ```python
> from picozero import TemperatureSensor
>
> convert = lambda voltage: (voltage - 0.5) * 100
> sensor = TemperatureSensor(28, conversion=convert)
>
> temperature = sensor.temp
> ```
>
> Add this underneath to see when your control detects an action:
>
> ```python
> print(temperature)
> if temperature > 25:
>     print("Playing action detected!")
> ```

## Test

> [!TASK]
>
> Read the room temperature, then warm the sensor gently with your fingers. Try a different action or change the number in the `if` line.

## Make it yours

Make a slowly changing sound. Choose another control too if you want; each control needs its own signal pin.
