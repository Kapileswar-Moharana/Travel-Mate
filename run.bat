@echo off
echo Starting backend...
start cmd /k "cd /d %~dp0backend && yarn && yarn start-dev"

echo Starting frontend...
start cmd /k "cd /d %~dp0frontend && yarn && yarn dev"

