from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# Alphabet page
@app.route('/alphabet')
def alphabet():
    return render_template('alphabet.html')

# Numbers page
@app.route('/numbers')
def numbers():
    return render_template('numbers.html')

# Quiz page
@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

# Match game page
@app.route('/match')
def match():
    return render_template('match.html')

# Snake game page
@app.route('/snake')
def snake():
    return render_template('snake.html')

# Camera mode page
@app.route('/camera')
def camera_mode():
    return render_template('camera_mode.html')

# Flashcards page
@app.route('/flashcards')
def flashcards():
    return render_template('flashcards.html')



if __name__ == '__main__':
    app.run(debug=True)
