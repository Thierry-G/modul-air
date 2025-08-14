from flask import Flask, render_template, jsonify
app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to Modul-Air Tamagoshi Game (Flask backend)"

@app.route('/status')
def status():
    return jsonify({"status": "alive", "hunger": 50, "happiness": 80})

if __name__ == '__main__':
    app.run(debug=True)
