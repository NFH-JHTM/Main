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

    const maxFlowers = 15; // 🌸 Giới hạn số hoa tối đa trên màn hình
    let flowers = [];

    function createFlower() {
        if (flowers.length >= maxFlowers) return; // Nếu đủ 15 hoa thì không tạo thêm

        const flower = document.createElement("div");
        flower.classList.add("floating-flower");
        flower.innerHTML = "🌸";

        // Vị trí random quanh màn hình nhưng giới hạn trong vùng profile
        flower.style.left = Math.random() * window.innerWidth * 0.8 + "px";
        flower.style.top = "-50px";
        flower.style.animationDuration = (Math.random() * 4 + 3) + "s"; // 3-7 giây

        document.body.appendChild(flower);
        flowers.push(flower);

        // Xóa sau khi hoàn thành animation
        setTimeout(() => {
            flower.remove();
            flowers.shift(); // Xóa khỏi mảng để tiếp tục tạo hoa mới
        }, 7000);
    }

    // 🌸 Giảm tần suất tạo hoa (mượt hơn, tránh lag)
    setInterval(createFlower, 1500);
});

