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

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Bỏ dấu tiếng Việt
}

function searchCards() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let nameElement = card.querySelector("h2");
        if (!nameElement) return; // Bỏ qua nếu không tìm thấy tên

        let name = nameElement.innerText.toLowerCase();
        let nameNoAccents = removeAccents(name); // Tên không dấu
        let inputNoAccents = removeAccents(input); // Tìm kiếm không dấu

        if (nameNoAccents.includes(inputNoAccents)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
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
    if (!document.querySelector(".profile-container")) return; // Chỉ chạy trên trang cá nhân

    // 📌 Tạo canvas cho hoa rơi
    const canvas = document.createElement("canvas");
    canvas.id = "flowerCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let flowers = [];
    const maxFlowers = 15; // 🔥 Giới hạn số hoa
    let isTabHidden = false;

    function createFlower() {
        if (flowers.length >= maxFlowers || isTabHidden) return; // Không spawn thêm nếu đủ số lượng hoặc tab ẩn

        let x = Math.random() * canvas.width;
        let y = -20;
        let size = Math.random() * 25 + 15; // 🔥 Giới hạn kích thước hoa từ 15px - 40px
        let speed = Math.random() * 2 + 1; // 🔥 Giữ tốc độ rơi bình thường
        let waveAmplitude = Math.random() * 50 + 30;
        let opacity = 1; // 🔥 Luôn bắt đầu với độ trong suốt 100%
        let life = 0; // 🔥 Biến theo dõi thời gian sống của hoa

        flowers.push({ x, y, size, speed, waveAmplitude, opacity, life });
    }

    function animateFlowers() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < flowers.length; i++) {
            let f = flowers[i];

            f.y += f.speed;
            f.x += Math.sin(f.y / 50) * f.waveAmplitude * 0.02;
            f.life += 1; // 🔥 Tăng thời gian sống của hoa

            // 🔥 Mờ dần khi gần chạm đất (Hoa sẽ biến mất ở 80% màn hình)
            if (f.y > canvas.height * 0.6) {
                f.opacity = 1 - ((f.y - canvas.height * 0.6) / (canvas.height * 0.4));
            }

            ctx.globalAlpha = f.opacity;
            ctx.font = `${f.size}px serif`;
            ctx.fillText("🌸", f.x, f.y);

            if (f.y > canvas.height) {
                flowers.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animateFlowers);
    }

    let flowerInterval = setInterval(createFlower, 1000);
    animateFlowers();

    // 📌 Dừng spawn hoa khi chuyển tab & tiếp tục khi quay lại
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        console.log("Tab bị ẩn - Dừng spawn hoa...");
        isTabHidden = true;
        clearInterval(flowerInterval);
    } else {
        console.log("Tab hiển thị lại - Tiếp tục spawn hoa!");
        isTabHidden = false;
        
        // 🔥 Đảm bảo interval không bị trùng bằng cách clear trước
        clearInterval(flowerInterval);
        flowerInterval = setInterval(createFlower, 1000);
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
