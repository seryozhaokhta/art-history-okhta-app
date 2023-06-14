PFont fntBig, fntMedium, fntSmall;
String[] labels = {"proto", "early", "high", "late"};
String[] dates = {"1300–1400", "1400–1490", "1490–1527", "1527–1580"};
int[] labelY = {894, 935, 980, 1023};
int[] categoryLengths = {4, 7, 6, 6};
int selected = -1;
PImage[][] images = new PImage[labels.length][];
float[][] x, y;
boolean[][] hovered;
float scaleFactor = 1.2f;
float scaleSpeed = 0.2f;
float[][] currentScale;
float opacitySpeed = 0.02f;
float[][] opacity;
boolean refresh = false;
boolean reloadButtonHovered = false;
float reloadButtonScale = 1;
float reloadButtonScaleMax = 1.2f;
boolean clicked = false;

boolean dragging = false;
int draggingIdx = -1;

void setup() {
  size(1080, 1080);
  frameRate(60);
  fntBig = createFont("PTSans-Bold.ttf", 60);
  fntMedium = createFont("PTSans-Regular.ttf", 36);
  fntSmall = createFont("PTSans-Regular.ttf", 20);
  x = new float[labels.length][];
  y = new float[labels.length][];
  opacity = new float[labels.length][];
  currentScale = new float[labels.length][];
  hovered = new boolean[labels.length][];
  for (int i = 0; i < labels.length; i++) {
    images[i] = new PImage[categoryLengths[i]];
    x[i] = new float[categoryLengths[i]];
    y[i] = new float[categoryLengths[i]];
    opacity[i] = new float[categoryLengths[i]];
    currentScale[i] = new float[categoryLengths[i]];
    hovered[i] = new boolean[categoryLengths[i]];
    for (int j = 0; j < categoryLengths[i]; j++) {
      images[i][j] = loadImage(labels[i] + "_" + (j+1) + ".png");
      images[i][j].resize(int(images[i][j].width * 0.8), int(images[i][j].height * 0.8));
      x[i][j] = random(images[i][j].width / 2, width - images[i][j].width / 2);
      y[i][j] = random(images[i][j].height / 2, (height - images[i][j].height) * 0.68);
      opacity[i][j] = 0;
      currentScale[i][j] = 1;
    }
  }
}

void draw() {
  if (refresh) {
    setup();
    refresh = false;
  }
  background(24);
  if (selected != -1) {
    for (int i = 0; i < categoryLengths[selected]; i++) {
      if(images[selected][i] != null){
        imageMode(CENTER);
        pushMatrix();
        translate(x[selected][i], y[selected][i]);
        currentScale[selected][i] = min(currentScale[selected][i] + (hovered[selected][i] ? scaleFactor - currentScale[selected][i] : 1 - currentScale[selected][i]) * scaleSpeed, scaleFactor);
        scale(currentScale[selected][i]);
        tint(255, opacity[selected][i]);
        image(images[selected][i], 0, 0);
        popMatrix();
        if (hovered[selected][i]) {
          opacity[selected][i] += (255 - opacity[selected][i]) * opacitySpeed;
        } else {
          opacity[selected][i] += (200 - opacity[selected][i]) * opacitySpeed;
        }
        hovered[selected][i] = dist(mouseX, mouseY, x[selected][i], y[selected][i]) < images[selected][i].width/2 * currentScale[selected][i];
        if (dragging && draggingIdx == i) {
          x[selected][i] = mouseX;
          y[selected][i] = mouseY;
        }
      }
    }
  }
  fill(255);
  textFont(fntBig);
  text("RENAISSANCE", 18, 830);
  textFont(fntMedium);
  for (int i = 0; i < labels.length; i++) {
    if (i == selected) fill(255);
    else fill(255, 64);
    text(labels[i], 18, labelY[i]);
  }
  textFont(fntSmall);
  for (int i = 0; i < dates.length; i++) {
    if (i == selected) fill(255);
    else fill(255, 64);
    text(dates[i], 488 + i*154, 830);
  }
  noFill(); 
  stroke(255);
  strokeWeight(0.68);
  pushMatrix();
  translate(1030, 1030);
  if (clicked) {
    reloadButtonScale = lerp(reloadButtonScale, 1, 0.68);
    if (reloadButtonScale < 1.01) {
      clicked = false;
      reloadButtonScale = 1;
    }
  } else {
    reloadButtonScale = min(reloadButtonScale + (reloadButtonHovered ? reloadButtonScaleMax - reloadButtonScale : 1 - reloadButtonScale) * scaleSpeed, reloadButtonScaleMax);
  }
  scale(reloadButtonScale);
  ellipse(0, 0, 50, 50);
  popMatrix();
  
  fill(255, 228, 0, 220); 
  noStroke();
  ellipse(mouseX, mouseY, 12, 12);
  reloadButtonHovered = dist(mouseX, mouseY, 1030, 1030) <= 50/2 * reloadButtonScale;
  
  //saveFrame("frame/######.png");
  
}

void mousePressed() {
  if (dist(mouseX, mouseY, 1030, 1030) <= 50/2 * reloadButtonScale) {
    refresh = true;
    clicked = true;
    return;
  }

  boolean labelClicked = false;
  for (int i = 0; i < labels.length; i++) {
    if (mouseY > labelY[i] - 36 && mouseY < labelY[i]) {
      selected = i;
      labelClicked = true;
      break;
    }
  }

  if (!labelClicked && selected != -1) {
    boolean imageClicked = false;
    for (int i = 0; i < categoryLengths[selected]; i++) {
      if (dist(mouseX, mouseY, x[selected][i], y[selected][i]) < images[selected][i].width/2 * currentScale[selected][i]) {
        imageClicked = true;
        break;
      }
    }
    if (!imageClicked) selected = -1;
  }

  if (selected != -1) {
    for (int i = 0; i < categoryLengths[selected]; i++) {
      if (dist(mouseX, mouseY, x[selected][i], y[selected][i]) < images[selected][i].width/2 * currentScale[selected][i]) {
        dragging = true;
        draggingIdx = i;
        break;
      }
    }
  }
}

void mouseReleased() {
  dragging = false;
}
