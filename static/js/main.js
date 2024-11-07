document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let boat = document.getElementById("boat");

    // Move boat along Y axis as you scroll
    boat.style.top = (100 + scrollPosition * 0.5) + "px";
    
    // Highlight collapsible sections on scroll
    let sections = document.querySelectorAll('.education-item');

    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            // Add highlight or interaction when the section is visible
            section.style.border = "2px solid #c08f57"; // Example highlight style
        } else {
            // Remove highlight when not visible
            section.style.border = "none";
        }
    });
});

document.addEventListener("scroll", function () {
    let path = document.getElementById("swirlPath");
    let boat = document.getElementById("boat");
    let pathLength = path.getTotalLength();
    let scrollMax = document.body.scrollHeight - window.innerHeight;

    // Calculate scroll position as a percentage of the total scrollable height
    let scrollPercentage = Math.min(window.scrollY / scrollMax, 1); // Limit to 1 (100%)

    // Get the point on the path corresponding to the scroll position
    let point = path.getPointAtLength(scrollPercentage * pathLength);

    // Position the boat at the point on the path
    boat.style.transform = `translate(${point.x}px, ${point.y}px)`;
});
