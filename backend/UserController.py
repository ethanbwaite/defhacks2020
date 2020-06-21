from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from Transformers import *
from Models import UserModel
from typing import List, Dict, Tuple
import UserRepository as UserRepo

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/user', methods=['GET', 'POST'])
@cross_origin()
def User():
    if request.method == "GET":
        return jsonify(UserRepo.GetAllUsers())
    elif request.method == "POST":
        user: UserModel = DictToUserTransformer(request.json)
        try:
            UserRepo.PostAddNewUser(user)
            return jsonify(True)
        except:
            return jsonify(False)


@app.route('/user/id/<string:uid>')
@cross_origin()
def GetUserByUUID(uid):
    return UserToDictTransformer(UserRepo.GetUserByUUID(uid))

@app.route('/user/phone/<string:phone>')
@cross_origin()
def GetUserByPhone(phone):
    return UserToDictTransformer(UserRepo.GetUserByPhoneNumber(phone))

@app.route('/restaurant/last/<string:phone>', methods=['GET'])
@cross_origin()
def GetLastViewedRestaurant(phone):
    if request.method == "GET":
        return jsonify(UserRepo.GetLastViewedRestaurant(phone))
    elif request.method == "PUT":
        try:
            UserRepo.UpdateLastViewedRestaurant(request.json["Phone"], request.json["Phone"])
            return jsonify(True)
        except:
            return jsonify(False)

@app.route('/restaurant/add_last', methods=['PUT'])
@cross_origin()
def PutUpdateLastViewedRestaurant():
    try:
        UserRepo.UpdateLastViewedRestaurant(request.json["Phone"], request.json["LastViewedRestaurant"])
        return jsonify(True)
    except:
        return jsonify(False)

@app.route('/restaurant/get_all_saved_restaurants/<string:phone>', methods=['GET'])
@cross_origin()
def GetAllSavedRestaurants(phone):
    return jsonify(UserRepo.GetAllSavedRestaurants(phone))

@app.route('/restaurant/left', methods=['PUT'])
@cross_origin()
def PutSwipeLeft():
    try:
        UserRepo.SwipeLeft(request.json["Phone"], request.json["Restaurant"])
        return jsonify(True)
    except:
        return jsonify(False)

@app.route('/restaurant/right', methods=['PUT'])
@cross_origin()
def PutSwipeRight():
    try:
        UserRepo.SwipeRight(request.json["Phone"], request.json["Restaurant"])
        return jsonify(True)
    except:
        return jsonify(False)

@app.route('/restaurant/get_left_swipes/<string:phone>', methods=['GET'])
@cross_origin()
def GetLeftSwipes(phone):
    return jsonify(UserRepo.GetSwipe(phone, "left"))

@app.route('/restaurant/get_right_swipes/<string:phone>', methods=['GET'])
@cross_origin()
def GetRightSwipes(phone):
    return jsonify(UserRepo.GetSwipe(phone, "right"))


if __name__ == "__main__":
    app.run()