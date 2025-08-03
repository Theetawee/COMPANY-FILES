document.addEventListener("DOMContentLoaded", function () {
    // Select the navbar element
    const navbar = document.getElementById("navbar");
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Add transition class to navbar if not already present
    navbar.classList.add("transition-transform", "duration-300");

    // Function to handle scroll events
    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Get current scroll position
                const currentScrollY = window.scrollY;

                // Determine scroll direction and position
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scrolling down & not at top - hide navbar
                    navbar.style.transform = "translateY(-100%)";
                } else {
                    // Scrolling up or at top - show navbar
                    navbar.style.transform = "translateY(0)";
                }

                // Update last scroll position
                lastScrollY = currentScrollY;
                ticking = false;
            });

            ticking = true;
        }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Optional: Reset navbar position when page is at top
    window.addEventListener(
        "scroll",
        () => {
            if (window.scrollY === 0) {
                navbar.style.transform = "translateY(0)";
            }
        },
        { passive: true }
    );
});
