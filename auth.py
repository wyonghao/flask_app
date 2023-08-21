import os
from flask import request, Response
from functools import wraps
from dotenv import load_dotenv
load_dotenv() # load environment variables from .env file for gunicorn to use

# load your username and password here
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")

print(f"Loaded USERNAME from env: '{USERNAME}'")
print(f"Loaded PASSWORD from env: '{PASSWORD}'")

def check_auth(username, password):
    """This function is called to check if a username/password combination is valid."""
    is_authenticated = username == USERNAME and password == PASSWORD
    return is_authenticated

def authenticate():
    """Sends a 401 response that enables basic auth."""
    resp = Response('You need to login.', 401)
    resp.headers['WWW-Authenticate'] = 'Basic realm="Login!"'
    return resp

def requires_auth(f):
    """A decorator to ensure the user is logged in."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth:
            print("No authorization provided.")
            return authenticate()
        if not check_auth(auth.username, auth.password):
            print("Authentication failed.")
            return authenticate()
        return f(*args, **kwargs)
    return decorated
