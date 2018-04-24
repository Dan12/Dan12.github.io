var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var phaseCanvas = document.getElementById('phase');
var pctx = phaseCanvas.getContext("2d");

function par(r1,r2) {
  var num = math.multiply(r1,r2);
  var denom = math.add(r1,r2);
  return math.divide(num, denom);
}

var i = math.complex(0, 1);

function fc(c,w) {
  return math.divide(1, math.multiply(i, math.multiply(w, c)));
}

function fl(l,w) {
  return math.multiply(i, math.multiply(w, l));
}

function t1(w,r,l,c) {
  return math.add(r, math.add(fc(c,w), fl(l,w)));
}

function t2(w,r,l,c) {
  return par(r, par(fc(c,w), fl(l,w)));
}

function t3(w,r,l,c) {
  return par(fc(c,w), math.add(r, fl(l,w)));
}

function t4(w,r,l,c) {
  return math.add(fc(c,w), par(fl(l,w), r));
}

function t5(w,r,l,c) {
  return par(r, math.add(fc(c,w), fl(l,w)));
}

function t6(w,r,l,c) {
  return math.add(r, par(fl(l,w), fc(c,w)));
}

function t7(w,r,l,c) {
  return par(fl(l,w), math.add(fc(c,w), r));
}

function t8(w,r,l,c) {
  return math.add(fl(l,w), par(r, fc(c,w)));
}

function mag(im) {
  return math.sqrt(math.re(im)*math.re(im) + math.im(im)*math.im(im));
}

function drawGraph(f,r,l,c) {
  ctx.beginPath();

  var width = 500;
  var height = 300;
  
  var xmin = 0;
  var xmax = Math.log(10e6);
  var ymin = 0;
  var ymax = 10;
  
  var xscale = width/xmax;
  var yscale = height/ymax;
  
  ctx.moveTo(Math.log(1)*xscale,height - Math.log(mag(f(1,r,l,c)))*yscale);
  
  for (var j = 1; j < 10e6; j*=2) {
    var x = Math.log(j);
    var y = Math.log(mag(f(j,r,l,c)));
    // console.log(x+","+y);
    ctx.lineTo(x*xscale,height - y*yscale);
  }
  
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ff0000";
  ctx.stroke();
}

function drawPhase(f,r,l,c) {
  pctx.beginPath();

  var width = 500;
  var height = 300;

  pctx.moveTo(0,height/2);
  pctx.lineTo(width,height/2);

  pctx.lineWidth = 2;
  pctx.strokeStyle = "#00ff00";
  pctx.stroke();

  pctx.beginPath();
  
  var xmin = 0;
  var xmax = Math.log(10e6);
  var ymin = -180;
  var ymax = 180;
  
  var xscale = width/xmax;
  var yscale = height/(ymax-ymin);
  
  var first = true;
  
  for (var j = 1; j < 10e6; j*=2) {
    var x = Math.log(j);
    var y = f(j,r,l,c);
    var y = math.divide(1,y).toPolar().phi*180/Math.PI;
    // console.log(x+","+y);
    if (first) {
      pctx.moveTo(x*xscale,height - y*yscale + ymin*yscale);
      first = false;
    }
    pctx.lineTo(x*xscale,height - y*yscale + ymin*yscale);
  }
  
  pctx.lineWidth = 2;
  pctx.strokeStyle = "#ff0000";
  pctx.stroke();
}

var rDiv = document.getElementById("rangeR");
var lDiv = document.getElementById("rangeL");
var cDiv = document.getElementById("rangeC");

var type = 0;
var allTypes = [t1,t2,t3,t4,t5,t6,t7,t8];

var typeForm = document.getElementById("typeForm");
for (var j = 0; j < typeForm.elements.length; j++) {
  typeForm.elements[j].addEventListener('mouseup', function() {
    type = this.value-1;
    scaleAndDraw();
  });
}

function scaleAndDraw() {
  var r = rDiv.value*10;
  var l = lDiv.value/1000;
  var c = cDiv.value/1000000;
  console.log(r+","+l+","+c);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGraph(allTypes[type],r,l,c);
  pctx.clearRect(0, 0, phaseCanvas.width, phaseCanvas.height);
  drawPhase(allTypes[type],r,l,c);
}

rDiv.addEventListener('mousemove', function() {
  scaleAndDraw();
});

lDiv.addEventListener('mousemove', function() {
  scaleAndDraw();
});

cDiv.addEventListener('mousemove', function() {
  scaleAndDraw();
});

scaleAndDraw();


