window.onload = function () {
  const timelineButtons = Array.from(
    document.querySelectorAll("#timeline button")
  );
  const imageGroups = Array.from(document.querySelectorAll(".image-group"));

  imageGroups.forEach((group) => {
    displayImages(group.id);
  });

  timelineButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const period = button.dataset.period;

      imageGroups.forEach((group) => {
        group.style.display = "none";
      });

      displayImages(period);
    });
  });
};

function displayImages(period) {
  const groupElement = document.getElementById(period);
  groupElement.style.display = "block";

  const images = Array.from(groupElement.querySelectorAll(".gallery-image"));

  images.forEach((image, index) => {
    image.style.top = `${(window.innerHeight - image.offsetHeight) / 2}px`;
    image.style.left = `${(window.innerWidth - image.offsetWidth) / 2}px`;

    setTimeout(() => {
      image.style.opacity = "1";
      image.style.transform = "scale(1)";
    }, index * 500);

    let targetX = Math.random() * (window.innerWidth - image.offsetWidth);
    let targetY = Math.random() * (window.innerHeight - image.offsetHeight);

    function moveImage() {
      let currentX = parseFloat(image.style.left);
      let currentY = parseFloat(image.style.top);

      if (
        Math.abs(targetX - currentX) < 1 &&
        Math.abs(targetY - currentY) < 1
      ) {
        targetX = Math.random() * (window.innerWidth - image.offsetWidth);
        targetY = Math.random() * (window.innerHeight - image.offsetHeight);
      }

      image.style.left = currentX + (targetX - currentX) * 0.01 + "px";
      image.style.top = currentY + (targetY - currentY) * 0.01 + "px";

      requestAnimationFrame(moveImage);
    }

    moveImage();

    image.addEventListener("mouseover", () => {
      image.style.transform = "scale(1.1)";
    });

    image.addEventListener("mouseout", () => {
      image.style.transform = "scale(1)";
    });

    let mouseDown = false;
    let startX, startY, initialX, initialY;

    image.addEventListener("mousedown", (event) => {
      startX = event.clientX;
      startY = event.clientY;
      initialX = parseFloat(image.style.left);
      initialY = parseFloat(image.style.top);
      mouseDown = true;
      event.preventDefault();
    });

    document.addEventListener("mousemove", (event) => {
      if (mouseDown) {
        let deltaX = event.clientX - startX;
        let deltaY = event.clientY - startY;
        image.style.left = initialX + deltaX + "px";
        image.style.top = initialY + deltaY + "px";
        event.preventDefault();
      }
    });

    image.addEventListener("mouseup", () => {
      mouseDown = false;
    });

    image.addEventListener("mouseleave", () => {
      mouseDown = false;
    });
  });

  document.addEventListener("mousemove", (event) => {
    images.forEach((image) => {
      targetX = event.clientX;
      targetY = event.clientY;
    });
  });
}
