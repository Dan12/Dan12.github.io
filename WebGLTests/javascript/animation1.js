var animation1 = {
  
"setGlobals": function(){
  //globalVariables
  A1triangleBuffer = null;
  A1squareBuffer = null;
  A1cubeBuffer = null;
  A1PyrBuffer = null;
  A1SphereBuffer = null;
  
  A1cubeRotation = 0.0;
  A1cubeXOffset = 0.0;
  A1cubeYOffset = 0.0;
  A1cubeZOffset = 0.0;
  A1lastCubeUpdateTime = 0;
  A1xIncValue = 0.4;
  A1yIncValue = -0.1;
  A1zIncValue = 0.3;
},

"setupFunc": function(){
  
  //setting up buffer for triangle
  var triangleVetricies = [
   2,2,2,
   3,2,2,
   3,2,3,
   2,2,2,
   3,2,2,
   3,3,2
  ];
  var triangleVertColors = [
   1.0,0.0,0.0,1.0,
  ];
  A1triangleBuffer = initArrayBuffer(triangleVetricies, triangleVetricies.length/3, triangleVertColors);
  
  //setting up buffer for square
  var squareVerticies = [
   -2,2,2, //corner 1
   -3,2,2, //diagonal 1
   -2,3,2, //diagonal 2
   -3,3,2, //corner 2
   -2,3,3 //diagonal 3
   ];
  var squareVertColors = [
   0.0,1.0,0.7,1.0,
  ];
  A1squareBuffer = initArrayBuffer(squareVerticies, 5, squareVertColors);
  
  //radius, colors
  A1cubeBuffer = createCube(1,
    [1.0,0.0,1.0,1.0,
     1.0,0.0,0.0,1.0,
     0.0,1.0,0.0,1.0,
     0.0,0.0,1.0,1.0,
     1.0,1.0,0.0,1.0,
     0.0,1.0,1.0,1.0]);
     
  //Pyramid
  A1PyrBuffer = createPyramid(1,
    [1.0,0.0,1.0,1.0,
     1.0,0.0,0.0,1.0,
     0.0,1.0,0.0,1.0,
     0.0,0.0,1.0,1.0,
     1.0,1.0,0.0,1.0]);
     
   A1SphereBuffer = createSphere(1, .125,
    [1.0,0.0,0.0,1.0]);
}, 

"drawFunc": function(){
      
  //look at matrix
  mvMatrix = makeLookAt(0,0,1,0,0,0,0,1,0);
    
  //light direction
  lightingDirection = (Matrix.Rotation(A1cubeRotation*(Math.PI/180),Vector.create([0,1,0])).x(Vector.create(constLightingDirection))).elements;

  // Now move the drawing position a bit to where we want to start
  // drawing the cube.
  mvTranslate([-0.0, 0.0, -12.0]);

  // Save the current matrix, then rotate before we draw.
  mvPushMatrix();
  //mvRotate(A1cubeRotation, [1, 0, 1]);
  
  mvPushMatrix();
  mvTranslate([2,2,0]);
  drawArrayBuffer(A1PyrBuffer[0],A1PyrBuffer[1],A1PyrBuffer[2],gl.TRIANGLES);
  mvPopMatrix();
  
  // draw triangle
  drawArrayBuffer(A1triangleBuffer[0], A1triangleBuffer[1], A1triangleBuffer[2], gl.TRIANGLES);
  
  //draw square
  drawArrayBuffer(A1squareBuffer[0], A1squareBuffer[1], undefined, gl.TRIANGLE_STRIP);
  
  mvPushMatrix();
  mvTranslate([A1cubeXOffset, 0.0, 0.0]);
  mvTranslate([-2,0,-3]);
  //draw cube
  drawArrayBuffer(A1cubeBuffer[0], A1cubeBuffer[1], A1cubeBuffer[2], gl.TRIANGLES);
  mvPopMatrix();
  
  //draw another cube
  mvPopMatrix();
  
  mvPushMatrix();
  mvRotate(45, [1,1,1]);
  mvScale(2,1,1);
  drawArrayBuffer(A1cubeBuffer[0], A1cubeBuffer[1], A1cubeBuffer[2], gl.TRIANGLES);
  mvPopMatrix();
  
  mvTranslate([2,-2,0]);
  //mvRotate(A1cubeRotation, [1,0,0]);
  drawArrayBuffer(A1SphereBuffer[0], A1SphereBuffer[1], A1SphereBuffer[2], gl.TRIANGLES);
}, 

"animateFunc": function(){
  var currentTime = (new Date).getTime();
  if (A1lastCubeUpdateTime) {
    var delta = currentTime - A1lastCubeUpdateTime;

    var scaleUpdate = (30 * delta) / 1000.0;
    A1cubeRotation += scaleUpdate;
    A1cubeXOffset += A1xIncValue * scaleUpdate;
    A1cubeYOffset += A1yIncValue * scaleUpdate;
    A1cubeZOffset += A1zIncValue * scaleUpdate;

    if (Math.abs(A1cubeYOffset) > 2.5) {
      A1xIncValue = -A1xIncValue;
      A1yIncValue = -A1yIncValue;
      A1zIncValue = -A1zIncValue;
      A1cubeYOffset = 2.5*Math.sign(A1cubeYOffset);
    }
  }

  A1lastCubeUpdateTime = currentTime;
}};