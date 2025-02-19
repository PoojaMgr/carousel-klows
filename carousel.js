let xDown = null;
let yDown = null;

const cardIndex = {
  leftSwipe: 4,
  rightSwipe: 6,
};

const slider = document.getElementById("container");
const group = document.getElementById("group");
const originalGroupLength = group.children.length;

const handleTouchStart = (evt) => {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
};

const handleTouchEnd = (evt) => {
  evt.preventDefault();
  if (!xDown || !yDown) return;

  const xDiff = xDown - evt.changedTouches[0].clientX;
  const yDiff = yDown - evt.changedTouches[0].clientY;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    xDiff > 0 ? updateSlide("left") : updateSlide("right");
  }

  xDown = null;
  yDown = null;
};

const updateSlide = (direction) => {
  const fragment = document.createDocumentFragment();

  if (direction === "left") {
    if (cardIndex.leftSwipe === 7) cardIndex.leftSwipe = 1;
    fragment.appendChild(
      createCard(
        `./images/${cardIndex.leftSwipe}.jpg`,
        `bird${cardIndex.leftSwipe}`
      )
    );
    cardIndex.leftSwipe++;
    group.appendChild(fragment);
    if (group.children.length > originalGroupLength) group.children[0].remove();
  } else {
    cardIndex.rightSwipe--;
    if (cardIndex.rightSwipe === 0) cardIndex.rightSwipe = 6;
    fragment.prepend(
      createCard(
        `./images/${cardIndex.rightSwipe}.jpg`,
        `bird${cardIndex.rightSwipe}`
      )
    );
    group.prepend(fragment);
    if (group.children.length > originalGroupLength)
      group.lastElementChild.remove();
  }
};

/** Create dynamic cards */
const createCard = (imageSrc, altText) => {
  const card = document.createElement("div");
  card.id = "card";
  const anchor = document.createElement("a");
  anchor.id = "image-container";
  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = altText;
  img.loading = "lazy";
  anchor.appendChild(img);
  card.appendChild(anchor);
  return card;
};

const showSlides = (n) => {
  if (n.code === "ArrowLeft" || n >= 1) updateSlide("right");
  if (n.code === "ArrowRight" || n < 1) updateSlide("left");
};
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchend", handleTouchEnd);
document.addEventListener("keydown", showSlides);
