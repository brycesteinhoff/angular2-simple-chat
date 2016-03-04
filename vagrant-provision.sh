#!/usr/bin/env bash

# Some provisioning variables
node_version="5.7.1"
n_directory="/opt/n"
app_directory="/home/vagrant/ChatApp"

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

echo "--- Running npm install ---"
cd $app_directory
npm install
