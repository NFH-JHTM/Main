document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded! 🚀");

    // 🔹 Tạo Profile Card tự động trong Grid (Trang Chủ)
    let grid = document.querySelector(".grid");
    if (grid) {
        grid.innerHTML = ""; // Xóa các card cũ nếu có (tránh bị duplicate)
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

        members.forEach((member, index) => {
            let card = document.createElement("a");
            card.href = `pages/person${index + 1}.html`;
            card.classList.add("card");

            card.innerHTML = `
                <img src="images/person${index + 1}.webp" class="avatar" alt="${member.name}">
                <div class="info">
                    <h2>${member.name}</h2>
                    <p>${member.desc}</p>
                </div>
                <div class="floating-flowers"></div> <!-- Hiệu ứng hoa rơi -->
            `;

            grid.appendChild(card);
        });

        startFlowerEffect(".floating-flowers");
    }

    // 🔍 Search Function - Tìm kiếm Profile
    document.getElementById("searchBar").addEventListener("keyup", function () {
        let input = this.value.toLowerCase();
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let name = card.querySelector(".info h2").innerText.toLowerCase();
            card.style.display = name.includes(input) ? "block" : "none";
        });
    });

    // 🃏 Hover Effect cho Card (Trang Chủ)
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

    // 🌸 Hiệu ứng Hoa Rơi (Chạy trên cả Trang Cá Nhân và Trang Chủ)
    function startFlowerEffect(containerSelector) {
        const maxFlowers = 10;
        let flowerInterval;

        function createFlower() {
            const flower = document.createElement("div");
            flower.classList.add("floating-flower");
            flower.innerHTML = "🌸";
            flower.style.left = Math.random() * 100 + "%";
            flower.style.animationDuration = (Math.random() * 5 + 3) + "s";
            flower.style.opacity = Math.random() * 0.8 + 0.2;

            document.querySelector(containerSelector).appendChild(flower);

            setTimeout(() => flower.remove(), 8000);
        }

        function startEffect() {
            flowerInterval = setInterval(() => {
                if (document.querySelectorAll(".floating-flower").length < maxFlowers) {
                    createFlower();
                }
            }, 1200);
        }

        function stopEffect() {
            clearInterval(flowerInterval);
        }

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                stopEffect();
            } else {
                startEffect();
            }
        });

        startEffect();
    }

    // ⏳ Loading Screen (Fix: Chỉ xuất hiện lần đầu tiên khi truy cập từ web khác)
    const loadingScreen = document.querySelector(".loading-screen");

    if (loadingScreen) {
        if (sessionStorage.getItem("visited")) {
            loadingScreen.style.display = "none";
        } else {
            sessionStorage.setItem("visited", "true");
            startLoadingScreen();
        }
    }

    function startLoadingScreen() {
        if (!loadingScreen) return;

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

    // 🛠 Fix lag khi quay lại tab
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            setTimeout(() => {
                document.body.style.willChange = "auto";
            }, 100);
        }
    });
});
