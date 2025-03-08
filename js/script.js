document.addEventListener("DOMContentLoaded", function () {
    let grid = document.getElementById("memberGrid");

    for (let i = 1; i <= 28; i++) {
        let card = document.createElement("a");
        card.href = `pages/person${i}.html`;  // ✅ FIXED

        card.classList.add("card");

        card.innerHTML = `
            <img src="images/person${i}.webp" alt="Person ${i}">
            <div class="info">
                <p>Nhân vật ${i}</p>
            </div>
        `; // ✅ FIXED

        grid.appendChild(card);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingBar || !loadingText) {
        console.error("Lỗi: Không tìm thấy phần tử loading.");
        return;
    }

    let progress = 0;

    function updateLoading() {
        progress += Math.random() * 5 + 3; // Tăng từ 3% - 8% mỗi lần
        if (progress > 100) progress = 100;

        loadingBar.style.width = `${progress}%`;
        loadingText.innerText = `Loading... ${Math.floor(progress)}%`;  // ✅ FIXED

        if (progress < 100) {
            setTimeout(updateLoading, 300);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = "0"; // Làm mờ loading
                setTimeout(() => {
                    loadingScreen.style.display = "none"; // Ẩn hoàn toàn
                }, 500);
            }, 500);
        }
    }

    setTimeout(updateLoading, 500); // Bắt đầu loading sau 0.5s để tránh lag
});

document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".profile-container")) return;

    function createFlower() {
        const flower = document.createElement("div");
        flower.classList.add("floating-flower");
        flower.innerHTML = "🌸";

        flower.style.left = Math.random() * window.innerWidth + "px";
        flower.style.top = "0px";
        flower.style.setProperty("--wave-x", Math.random() * 100 - 50 + "px");

        document.body.appendChild(flower);

        function animateFlower() {
            let startTime = Date.now();
            function frame() {
                let elapsed = (Date.now() - startTime) / 1000;
                let progress = elapsed / 5;

                if (progress < 1) {
                    flower.style.opacity = 1 - progress;
                    flower.style.transform = `translateY(${progress * window.innerHeight}px)`;  // ✅ FIXED
                    requestAnimationFrame(frame);
                } else {
                    flower.remove();
                }
            }
            requestAnimationFrame(frame);
        }

        animateFlower();
    }
});
