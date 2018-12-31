#!/bin/bash
pid_file="./database/pid.txt"

# If file exists
if [[ -f "$pid_file" ]]
then
  while read PID;
    do
      kill $PID
    done < $pid_file
fi
