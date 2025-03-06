document.addEventListener("DOMContentLoaded", function () {
    let grid = document.getElementById("memberGrid");
    
    for (let i = 1; i <= 28; i++) {
        let card = document.createElement("a");
        card.href = `pages/person${i}.html`;
        card.classList.add("card");
        
        card.innerHTML = `
            <img src="images/person${i}.jpg" alt="Person ${i}">
            <div class="info">
                <p>Nhân vật ${i}</p>
            </div>
        `;
        
        grid.appendChild(card);
    }
});

function searchCards() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.querySelector("h2").innerText.toLowerCase();
        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
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
});

document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".profile-container")) return; // Chỉ chạy trong trang cá nhân

    const maxFlowers = 15; // 🌸 Giữ giới hạn hoa tối đa là 15
    let flowers = [];
    let flowerInterval;

    function createFlower() {
        if (flowers.length >= maxFlowers) return; // Nếu đủ 15 hoa thì không tạo thêm

        const flower = document.createElement("div");
        flower.classList.add("floating-flower");
        flower.innerHTML = "🌸";

        // Vị trí random quanh màn hình nhưng giới hạn trong vùng profile
        flower.style.left = Math.random() * window.innerWidth * 0.9 + "px";
        flower.style.top = "-50px"; 
        flower.style.animationDuration = (Math.random() * 4 + 3) + "s"; // 3-7 giây
        flower.style.fontSize = Math.random() * 10 + 20 + "px"; // Kích thước từ 20px - 30px

        document.body.appendChild(flower);
        flowers.push(flower);

        // Xóa sau khi hoàn thành animation
        setTimeout(() => {
            flower.remove();
            flowers.shift(); // Xóa khỏi mảng để tiếp tục tạo hoa mới
        }, 7000);
    }

    // 🌸 Tạo hoa mỗi 1200ms
    function startFlowerEffect() {
        if (!flowerInterval) {
            flowerInterval = setInterval(createFlower, 1200);
        }
    }

    function stopFlowerEffect() {
        clearInterval(flowerInterval);
        flowerInterval = null;
    }

    // Khi tab bị ẩn, dừng tạo hoa
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopFlowerEffect();
        } else {
            startFlowerEffect();
        }
    });

    // Bắt đầu hiệu ứng hoa khi trang load
    startFlowerEffect();
});
