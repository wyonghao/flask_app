import os
import openai
from flask import Flask, redirect, render_template, request, url_for, Response
from functools import wraps
from dotenv import load_dotenv

load_dotenv() # load environment variables from .env file for gunicorn to use

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

# load your username and password here
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")

print(f"Loaded USERNAME from env: '{USERNAME}'")
print(f"Loaded PASSWORD from env: '{PASSWORD}'")

def check_auth(username, password):
    """This function is called to check if a username/password combination is valid."""
    is_authenticated = username == USERNAME and password == PASSWORD
    print(f"Checking auth for {username}:{password}")
    print(f"Authentication result: {is_authenticated}")
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

@app.route("/", methods=("GET", "POST"))
@requires_auth
def index():
    if request.method == "POST":
        question = request.form["question"]
        question_type = request.form["question_type"]
        generated_prompt=generate_prompt(question,question_type)
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generated_prompt,
            temperature=0.6,
            max_tokens=500,
        )
        
        # Print statement before the redirect
        print(f"The prompt is: {generated_prompt}")

        result_redirect = redirect(url_for("index", result=response.choices[0].text))
        
        # Print statement after the redirect
        # print("Redirected with result:", response.choices[0].text)
        return result_redirect

    result = request.args.get("result")
    return render_template("index.html", result=result)

def generate_prompt(question,question_type):
    return f"""{question_type}
Question: {question.capitalize()}
Answer:"""

if __name__ == "__main__":
    app.run(debug=True)
