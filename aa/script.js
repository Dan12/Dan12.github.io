$(document).ready(function () {
    $('#myCanvas').css("margin-left", ($(window).width()-300)/2);
    var retrievedObject = JSON.parse(localStorage.getItem('level'));
    console.log(retrievedObject);
    $(window).resize(function(){
        $('#myCanvas').css("margin-left", ($(window).width()-300)/2);
    });
    $(window).click(function(){
        addItem();
    });
    var levSpeed = new Array(.8,.9,.9,-1,-1.2, 1,-1.2,1.3);
    var levStart = new Array(1,  2, 3, 4,   8, 8,  10,  9);
    var levGetIn = new Array(10,10,10,10,   8,10,  10, 12);
    if(retrievedObject === null)
        var level = 0;
    else
        var level = parseInt(retrievedObject);
    //var level = 0;
    var c = document.getElementById("myCanvas");
    var canvas = c.getContext("2d");
    var startNum = levStart[level];
    var getAmount = levGetIn[level];
    var degrees = new Array(startNum);
    for(var iii = 0; iii < degrees.length; iii++){
        degrees[iii] = (360/startNum)*iii;
    }
    var numAdd = new Array(getAmount);
    var numAt = 0;
    var masterDeg = 0;
    
    var gameOver = false;
    var gameWin = false;
    
    var tolerance = 8;
    
    var speed = levSpeed[level];
    
    setInterval(function () {
        canvas.clearRect(0, 0, 300, 400);
        if(gameWin)
            canvas.fillStyle = "Green";
        if(gameOver)
            canvas.fillStyle = "Red";
        if(gameOver || gameWin)
            canvas.fillRect(0,0,300,400);
        canvas.fillStyle = "Black";
        canvas.font = "14px Arial";
        drawCircle(150,150,50,"Black");
        for(var ii = 0; ii < numAdd.length; ii++){
            if(numAdd[ii]===undefined){
                drawCircle(150,290+20*(ii-numAt),8,"Black");
                canvas.fillStyle = "White";
                if(numAdd.length-ii<10)
                    canvas.fillText(""+numAdd.length-ii, 146, 295+20*(ii-numAt));
                else
                    canvas.fillText(""+numAdd.length-ii, 142, 295+20*(ii-numAt));
            }
            else{
            drawLine(150,150,Math.cos(toRadi(numAdd[ii]))*120+150,Math.sin(toRadi(numAdd[ii]))*120+150,"Black");
                drawCircle(Math.cos(toRadi(numAdd[ii]))*120+150, Math.sin(toRadi(numAdd[ii]))*120+150, 8,"Black");
                canvas.fillStyle = "White";
                if(numAdd.length-ii<10)
                    canvas.fillText(""+numAdd.length-ii, Math.cos(toRadi(numAdd[ii]))*120+146, Math.sin(toRadi(numAdd[ii]))*120+155);
                else
                    canvas.fillText(""+numAdd.length-ii, Math.cos(toRadi(numAdd[ii]))*120+142, Math.sin(toRadi(numAdd[ii]))*120+155);
                numAdd[ii] = incDeg(numAdd[ii]);
            }
        }
        for(var i = 0; i < degrees.length; i++){
            drawLine(150,150,Math.cos(toRadi(degrees[i]))*120+150,Math.sin(toRadi(degrees[i]))*120+150,"Black");
            drawCircle(Math.cos(toRadi(degrees[i]))*120+150, Math.sin(toRadi(degrees[i]))*120+150, 8,"Black");
            degrees[i] = incDeg(degrees[i]);
        }
        canvas.fillStyle = "Blue";
        canvas.font = "40px Arial";
        if(level+1<10)
            canvas.fillText(""+(level+1),138,166);
        else
            canvas.fillText(""+(level+1),126,166);
        incMasDeg();
        canvas.fillStyle = "White";
        if(gameOver){
            canvas.font = "45px Arial";
            canvas.fillText("Game Over",40,160);
        }
        if(gameWin){
            canvas.font = "45px Arial";
            canvas.fillText("You Win",60,160);
        }
    },10);
    
    function drawCircle(xCenter, yCenter, radius, color){
        canvas.fillStyle = color;
        canvas.beginPath();
        canvas.arc(xCenter,yCenter,radius,0,2*Math.PI);
        canvas.fill();
    }
    
    function drawLine(x1,y1,x2,y2, color){
        canvas.fillStyle = color;
        canvas.beginPath();
        canvas.moveTo(x1,y1);
        canvas.lineTo(x2,y2);
        canvas.stroke();
    }
    
    function incMasDeg(){
        masterDeg+=speed;
        if(speed>0 && masterDeg>=360)
            masterDeg -= 360;
        if(speed<0 && masterDeg<0)
            masterDeg += 360;
    }
    
    function incDeg(init){
        init+=speed;
        if(speed>0 && init>=360)
            init -= 360;
        if(speed<0 && init<0)
            init += 360;
        return init;
    }
    
    function toRadi(deg){
        return ((deg/360)*(2*Math.PI));
    }
    
    function addItem(){
        if(numAt<numAdd.length && !gameOver && !gameWin){
            numAdd[numAt] = 90;
            for(var i = 0; i < degrees.length; i++){
                if(degrees[i]>=90-tolerance && degrees[i]<=90+tolerance){
                    gameOver = true;
                    console.log(i+"i");
                }
            }
            for(var ii = 0; ii < numAt; ii++){
                if(numAdd[ii]>=90-tolerance && numAdd[ii]<=90+tolerance){
                    gameOver = true;
                    console.log(ii+"ii"+numAdd[ii]);
                }
            } 
            numAt++;
            if(numAt >= numAdd.length && !gameOver){
                gameWin = true;
            }
        }
    }
    
    function reset(){
        if(level<levStart.length-1 && gameWin){
             level++;
             if (retrievedObject === null){
                console.log(level);
                localStorage.setItem('level', JSON.stringify(level));
            }
            else if (parseInt(retrievedObject) < level){
                console.log(level);
                localStorage.setItem('level', JSON.stringify(level));
            }
        }
        startNum = levStart[level];
        getAmount = levGetIn[level];
        speed = levSpeed[level];
        degrees = new Array(startNum);
        for(var j = 0; j < degrees.length; j++){
            degrees[j] = (360/startNum)*j;
        }
        numAdd = new Array(getAmount);
        for(var ii = 0; ii < numAdd.length; ii++){
            numAdd[ii] = undefined;
        }
        numAt = 0;
        masterDeg = 0;
        gameOver = false;
        gameWin = false;
    }
    
    $(document).keydown(function (e) {
        if (e.keyCode === 32) {
            addItem();
        }
        if((gameOver || gameWin) && e.keyCode === 13){
            reset();
        }
    });
});