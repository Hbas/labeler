#!/bin/sh

## Utilities  ##
apt-get update
apt-get install -y git-core curl build-essential openssl libssl-dev gcc make g++ libkrb5-dev

## Node and npm ##
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs

## Mongo  ##
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y --force-yes mongodb-org
echo "LANGUAGE=en_US" >> /etc/default/locale
echo "LC_ALL=en_US.UTF-8" >> /etc/default/locale

## nodemon ##
npm i -g nodemon
npm i -g grunt-cli

## Install app packages ##
cd /vagrant
rm -r node_modules
rm npm-debug.log
npm install --no-bin-links
