let angle = 0;
const dim = 31;
let maxAngle = 10;
const rows = 12;
const columns = 24;
let update = true;
let showText = true;
let enableRotation = true;
let randomAngle = 0;

function setup() {
  createCanvas(700, (windowHeight > 700) ? windowHeight : 700);
  strokeWeight(1.1);
  translate(220, 40);
  createGrid();
}

function draw() {
  if (update)
    background(249, 242, 236);

  fill(0);
  textSize(24);
  text("Schotter", 50, 60);
  textSize(13);
  text("Georg Nees,1960s", 50, 80);

  if (showText) {
    textSize(24);
    text(round(angle * 100) / 100 + "°", 50, 155);
    textSize(14);
    text("[t] toggle tips \n[r] rotate\n[click] freeze\n[mouseY] entropy", 50, 205);
  }
  translate(220, 40);
  fill(255, 0);

  if (update)
    createGrid();
}

//entropy grows as y increases
function createGrid() {
  for (let y = 0; y < columns * dim; y += dim) {
    angle = map(y, 0, columns * dim, 0, map(mouseY, 0, height, 0, maxAngle));
    for (let x = 0; x < rows * dim; x += dim) {
      randomAngle = random(-angle, angle);
      push();
      translate(x + randomAngle * maxAngle, y + randomAngle * maxAngle);
      if (enableRotation)
        rotate(randomAngle);
      rect(0, 0, dim, dim);
      pop();
    }
  }
}

function mouseClicked() {
  update = !update;
}

function keyPressed() {
  if (key.toLowerCase() === "t") {
    showText = !showText;
  } else if (key.toLowerCase() === "r") {
    enableRotation = !enableRotation;
  }
}
