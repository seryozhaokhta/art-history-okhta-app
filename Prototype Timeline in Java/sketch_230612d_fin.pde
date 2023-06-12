PFont fntBig, fntMedium, fntSmall;
String[] labels = {"proto", "early", "high", "late"};
String[] dates = {"1300–1400", "1400–1490", "1490–1527", "1527–1580"};
int[] labelY = {894, 935, 980, 1023};
int[] categoryLengths = {4, 7, 6, 6};
int selected = -1;

PImage[][] images = new PImage[labels.length][];
float[][] x, y, z, sz;

void setup() {
  size(1080, 1080, P3D);
  fntBig = createFont("PTSans-Regular.ttf", 60);
  fntMedium = createFont("PTSans-Regular.ttf", 36);
  fntSmall = createFont("PTSans-Regular.ttf", 20);

  x = new float[labels.length][];
  y = new float[labels.length][];
  z = new float[labels.length][];
  sz = new float[labels.length][];

  for (int i = 0; i < labels.length; i++) {
    images[i] = new PImage[categoryLengths[i]];
    x[i] = new float[categoryLengths[i]];
    y[i] = new float[categoryLengths[i]];
    z[i] = new float[categoryLengths[i]];
    sz[i] = new float[categoryLengths[i]];
  }
}

void draw() {
  background(255);
  fill(0);
  textFont(fntBig);
  text("RENAISSANCE", 18, 830);
  textFont(fntMedium);
  
  for (int i = 0; i < labels.length; i++) {
    if (i == selected) fill(0);
    else fill(0, 64);
    text(labels[i], 18, labelY[i]);
  }

  textFont(fntSmall);
  for (int i = 0; i < dates.length; i++) {
    if (i == selected) fill(0);
    else fill(0, 64);
    text(dates[i], 488 + i*154, 858);
  }

  if (selected != -1) {
    for (int i = 0; i < categoryLengths[selected]; i++) {
      pushMatrix();
      translate(x[selected][i], y[selected][i], z[selected][i]);
      imageMode(CENTER);
      image(images[selected][i], 0, 0);
      popMatrix();
      
      z[selected][i] += sz[selected][i];
      if (z[selected][i] > 200) {
        x[selected][i] = random(width);
        y[selected][i] = random(height);
        z[selected][i] = -1000;
      }
    }
  }
}

void mousePressed() {
  selected = -1;
  
  for (int i = 0; i < labels.length; i++) {
    if (mouseY > labelY[i] - 36 && mouseY < labelY[i]) {
      selected = i;
      break;
    }
  }

  if (selected != -1 && images[selected][0] == null) {
    for (int i = 0; i < categoryLengths[selected]; i++) {
      images[selected][i] = loadImage(labels[selected] + "_" + (i+1) + ".jpg");
      x[selected][i] = random(width);
      y[selected][i] = random(height);
      z[selected][i] = random(-1000, 200);
      sz[selected][i] = random(2, 5);
    }
  }
}
