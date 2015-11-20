// Initialize the buffers we'll need.
function initBuffers() {
  animations[curAnim].setGlobals();
  animations[curAnim].setupFunc();
}

// Draw the scene.
function drawScene() {

  initScene();
  
  animations[curAnim].drawFunc();

  //animate
  animate();
}

// Animate
function animate(){
  animations[curAnim].animateFunc();
}

function initScene(){
  gl.viewport(0, 0, canvas.width, canvas.height);
  
  //console.log(canvas.width+","+canvas.height+","+gl.viewportWidth+","+gl.viewportHeight);
  
  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Establish the perspective with which we want to view the
  // scene. Our field of view is 45 degrees, with a width/height
  // ratio of 640:480, and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  perspectiveMatrix = makePerspective(45, canvas.width/canvas.height, 0.1, 120.0);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  loadIdentity();
}