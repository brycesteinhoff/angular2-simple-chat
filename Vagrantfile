Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.hostname = "bryce-steinhoff-chatapp"

  config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.network "private_network", ip: "192.168.10.10"

  config.vm.synced_folder "./", "/home/vagrant/ChatApp"

  config.vm.provider "virtualbox" do |vb|
    vb.name = "Bryce Steinhoff ChatApp"
    vb.memory = "2048"
    vb.gui = false
  end

  config.vm.provision "shell", path: "vagrant-provision.sh"

end
