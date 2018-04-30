#!/bin/bash

ifconfig wlan0 down

if ! ping -Q 1 -c 1 -t 1 10.7.77.77; then
    ifdown eth0
    sleep 3
    ifup eth0
fi
