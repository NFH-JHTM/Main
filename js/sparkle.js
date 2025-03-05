const canvas = document.getElementById("sparkleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sparkles = [];

class Sparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.opacity = 1;
        this.speed = Math.random() * 1.5 + 0.5;
    }

    update() {
        this.y -= this.speed;
        this.opacity -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "rgba(255, 255, 150, 1)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createSparkles(x, y) {
    for (let i = 0; i < 5; i++) {
        sparkles.push(new Sparkle(x + Math.random() * 40 - 20, y + Math.random() * 40 - 20));
    }
}

function animateSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparkles.forEach((sparkle, index) => {
        sparkle.update();
        sparkle.draw();
        if (sparkle.opacity <= 0) {
            sparkles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateSparkles);
}

animateSparkles();

document.querySelectorAll(".card").forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setInterval(() => createSparkles(x, y), 500);

    card.addEventListener("mouseenter", () => {
        sparkles = []; // Xóa sparkle khi hover vào
    });
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
