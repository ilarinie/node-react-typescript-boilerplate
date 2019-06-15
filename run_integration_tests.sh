#!/bin/bash
{ npm run dev; } &
{ $(npm bin)/cypress run; } &
wait
pkill -P $$