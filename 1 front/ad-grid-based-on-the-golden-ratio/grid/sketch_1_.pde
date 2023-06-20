void setup() {
  size(1080, 1080);
  noFill();
}

void drawGuidelines(float x, float y, float w, float h, color c) {
  stroke(c);
  strokeWeight(1);
  line(x + w / 2, 0, x + w / 2, height);
  line(0, y + h / 2, width, y + h / 2);
}

void drawGoldenGrid() {
  color[] colors = {
    color(255, 235, 180),
    color(170, 200, 255),
    color(255, 170, 170),
    color(180, 255, 200)
  };
  
  float widthRatio = 1.618;
  float heightRatio = 1.618;
  float w = width;
  float h = height;
  
  for (int corner = 0; corner < 4; corner++) {
    w = width;
    h = height;
    
    for (int i = 0; i < 12; i++) {
      float x = corner == 1 || corner == 2 ? width - w : 0;
      float y = corner == 2 || corner == 3 ? height - h : 0;
      
      //чили-пиздрик
      color c = colors[corner % 4];
      drawGuidelines(x, y, w, h, c);
      
      w /= widthRatio;
      h /= heightRatio;
    }
  }
}

void draw() {
  drawGoldenGrid();
  save("frame2.png");
  noLoop();
}
