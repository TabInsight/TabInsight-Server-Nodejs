#!/bin/bash

sudo apt-get update

#setup nodejs
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g express-generator
sudo apt-get install nodejs-legacy
sudo npm install -g forever

#setup app
mkdir /opt/tabinsight-server-v2
cp -r ./app /opt/tabinsight-server-v2
sudo chmod -R 755 /opt/tabinsight-server-v2
cd /opt/tabinsight-server-v2/app
npm install

#setting up forever to keep the app running
forever start  /opt/tabinsight-server-v2/app/bin/www
#forever stop /opt/tabinsight-server-v2/app/app.js
sudo touch /etc/init/tabinsight-server-v2.conf
sudo echo "start on startup" >>/etc/init/tabinsight-server-v2.conf
sudo echo "/opt/tabinsight-server-v2/app/bin/www" >>/etc/init/tabinsight-server-v2.conf
