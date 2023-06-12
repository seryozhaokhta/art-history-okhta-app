let fntBig, fntMedium, fntSmall;
let labels = ["proto", "early", "high", "late"];
let dates = ["1300—1400", "1400—1490", "1490—1527", "1527—1580"];
let labelY = [894, 935, 980, 1023];
let categoryLengths = [4, 7, 6, 6];
let selected = -1;

let images = Array(labels.length);
let x = Array(labels.length);
let y = Array(labels.length);
let step = Array(labels.length);

function preload() {
    fntBig = loadFont('PTSans-Regular.ttf');
    fntMedium = loadFont('PTSans-Regular.ttf');
    fntSmall = loadFont('PTSans-Regular.ttf');
}

function setup() {
    createCanvas(1080, 1080);

    for (let i = 0; i < labels.length; i++) {
        images[i] = Array(categoryLengths[i]);
        x[i] = Array(categoryLengths[i]);
        y[i] = Array(categoryLengths[i]);
        step[i] = Array(categoryLengths[i]);
    }
}

function draw() {
    background(255);

    if (selected != -1) {
        for (let i = 0; i < categoryLengths[selected]; i++) {
            imageMode(CENTER);
            image(images[selected][i], x[selected][i], y[selected][i]);
            x[selected][i] += step[selected][i];
            if (x[selected][i] - images[selected][i].width / 2 > width) {
                x[selected][i] = 0 - images[selected][i].width / 2;
                y[selected][i] = random(images[selected][i].height / 2, height - images[selected][i].height / 2);
            }
        }
    }

    fill(0);
    textFont(fntBig);
    text("RENAISSANCE", 18, 830);

    textFont(fntMedium);
    for (let i = 0; i < labels.length; i++) {
        if (i == selected) fill(0);
        else fill(0, 64);
        text(labels[i], 18, labelY[i]);
    }

    textFont(fntSmall);
    for (let i = 0; i < dates.length; i++) {
        if (i == selected) fill(0);
        else fill(0, 64);
        text(dates[i], 488 + i * 154, 798);
    }
}

function mousePressed() {
    selected = -1;

    for (let i = 0; i < labels.length; i++) {
        if (mouseY > labelY[i] - 36 && mouseY < labelY[i]) {
            selected = i;
            break;
        }
    }

    if (selected != -1 && images[selected][0] == null) {
        for (let i = 0; i < categoryLengths[selected]; i++) {
            images[selected][i] = loadImage("images/" + labels[selected] + "_" + (i + 1) + ".jpg");
            x[selected][i] = random(width);
            y[selected][i] = random(images[selected][i].height / 2, height - images[selected][i].height / 2);
            step[selected][i] = random(0.5, 3);
        }
    }
}
