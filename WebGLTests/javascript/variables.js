var canvas;
var gl;

var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var vertexColorAttribute;
var perspectiveMatrix;
var vertexNormalAttribute;

var ambientVals = [0.3,0.3,0.4];
var constLightingDirection = [1,1,1];
var lightingDirection = constLightingDirection;
var directVals = [0.9,0.9,0.9];

var animations = [animation1, animation2];

var curAnim = 0;