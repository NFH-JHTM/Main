document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script Loaded!");

    // 🔹 Tạo Profile Card tự động trong Grid (Trang Chủ)
    let grid = document.getElementById("memberGrid");
    if (grid) {
        for (let i = 1; i <= 28; i++) {
            let card = document.createElement("a");
            card.href = `pages/person${i}.html`;
            card.classList.add("card");

            card.innerHTML = `
                <img src="images/person${i}.jpg" alt="Person ${i}">
                <div class="info">
                    <h2>Nhân vật ${i}</h2>
                </div>
            `;

            grid.appendChild(card);
        }
    }

    // 🔍 Search Function - Tìm kiếm Profile
    let searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", function () {
            let input = searchBar.value.toLowerCase();
            let cards = document.querySelectorAll(".card");

            cards.forEach(card => {
                let name = card.querySelector(".info h2").innerText.toLowerCase();
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
        const maxFlowers = 10; // Giảm số hoa tối đa để tránh lag
        let flowers = [];

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

        setInterval(createFlower, 1500);
    }

    // ⏳ Loading Screen (Chỉ Chạy Ở Trang Chủ)
    const loadingScreen = document.querySelector(".loading-screen");
    if (loadingScreen) {
        let progress = 0;

        function updateLoading() {
            progress += Math.random() * 4 + 2;
            if (progress > 10
