from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/user', methods=['GET', 'POST'])
def get_user():
    pass


@app.route('/restaurant/last', methods=['GET', 'PATCH'])
def last_restaurant():
    pass


@app.route('/restaurant/saved', methods=["GET", "POST"])
def save_restaurant():
    pass


@app.route('/left')
def dislike_restaurant():
    pass


@app.route('/right')
def meh_restaurant():
    pass
