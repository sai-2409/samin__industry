# 🔥 Этот код запускает мини-сервер Flask и показывает index.html на странице http://localhost:5000
from flask import Flask, render_template

app = Flask(__name__)

# Главная страница
@app.route('/')
def home():
    return render_template('index.html')

# Страница калькулятора
@app.route('/calculator')
def calculator():
    return render_template('calc.html')

# Страница корзины
@app.route('/cart')
def cart():
    return render_template('cartSamin.html')

# Welcome page
@app.route('/welcome')
def welcome():
    return render_template('welcome__page.html')

if __name__ == '__main__':
    app.run(debug=True)


# Coding for going to the cart from saminCart page
@app.route('/cart')
def cart():
    return render_template('cartSamin.html')