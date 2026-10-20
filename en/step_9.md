## 4B - Play named notes

The **passive** buzzer can play note names such as `"c4"`, `"f#4"` and `"c5"`. Play notes one at a time; `""` makes a rest.

> [!TIP]
>
Have you wired and tested [3B - Passive buzzer](3B%20-%20Passive%20buzzer.md)? An active buzzer cannot play different pitches.

## Step 1

> [!TASK]
>
Keep the passive buzzer on GP9 and GND, as in the [Skills Bricks diagram](https://raspberrypifoundation.github.io/skills-bricks/passive-buzzer/passive-buzzer-pico.html).
>
> ![Passive buzzer wiring](images/passive-buzzer-wiring.png)

## Step 2

> [!TASK]
>
The Skills Bricks snippet starts with `PWMBuzzer(9, 2000, 32768)`. For note **names**, use `Speaker` on the same GP9 circuit **instead**:
>
> ```python
> from picozero import Speaker
>
> buzzer = Speaker(9, duty_factor=32768)
> try:
>     buzzer.play("c4", duration=0.5)
> finally:
>     buzzer.off()
>     buzzer.close()
> ```
>
> Do not create `Speaker` and `PWMBuzzer` on GP9 at the same time.

## Test

> [!TASK]
>
Change `"c4"` to `"g4"`, then `"c5"`. Which note do you prefer? Try these groups **one note at a time**:
>
> - Bright fanfare: `"c4"`, `"e4"`, `"g4"`, `"c5"`
> - Gentle folk/pop: `"c4"`, `"d4"`, `"e4"`, `"g4"`, `"a4"`
> - Dramatic game theme: `"c4"`, `"d#4"`, `"g4"`, `"c5"`
> - Bluesy riff: `"a3"`, `"c4"`, `"d4"`, `"d#4"`, `"e4"`, `"g4"`
> - Dreamy sound: `"c4"`, `"d4"`, `"e4"`, `"f#4"`, `"g#4"`, `"a#4"`

Try a new order or length. The style labels are ideas, not rules.
