#/bin/sh

npm install

ng version

ng build

if [ -d '../silver-root-website' ]; then
    rm -rf ../silver-root-website/*
fi

mkdir -p ../silver-root-website

if [ -d 'dist' ]; then
    mv dist/constellation/* ../silver-root-website/.
fi
