let currentAudio = null;
let isPlaying = false;

// PLAY SOUND
function playSound(type) {
    if (currentAudio) {
        currentAudio.pause();
    }

    currentAudio = new Audio(`/static/sounds/${type}.mp3`);
    currentAudio.loop = true;
    currentAudio.play();

    isPlaying = true;
    document.getElementById("status").innerText = "Playing: " + type;
}

// TOGGLE PLAY/PAUSE
function toggleSound() {
    if (!currentAudio) return;

    if (isPlaying) {
        currentAudio.pause();
        document.getElementById("status").innerText = "Paused";
    } else {
        currentAudio.play();
        document.getElementById("status").innerText = "Resumed";
    }

    isPlaying = !isPlaying;
}

// STOP SOUND
function stopSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        isPlaying = false;
        document.getElementById("status").innerText = "Stopped";
    }
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

// CHATBOT
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
    chatbox.scrollTop = chatbox.scrollHeight;
}

/* ================= PARTICLE BACKGROUND ================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.dx = (Math.random() - 0.5) * 1;
        this.dy = (Math.random() - 0.5) * 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,255,0.7)";
        ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        this.draw();
    }
}

// CREATE PARTICLES
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

// ANIMATION LOOP
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animateParticles);
}

animateParticles();

// RESIZE HANDLING
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});