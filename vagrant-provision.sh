#!/usr/bin/env bash

# Some provisioning variables
node_version="5.7.1"
n_directory="/opt/n"
app_directory="/home/vagrant/angular2-simple-chat"

echo "--- Running vagrant-provision.sh ---"

echo "--- Updating apt ---"
sudo apt-get update

echo "--- Installing git ---"
sudo apt-get install -y git

echo "--- Installing n (Node version management) ---"
sudo git clone https://github.com/tj/n.git $n_directory
cd $n_directory
sudo make install

echo "--- Installing node.js and npm using n ---"
sudo n -q $node_version

echo "--- Installing MongoDB ---"
# Resource: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04
# Import MongoDB repo key
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
# Add MongoDB repo to apt
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
echo "Updating apt"
sudo apt-get update
# Install MongoDB
sudo apt-get install -y mongodb-org

echo "--- Installing app dependencies (npm install) ---"
echo "This could take a while..."
cd $app_directory
sudo npm install

echo "--- Installing webpack globally ---"
sudo npm install --global webpack

echo "--- Bundling app ---"
sudo npm run webpack:prod