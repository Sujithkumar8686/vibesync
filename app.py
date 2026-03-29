from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message").lower()

    responses = {
        "greeting": ["Hey! 😊", "Hello there!", "Yo! What's up?"],
        "how_are_you": ["I'm vibing 😎", "All good here!", "Feeling electric ⚡"],
        "sad": [
            "I'm here for you 💙 Try the chill vibe.",
            "It’s okay to feel this way. Want some calm music?",
            "Take a breath… things will get better 🌿"
        ],
        "happy": [
            "Let’s gooo! 🎉",
            "Love that energy 🔥",
            "Keep smiling 😄"
        ],
        "default": [
            "Hmm interesting 🤔",
            "Tell me more...",
            "I’m listening 👀"
        ]
    }

    if any(word in user_msg for word in ["hello", "hi", "hey"]):
        reply = random.choice(responses["greeting"])

    elif "how are you" in user_msg:
        reply = random.choice(responses["how_are_you"])

    elif any(word in user_msg for word in ["sad", "down", "depressed"]):
        reply = random.choice(responses["sad"])

    elif any(word in user_msg for word in ["happy", "good", "great"]):
        reply = random.choice(responses["happy"])

    else:
        reply = random.choice(responses["default"])

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)