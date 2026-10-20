## 6A - Connect a control and sound

Your control can detect an action. Your buzzer can make a sound. **Now join their test scripts with a rule.**

> [!CAUTION]
>
> Have your control and buzzer both worked on their own? Their pages have quick tests if you need them. You can explore the code now; no extra step is locked.
>
> Unplug before joining circuits. Give each signal its own GP pin; the circuits share GND.

## Join your scripts

Save copies of both tests. Make the combined program in `instrument.py`:

- Keep the imports and component setup from both tests at the top.
- Inside `while True:`, read your control again, including any conversion or wait lines.
- Under its `if` line, replace the test message with `buzzer.on()`.
- Under `else:`, use `buzzer.off()`. Keep the loop’s short pause.

Remove the buzzer’s separate test run. Your rule now starts and stops it. Keep any pins or settings you changed while testing.

## An example to adapt

These [button](5A%20-%20Press%20or%20squeeze.md) and [passive buzzer](3B%20-%20Passive%20buzzer.md) circuits use GP10 and GP9. Use your own components’ diagrams and code in the same way.

![Button wiring from Skills Bricks](images/button-wiring.png)

![Passive buzzer wiring from Skills Bricks](images/passive-buzzer-wiring.png)

```python
# Imports and setup from both tests
from picozero import Button, PWMBuzzer
from time import sleep

button = Button(10)
buzzer = PWMBuzzer(9, 2000, 32768)

try:
    while True:
        # Keep reading your control
        pressed = button.is_pressed
        if pressed:
            buzzer.on()
        else:
            buzzer.off()
        sleep(0.1)
finally:
    buzzer.off()
```

For an active buzzer, use `Buzzer(9)` and import `Buzzer` instead of `PWMBuzzer`. It uses the same on/off commands.

## Test

Try your playing action, then stop. Does the sound follow your rule? Change the `if` line, a note or the timing to make it yours.
