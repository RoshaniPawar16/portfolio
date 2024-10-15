document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let boat = document.getElementById("boat");

    // Move boat along Y axis as you scroll
    boat.style.top = (100 + scrollPosition * 0.5) + "px";  
});
