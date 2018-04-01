#/bin/sh

npm update

ng version

ng build --dev

if [ -d '../constellationofcare-website' ]; then
    rm -rf ../constellationofcare-website/*
fi

mkdir ../constellationofcare-website

if [ -d 'dist' ]; then
    mv dist/* ../constellationofcare-website/.
fi
