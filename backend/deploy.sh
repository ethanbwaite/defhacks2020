sudo service nginx start
rm -rf ~/prod
rm -rf ~/defhacks2020
mkdir prod
git clone --single-branch --branch backend_eric git@github.com:warthogs32/defhacks2020.git
cp -r defhacks2020/backend/* ~/prod
sudo service nginx start
python3.7 ~/prod/UserController.py