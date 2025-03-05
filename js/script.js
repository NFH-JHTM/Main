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
    let progress = 0;
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");
    const loadingScreen = document.querySelector(".loading-screen");

    if (!loadingBar || !loadingText || !loadingScreen) {
        console.error("Lỗi: Không tìm thấy phần tử loading.");
        return;
    }

    
    const previousPage = document.referrer;
    if (previousPage.includes("person")) { 
        loadingScreen.style.display = "none"; 
        return;
    }

    function updateLoading() {
        progress += Math.random() * 7 + 3; 
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
                }, 500);
            }, 500);
        }
    }

    setTimeout(updateLoading, 800); 
});
