from flask import jsonify
from functools import lru_cache
from google.cloud.client import Client

class SingletonMetaClass(type):
    def __init__(cls,name,bases,dict):
        super(SingletonMetaClass,cls)\
          .__init__(name,bases,dict)
        original_new = cls.__new__
        def my_new(cls,*args,**kwds):
            if cls.instance == None:
                cls.instance = \
                  original_new(cls,*args,**kwds)
            return cls.instance
        cls.instance = None
        cls.__new__ = staticmethod(my_new)



class Repo(object):
    __metaclass__ = SingletonMetaClass

    def __init__(self, val):
        self.val = val
        self.client = self.get_client()

    def __str__(self):
        return repr(self) + self.val

    def get_client() -> Client:
        return Client()

    def get_all_users(self):
        self.client.f
