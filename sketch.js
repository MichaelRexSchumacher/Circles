
let table;

function preload() {
  //load the file with circle genetics
  table = loadTable('genetics.csv', 'csv', 'header');
}



function setup() {

  canvasSize = 400;
  xPos = canvasSize / 2;
  yPos = canvasSize / 2;
  createCanvas(canvasSize, canvasSize + 100); //adding some space to the bottom of the canvas
  colorMode(HSL);
  background(0, 0, 0);
  noLoop();

}


function draw() {


  //Set up the colors and comlimentary
  //https://dev.to/benjaminadk/make-color-math-great-again--45of
  //HSL will eventually be parameters from parents
  //Stroke Weight will be a parameter
  //Small Circle Size and Position will be parameters

  //Get the genetic values of the intial parents.
  //This will be a giant loop. Advance the generation each time.
  let gen = 0;
  let parentGenetics = getParentGenetics(gen);
  let childGenetics = calculateChildGenetics(parentGenetics);


   //apply the genetics from the child.
  h = childGenetics.hC;
  s = childGenetics.sC;
  l = childGenetics.lC;
  sw = childGenetics.swC;
  largeCircleSize =  canvasSize - (sw * 2);
  smallCircleSize = childGenetics.sz;
  posX = childGenetics.posX;
  posY = childGenetics.posY;

 
  ///////////////////////
  //Large circle
  largeCircleHue = h;
  strokeHue = (h + 150) % 360;
  stroke(strokeHue, s, l);
  drawCircles(largeCircleHue, s, l, xPos, yPos, largeCircleSize, sw);
  print("Large Circle Size: " + largeCircleSize);
  print("Large Circle Hue: " + largeCircleHue);
  print("Large Circle Sat: " + s);
  print("Large Circle Lum: " + l);
  print("Stroke Hue: " + strokeHue);

  //small circle
  smallCircleHue = (h + 210) % 360;
  drawCircles(smallCircleHue, s, l, xPosC, yPosC, smallCircleSize, 0);
  print("Small Circle Size: " + smallCircleSize);
  print("Small Circle Hue: " + smallCircleHue);
  
}

function drawCircles(h, s, l, xloc, yloc, size, sw) {

  fill(h, s, l); //fill the circle
  strokeWeight(sw);
  circle(xloc, yloc, size); //position and size the Circle


}



  function getParentGenetics(generation){
      //Find 2 random parents and get their genetics
      //Generation 0 should have 2 ; generation 1 should have 4; generation 2 should have 16, etc, etc
     

    //Get the rowcount of records in that generation
    let rows = table.matchRows(generation,"Generation");
    let rowcount = rows.length;
    
    //Get the row of parent 1 (X) 
    let p1 = round(random(0,rowcount-1));

    //Get the row of parent 2 (Y)... Can't be the same as Parent 1, so need to compare the random number generated
    let p2 = p1;
    let x = 0;
    while (p1 === p2){
    p2 = round(random(0,rowcount-1));
    x = x + 1;
    //safey exit
    if (x === 10) {break;} else { }
    }//end while


    idX = rows[p1].getString("CircleID");
    idY = rows[p2].getString("CircleID");

    hX = Number(rows[p1].getString("H"));
    hY = Number(rows[p2].getString("H"));

    sX = Number(rows[p1].getString("S"));
    sY = Number(rows[p2].getString("S"));

    lX = Number(rows[p1].getString("L"));
    lY = Number(rows[p2].getString("L"));

    swX = Number(rows[p1].getString("StrokeWeight"));
    swY = Number(rows[p2].getString("StrokeWeight"));

    szX = Number(rows[p1].getString("Size"));
    szY = Number(rows[p2].getString("Size"));

    xPosX = Number(rows[p1].getString("xPosition"));
    xPosY = Number(rows[p2].getString("yPosition"));

    yPosX = Number(rows[p1].getString("xPosition"));
    yPosY = Number(rows[p2].getString("yPosition"));

    return {
       
      hX : hX,
      hY : hY,
      sX : sX,
      sY : sY,
      lX : lX,
      lY : lY,
      swX : swX,
      swY : swY,
      szX : szX,
      szY : szY,
      xPosX : xPosX,
      yPosX : yPosX,
      xPosY : xPosY,
      yPosY : yPosY

    }; 

}//end GetParentGenetics
  

function calculateChildGenetics(parentGenetics){
//Calculate the Child Genetics. This is the math shit...

//Hue, Satuaration, Luminosity
hC = random(parentGenetics.hX, parentGenetics.hY);
sC = random(parentGenetics.sX, parentGenetics.sY);
lC = random(parentGenetics.lX, parentGenetics.lY);


//Stroke weight of Large Circle
swC = random(swX, swY);

//Small circle size
sz = random(parentGenetics.szX, parentGenetics.szY);

smallCirclePositon = getSmallCirclePosition(sz, parentGenetics);
xPosC = smallCirclePositon.xPosC;
yPosC = smallCirclePositon.yPosC;


return{

  hC : hC,
  sC : sC,
  lC : lC,
  swC : swC,
  xPosC : xPosC,
  yPosC : yPosC,
  sz : sz


}
}  //end calculateChildGenetics

function getSmallCirclePosition(sz,parentGenetics){

//Small circle position
//Need the Large Circle Radius
lcr = (canvasSize - swC)/2; //Canvas size - strokeweight (400 - 50 = 350)
scr = (sz/2);

print("lcr: " + lcr);
print("scr: " + scr);

xPosC = random(parentGenetics.xPosX,parentGenetics.xPosY);
yPosC = random(parentGenetics.yPosX,parentGenetics.yPosY);

print("xPos: " + xPos);
print("yPos: " + yPos);
print("xPosC: " + xPosC);
print("xPosC: " + yPosC);

a2 = (Math.pow((abs(xPosC - xPos)),2));
b2 = (Math.pow((abs(yPosC - yPos)),2));
ab = (Math.pow((abs(xPosC - xPos)),2)) + (Math.pow((abs(yPosC - yPos)),2));
r2 = Math.pow((lcr-scr),2);

print("a2: " + a2);
print("b2: " + b2);
print("ab: " + ab);
print("r2: " + r2);

//need to figure out if the circle position ovelaps the other circle. If so, try again.
if (ab > r2)
{
  
  print("No Soup for you!!");

}

  return{

    xPosC : xPosC,
    yPosC : yPosC

  }

}


