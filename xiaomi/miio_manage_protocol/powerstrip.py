#!/usr/bin/python3.6

from miio import PowerStrip

# print(PowerStrip)

dev = PowerStrip("10.7.77.112", "d0f492f12836afc3470d74151293ae58")

# print(dev)

print(dev.status())

# dev.set_wifi_led(True)

# dev.on()
