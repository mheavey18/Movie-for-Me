import os

from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("m4m_home.html")

# https://medium.com/@anyazhang/publishing-a-flask-web-app-from-the-cs50-ide-to-heroku-osx-e00a45338c14
if __name__ == "__main__":
	app.debug = True
	port = int(os.environ.get('PORT', 5000))
	app.run(host="0.0.0.0", port=port)