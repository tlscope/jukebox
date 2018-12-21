# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/xenial64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 1337, host: 1337

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: '172.28.128.2'

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network", ip: "192.168.0.11"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder ".", "/app"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL

    # Required VM configuration, this will install:
    # nodejs 11.x, sails-cli, forever, mysql-server
    # The script will also create a mysql database and a user:
    # user: telescope / password: secret / database : jukebox

    sudo apt-get update && sudo apt-get upgrade
    curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo npm install -g sails
    sudo npm install -g forever
    sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password telescope'
    sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password telescope'
    sudo apt-get -y install mysql-server
    mysql -uroot -ptelescope -e "CREATE USER telescope IDENTIFIED BY 'secret';"
    mysql -uroot -ptelescope -e "CREATE database jukebox"
    mysql -uroot -ptelescope -e "grant all privileges on jukebox.* to telescope@'%'"
    mysql -uroot -ptelescope -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'telescope' WITH GRANT OPTION;"
    mysql -uroot -ptelescope -e "FLUSH PRIVILEGES"

    # Optional, in case you want to access the mysql server from
    # the host network, eg: bind-address: 192.168.0.66

    # sed -i -e 's/127.0.0.1/192.168.0.66/g' /etc/mysql/mysql.conf.d/mysqld.cnf
    # sudo service mysql restart

  SHELL
end
