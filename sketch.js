let table;

function preload() {
  //load the file with circle genetics
  table = loadTable('genetics.csv', 'csv', 'header');

}



function setup() {

  canvasSize = 400;
  xPos = canvasSize / 2;
  yPos = canvasSize / 2;
  createCanvas(canvasSize, canvasSize); //adding some space to the bottom of the canvas
  colorMode(HSL);
  background(0, 0, 0);
  maxGen = 3;
  maxChildren = 4;
  noLoop();

}


function draw() {

  //Set up the colors and comlimentary
  //https://dev.to/benjaminadk/make-color-math-great-again--45of
  //HSL will eventually be parameters from parents
  //Stroke Weight will be a parameter
  //Small Circle Size and Position will be parameters

  //Get the genetic values of the intial parents.
  //This will need to be a giant loop. Advance the generation each time.
  //Generation 0 only has 2 ; 
  //generation 1 should have 4. (1X4) 2 families
  //generation 2 should have 16 (4x4). 8 families
  //generation 3 should have 64 (16x4). 32 families
let maxFams;

 // for (let i = 0; i < 100; i++) {
    // print("i: " + i);
    //let gen = 0;
    for (let gen = 0; gen < maxGen;) {
    print("Gen: " + gen)
    print("MaxGen: " + maxGen)

      if (gen > 0) {
        print("gen>0: " + gen);
        maxFams = (gen * maxChildren) / 2;
        } else {
        maxFams = 1;
      }
      print("maxFams: " + maxFams);

     for (let fams = 0; fams < maxFams;) {
     print("Fams: " + fams);

        let parentGenetics = getParentGenetics(gen);

        let idX = parentGenetics.idX;
        let idY = parentGenetics.idY;
        print("New ParentXID: " + idX);
        print("New ParentXID: " + idY);



       for (let child = 0; child < maxChildren; child++) {
       print("Child: " + child);
          let childGenetics = calculateChildGenetics(parentGenetics);

          //apply the genetics from the child.
          h = childGenetics.hC;
          s = childGenetics.sC;
          l = childGenetics.lC;
          sw = childGenetics.swC;
          largeCircleSize = canvasSize - (sw * 2);
          smallCircleSize = childGenetics.sz;
          // posX = childGenetics.posX;
          // posY = childGenetics.posY;
          xPosC = childGenetics.xPosC;
          yPosC = childGenetics.yPosC;

          ///////////////////////
          largeCircleHue = h;
          strokeHue = (h + 150) % 360;
          stroke(strokeHue, s, l);
          drawCircles(largeCircleHue, s, l, xPos, yPos, largeCircleSize, sw);

          //small circle
          smallCircleHue = (h + 210) % 360;
          drawCircles(smallCircleHue, s, l, xPosC, yPosC, smallCircleSize, 0);

          //save the data to the table
          let newID = max(table.getColumn("CircleID")) + 1;
          let newRow = table.addRow();
          newRow.setString("CircleID", newID);
          newRow.setString("Generation", (gen + 1));
          newRow.setString("H", h);
          newRow.setString("S", s);
          newRow.setString("L", l);
          newRow.setString("StrokeWeight", sw);
          newRow.setString("Size", smallCircleSize);
          newRow.setString("xPosition", xPosC);
          newRow.setString("yPosition", yPosC);
          newRow.setString("ParentXID", idX);
          newRow.setString("ParentYID", idY);

          print("newID: " + newID);
          //save the canavas
          //save("circle_" + newID + "_X" + idX + "_Y" + idY + ".png")
          clear();
          background(0, 0, 0); //reset the background to black

        }//End of the children

      fams = fams + 1;
      }//end of families

    gen = gen + 1; //advance the generation

   }//end of the generation
// }
  
  
  //Once all the new rows have been added..
  saveTable(table, "genetics.csv");

}

function drawCircles(h, s, l, xloc, yloc, size, sw) {

  fill(h, s, l); //fill the circle
  strokeWeight(sw);
  circle(xloc, yloc, size); //position and size the Circle

}



function getParentGenetics(generation) {
  //Find 2 random parents and get their genetics
  //Get the rowcount of records in that generation
  print("Generation: " + generation);
  let rows = table.matchRows(generation, "Generation");
  let rowcount = rows.length;
  print("rowcount: " + rowcount);

  //Get a random row from the rows
  //Get the CircleID of that row (this is the Circle ID)

  let p1 = round(random(0, rowcount - 1));
  let pID = rows[p1].get("CircleID");

  //Confirm the parent has not already been chosen. How?
  let pIDExists = false;
  //If p1 is in the table for the next generation, then retry.
  //First time through, there will be no next generation records. Check rowcount.

  print("pID: " + pID);
  let pXrows = table.matchRows(pID, "ParentXID");
  let pYrows = table.matchRows(pID, "ParentYID")

  print("pXrows Count: " + pXrows.length);
  print("pYrows Count: " + pYrows.length);

  if (pXrows.length > 0) {
     pIDExists = true;
     print("pIDExists:" + pIDExists)
  
    }



  // for (let r = 0; r < newrows.length; r++) {

  //       if (pID =  newrows[r].get('CircleID')){
  //         pIDcheck = true;
  //       }

  // }


  //Get the row of parent 2 (Y)... Can't be the same as Parent 1, so need to compare the random number generated
  let p2 = p1;
  let x = 0;
  while (p1 === p2) {
    p2 = round(random(0, rowcount - 1));
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

    hX: hX,
    hY: hY,
    sX: sX,
    sY: sY,
    lX: lX,
    lY: lY,
    swX: swX,
    swY: swY,
    szX: szX,
    szY: szY,
    xPosX: xPosX,
    yPosX: yPosX,
    xPosY: xPosY,
    yPosY: yPosY,
    idX: idX,
    idY: idY

  };

}//end GetParentGenetics


function calculateChildGenetics(parentGenetics) {
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


  return {

    hC: hC,
    sC: sC,
    lC: lC,
    swC: swC,
    xPosC: xPosC,
    yPosC: yPosC,
    sz: sz


  }
}  //end calculateChildGenetics

function getSmallCirclePosition(sz, parentGenetics) {

  //Small circle position
  //Using Pythagores with LCR - SMR - Half the stroke weight. Stroke weight is centered on the edge.
  //Need the Large Circle Radius
  lcr = (canvasSize - (swC * 2)) / 2; //Canvas size - (Child strokeweight x 2) / 2
  scr = (sz / 2);
  let xPosC = 0;
  let yPosC = 0;


  let i = false;
  while (i === false) {

    xPosC = random(parentGenetics.xPosX, parentGenetics.xPosY);
    yPosC = random(parentGenetics.yPosX, parentGenetics.yPosY);

    a2 = Math.pow((xPosC - xPos), 2);
    b2 = Math.pow((yPosC - yPos), 2);
    ab = (Math.pow((xPosC - xPos), 2)) + (Math.pow((yPosC - yPos), 2));
    r2 = Math.pow((lcr - scr - (swC / 2)), 2);

    // print("xPos: " + xPos);
    // print("yPos: " + yPos);
    // print("xPosC: " + xPosC);
    // print("xPosC: " + yPosC);
    // print("lcr: " + lcr);
    // print("scr: " + scr);
    // print("a2: " + a2);
    // print("b2: " + b2);
    // print("ab: " + ab);

    //need to figure out if the circle position ovelaps the other circle. If so, try again.
    if (ab < r2) { i = true; }

  }//end the for loop

  return {

    xPosC: xPosC,
    yPosC: yPosC

  }


}


