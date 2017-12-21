#!/bin/sh
cp MapaSveta-Backend/target/mapasveta-0.0.1-SNAPSHOT.jar /home/programi/mapasveta/mapasveta.jar
cd /home/programi/mapasveta/
nohup java -jar mapasveta.jar > mapa.log 2>&1 &
echo $! > pid.txt