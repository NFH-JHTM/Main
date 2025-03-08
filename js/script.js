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

function decodeBase64(encoded) {
    return atob(encoded); // Giải mã Base64
}

function searchCards(input) {
    let inputNoAccents = removeAccents(input); // Xử lý không dấu
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let nameElement = card.querySelector("h2");
        if (!nameElement) return;

        let name = nameElement.innerText.toLowerCase();
        let nameNoAccents = removeAccents(name); // Tên không dấu

        if (nameNoAccents.includes(inputNoAccents)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// 🎯 Xử lý tìm kiếm theo thời gian thực
document.getElementById("searchBar").addEventListener("input", function () {
    searchCards(this.value.toLowerCase().trim()); // Tìm kiếm ngay khi nhập
});

// 🎯 Xử lý khi nhấn Enter
document.getElementById("searchBar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn form submit mặc định

        let input = this.value.toLowerCase().trim();

        // 🎁 Secret mode: Nếu nhập "8/3" thì chuyển đến YouTube
        if (input === "8/3") {
            let encodedLink = "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXd3dzlXZ1hjUw==";
            window.location.href = decodeBase64(encodedLink);
            return;
        }

        searchCards(input); // Gọi hàm tìm kiếm
        this.value = input; // Cập nhật lại giá trị vào ô tìm kiếm
        this.blur(); // Ẩn con trỏ chuột khỏi ô nhập
    }
});


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
    const maxFlowers = 15;
    let isTabHidden = false;
    let flowerInterval;

    function createFlower() {
        if (flowers.length >= maxFlowers || isTabHidden) return;

        let x = Math.random() * canvas.width;
        let y = -20;
        let size = Math.random() * 20 + 10;
        let speed = Math.random() * 2 + 1;
        let waveAmplitude = Math.random() * 50 + 30;
        let opacity = 1;
        let life = 0;

        flowers.push({ x, y, size, speed, waveAmplitude, opacity, life });
    }

    function animateFlowers() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < flowers.length; i++) {
            let f = flowers[i];

            f.y += f.speed;
            f.x += Math.sin(f.y / 50) * f.waveAmplitude * 0.02;
            f.life += 1;

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

    function startFlowerAnimation() {
        if (!flowerInterval) {
            flowerInterval = setInterval(createFlower, 1000);
        }
        requestAnimationFrame(animateFlowers);
    }

    function stopFlowerAnimation() {
        clearInterval(flowerInterval);
        flowerInterval = null;
    }

    startFlowerAnimation();

    // 📌 Dừng spawn hoa khi chuyển tab & tiếp tục khi quay lại
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            console.log("Tab bị ẩn - Dừng spawn hoa...");
            isTabHidden = true;
            stopFlowerAnimation();
        } else {
            console.log("Tab hiển thị lại - Tiếp tục spawn hoa!");
            isTabHidden = false;
            startFlowerAnimation();
        }
    });
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
