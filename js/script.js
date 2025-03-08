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

// 🎯 Xử lý tìm kiếm
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function decodeBase64(encoded) {
    return atob(encoded);
}

function searchCards(input) {
    let inputNoAccents = removeAccents(input);
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let nameElement = card.querySelector("h2");
        if (!nameElement) return;

        let name = nameElement.innerText.toLowerCase();
        let nameNoAccents = removeAccents(name);

        if (nameNoAccents.includes(inputNoAccents)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.getElementById("searchBar").addEventListener("input", function () {
    searchCards(this.value.toLowerCase().trim());
});

document.getElementById("searchBar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let input = this.value.toLowerCase().trim();

        if (input === "8/3") {
            let encodedLink = "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXd3dzlXZ1hjUw==";
            window.location.href = decodeBase64(encodedLink);
            return;
        }

        searchCards(input);
        this.value = input;
        this.blur();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".profile-container")) return;

    // 🌸 Tạo canvas
    const canvas = document.createElement("canvas");
    canvas.id = "flowerCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "1";

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let flowers = [];
    function createFlower() {
        let x = Math.random() * canvas.width;
        let y = -20;
        let size = Math.random() * 20 + 10;
        let speed = Math.random() * 2 + 1;
        let waveAmplitude = Math.random() * 50 + 30;

        flowers.push({ x, y, size, speed, waveAmplitude });
    }

    function animateFlowers() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        flowers.forEach((f, i) => {
            f.y += f.speed;
            f.x += Math.sin(f.y / 50) * f.waveAmplitude * 0.02;

            ctx.globalAlpha = 1;
            ctx.font = `${f.size}px serif`;
            ctx.fillText("🌸", f.x, f.y);

            if (f.y > canvas.height) flowers.splice(i, 1);
        });

        requestAnimationFrame(animateFlowers);
    }

    setInterval(createFlower, 1000);
    animateFlowers();
});

document.addEventListener("DOMContentLoaded", function () {
    const morseButton = document.querySelector(".morse-button");
    const morsePanel = document.querySelector(".morse-panel");

    if (morseButton && morsePanel) {
        morsePanel.style.display = "none"; // Đảm bảo ẩn khi load trang

        morseButton.addEventListener("click", function () {
            const isHidden = getComputedStyle(morsePanel).display === "none";

            if (isHidden) {
                morsePanel.style.display = "block";

                setTimeout(() => {
                    morsePanel.style.display = "none";
                }, 5000);
            } else {
                morsePanel.style.display = "none";
            }
        });
    } else {
        console.error("Không tìm thấy nút hoặc panel!");
    }
});
;

// 🔥 Fix hiệu ứng loading screen
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
