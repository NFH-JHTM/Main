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

document.addEventListener("DOMContentLoaded", function () {
    let searchBar = document.getElementById("searchBar");

    if (!searchBar) {
        console.error("Lỗi: Không tìm thấy #searchBar");
        return;
    }

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function decodeBase64(encoded) {
        if (typeof atob !== "undefined") {
            return atob(encoded);
        } else {
            console.error("Lỗi: Trình duyệt không hỗ trợ atob()");
            return "";
        }
    }

    function searchCards(input) {
        let inputNoAccents = removeAccents(input);
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let nameElement = card.querySelector("h2");
            if (!nameElement) return;

            let name = nameElement.innerText.toLowerCase();
            let nameNoAccents = removeAccents(name);

            card.style.display = nameNoAccents.includes(inputNoAccents) ? "block" : "none";
        });
    }

    
    searchBar.addEventListener("input", function () {
        let input = this.value.toLowerCase().trim();
        searchCards(input);
    });

    
    searchBar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let input = this.value.toLowerCase().trim();

        if (input === "8/3") {
            let encodedLink = "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1hWjdWMXRRdWc2UQ==";
            window.location.href = decodeBase64(encodedLink);
            return;
        }

       if (input === "a8") {
            let encodedLink = "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL2ZvbGRlcnMvMUltbVNkQjBINFhQX25QUHpnemF3QWRtQk5BMVFHUm5F";
            window.location.href = atob(encodedLink);
        }


        if (input === "cfs") {
            let encodedLink = "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xUV9oa2dhNGR2UG43amprVmJTVlFkSWxLdEFPRDFTc0k3Y2pMbnl3UnNGNC9lZGl0P3VzcD1zaGFyaW5n";
            window.location.href = decodeBase64(encodedLink);
            return;
        }

        searchCards(input);
        this.value = input;
        this.blur();
        }
    });
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
    if (!document.querySelector(".profile-container")) return; 

    
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
    const maxFlowers = 20;
    let isTabHidden = false;
    let flowerInterval = null;
    let animationFrame = null;

    function createFlower() {
        if (flowers.length >= maxFlowers || isTabHidden) return;

        let x = Math.random() * canvas.width;
        let y = -20;
        let size = Math.random() * 25 + 15;
        let speed = Math.random() * 2 + 1;
        let waveAmplitude = Math.random() * 50 + 30;
        let opacity = 1;
        let life = 0;

        flowers.push({ x, y, size, speed, waveAmplitude, opacity, life });
    }

    function animateFlowers() {
        if (isTabHidden) return; 

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

        animationFrame = requestAnimationFrame(animateFlowers);
    }

    function startFlowerEffect() {
        clearInterval(flowerInterval);
        cancelAnimationFrame(animationFrame);

        isTabHidden = false;
        flowerInterval = setInterval(createFlower, 1000);
        animationFrame = requestAnimationFrame(animateFlowers);
    }

    function stopFlowerEffect() {
        clearInterval(flowerInterval);
        cancelAnimationFrame(animationFrame);
        isTabHidden = true;
    }

    startFlowerEffect();

    
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            console.log("Tab bị ẩn - Dừng hoa rơi...");
            stopFlowerEffect();
        } else {
            console.log("Tab hiển thị lại - Tiếp tục hoa rơi!");
            startFlowerEffect();
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
    

    let loadingBar = document.querySelector(".loading-bar");
    if (loadingBar) loadingBar.style.animationPlayState = "paused";
}

function resumeAnimations() {
    let loadingBar = document.querySelector(".loading-bar");
    if (loadingBar) loadingBar.style.animationPlayState = "running";
}
