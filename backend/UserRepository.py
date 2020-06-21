import firebase_admin
from Transformers import *
from typing import List, Dict, Tuple
from Models import UserModel
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('defhacks2010-firebase-adminsdk-bxhf2-1845282f87.json')

firebase_admin.initialize_app(cred)
db = firestore.client()

#users = db.collection("users")
#docs = users.stream()
#for i in docs:
	#print(f'{i.id} => {i.to_dict()}')

def PostGetAddNewUser(newUser: UserModel) -> str:
	doc_ref = db.collection("users").add(UserToDictTransformer(newUser))

def GetAllUsers() -> List[str]:
	users = db.collection("users").stream()
	return [user.id for user in users]

def GetUserByUUID(uuid: str) -> UserModel:
	doc_ref = db.collection("users").document(uuid).get()
	user: Dict = doc_ref.to_dict()
	return DictToUserTransformer(user)

def GetUserByPhoneNumber(phone: str) -> UserModel:
	user = db.collection("users").where("Phone", "==", phone).stream()
	return DictToUserTransformer([u.to_dict() for u in user][0])

PostGetAddNewUser(DictToUserTransformer({"Phone":"444", "Left":["a", "v"], "Right":["c", "w"], "LastViewedRestaurant": "b", "Saved": ["r", "rr", "vvvv"]}))