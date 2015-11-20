var animation2 = {
  
  "setGlobals": function(){
    //globla variables
    A2cubeBuffer = null;
    A2pyrBuffer = null;
    A2groundBuffer = null;
    A2sphereBuffer = null;
    
    A2lastUpdateTime = 0;
    
    A2rotatey = 0;
    A2rotateyInc = 8;
    A2yposStart = -19;
    A2yposEnd = 25;
    A2ypos = A2yposStart;
    A2yposInc = 0.02;
    A2dim = 0;
    A2dimInc = 0.2;
  },
  
  "setupFunc": function(){
    A2cubeBuffer = createCube(1,
    [1.0,0.0,1.0,1.0,
     1.0,0.0,0.0,1.0,
     0.0,1.0,0.0,1.0,
     0.0,0.0,1.0,1.0,
     1.0,1.0,0.0,1.0,
     0.0,1.0,1.0,1.0]);
     
    A2pyrBuffer = createPyramid(1,
    [1.0,0.0,0.0,1.0,
     0.0,1.0,0.0,1.0,
     0.0,0.0,1.0,1.0,
     1.0,1.0,0.0,1.0,
     0.0,1.0,1.0,1.0]);
     
     A2groundBuffer = createCube(1,[0.1,0.8,0.1,1.0]);
     
     A2sphereBuffer = createSphere(10,2.5,[1.0,0.1,0.1,1.0]);
  },
  
  "drawFunc": function(){
    //light direction
    lightingDirection = (Matrix.Rotation(A2rotatey*(Math.PI/180),Vector.create([0,1,0])).x(Vector.create(constLightingDirection))).elements;
    
    //look at matrix
    mvMatrix = makeLookAt(0,0,10,0,0,0,0,1,0);
    
    //translate world space
    mvTranslate([0.0, 0.0, -60.0]);
    mvPushMatrix();
    
    mvTranslate([0.0, A2ypos, 0.0]);
    mvRotate(A2rotatey, [0, 1, 0]);
    mvTranslate([A2dim, 0, 0]);
    
    mvRotate(A2rotatey, [0, 1, 0]);
    drawArrayBuffer(A2cubeBuffer[0], A2cubeBuffer[1], A2cubeBuffer[2], gl.TRIANGLES);
    mvTranslate([0,2,0]);
    drawArrayBuffer(A2pyrBuffer[0], A2pyrBuffer[1], A2pyrBuffer[2], gl.TRIANGLES);
    mvPopMatrix();

    mvPushMatrix();
    mvTranslate([0.0,-21,0.0]);
    mvScale(20,1,14);
    drawArrayBuffer(A2groundBuffer[0], A2groundBuffer[1], A2groundBuffer[2], gl.TRIANGLES);
    mvPopMatrix();
    
    drawArrayBuffer(A2sphereBuffer[0], A2sphereBuffer[1], A2sphereBuffer[2], gl.TRIANGLES);
  },
  
  "animateFunc": function(){
    var currentTime = (new Date).getTime();
    if (A2lastUpdateTime) {
      var delta = currentTime - A2lastUpdateTime;
  
      var scaleUpdate = (30 * delta) / 1000.0;
      A2ypos+=A2yposInc*scaleUpdate;
      A2yposInc*=1.015;
      if(A2ypos >= A2yposEnd){
        A2ypos = A2yposStart;
        A2dim = 0;
        A2yposInc = 0.02;
      }
      A2rotatey+=A2rotateyInc*scaleUpdate;
      A2dim+=A2dimInc*scaleUpdate;
    }

    A2lastUpdateTime = currentTime;
  }
};