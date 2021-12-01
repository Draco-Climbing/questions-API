sudo yum update 
sudo yum install git
sudo amazon-linux-extras install docker
# sudo yum install docker

git clone https://github.com/Draco-Climbing/questions-API.git

# Install docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
# sudo mv /usr/local/bin/docker-compose /usr/local/bin/docker-compose
docker-compose version

#start docker
sudo service docker start
sudo usermod -a -G docker ec2-user
