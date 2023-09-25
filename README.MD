#Python Flask example app

This project is inspired by and initially based on the OpenAI API [quickstart tutorial](https://beta.openai.com/docs/quickstart). However, it has undergone significant changes and is now massively different. It uses the [Flask](https://flask.palletsprojects.com/en/2.0.x/) web framework. If you're interested in learning more about the OpenAI API, the original tutorial and links are still useful resources.

## Setup

1. If you don’t have Python installed, [install it from here](https://www.python.org/downloads/).

2. Clone this repository.

3. Navigate into the project directory:

4. Create a new virtual environment:

   ```bash
   $ python -m venv venv
   $ . venv/bin/activate
   ```

5. Install the requirements:

   ```bash
   $ pip install -r requirements.txt
   ```

6. Make a copy of the example environment variables file:

   ```bash
   $ cp .env.example .env
   ```

7. Add your [API key](https://beta.openai.com/account/api-keys) to the newly created `.env` file.

8. Run the app:

   ```bash
   $ flask run
   ```

You should now be able to access the app at [http://localhost:5000](http://localhost:5000)! For the full context behind this example app, check out the [tutorial](https://beta.openai.com/docs/quickstart).
