#!/bin/sh

## Utilities  ##
apt-get update
apt-get install -y git-core curl build-essential openssl libssl-dev gcc make g++ libkrb5-dev

## Node and npm ##
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs

## Mongo  ##
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
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
