case $1 in

mongo)
  scp -i "sdc-key-pair.pem" ./init.sh ec2-user@ec2-18-118-134-237.us-east-2.compute.amazonaws.com:~/init.sh
  scp -i "sdc-key-pair.pem" ./data/*.csv ec2-user@ec2-18-118-134-237.us-east-2.compute.amazonaws.com:~/questions-API/data/
  ssh -i sdc-key-pair.pem ec2-user@ec2-18-118-134-237.us-east-2.compute.amazonaws.com
  ;;
node)
  scp -i "sdc-key-pair.pem" ./init.sh ec2-user@ec2-3-19-219-97.us-east-2.compute.amazonaws.com:~/init.sh
  ssh -i "sdc-key-pair.pem" ec2-user@ec2-3-19-219-97.us-east-2.compute.amazonaws.com
  ;;
esac