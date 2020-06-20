from flask import Flask, request

app = Flask(__name__)


@app.route('/user', methods=['GET', 'POST'])
def user():
    if request.method == "GET":
        return get_all_users()
    elif request.method == "POST":
        create_user(request.json)


@app.route('/user/<string:uid>')
def get_user(uid):
    return get_user(uid)


@app.route('/restaurant/last/<string:uid>', methods=['GET', 'PATCH'])
def last_restaurant(uid):
    if request.method == "GET":
        return get_last_restaurant(uid)
    elif request.method == "PATCH":
        change_last_restaurant(uid, request.json)


@app.route('/restaurant/saved/<string:uid>', methods=["GET", "POST", "DELETE"])
def saved_restaurant():
    if request.method == "GET":
        return get_saved_restaurants(uid)
    if request.method == "POST":
        add_saved_restaurant(uid, request.json)
    elif request.method == "DELETE":
        delete_save_restaurant(uid, request.json)

@app.route('/left/<string:uid>', methods=["POST"])
def dislike_restaurant():
    add_diskliked_restaurant(request.json)


@app.route('/right/<string:uid>', methods=["POST"])
def meh_restaurant():
    add_meh_restaurant(request.json)
