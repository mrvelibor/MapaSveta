#!/bin/sh
kill `cat /home/programi/mapasveta/pid.txt`
kill -9 `cat /home/programi/mapasveta/pid.txt`
rm /home/programi/mapasveta/pid.txt