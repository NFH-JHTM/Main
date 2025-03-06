document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded!");

    // 📌 Chỉ tạo profile card khi đang ở trang chủ
    let grid = document.querySelector(".grid");
    if (grid && !grid.dataset.loaded) {
        grid.dataset.loaded = "true"; // Đánh dấu đã tạo để tránh duplicate

        const members = [
            "Bùi Lê Anh", "Phạm Thanh Mai", "Quách Nguyễn Mai Anh",
            "Nguyễn Ngọc Trà Giang", "Đỗ Gia Hân", "Nguyễn Ngọc Gia Hân",
            "Nguyễn Thanh Phúc An", "Nguyễn Hoàng Ngân", "Phạm Huỳnh Bảo Nghi",
            "Dương Ngọc Uyển Nhi", "Lê Trần Thanh Phúc", "Đinh Ngọc Đông Phương",
            "Nhan Lệ San", "Đoàn Trần Gia Thanh", "Đinh Minh Thùy",
            "Phạm Anh Thư", "Nguyễn Đặng Ánh Tiên", "Nguyễn Hoàn Ngọc Yến Trang",
            "Nguyễn Ngọc Minh Trang", "Trần Hoài Khánh Tường", "Phan Lê Phương Uyên",
            "Trần Phương Uyên", "Trần Tú Uyên", "Vũ Kiều Oanh",
            "Võ Bảo Nguyên", "Nguyễn Thị Phương Vi", "Lê Nguyên Vy",
            "Nguyễn Quỳnh Hương"
        ];

        members.forEach((name, index) => {
            let card = document.createElement("a");
            card.href = `pages/person${index + 1}.html`;
            card.classList.add("card");

            card.innerHTML = `
                <img src="images/person${index + 1}.jpg" class="avatar lazy-load" loading="lazy">
                <div class="info">
                    <h2>${name}</h2>
                    <p>✨ Thành viên 12A8</p>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    // 🔍 Tìm kiếm Profile Card
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

    // ✨ Hover effect cho Card
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-5px)";
            card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
            card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        });
    });

    // 🌸 Hiệu ứng Hoa Rơi (Chỉ Trong Trang Cá Nhân)
    if (document.querySelector(".profile-container")) {
        let maxFlowers = 15;
        let flowers = [];

        function createFlower() {
            if (flowers.length >= maxFlowers) return;

            let flower = document.createElement("div");
            flower.classList.add("floating-flower");
            flower.innerHTML = "🌸";
            flower.style.left = Math.random() * window.innerWidth + "px";
            flower.style.animationDuration = `${Math.random() * 5 + 3}s`;
            flower.style.opacity = Math.random() * 0.8 + 0.2;

            document.body.appendChild(flower);
            flowers.push(flower);

            setTimeout(() => {
                flower.remove();
                flowers = flowers.filter(f => f !== flower);
            }, 8000);
        }

        let flowerInterval = setInterval(createFlower, 1200);

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                clearInterval(flowerInterval);
                flowerInterval = null;
            } else if (!flowerInterval) {
                flowerInterval = setInterval(createFlower, 1200);
            }
        });
    }

    // ⏳ Loading Screen (Chỉ Chạy Ở Trang Chủ)
    let loadingScreen = document.querySelector(".loading-screen");
    if (loadingScreen && !sessionStorage.getItem("loadedBefore")) {
        let progress = 0;
        let loadingBar = document.querySelector(".loading-bar");
        let loadingText = document.querySelector(".loading-text");

        function updateLoading() {
            progress += Math.random() * 5 + 3;
            if (progress > 100) progress = 100;

            loadingBar.style.width = progress + "%";
            loadingText.innerText = `Loading... ${Math.floor(progress)}%`;

            if (progress < 100) {
                setTimeout(updateLoading, 300);
            } else {
                setTimeout(() => {
                    loadingScreen.style.opacity = "0";
                    setTimeout(() => {
                        loadingScreen.style.display = "none";
                        sessionStorage.setItem("loadedBefore", "true");
                    }, 500);
                }, 500);
            }
        }

        setTimeout(updateLoading, 500);
    } else if (loadingScreen) {
        loadingScreen.style.display = "none";
    }
});
