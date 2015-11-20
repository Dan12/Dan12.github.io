//
// Matrix utility functions
//

var mvMatrixStack = [];

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  
  var ambUniform = gl.getUniformLocation(shaderProgram, "uAmbientLight");
  gl.uniform3fv(ambUniform, new Float32Array(ambientVals));
  
  var dirUniform = gl.getUniformLocation(shaderProgram, "uDirectionalVector");
  gl.uniform3fv(dirUniform, new Float32Array(lightingDirection));
  
  var dirColUniform = gl.getUniformLocation(shaderProgram, "uDirectionalLightColor");
  gl.uniform3fv(dirColUniform, new Float32Array(directVals));
  
  var normalMatrix = mvMatrix.inverse();
  normalMatrix = normalMatrix.transpose();
  var nUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
  gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
}

function mvPushMatrix(m) {
  if (m) {
    mvMatrixStack.push(m.dup());
    mvMatrix = m.dup();
  } else {
    mvMatrixStack.push(mvMatrix.dup());
  }
}

function mvPopMatrix() {
  if (!mvMatrixStack.length) {
    throw("Can't pop from an empty matrix stack.");
  }

  mvMatrix = mvMatrixStack.pop();
  return mvMatrix;
}

function mvRotate(angle, v) {
  var inRadians = angle * Math.PI / 180.0;

  var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
  multMatrix(m);
}

function mvScale(s,r,t){
  var m = Matrix.create([[s,0,0,0],[0,r,0,0],[0,0,t,0],[0,0,0,1]]);
  multMatrix(m);
}