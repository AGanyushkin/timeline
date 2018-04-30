#!/bin/bash

rm -f *.jpg
rm -f *.png

# ffmpeg -ss 00:00:00 -i input.mp4 -vframes 1 -q:v 1 output3.jpg

# get first frame
ffmpeg -ss 00:00:00 -i input.mp4 -vframes 1 output1.png

# get last frame
# https://stackoverflow.com/questions/5248283/dump-last-frame-of-video-file-using-ffmpeg-mencoder-transcode-et-al
ffprobe -show_streams input.mp4 2> /dev/null | grep nb_frames | head -1 | cut -d \= -f 2
ffmpeg -i input.mp4 -vf select=\'eq\(n,166345\) -vframes 1 output2.png

# duration 
# https://superuser.com/questions/650291/how-to-get-video-duration-in-seconds
ffmpeg -i input.mp4 2>&1 | grep "Duration"

