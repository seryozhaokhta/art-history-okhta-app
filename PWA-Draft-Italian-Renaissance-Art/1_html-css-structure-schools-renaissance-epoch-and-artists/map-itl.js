class City {
  constructor(name, periods, x, y) {
    this.name = name;
    this.periods = periods;
    this.x = x;
    this.y = y;
    this.r = 5;
    this.opacity = 0.5;
    this.sections = this.periods.map((period) =>
      document.getElementById(`${name}-${period}`)
    );
  }

  display() {
    strokeWeight(0.68);
    noFill();
    stroke(0, this.opacity * 255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  highlight() {
    this.opacity = 1.0;
    this.sections.forEach(
      (section) => section && section.classList.add("highlight")
    );
  }

  noHighlight() {
    this.opacity = 0.5;
    this.sections.forEach(
      (section) => section && section.classList.remove("highlight")
    );
  }
}

let cities = [];

function preload() {
  img = loadImage("Blank_map_of_Europe_cropped 2.png");
}

function setup() {
  let canvasContainer = document.getElementById("map-container");
  let canvas = createCanvas(
    canvasContainer.offsetWidth,
    canvasContainer.offsetHeight
  );
  canvas.parent("map");
  img.resize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
  image(img, 0, 0, canvasContainer.offsetWidth, canvasContainer.offsetHeight);

  cities.push(
    new City("Florentine", ["proto", "early", "high", "late"], 504, 828)
  );
  cities.push(new City("Sienese", ["proto"], 503, 844));
  cities.push(new City("Venetian", ["early", "high", "late"], 527, 780));
  cities.push(new City("Roman", ["high", "late"], 532, 887));
  cities.push(new City("Parma", ["late"], 486, 802));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  image(img, 0, 0, windowWidth, windowHeight);
}

function draw() {
  clear();
  if (img) {
    image(img, 0, 0, 1080, 1080);
  }

  for (let i = 0; i < cities.length; i++) {
    cities[i].display();

    if (cities[i].contains(mouseX, mouseY)) {
      cities[i].highlight();
    } else {
      cities[i].noHighlight();
    }
  }
}
