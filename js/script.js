document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        console.log("Tab bị ẩn - Dừng hiệu ứng...");
        pauseAnimations();
    } else {
        console.log("Tab hiển thị lại - Tiếp tục hiệu ứng!");
        resumeAnimations();
    }
});

function pauseAnimations() {
    // Dừng hiệu ứng hoa rơi
    let flowers = document.querySelectorAll(".floating-flower");
    flowers.forEach(flower => flower.remove()); // Xóa hết hoa đang bay

    // Dừng loading (nếu có)
    let loadingBar = document.querySelector(".loading-bar");
    if (loadingBar) loadingBar.style.animationPlayState = "paused";
}

function resumeAnimations() {
    // Tiếp tục loading (nếu có)
    let loadingBar = document.querySelector(".loading-bar");
    if (loadingBar) loadingBar.style.animationPlayState = "running";

    // Bắt đầu lại hiệu ứng hoa rơi (nếu đang ở trang cá nhân)
    if (document.querySelector(".profile-container")) {
        setTimeout(createFlower, 500);
    }
}
