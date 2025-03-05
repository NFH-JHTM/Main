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
    const loadingScreen = document.querySelector(".loading-screen");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingBar || !loadingText) {
        console.error("Lỗi: Không tìm thấy phần tử loading.");
        return;
    }

    // Kiểm tra nếu người dùng đến từ trang cá nhân thì bỏ qua loading
    const previousPage = document.referrer;
    if (previousPage.includes("person")) {
        loadingScreen.style.display = "none";
        return;
    }

    let progress = 0;

    // Hàm cập nhật thanh loading
    function updateLoading() {
        progress += Math.random() * 5 + 2; // Tăng từ 2% - 7%
        if (progress > 100) progress = 100;

        loadingBar.style.width = progress + "%";
        loadingText.innerText = `Loading... ${Math.floor(progress)}%`;

        if (progress >= 100) {
            clearInterval(loadingInterval); // Dừng loading khi đạt 100%
            setTimeout(() => {
                loadingScreen.style.opacity = "0"; // Làm mờ loading
                setTimeout(() => {
                    loadingScreen.style.display = "none"; // Ẩn hoàn toàn
                }, 500);
            }, 500);
        }
    }

    // Cập nhật mỗi 300ms để loading mượt mà
    const loadingInterval = setInterval(updateLoading, 300);
});
