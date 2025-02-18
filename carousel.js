document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".group");
  const cards = Array.from(carousel.children);
  const duplicateCards = cards.map((card) => card.cloneNode(true));

  // Append duplicated items to avoid the jump effect
  duplicateCards.forEach((card) => carousel.appendChild(card));
  const matchMedia = window.matchMedia("(max-width: 800px)");

  function infiniteScroll() {
    if (window.innerWidth <= 800) {
      // Only apply on mobile
      let scrollAmount = 1;
      setInterval(() => {
        carousel.scrollBy(0, scrollAmount);
        if (carousel.scrollTop >= carousel.scrollHeight / 2) {
          carousel.scrollTop = 0; // Reset to the top
        }
      }, 30);
    }
  }

  infiniteScroll();

  window.addEventListener("resize", infiniteScroll); // Reapply on resize
  if (!matchMedia.matches) {
    function updateAnimation() {
      carousel.style.animation = "scrollingX 10s linear infinite";
    }
    carousel.style.animation = "scrollingX 10s linear infinite";
    updateAnimation();
    window.addEventListener("resize", updateAnimation);

    // Prevent animation reset issue when reaching the end
    carousel.addEventListener("animationiteration", () => {
      carousel.style.animation = "none"; // Temporarily stop animation
      carousel.style.transform = "translateX(0) translateY(0)"; // Reset instantly
      void carousel.offsetWidth; // Force reflow to restart animation
      updateAnimation(); // Restart animation
    });
  }
});
