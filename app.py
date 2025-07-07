# This code will run html files on the mini server with Flask
import os
import requests
from flask import Flask, redirect, request, session, url_for, render_template

app = Flask(__name__)
app.secret_key = 'your_secret_key'

CLIENT_ID = "cb0aaca9b73140c4b8fd5d279875b8c0"
CLIENT_SECRET = "f9d87c4baa2f45f985cf6936b32cb9ea"
REDIRECT_URI = "http://127.0.0.1:5000/callback"

@app.route("/")
def index():
    user = session.get("user")
    return render_template("index.html", user=user)

@app.route("/calculator")
def calculator():
    return render_template('calc.html')

@app.route("/cart")
def cart():
    return render_template('cartSamin.html')

@app.route("/welcome")
def welcome():
    return render_template('welcome__page.html')

@app.route("/login")
def login():
    return redirect(
        f"https://oauth.yandex.com/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}"
    )

@app.route("/callback")
def callback():
    code = request.args.get("code")
    if not code:
        return "Ошибка авторизации"
    token_res = requests.post("https://oauth.yandex.com/token", data={
        "grant_type": "authorization_code",
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    })
    token_json = token_res.json()
    access_token = token_json.get("access_token")
    if not access_token:
        return "Ошибка получения токена"
    user_info = requests.get("https://login.yandex.ru/info", headers={
        "Authorization": f"OAuth {access_token}"
    }).json()
    session["user"] = {
        "login": user_info["login"],
        "avatar": user_info.get("default_avatar_id")
    }
    return redirect(url_for("index"))

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("index"))

if __name__ == '__main__':
    app.run(debug=True)


# Putting Yandex ID avatar in the header
session["user"] = {
    "login": user_info["login"],
    "avatar": user_info.get("default_avatar_id")
}