
let table;
function preload() 
{
 //load the file with circle genetics
  table = loadTable('genetics.csv','csv', 'header');
}



function setup() {
  
  cs = 400;
  createCanvas(cs, cs+100);
  colorMode(HSL);
  background(0,0,0);

//Get the value of the intial parents
//first time is defined as 1 and 2..Need the think abot a generational tag?
//Each subsequent generation produces 1 less offspring




  let rc = table.getRowCount();
  let r = random(1,rc).toPrecision(1,6);
  //Get values from the ro
  print("Row: " + r);
  {
    let row = table.getRow(r);
    let CircleID = row.getString("CircleID");
    let H1 = row.getString("H");
    let S1 = row.getString("S");
    let L1 = row.getString("L");
   
    print(CircleID + " " + H1 + " " + S1 + " " + L1);
  }







}

function draw() {
  
  //Set up the colors and comlimentary
  //https://dev.to/benjaminadk/make-color-math-great-again--45of
  //HSL will eventually be parameters from parents
  //Stroke Weight will be a parameter
  //Small Circle Size and Position will be parameters

  let h = random(0,360);
  let s = random(25,100);
  let l = random(25,75);
  //let chue = (h + 90) % 360;
  let LargeCircleHue = h;
  let StrokeHue = (h + 150) % 360;
  let SmallCircleHue = (h + 210) % 360;
 

 
  
  //Stroke weight of Large Circle
  rsw = random(5,50);
  let LargeCircleSize = (cs-rsw); //Canvas size - strokeweight (400 - 50 = 350)
  ///////////////////////
  //Large circle
  strokeWeight(rsw);
  print("RandomStrokeWeight: " + rsw);
  stroke(StrokeHue,s,l);
  //let LargeCircle = drawCircles(LargeCircleHue,s,l,200,200,sw);

  drawCircles(LargeCircleHue, s, l, cs/2, cs/2, LargeCircleSize, rsw);
  print( "Large Circle Size: " + LargeCircleSize);
  

  //Small Circle. No stroke. //
  SmallCircleSize = random(5,(LargeCircleSize - rsw - (cs/2)));
  //Small Circle should be LargeCirleSize (350) - Center Point(200) = 150??
print("Small Circle Size: " + SmallCircleSize);

  //SmallCircleX = random(200 ,200); //Need to figure out postion from edge of large circle + strokeweight
  //SmallCircelY = random(200 ,200);
 
  SmallCircleX = random(((cs/2)-SmallCircleSize), ((cs/2) + SmallCircleSize));//Need to figure out postion from edge of large circle + strokeweight
  print("SmallCircleX: " + SmallCircleX);
  SmallCircleY = random(((cs/2)-SmallCircleSize), ((cs/2) + SmallCircleSize));
  print("SmallCircleY: " + SmallCircleY);
  drawCircles(SmallCircleHue,s,l,SmallCircleX,SmallCircleY,SmallCircleSize,0); 

  ////////
  
fill(100,50,50);
  let lchtxt = "Large Circle Hue: " + nf(LargeCircleHue,3,2).toString();
  let schtxt = "Small Circle Hue: " + nf(SmallCircleHue,2,2).toString();
  let swtext = "Stroke Weight Hue: " + nf(StrokeHue,2,2).toString();

  print(lchtxt.length);
  //Display Large Circle Hue Value
  fill(LargeCircleHue,s,l);
  text(lchtxt, ((cs/2) - (lchtxt.length)), cs+25);
  
  
  //Display Stroke Hue Value
  fill(StrokeHue,s,l);
  text(swtext, (cs/2) - (swtext.length), cs+50);

  //Display Small Circle Hue Value
  fill(SmallCircleHue,s,l);
  text(schtxt, (cs/2) - (schtxt.length), cs+75);

  noLoop();



}

function drawCircles(h,s,l, xloc, yloc, size, sw){

  fill(h,s,l); //fill the circle
  strokeWeight(sw);
  circle(xloc, yloc, size); //position and size the Circle
  

}

