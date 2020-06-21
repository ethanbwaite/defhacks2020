gcloud compute --project=defhacks2010 instances create defhacks-backend --zone=us-central1-a --machine-type=n1-standard-1 --subnet=default --network-tier=PREMIUM --maintenance-policy=MIGRATE --service-account=62386811955-compute@developer.gserviceaccount.com --scopes=https://www.googleapis.com/auth/cloud-platform --tags=http-server,https-server --image=debian-9-stretch-v20200420 --image-project=debian-cloud --boot-disk-size=20GB --boot-disk-type=pd-standard --boot-disk-device-name=senior-proj-prod --reservation-affinity=any
