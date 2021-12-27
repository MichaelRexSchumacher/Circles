
let table;
let h = 0;
let s = 0;
let l = 0;
let size = 0;
let sw = 0;
let xloc = 0;
let yloc = 0;

function preload() {
  //load the file with circle genetics
  table = loadTable('genetics.csv', 'csv', 'header');
}



function setup() {

  cs = 400;
  createCanvas(cs, cs + 100);
  colorMode(HSL);
  background(99, 50, 50);
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


   //apply the genetics to the child.
  h = childGenetics.H_C;
  s = parentGenetics.H_X;
  l = parentGenetics.H_X;




  ///////////////////////
  //Large circle
  strokeWeight(rsw);
  print("RandomStrokeWeight: " + rsw);
  stroke(StrokeHue, s, l);
  //let LargeCircle = drawCircles(LargeCircleHue,s,l,200,200,sw);

  drawCircles(LargeCircleHue, s, l, cs / 2, cs / 2, LargeCircleSize, rsw);
  print("Large Circle Size: " + LargeCircleSize);


  //Small Circle. No stroke. //
  SmallCircleSize = random(5, (LargeCircleSize - rsw - (cs / 2)));
  //Small Circle should be LargeCirleSize (350) - Center Point(200) = 150??
  print("Small Circle Size: " + SmallCircleSize);

  //SmallCircleX = random(200 ,200); //Need to figure out postion from edge of large circle + strokeweight
  //SmallCircelY = random(200 ,200);

  SmallCircleX = random(((cs / 2) - SmallCircleSize), ((cs / 2) + SmallCircleSize));//Need to figure out postion from edge of large circle + strokeweight
  print("SmallCircleX: " + SmallCircleX);
  SmallCircleY = random(((cs / 2) - SmallCircleSize), ((cs / 2) + SmallCircleSize));
  print("SmallCircleY: " + SmallCircleY);
  drawCircles(SmallCircleHue, s, l, SmallCircleX, SmallCircleY, SmallCircleSize, 0);

  ////////

  fill(100, 50, 50);
  let lchtxt = "Large Circle Hue: " + nf(LargeCircleHue, 3, 2).toString();
  let schtxt = "Small Circle Hue: " + nf(SmallCircleHue, 2, 2).toString();
  let swtext = "Stroke Weight Hue: " + nf(StrokeHue, 2, 2).toString();

  print(lchtxt.length);
  //Display Large Circle Hue Value
  fill(LargeCircleHue, s, l);
  text(lchtxt, ((cs / 2) - (lchtxt.length)), cs + 25);


  //Display Stroke Hue Value
  fill(StrokeHue, s, l);
  text(swtext, (cs / 2) - (swtext.length), cs + 50);

  //Display Small Circle Hue Value
  fill(SmallCircleHue, s, l);
  text(schtxt, (cs / 2) - (schtxt.length), cs + 75);

  drawCircles();
 



}

function drawCircles(h, s, l, xloc, yloc, size, sw) {

  fill(h, s, l); //fill the circle
  strokeWeight(sw);
  circle(xloc, yloc, size); //position and size the Circle


}



  function getParentGenetics(generation){
      //Find 2 random parents and get their genetics
      //Generation 0 should have 2 ; generation 1 should have 4; generation 2 should have 16, etc, etc
      
      let CircleID_X = 0;
      let CircleID_Y = 0;
      let H_X = 0;
      let H_Y = 0;
      let S_X = 0;
      let S_Y = 0;
      let L_X = 0;
      let L_Y = 0;
      
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


    CircleID_X = rows[p1].getString("CircleID");
    CircleID_Y = rows[p2].getString("CircleID");

    H_X = rows[p1].getString("H");
    H_Y = rows[p2].getString("H");

    S_X = rows[p1].getString("S");
    S_Y = rows[p2].getString("S");

    L_X = rows[p1].getString("L");
    L_Y = rows[p2].getString("L");

    return {
       
      H_X : H_X,
      H_Y : H_Y,
      S_X : S_X,
      S_Y : S_Y,
      L_X : L_X,
      L_Y : L_Y

    }; 



}//GetParentGenetics
  

function calculateChildGenetics(parentGenetics){
//Calculate the Child Genetics. This is the math shit...


//Hue
H_C = random(parentGenetics.H_X, parentGenetics.H_Y);

//Stroke weight of Large Circle
rsw = random(5, 50);
let LargeCircleSize = (cs - rsw); //Canvas size - strokeweight (400 - 50 = 350)





let chue = (h + 90) % 360;
let LargeCircleHue = h;
let StrokeHue = (h + 150) % 360;
let SmallCircleHue = (h + 210) % 360;




return{

  H_C: H_C,


}


}
