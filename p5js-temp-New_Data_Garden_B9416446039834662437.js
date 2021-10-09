let table;
let listLength;
let date;
let today;

let JoCount, StefCount;

let night;

y = 0;
let movement = 0;
let spin = 0;
let beeAngle = 0;
let petals = 8;

let daisy, leafL, leafR, lemon, lemonStef, cherry, sun, cloud, bee, croissant;

function preload() {
  table = loadTable("data/StefData4.csv", "csv", "header");
  daisy = loadImage("data/whiteDaisy.png");
  leafR = loadImage("data/leafR.png");
  leafL = loadImage("data/leafL.png");
  lemon = loadImage("data/lemon.png");
  lemonStef = loadImage("data/lemonStef.png");
  cherry = loadImage("data/cherries.png");
  sun = loadImage("data/sun.png");
  cloud = loadImage("data/cloud.png");
  bee = loadImage("data/bee.png");
  croissant = loadImage("data/croissant.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight + 550);
  night = createGraphics(windowWidth, windowHeight + 550);
  listLength = table.getRowCount();
  console.log(listLength);
  date = table.getString(100, "DATE");
  today = date;
  frameRate(15);
  angleMode(DEGREES);
}

function draw() {

   // background colours
   
  background(209, 237, 250); 


  //clouds
  
  drawCloud(15, 200);
  drawCloud(120, 500);
  drawCloud(300, 360);

 // sun-to-moon
 
  let sunMouseX = constrain(mouseX, 100, windowWidth-100);
image(sun, sunMouseX, 45, 120, 120);

// welcome message

  textFont("recoleta");
  textSize(45);
  textAlign(LEFT);
  fill(0);
  noStroke();
  text("Hello!", windowWidth/9, 200);
  textFont("pt mono");
  textSize(15);
  //let subhead = "Welcome to the Emoji Garden! My friend Stef and I love emojis. (And she loves lemons.)  Anyway, this is a visual representation of our Facebook message thread! Hover over each element to read.";
  text("Welcome to the Emoji Garden!", windowWidth/9, 230, 400, 300);
  //text("You can scroll down too!", windowWidth/9, 335, 400, 300);

// stems & plants!

  let Ground = windowHeight + 420;

  for (let i = 0; i < listLength; i++) {
    date = table.getString(i, "DATE");
    console.log(date);

    let texts = table.getString(i, "MESSAGE");

     // Daisies

    if (today != date) {
      push();
      translate(today * (windowWidth/40), Ground - y - 30);
      rotate(spin);
 drawFlower("white", 0, 0, 20);
      pop();
      spin = spin + 0.1;
      y = 0;
    }

    // Numbers (dates)
    noStroke();
    fill(0);
    let flowerSpacing = windowWidth/40;
    textFont("pt mono");
    textAlign(CENTER);
    textSize(15);
    text(date, date * flowerSpacing, Ground + 30);

    today = date;
    y += 9;
    let Stem = Ground - y;

    // Stems
    
    push();
    stroke(94, 119, 3);
    strokeWeight(2.4);
    line(date * flowerSpacing, Stem+10, date * flowerSpacing, Stem - 20);
    pop();

    stroke(0);
    strokeWeight(1);
    
    // Leaves & fruits

    let Person = table.get(i, "SENDER");

    // stef is left, jo is right
    fill(255);
    if (Person === "Joanne Amarisa") {
      image(leafR, date * flowerSpacing - 4, Stem-10, 20, 20);
      //ellipse(date * flowerSpacing - 4, Stem, 10, 10);
    } else if (Person === "Stefeny Cheng") {
      image(leafL, date * flowerSpacing - 18, Stem-10, 20, 20);
      //ellipse(date * flowerSpacing + 4, Stem, 10, 10);
    }

    //Hover function
    
    var JoLeaf = {
    x:
    date * flowerSpacing - 4,
    y:
    Stem-10,
    diameter:
    20
  }

  if (mouseX >= JoLeaf.x && mouseX <=JoLeaf.x + 20 && mouseY >= Stem-5 && mouseY <= Stem) {
    textHoverJo();
    text(texts, mouseX + 15, mouseY - 30, 140, 90);
  }

  //StefLeaf Hover
  var StefLeaf = {
  x:
  date * flowerSpacing - 18,
  y:
  Stem-10,
  diameter:
  20
}

if (mouseX >= StefLeaf.x && mouseX <=StefLeaf.x + 20 && mouseY >= Stem-5 && mouseY <= Stem) {
  textHoverStef();
  text(texts, mouseX -165, mouseY - 90, 140, 90);
}

let Reacts = table.get(i, "REACT");

if (Reacts === "TRUE") {
  push();
  imageMode(CENTER);
  image(cherry, date * flowerSpacing, Stem, 20, 20);
  pop();

  var cherries = {
  x:
  date * flowerSpacing,
  y:
  Stem,
  diameter:
  20
  }

if (mouseX >= cherries.x-10 && mouseX <=cherries.x + 10 && mouseY >= Stem-10 && mouseY <= Stem+10) {
  cherryHover();
}
//ellipse(date * flowerSpacing, Stem, 10, 10);
}

let JoCaps = table.get(i, "JOCAPS");

if (JoCaps == "TRUE") {
  image(lemon, date * flowerSpacing, Stem, 20, 20);
  //      fill("orange");
  //      noStroke();
  //      ellipse(date * flowerSpacing - 4, Stem, 6, 6);
}

let StefCaps = table.get(i, "STEFCAPS");

if (StefCaps == "TRUE") {
  image(lemonStef, date * flowerSpacing - 15, Stem, 20, 20);
  //fill("orange");
  //noStroke();
  //ellipse(date * flowerSpacing + 4, Stem, 6, 6);
}

push();
stroke(0);
strokeWeight(3);
line(0, Ground, windowWidth, Ground);
pop();
}

// bee
push();
translate(mouseX+20, mouseY-20);
let beeShakeX = random (5);
let beeShakeY = random(-10, -5);
translate(beeShakeX, beeShakeY);
image(bee, 0, 0, 20, 20);
beeAngle= beeAngle + 1;
pop();
//fill("yellow");
//ellipse(mouseX + 20, mouseY + 20, 15, 15);
}

function drawCloud(cloudX, cloudY) {
  let positionX = cloudX + movement;

  if (positionX >= windowWidth) {
    positionX = 0;
    movement = 0;
  }
  push();
  //fill(255);
  translate(positionX, cloudY);
  //ellipse(20, 0, 80);
  //ellipse(90, 10, 60);
  //ellipse(60, -20, 70);
  //fill(bgColour);
  //rect(-40, 0, 200, 50);
  image(cloud, 20, 0, 90, 90);
  movement = movement + 0.6;

  pop();
}

//function windowResized(){
// resizeCanvas(windowWidth, windowHeight);
// draw();
//}

function textHoverJo() {
  noStroke();
  fill(255);
  rect(mouseX + 10, mouseY - 60, 150, 100);

  fill(0);
  textAlign(LEFT);
  textSize(12);
  text("Jo says:", mouseX + 15, mouseY - 55, 150, 100);
}

function textHoverStef() {
  noStroke();
  fill(255);
  rect(mouseX - 170, mouseY - 110, 150, 100);

  fill(0);
  textAlign(LEFT);
  textSize(12);
  text("Stef says:", mouseX -165, mouseY - 105, 150, 100);
}

function cherryHover() {
  noStroke();
  fill("red");
  ellipse(mouseX+60, mouseY+20, 30, 30);
}

function drawFlower(petalColour, flowerX, flowerY, size) {

  push();
  noStroke();
  translate(flowerX,flowerY);
    // petals
  for (let i = 0; i < petals; i++) {
    fill(petalColour);
    ellipse(size/2, 0, size-10, size-10);
    rotate(360/petals);
  }

  fill("orange");
  ellipse(0, 0, size, size);
  pop();
}
