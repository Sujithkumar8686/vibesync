let currentAudio = null;

// SOUND FUNCTION
function playSound(type) {
    if (currentAudio) {
        currentAudio.pause();
    }

    currentAudio = new Audio(`/static/sounds/${type}.mp3`);
    currentAudio.play();
}

// TYPING EFFECT
function typeEffect(text, element) {
    let i = 0;
    let speed = 20;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// CHAT FUNCTION
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");

    const userText = input.value;

    if (userText.trim() === "") return;

    chatbox.innerHTML += `<p style="color:lightgreen;"><b>You:</b> ${userText}</p>`;

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
    });

    const data = await response.json();

    let botMsg = document.createElement("p");
    botMsg.style.color = "cyan";
    botMsg.innerHTML = "<b>Bot:</b> ";
    chatbox.appendChild(botMsg);

    typeEffect(data.reply, botMsg);

    input.value = "";
}