document.querySelectorAll(".card").forEach(card => {
    const canvas = card.querySelector(".petalCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;

    let petals = [];
    const maxPetals = 10; // 🔥 Giới hạn số hoa để tránh lag
    let animationFrame;

    class Petal {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10; // 🔥 Bắt đầu từ phía trên cùng của thẻ
            this.size = Math.random() * 4 + 2;
            this.speedY = Math.random() * 0.8 + 0.2; // 🔥 Bay chậm hơn
            this.opacity = Math.random() * 0.5 + 0.5;
        }

        update() {
            this.y += this.speedY;
            if (this.y > canvas.height) {
                this.y = -10; // 🔥 Reset lại ở trên cùng thay vì giữa
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createPetals() {
        petals = [];
        for (let i = 0; i < maxPetals; i++) {
            petals.push(new Petal());
        }
    }

    function animatePetals() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        animationFrame = requestAnimationFrame(animatePetals);
    }

    function startAnimation() {
        if (!animationFrame) {
            animatePetals();
        }
    }

    function stopAnimation() {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }

    // 🎀 Khi chuyển tab, dừng animation
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });

    createPetals();
    startAnimation();
});
