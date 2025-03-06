document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded! 🚀");

    // 🔹 Tạo Profile Card tự động trong Grid (Trang Chủ)
    let grid = document.getElementById("memberGrid");
    if (grid && grid.children.length === 0) { // Tránh tạo trùng lặp
        for (let i = 1; i <= 28; i++) {
            let card = document.createElement("a");
            card.href = `pages/person${i}.html`;
            card.classList.add("card");

            card.innerHTML = `
    <img src="images/person${i}.jpg" class="avatar small-img" loading="lazy" 
         onmouseover="this.classList.remove('small-img')" 
         onmouseout="this.classList.add('small-img')">
    <div class="info">
        <h2>Nhân vật ${i}</h2>
        <p>✨ Skibidi toilet</p>
    </div>
`;


    // 🔍 Search Function - Tìm kiếm Profile
    let searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("keyup", function () {
            let input = searchBar.value.toLowerCase();
            let cards = document.querySelectorAll(".card");

            cards.forEach(card => {
                let name = card.querySelector(".info p").innerText.toLowerCase();
                card.style.display = name.includes(input) ? "block" : "none";
            });
        });
    }

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

    // 🌸 Hiệu ứng Hoa Rơi (Chỉ Trong Trang Cá Nhân)
    const profilePage = document.querySelector(".profile-container");
    if (profilePage) {
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
    }

    // ⏳ Loading Screen (Chỉ Chạy Ở Trang Chủ)
     const loadingScreen = document.querySelector(".loading-screen");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingBar || !loadingText) {
        console.error("❌ Không tìm thấy phần tử loading!");
        return;
    }

    // Kiểm tra nếu đến từ trang cá nhân thì bỏ qua loading
    if (document.referrer.includes("person")) {
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

    // Chạy loading sau 0.5s để tránh lag
    setTimeout(updateLoading, 500);
});
