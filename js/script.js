document.addEventListener("DOMContentLoaded", function () {
    let grid = document.getElementById("memberGrid");
    
    if (grid) {
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
    }

    // Hover effect trên card (Chỉ chạy nếu có card)
    setTimeout(() => {
        let cards = document.querySelectorAll(".card");
        if (cards.length > 0) {
            cards.forEach(card => {
                card.addEventListener("mouseenter", () => {
                    card.style.transform = "translateY(-5px)";
                    card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform = "translateY(0)";
                    card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                });
            });
        }
    }, 500);
});

// 🔎 Fix lỗi tìm kiếm
function searchCards() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.querySelector(".info p")?.innerText.toLowerCase(); // Fix lỗi nếu thẻ không tồn tại
        card.style.display = name && name.includes(input) ? "block" : "none";
    });
}

// 🌸 Hiệu ứng hoa rơi (chỉ chạy trong trang cá nhân)
document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".profile-container")) return;

    const maxFlowers = 15;
    
    function createFlower() {
        if (document.querySelectorAll(".floating-flower").length >= maxFlowers) return;

        const flower = document.createElement("div");
        flower.classList.add("floating-flower");
        flower.innerHTML = "🌸";
        flower.style.left = Math.random() * window.innerWidth + "px";
        flower.style.top = "-30px";
        
        document.body.appendChild(flower);

        let startTime = Date.now();
        function animateFlower() {
            let elapsed = (Date.now() - startTime) / 1000;
            let progress = elapsed / 6; // Giảm tốc độ rơi để mượt hơn

            if (progress < 1) {
                flower.style.opacity = 1 - progress;
                flower.style.transform = `translate(${Math.sin(elapsed * 2) * 30}px, ${progress * window.innerHeight}px)`;
                requestAnimationFrame(animateFlower);
            } else {
                flower.remove();
            }
        }
        requestAnimationFrame(animateFlower);
    }

    setInterval(createFlower, 1200);
});

// ⏳ Loading mượt hơn với requestAnimationFrame
document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingBar || !loadingText) return;

    const previousPage = document.referrer;
    if (previousPage.includes("person")) {
        loadingScreen.style.display = "none";
        return;
    }

    let progress = 0;
    function updateLoading() {
        progress += Math.random() * 5 + 3;
        if (progress > 100) progress = 100;

        loadingBar.style.width = progress + "%";
        loadingText.innerText = `Loading... ${Math.floor(progress)}%`;

        if (progress < 100) {
            requestAnimationFrame(updateLoading);
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

// 🔠 Hiển thị bảng Morse code
document.addEventListener("DOMContentLoaded", function () {
    const morseButton = document.querySelector(".morse-button");
    const morsePanel = document.querySelector(".morse-panel");

    if (morseButton && morsePanel) {
        morsePanel.style.display = "none";

        morseButton.addEventListener("click", function () {
            morsePanel.style.display = morsePanel.style.display === "block" ? "none" : "block";
            setTimeout(() => {
                morsePanel.style.display = "none";
            }, 5000);
        });
    }
});
