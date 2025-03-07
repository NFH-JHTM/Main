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
    let input = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.querySelector("h2").innerText.toLowerCase();
        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".card");

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
});

document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".profile-container")) return; // Chỉ chạy trong trang cá nhân

    const maxFlowers = 15; 
    let flowers = [];
    let flowerInterval;

    function createFlower() {
        if (flowers.length >= maxFlowers) return; 

        const flower = document.createElement("div");
        flower.classList.add("floating-flower");
        flower.innerHTML = "🌸";

        flower.style.left = Math.random() * window.innerWidth + "px";
        flower.style.animationDuration = (Math.random() * 5 + 3) + "s"; 
        flower.style.opacity = Math.random() * 0.8 + 0.2;

        document.body.appendChild(flower);
        flowers.push(flower);

        setTimeout(() => {
            flower.remove();
            flowers = flowers.filter(f => f !== flower);
        }, 8000); 
    }

    function startFlowerEffect() {
        if (!flowerInterval) {
            flowerInterval = setInterval(createFlower, 1200);
        }
    }

    function stopFlowerEffect() {
        clearInterval(flowerInterval);
        flowerInterval = null;
    }

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopFlowerEffect();
        } else {
            startFlowerEffect();
        }
    });

    startFlowerEffect();
});


document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingBar || !loadingText) {
        console.error("Lỗi: Không tìm thấy phần tử loading.");
        return;
    }

    // Kiểm tra nếu đến từ trang cá nhân thì bỏ qua loading
    const previousPage = document.referrer;
    if (previousPage.includes("person")) {
        loadingScreen.style.display = "none";
        return;
    }

    let progress = 0;

    function updateLoading() {
        progress += Math.random() * 5 + 3; // Tăng từ 3% - 8% mỗi lần
        if (progress > 100) progress = 100;

        loadingBar.style.width = progress + "%";
        loadingText.innerText = `Loading... ${Math.floor(progress)}%`;

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
    const morseButton = document.querySelector(".morse-button");
    const morsePanel = document.querySelector(".morse-panel");

    if (morseButton && morsePanel) {
        // Ẩn panel mặc định
        morsePanel.style.display = "none";

        morseButton.addEventListener("click", function () {
            // Kiểm tra nếu panel đang mở, thì ẩn nó đi
            if (morsePanel.style.display === "block") {
                morsePanel.style.display = "none";
            } else {
                // Hiện panel
                morsePanel.style.display = "block";

                // Sau 5 giây tự động ẩn
                setTimeout(() => {
                    morsePanel.style.display = "none";
                }, 5000);
            }
        });
    } else {
        console.error("Không tìm thấy nút hoặc panel!");
    }
});
