#!/usr/bin/env bash

echo "--- Running vagrant-provision.sh ---"

echo "--- Updating apt ---"
sudo apt-get update

echo "--- Installing git ---"
sudo apt-get install -y git

echo "--- Installing n (Node version management) ---"
n_directory="/opt/n"
sudo git clone https://github.com/tj/n.git $n_directory
cd $n_directory
sudo make install

echo "--- Installing node.js and npm using n ---"
node_version="5.7.1"
sudo n -q $node_version
