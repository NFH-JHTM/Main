document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded! 🚀");

    // 📌 Lazy Load Ảnh - Chỉ tải khi cần
    let lazyImages = document.querySelectorAll("img.avatar");
    let lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.dataset.src; // Tải ảnh
                img.classList.add("fade-in");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyObserver.observe(img);
    });

    // 🔹 Giới hạn hiệu ứng hoa rơi để không lag
    const profilePage = document.querySelector(".profile-container");
    if (profilePage) {
        const maxFlowers = 10; // Giảm số lượng hoa để tránh lag
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
                flowerInterval = setInterval(createFlower, 1500);
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

    // 🔹 Tối ưu Loading Screen - Load nhanh hơn
    const loadingScreen = document.querySelector(".loading-screen");
    if (loadingScreen) {
        let progress = 0;

        function updateLoading() {
            progress += Math.random() * 10 + 5; // Load nhanh hơn
            if (progress > 100) progress = 100;

            document.querySelector(".loading-bar").style.width = progress + "%";
            document.querySelector(".loading-text").innerText = `Loading... ${Math.floor(progress)}%`;

            if (progress < 100) {
                setTimeout(updateLoading, 200); // Giảm delay
            } else {
                setTimeout(() => {
                    loadingScreen.style.opacity = "0";
                    setTimeout(() => {
                        loadingScreen.style.display = "none";
                    }, 400);
                }, 400);
            }
        }

        setTimeout(updateLoading, 200);
    }

    // 🔹 Hiển thị 10 profile card đầu tiên, scroll mới load thêm
    let grid = document.querySelector(".grid");
    if (grid) {
        let loadedCount = 10; // Số card ban đầu
        let totalMembers = 28;

        function loadMoreCards() {
            let fragment = document.createDocumentFragment();
            let end = Math.min(loadedCount + 10, totalMembers);

            for (let i = loadedCount + 1; i <= end; i++) {
                let card = document.createElement("a");
                card.href = `pages/person${i}.html`;
                card.classList.add("card");

                card.innerHTML = `
                    <img data-src="images/person${i}.jpg" class="avatar lazy">
                    <div class="info">
                        <h2>Nhân vật ${i}</h2>
                        <p>✨ Lovely Member</p>
                    </div>
                `;

                fragment.appendChild(card);
            }

            grid.appendChild(fragment);
            loadedCount += 10;

            if (loadedCount >= totalMembers) {
                window.removeEventListener("scroll", scrollHandler);
            }
        }

        function scrollHandler() {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                loadMoreCards();
            }
        }

        window.addEventListener("scroll", scrollHandler);
    }
});
