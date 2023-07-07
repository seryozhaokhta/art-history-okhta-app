document.querySelectorAll(".school__name").forEach(function (element) {
  element.addEventListener("mouseover", function () {
    let schoolId = this.parentElement.id.split("-")[0] + "-school";
    let ellipse = document.getElementById(schoolId);
    ellipse.style.stroke = "#000";
    animate(ellipse, { rx: 5, ry: 5 }, 300);
  });

  element.addEventListener("mouseout", function () {
    let schoolId = this.parentElement.id.split("-")[0] + "-school";
    let ellipse = document.getElementById(schoolId);
    ellipse.style.stroke = "rgba(0, 0, 0, 0.5)";
    animate(ellipse, { rx: 2, ry: 2 }, 300);
  });
});

function animate(element, properties, duration) {
  let startProperties = {};
  for (let prop in properties) {
    startProperties[prop] = element.getAttribute(prop);
  }

  let startTime = performance.now();

  function step(currentTime) {
    let elapsedTime = currentTime - startTime;
    let progress = Math.min(elapsedTime / duration, 1);

    for (let prop in properties) {
      let startValue = +startProperties[prop];
      let endValue = properties[prop];
      let value = startValue + (endValue - startValue) * progress;
      element.setAttribute(prop, value);
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
