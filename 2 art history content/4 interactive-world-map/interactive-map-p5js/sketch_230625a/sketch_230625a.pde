PImage map;
float zoom = 1;
float targetZoom = 1;
float offsetX = 0;
float offsetY = 0;
float targetOffsetX = 0;
float targetOffsetY = 0;

class City {
  String name;
  float x, y;
  float r = 10;
  
  City(String name, float x, float y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
  
  void display() {
    ellipse(x, y, r*2, r*2);
  }
  
  boolean isClicked() {
    return dist(mouseX, mouseY, x, y) < r;
  }
}

ArrayList<City> cities;

int clickCount = 0;
int clickMillis = 0;

void setup() {
  size(1080, 1080);
  map = loadImage("Blank_map_of_Europe_cropped 2.png");
  
  cities = new ArrayList<City>();
  cities.add(new City("Rome", 540, 540));
}

void draw() {
  background(255);
  
  zoom = lerp(zoom, targetZoom, 0.1);
  offsetX = lerp(offsetX, targetOffsetX, 0.1);
  offsetY = lerp(offsetY, targetOffsetY, 0.1);
  
  pushMatrix();
  scale(zoom);
  translate(offsetX, offsetY);
  image(map, 0, 0, width, height);
  popMatrix();
  
  for (City city : cities) {
    city.display();
  }
  
  if (millis() - clickMillis > 500) {
    clickCount = 0;
  }
}

void mouseClicked() {
  clickCount++;
  clickMillis = millis();
  
  if (clickCount == 2) {
    targetZoom = 1;
    targetOffsetX = 0;
    targetOffsetY = 0;
  } else {
    for (City city : cities) {
      if (city.isClicked()) {
        targetZoom = 2;
        targetOffsetX = -city.x * (targetZoom - 1);
        targetOffsetY = -city.y * (targetZoom - 1);
      }
    }
  }
}
