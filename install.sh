#/bin/sh

npm update

ng version

ng build --dev

if [ -d '../constellationofcare-website' ]; then
    rm -rf ../constellationofcare-website/*
fi

if [ -d 'dist' ]; then
    mv dist/* ../constellationofcare-website/.
fi
