case $1 in

mongo)
  scp -i hackreact.pem ./init.sh ec2-user@ec2-18-119-161-215.us-east-2.compute.amazonaws.com:~/init.sh
  ssh -i hackreact.pem ec2-user@ec2-18-119-161-215.us-east-2.compute.amazonaws.com

node)
  scp -i hackreact.pem ./init.sh ec2-user@ec2-52-15-209-146.us-east-2.compute.amazonaws.com:~/init.sh
  ssh -i hackreact.pem ec2-user@ec2-52-15-209-146.us-east-2.compute.amazonaws.com
  ;;
esac