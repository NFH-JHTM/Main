document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded!");

    // 🏎️ Tạo Profile Card tự động trong Grid (Trang Chủ)
    let grid = document.getElementById("memberGrid");
    if (grid) {
        const members = [
            { name: "Bùi Lê Anh", desc: "✨ Skibidi toilet" },
            { name: "Phạm Thanh Mai", desc: "✨ Skibidi toilet" },
            { name: "Quách Nguyễn Mai Anh", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Ngọc Trà Giang", desc: "✨ Skibidi toilet" },
            { name: "Đỗ Gia Hân", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Ngọc Gia Hân", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Thanh Phúc An", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Hoàng Ngân", desc: "✨ Skibidi toilet" },
            { name: "Phạm Huỳnh Bảo Nghi", desc: "✨ Skibidi toilet" },
            { name: "Dương Ngọc Uyển Nhi", desc: "✨ Skibidi toilet" },
            { name: "Lê Trần Thanh Phúc", desc: "✨ Skibidi toilet" },
            { name: "Đinh Ngọc Đông Phương", desc: "✨ Skibidi toilet" },
            { name: "Nhan Lệ San", desc: "✨ Skibidi toilet" },
            { name: "Đoàn Trần Gia Thanh", desc: "✨ Skibidi toilet" },
            { name: "Đinh Minh Thùy", desc: "✨ Skibidi toilet" },
            { name: "Phạm Anh Thư", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Đặng Ánh Tiên", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Hoàn Ngọc Yến Trang", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Ngọc Minh Trang", desc: "✨ Skibidi toilet" },
            { name: "Trần Hoài Khánh Tường", desc: "✨ Skibidi toilet" },
            { name: "Phan Lê Phương Uyên", desc: "✨ Skibidi toilet" },
            { name: "Trần Phương Uyên", desc: "✨ Skibidi toilet" },
            { name: "Trần Tú Uyên", desc: "✨ Skibidi toilet" },
            { name: "Vũ Kiều Oanh", desc: "✨ Skibidi toilet" },
            { name: "Võ Bảo Nguyên", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Thị Phương Vi", desc: "✨ Skibidi toilet" },
            { name: "Lê Nguyên Vy", desc: "✨ Skibidi toilet" },
            { name: "Nguyễn Quỳnh Hương", desc: "✨ Skibidi toilet" }
        ];

        let html = "";
        members.forEach((member, index) => {
            html += `
                <a href="pages/person${index + 1}.html" class="card">
                    <img data-src="images/person${index + 1}.jpg" class="avatar lazy-load" alt="${member.name}">
                    <div class="info">
                        <h2>${member.name}</h2>
                        <p>${member.desc}</p>
                    </div>
                    <canvas class="petalCanvas"></canvas>
                </a>
            `;
        });
        grid.innerHTML = html;

        // 🏎️ Lazy Load Ảnh
        let lazyImages = document.querySelectorAll("img.lazy-load");
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                    img.classList.add("loaded");
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 🔍 Search Function - Tìm kiếm Profile
    let searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("keyup", function () {
            let input = searchBar.value.toLowerCase();
            let cards = document.querySelectorAll(".card");

            cards.forEach(card => {
                let name = card.querySelector(".info h2").innerText.toLowerCase();
                card.style.display = name.includes(input) ? "block" : "none";
            });
        });
    }

    // 🌸 Hiệu ứng Hoa Rơi (Chỉ Trong Trang Cá Nhân)
    const profilePage = document.querySelector(".profile-container");
    if (profilePage) {
        const maxFlowers = 10;
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
            }, 7000);
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
    }

    // ⏳ Loading Screen (Chỉ Chạy Ở Trang Chủ & Chỉ Hiện Một Lần)
    const loadingScreen = document.querySelector(".loading-screen");
    if (loadingScreen) {
        if (sessionStorage.getItem("loadedBefore")) {
            loadingScreen.style.display = "none"; // Nếu đã vào web trước đó, bỏ loading screen
            return;
        }

        sessionStorage.setItem("loadedBefore", "true"); // Đánh dấu là đã vào web 1 lần

        let progress = 0;

        function updateLoading() {
            progress += Math.random() * 5 + 3;
            if (progress > 100) progress = 100;

            document.querySelector(".loading-bar").style.width = progress + "%";
            document.querySelector(".loading-text").innerText = `Loading... ${Math.floor(progress)}%`;

            if (progress < 100) {
                setTimeout(updateLoading, 300);
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
    }
});
