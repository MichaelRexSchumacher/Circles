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

  for (let gen = 0; gen < maxGen;) {
    print("Gen: " + gen)
    print("MaxGen: " + maxGen)

    //calculate the number of families that can be used for this generation.
    if (gen > 0) {
      maxFams = (gen * maxChildren) / 2;
    } else {
      maxFams = 1;
    }
    print("maxFams: " + maxFams);

    for (let fam = 0; fam < maxFams;) {
      print("Fam: " + fam);

      let parentGenetics = getParentGenetics(gen);

      let idX = parentGenetics.idX;
      let idY = parentGenetics.idY;
      print("New Parent! idx: " + idX);
      print("New Parent! idY: " + idY);



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
        let newID = max(table.getColumn("ID")) + 1;
        let newRow = table.addRow();
        newRow.setString("ID", newID);
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

        print("Child is born: " + newID);
        //save the canavas
        //save("ID_" + newID + "_X" + idX + "_Y" + idY + ".png")
        clear();
        background(0, 0, 0); //reset the background to black

      } //End of the children

      fam = fam + 1; //advance the family count

    } //end of families

    gen = gen + 1; //advance the generation

  } //end of the generation


  //Once all the new rows have been added..
  saveTable(table, "genetics.csv");

}

function drawCircles(h, s, l, xloc, yloc, size, sw) {

  fill(h, s, l); //fill the circle
  strokeWeight(sw);
  circle(xloc, yloc, size); //position and size the Circle

}

function getParents(rows, parentArray) {
  let xRowID = 0;
  let yRowID = 0;
  let parentXID;
  let parentYID;
  let parentExists = 0;

debugger;

  print("rows: " + rows.length);
  //get parent x
 
    while (parentExists < 1){ 
    xRowID = round(random(0, (rows.length) - 1));
    print("xRowID: " + xRowID);
    parentXID = rows[xRowID].get("ID");
    if (parentArray.includes(parentXID)) {
      parentExists = 1;
    }
    else{
      parentExists = 0;
    }
 
  }

 
  
  parentExists = 0;
  //get parent y
  while (parentExists < 1 ){
    yRowID = round(random(0, (rows.length) - 1));
    print("yRowID: " + yRowID);
    parentYID = rows[yRowID].get("ID");
    if (parentYID = parentXID || parentArray.includes(parentYID)){
      parentExists = 1;
    }
    else{
      parentExists = 0;
    }

  }

  return {
      //Return the ROW ID of the parents (not the parent id)
    xRowID: xRowID,
    yRowID: yRowID

    }


  } //choose parent end

  function getParentGenetics(generation) {
    //Find 2 new random parents and get their genetics.
    //Ensure parents have not been used before.

    //Get the rowcount of records in that generation
    let rows = table.matchRows(generation, "Generation");
    let parentXArray = table.getColumn("ParentXID");
    let parentYArray = table.getColumn("ParentYID");
    let parentArray = parentXArray.concat(parentYArray);

    //Get the of the lucky parents
    let parents = getParents(rows, parentArray);
    
    xRowID = parents.xRowID;
    yRowID = parents.yRowID;

    idX = rows[xRowID].getString("ID");
    idY = rows[yRowID].getString("ID");

    hX = Number(rows[xRowID].getString("H"));
    hY = Number(rows[yRowID].getString("H"));

    sX = Number(rows[xRowID].getString("S"));
    sY = Number(rows[yRowID].getString("S"));

    lX = Number(rows[xRowID].getString("L"));
    lY = Number(rows[yRowID].getString("L"));

    swX = Number(rows[xRowID].getString("StrokeWeight"));
    swY = Number(rows[yRowID].getString("StrokeWeight"));

    szX = Number(rows[xRowID].getString("Size"));
    szY = Number(rows[yRowID].getString("Size"));

    xPosX = Number(rows[xRowID].getString("xPosition"));
    xPosY = Number(rows[yRowID].getString("yPosition"));

    yPosX = Number(rows[xRowID].getString("xPosition"));
    yPosY = Number(rows[yRowID].getString("yPosition"));

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







