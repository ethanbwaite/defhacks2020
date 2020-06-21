import firebase_admin
from Transformers import *
from typing import List, Dict, Tuple
from Models import UserModel
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud import firestore as fs

cred = credentials.Certificate('defhacks2010-firebase-adminsdk-bxhf2-1845282f87.json')

firebase_admin.initialize_app(cred)
db = firestore.client()

#users = db.collection("users")
#docs = users.stream()
#for i in docs:
	#print(f'{i.id} => {i.to_dict()}')

def PostAddNewUser(newUser: UserModel) -> str:
	doc_ref = db.collection("users").add(UserToDictTransformer(newUser))

def GetAllUsers() -> List[str]:
	users = db.collection("users").stream()
	return [user.id for user in users]

def GetUserByUUID(uuid: str) -> UserModel:
	doc_ref = db.collection("users").document(uuid).get()
	user: Dict = doc_ref.to_dict()
	return DictToUserTransformer(user)

def PhoneNumberToUUID(phone: str) -> str:
	currentUser = db.collection("users").where("Phone", "==", phone).stream()
	userId: str = [u.id for u in currentUser][0]
	return userId

def GetUserByPhoneNumber(phone: str) -> UserModel:
	currentUser = db.collection("users").where("Phone", "==", phone).stream()
	return DictToUserTransformer([u.to_dict() for u in currentUser][0])

def UpdateLastViewedRestaurant(phone: str, restaurant: str) -> None:
	currentUser = db.collection("users").document(PhoneNumberToUUID(phone))
	currentUser.update({"LastViewedRestaurant": restaurant})

def GetLastViewedRestaurant(phone: str) -> str:
	currentUser: UserModel = GetUserByPhoneNumber(phone)
	return currentUser.LastViewedRestaurant

def SaveRestaurant(phone: str, restaurant: str) -> None:
	currentUser = db.collection("users").document(PhoneNumberToUUID(phone))
	currentUser.update({"SavedRestaurant" : fs.ArrayUnion([restaurant])})

def GetAllSavedRestaurants(phone: str) -> List[str]:
	currentUser: UserModel = GetUserByPhoneNumber(phone)
	return currentUser.Saved

def IsRestaurantSaved(phone: str, restaurant: str) -> bool:
	return restaurant in GetAllSavedRestaurants(phone)

def SwipeLeft(phone: str, restaurant: str) -> None:
	currentUser = db.collection("users").document(PhoneNumberToUUID(phone))
	currentUser.update({"Left" : fs.ArrayUnion([restaurant])})

def SwipeRight(phone: str, restaurant: str) -> None:
	currentUser = db.collection("users").document(PhoneNumberToUUID(phone))
	currentUser.update({"Right" : fs.ArrayUnion([restaurant])})

def GetSwipe(phone: str, direction: str) -> List[str]:
	currentUser: UserModel = GetUserByPhoneNumber(phone)
	if direction == "left":
		return currentUser.Left
	elif direction == "right":
		return currentUser.Right

	


#PostGetAddNewUser(DictToUserTransformer({"Phone":"444", "Left":["a", "v"], "Right":["c", "w"], "LastViewedRestaurant": "b", "Saved": ["r", "rr", "vvvv"]}))
#UpdateLastViewedRestaurant("000", "hi")