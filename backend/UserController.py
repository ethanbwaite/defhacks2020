from flask import Flask, request, jsonify
from Transformers import *
from Models import UserModel
from typing import List, Dict, Tuple
import UserRepository as UserRepo

app = Flask(__name__)


@app.route('/user', methods=['GET', 'POST'])
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
def GetUserByUUID(uid):
    return UserToDictTransformer(UserRepo.GetUserByUUID(uid))

@app.route('/user/phone/<string:phone>')
def GetUserByPhone(phone):
    return UserToDictTransformer(UserRepo.GetUserByPhoneNumber(phone))

@app.route('/restaurant/last/<string:phone>', methods=['GET'])
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
def PutUpdateLastViewedRestaurant():
    try:
        UserRepo.UpdateLastViewedRestaurant(request.json["Phone"], request.json["LastViewedRestaurant"])
        return jsonify(True)
    except:
        return jsonify(False)

@app.route('/restaurant/get_all_saved_restaurants/<string:phone>', methods=['GET'])
def GetAllSavedRestaurants(phone):
    return jsonify(UserRepo.GetAllSavedRestaurants(phone))

@app.route('/restaurant/left', methods=['PUT'])
def PutSwipeLeft():
    try:
        UserRepo.SwipeLeft(request.json["Phone"], request.json["Restaurant"])
        return jsonify(True)
    except:
        return jsonify(False)

@app.route('/restaurant/right', methods=['PUT'])
def PutSwipeRight():
    try:
        UserRepo.SwipeRight(request.json["Phone"], request.json["Restaurant"])
        return jsonify(True)
    except:
        return jsonify(False)

@app.route('/restaurant/get_left_swipes/<string:phone>', methods=['GET'])
def GetLeftSwipes(phone):
    return jsonify(UserRepo.GetSwipe(phone, "left"))

@app.route('/restaurant/get_right_swipes/<string:phone>', methods=['GET'])
def GetRightSwipes(phone):
    return jsonify(UserRepo.GetSwipe(phone, "right"))


if __name__ == "__main__":
    app.run()