curpid=$(pgrep python3)
kill curpid
sudo service nginx stop
rm -rf ~/prod
rm -rf ~/defhacks2020
mkdir prod
git clone --single-branch --branch backend_eric git@github.com:warthogs32/defhacks2020.git
cp -r defhacks2020/backend/* ~/prod
cp defhacks2010-firebase-adminsdk-bxhf2-1845282f87.json ~/prod
sudo service nginx start
nohup python3.7 ~/prod/UserController.py 2<&1 &
