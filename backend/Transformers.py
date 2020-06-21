from typing import Dict
from Models import UserModel
def DictToUserTransformer(userDict: Dict) -> UserModel:
	currentUser: UserModel = UserModel()
	currentUser.Phone = userDict["Phone"]
	currentUser.LastViewedRestaurant = userDict["LastViewedRestaurant"]
	currentUser.Left = userDict["Left"]
	currentUser.Right = userDict["Right"]
	currentUser.Saved = userDict["Saved"]
	return currentUser

def UserToDictTransformer(currentUser: UserModel) -> Dict:
	return {"Phone": currentUser.Phone, "LastViewedRestaurant": currentUser.LastViewedRestaurant, "Left": currentUser.Left, \
	    "Right": currentUser.Right, "Saved": currentUser.Saved}