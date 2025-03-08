document.addEventListener("DOMContentLoaded", function () {
    let grid = document.getElementById("memberGrid");
    
    for (let i = 1; i <= 28; i++) {
        let card = document.createElement("a");
        card.href = pages/person${i}.html;
        card.classList.add("card");
        
        card.innerHTML = 
            <img src="images/person${i}.webp" alt="Person ${i}">
            <div class="info">
                <p>Nhân vật ${i}</p>
            </div>
        ;
        
        grid.appendChild(card);
    }
});

function searchCards() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.querySelector("h2")?.innerText.toLowerCase(); // Fix lỗi nếu thẻ h2 không tồn tại
        if (name && name.includes(input)) {
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
        if (document.querySelectorAll(".floating-flower").length > 20) return; // Giới hạn số hoa

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
                let elapsed = (Date.now() - startTime) / 1000; // Thời gian đã qua (giây)
                let progress = elapsed / 5; // Animation dài 5 giây

                if (progress < 1) {
                    flower.style.opacity = 1 - progress; // Mờ dần
                    flower.style.transform = translateY(${progress * window.innerHeight}px);
                    requestAnimationFrame(frame);
                } else {
                    flower.remove(); // Xóa khi hết animation
                }
            }
            requestAnimationFrame(frame);
        }

        animateFlower();
    }
}); // <-- **Fix: Đóng đúng vị trí**

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
        loadingText.innerText = Loading... ${Math.floor(progress)}%;

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
    // Dừng hiệu ứng hoa rơi
    let flowers = document.querySelectorAll(".floating-flower");
    flowers.forEach(flower => flower.remove()); // Xóa hết hoa đang bay

    // Dừng loading (nếu có)
    let loadingBar = document.querySelector(".loading-bar");
    if (loadingBar) loadingBar.style.animationPlayState = "paused";
}

function resumeAnimations() {
    // Tiếp tục loading (nếu có)
    let loadingBar = document.querySelector(".loading-bar");
    if (loadingBar) loadingBar.style.animationPlayState = "running";

    // Bắt đầu lại hiệu ứng hoa rơi (nếu đang ở trang cá nhân)
    if (document.querySelector(".profile-container")) {
        setTimeout(createFlower, 500);
    }
}
