import os
import openai
from flask import Flask, redirect, render_template, request, url_for, Response
from dotenv import load_dotenv
from api.auth import requires_auth
from api.crypto_info import crypto_info  # <-- Import here

load_dotenv() # load environment variables from .env file for gunicorn to use

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")
#if openai.api_key is not None: print loaded key successfully
if(openai.api_key): 
    print(f"Loaded OPENAI_API_KEY from env: '{openai.api_key}'")
else: 
    print("Failed to load OPENAI_API_KEY from env")

def generate_prompt(question,question_type):
    return f"""{question_type}
Question: {question.capitalize()}
Answer:"""

# Bring in the auth function


@app.route("/", methods=("GET", "POST"))
@requires_auth
def index():
    if request.method == "POST":
        question = request.form["question"]
        question_type = request.form["question_type"]
        model_type = request.form["model_type"]

        generated_prompt=generate_prompt(question,question_type)
        print(generated_prompt)

        if model_type == "completion":
            response = openai.Completion.create(
                model="text-davinci-003",
                prompt=generated_prompt,
                temperature=0.6,
                max_tokens=500,
            )
            result_text = response.choices[0].text

        elif model_type == "chat":
            response = openai.ChatCompletion.create(
                model="gpt-4",
                #model="gpt-3.5-turbo", #     "id": "gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": generated_prompt}
                ]
            )
            result_text = response['choices'][0]['message']['content']
        
        # Print statement before the redirect
        print(f"The prompt is: {generated_prompt}")

        return redirect(url_for("index", result=result_text))
    result = request.args.get("result")
    return render_template("index.html", result=result)

@app.route("/crypto_info/<coin_id>", methods=["GET"])
def get_crypto_info(coin_id):
    return crypto_info(coin_id)  # <-- New route

if __name__ == "__main__":
    app.run(debug=True)
