@echo off
setlocal enabledelayedexpansion
set input_dir=criesWav
set output_dir=cries

if not exist "%output_dir%" (
    mkdir "%output_dir%"
)

for %%f in ("%input_dir%\*.wav") do (
    set input_file=%%f
    set output_file=%output_dir%\%%~nf.webm
    ffmpeg -i "!input_file!" -c:a libopus "!output_file!"
)

echo Conversion completed!
pause