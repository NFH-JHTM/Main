document.addEventListener("DOMContentLoaded", function () {
    let grid = document.getElementById("memberGrid");

    for (let i = 1; i <= 28; i++) {
        let card = document.createElement("a");
        card.href = `pages/person${i}.html`;
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/person${i}.webp" alt="Person ${i}">
            <div class="info">
                <p>Nhân vật ${i}</p>
            </div>
        `;

        grid.appendChild(card);
    }
});

function searchCards() {
    let input = document.getElementById("searchBar").value.toLowerCase().trim();
    let cards = document.querySelectorAll(".card");

    if (!input) {
        cards.forEach(card => card.style.display = "block");
        return;
    }

    cards.forEach(card => {
        let name = card.querySelector("h2")?.innerText.toLowerCase();
        card.style.display = name && name.includes(input) ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let grid = document.getElementById("memberGrid");

    grid.addEventListener("mouseover", function (event) {
        if (event.target.closest(".card")) {
            let card = event.target.closest(".card");
            card.style.transform = "translateY(-5px)";
            card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
        }
    });

    grid.addEventListener("mouseout", function (event) {
        if (event.target.closest(".card")) {
            let card = event.target.closest(".card");
            card.style.transform = "translateY(0)";
            card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".profile-container")) return;

    let flowerCount = 0;
    const maxFlowers = 15;

    function createFlower() {
        if (flowerCount >= maxFlowers) return;

        const flower = document.createElement("div");
        flower.classList.add("floating-flower");
        flower.innerHTML = "🌸";

        flower.style.position = "fixed";
        flower.style.left = Math.random() * window.innerWidth + "px";
        flower.style.top = "-10px";
        flower.style.fontSize = "24px";
        flower.style.opacity = "1";
        flower.style.transition = "transform 6s linear, opacity 6s ease-out";

        document.body.appendChild(flower);
        flowerCount++;

        setTimeout(() => {
            flower.style.transform = `translateY(${window.innerHeight}px)`;
            flower.style.opacity = "0";
        }, 100);

        setTimeout(() => {
            flower.remove();
            flowerCount--;
        }, 6000);
    }

    // 🚀 Chắc chắn gọi hoa ngay khi DOM load xong
    setTimeout(createFlower, 500);
    setInterval(createFlower, 1500);
});

// 📌 Nếu tab bị ẩn rồi hiện lại -> Gọi lại hoa rơi
document.addEventListener("visibilitychange", function () {
    if (!document.querySelector(".profile-container")) return;
    
    if (!document.hidden) {
        console.log("Tab hiển thị lại - Tiếp tục hiệu ứng hoa rơi!");
        setTimeout(createFlower, 500);
    }
});

// 🎨 Style CSS để chắc chắn hoa hiển thị đẹp
const style = document.createElement("style");
style.innerHTML = `
    .floating-flower {
        position: fixed;
        color: pink;
        user-select: none;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingBar || !loadingText) {
        console.error("Lỗi: Không tìm thấy phần tử loading.");
        return;
    }

    const previousPage = document.referrer;
    if (previousPage.includes("person")) {
        loadingScreen.style.display = "none";
        return;
    }

    let progress = 0;

    function updateLoading() {
        progress += Math.random() * 5 + 3;
        if (progress > 100) progress = 100;

        loadingBar.style.width = `${progress}%`;
        loadingText.innerText = `Loading... ${Math.floor(progress)}%`;

        if (progress < 100) {
            setTimeout(updateLoading, 500);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = "0";
                setTimeout(() => {
                    loadingScreen.style.display = "none";
                }, 500);
            }, 500);
        }
    }

    setTimeout(updateLoading, 500);
});

document.addEventListener("DOMContentLoaded", function () {
    const morseButton = document.querySelector(".morse-button");
    const morsePanel = document.querySelector(".morse-panel");

    if (morseButton && morsePanel) {
        morsePanel.style.display = "none";

        morseButton.addEventListener("click", function () {
            if (morsePanel.style.display === "block") {
                morsePanel.style.display = "none";
            } else {
                morsePanel.style.display = "block";

                setTimeout(() => {
                    morsePanel.style.display = "none";
                }, 5000);
            }
        });
    } else {
        console.error("Không tìm thấy nút hoặc panel!");
    }
});

// 🔥 TẠI ĐÂY FIX HOA RƠI KHÔNG BỊ MẤT 🔥
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        console.log("Tab bị ẩn - Dừng hiệu ứng...");
        pauseAnimations();
    } else {
        console.log("Tab hiển thị lại - Tiếp tục hiệu ứng!");
        resumeAnimations();
    }
});

function pauseAnimations() {
    let flowers = document.querySelectorAll(".floating-flower");
    flowers.forEach(flower => flower.remove());

    let loadingBar = document.querySelector(".loading-bar");
    if (loadingBar) loadingBar.style.animationPlayState = "paused";
}

function resumeAnimations() {
    let loadingBar = document.querySelector(".loading-bar");
    if (loadingBar) loadingBar.style.animationPlayState = "running";

    if (document.querySelector(".profile-container")) {
        setInterval(createFlower, 1000);
    }
}
