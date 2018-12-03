#/bin/sh

npm install

ng version

ng build

if [ -d '../constellationofcare-website' ]; then
    rm -rf ../constellationofcare-website
fi

mkdir -p ../constellationofcare-website

if [ -d 'dist' ]; then
    mv dist/constellation/* ../constellationofcare-website/.
fi
