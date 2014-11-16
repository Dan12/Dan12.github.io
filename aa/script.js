$(document).ready(function () {
    $('#myCanvas').css("margin-left", ($(window).width()-300)/2);

    $(window).resize(function(){
        $('#myCanvas').css("margin-left", ($(window).width()-300)/2);
    });

    $('#myCanvas').mousedown(function(){
        if((gameOver || gameWin) && !devGame && !animatingWin && (!animatingLose || (animatingLose && animateSec>=50))){
            if(animatingLose)
                animateSec++;
            resetGame();
        }
        if((gameOver || gameWin) && devGame && !animatingWin && (!animatingLose || (animatingLose && animateSec>=50))){
            if(animatingLose)
                animateSec++;
            resetDevGame();
        }
        else
            addItem();
    });

    var toggleLevBut = false;
    var devGame = false;
    var retrievedObject = JSON.parse(localStorage.getItem('level'));
    console.log(retrievedObject);

    var levSpeed = new Array(0.8,0.9,0.9,-1,-1.2, 1,-1.2,1.3,-1,1.2,1.2,-1.5,1.8,1.5,1.4,-1.3,-2, 2,1.5,-1.5,-0.9,1.8,1.2);
    var levStart = new Array( 1, 2, 3, 4,   8, 8,  10,  9, 8, 11, 11,   9, 10, 10, 10,   9, 8, 8, 12,   7,  8,  8,  6);
    var levGetIn = new Array(10,10,10,10,   8,10,  10, 12,14, 12, 13,  10,  8, 10, 12,  13, 8,10, 14,  16, 17, 12, 18);
    var level;
    if(retrievedObject === null)
        level = 0;
    else
        level = parseInt(retrievedObject);
    //level = 19;

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
    
    var gameOver = false;
    var gameWin = false;
    
    var tolerance = 8;
    
    var speed = levSpeed[level]*2.1;

    var centerX = 150;
    var centerY = 200;

    var animateSec = 0;
    var origLineLength = 120;
    var lineLength = 120;
    var nodeRad = 8;
    var centRad = 50;
    var displaceY = 0;
    var bigFontSize = 45;
    var smallFontSize = 14;

    var smallFontHeight = 10;
    var smallFontWidth = 8;
    var bigFontHeight = 30;
    var bigFontWidth;
    if(level+1<10)
        bigFontWidth = 24;
    else
        bigFontWidth = 48;
    var centerAlpha = 1;
    var bigTextAlpha = 1;
    var mesFontSize = 45;

    var animatingWin = false;
    var animatingLose = false;

    var screenRad = Math.sqrt(centerX*centerX+centerY*centerY);
    var centerOffsetY = 200-(150+origLineLength);

    var t;
    
    animate();

    function animate(){
        var now = new Date();
        var st = now.getTime();
        canvas.clearRect(0, 0, 300, 400);
        canvas.globalAlpha = 1;
        if(animatingWin)
            animateWin();
        if(animatingLose)
            animateLose();
        if(gameWin)
            canvas.fillStyle = "Green";
        if(gameOver)
            canvas.fillStyle = "Red";
        if(gameOver || gameWin)
            canvas.fillRect(0,0,300,400);
        canvas.fillStyle = "Black";
        canvas.font = smallFontSize+"px Arial";
        drawCircle(150,150+displaceY,centRad,"Black");
        for(var i = 0; i < degrees.length; i++){
            drawLine(150,150+displaceY,Math.cos(toRadi(degrees[i]))*lineLength+150,Math.sin(toRadi(degrees[i]))*lineLength+150+displaceY,"Black");
            drawCircle(Math.cos(toRadi(degrees[i]))*lineLength+150, Math.sin(toRadi(degrees[i]))*lineLength+150+displaceY, nodeRad,"Black");
            if(!gameOver)
                degrees[i] = incDeg(degrees[i]);
        }
        for(var ii = 0; ii < numAdd.length; ii++){
            if(numAdd[ii]===undefined){
                drawCircle(150,270+(nodeRad*2+4)+(nodeRad*2+4)*(ii-numAt)+displaceY+(lineLength-origLineLength),nodeRad,"Black");
                canvas.fillStyle = "White";
                if(numAdd.length-ii<10)
                    canvas.fillText(""+numAdd.length-ii, 150-smallFontWidth/2, 270+(nodeRad*2+4)+smallFontHeight/2+(nodeRad*2+4)*(ii-numAt)+displaceY+(lineLength-origLineLength));
                else
                    canvas.fillText(""+numAdd.length-ii, 150-smallFontWidth, 270+(nodeRad*2+4)+smallFontHeight/2+(nodeRad*2+4)*(ii-numAt)+displaceY+(lineLength-origLineLength));
            }
            else{
                drawLine(150,150+displaceY,Math.cos(toRadi(numAdd[ii]))*lineLength+150,Math.sin(toRadi(numAdd[ii]))*lineLength+150+displaceY,"Black");
                drawCircle(Math.cos(toRadi(numAdd[ii]))*lineLength+150, Math.sin(toRadi(numAdd[ii]))*lineLength+150+displaceY, nodeRad,"Black");
                canvas.fillStyle = "White";
                if(numAdd.length-ii<10)
                    canvas.fillText(""+numAdd.length-ii, Math.cos(toRadi(numAdd[ii]))*lineLength+150-smallFontWidth/2, Math.sin(toRadi(numAdd[ii]))*lineLength+150+smallFontHeight/2+displaceY);
                else
                    canvas.fillText(""+numAdd.length-ii, Math.cos(toRadi(numAdd[ii]))*lineLength+150-smallFontWidth, Math.sin(toRadi(numAdd[ii]))*lineLength+150+smallFontHeight/2+displaceY);
                if(!gameOver)
                    numAdd[ii] = incDeg(numAdd[ii]);
            }
        }
        canvas.globalAlpha = centerAlpha;
        canvas.fillStyle = "Blue";
        canvas.font = bigFontSize+"px Arial";
        canvas.fillText(""+(level+1),150-bigFontWidth/2,150+bigFontHeight/2+displaceY);
        if(animatingWin && animateSec > 100 && animateSec <= 200){
            canvas.globalAlpha = 1-centerAlpha;
            if(level+2 != 10)
                canvas.fillText(""+(level+2),150-bigFontWidth/2,150+bigFontHeight/2+displaceY);
            else
                canvas.fillText(""+(level+2),150-bigFontWidth,150+bigFontHeight/2+displaceY);
        }
        canvas.fillStyle = "White";
        canvas.globalAlpha = bigTextAlpha;
        if(gameOver){
            canvas.font = mesFontSize+"px Arial";
            canvas.fillText("You Lose",150-(canvas.measureText("You Lose").width/2),150+(45/3));
        }
        if(gameOver && animateSec == 51){
            canvas.globalAlpha = 1;
            canvas.font = 30+"px Arial";
            canvas.fillText("Click/Press Enter",150-(canvas.measureText("Click/Press Enter").width/2),150-(45/3)-10);
            canvas.fillText("to try again",150-(canvas.measureText("to try again").width/2),150+(45/3)-10);
        }
        if(gameWin){
            canvas.font = mesFontSize+"px Arial";
            canvas.fillText("You Win",150-(canvas.measureText("You Win").width/2),150+(45/3));
        }
        var end = new Date();
        var et = end.getTime();
        et = et-st;
        if(et<20)
            et = 20-et;
        else
            et = 0;
        t = setTimeout(function(){animate();},et);
    }

    function animateWin(){
        animateSec++;
        if(animateSec <= 50){
            bigTextAlpha = 1-(1/50)*animateSec;
            mesFontSize++;
        }
        else if(animateSec <= 150){
            bigFontSize = 45+(animateSec-50);
            if(level+1 < 10){
                bigFontWidth += 0.5;
                bigFontHeight += 0.5;
            }
            else{
                bigFontWidth += 1;
                bigFontHeight += 1;
            }
            smallFontWidth += 0.5;
            smallFontHeight += 0.5;
            smallFontSize = 14+(((animateSec-50)*3)/5);
            displaceY = (50/100)*(animateSec-50);
            centRad = 50+((screenRad-50)/100)*(animateSec-50);
            lineLength += 4;
            nodeRad += 0.5;
        }
        else if(animateSec <= 200){
            centerAlpha = 1-(1/50)*(animateSec-150);
        }
        else if(animateSec <= 300){
            bigTextAlpha = 1;
            centerAlpha = 1;
            bigFontSize = (45-animateSec+300);
            smallFontSize = 14+((300-animateSec)*3)/5;
            if(level+1 < 10){
                bigFontWidth -= 0.5;
                bigFontHeight -= 0.5;
            }
            else if(level+1 == 10){
                bigFontWidth -= 1;
                bigFontHeight -= 0.5;
            }
            else{
                bigFontWidth -= 1;
                bigFontHeight -= 1;
            }
            smallFontWidth -= 0.5;
            smallFontHeight -= 0.5;
            displaceY = 50-((50/100)*(animateSec-200));
            centRad = 50 + (screenRad-50)-((screenRad-50)/100)*(animateSec-200);
            lineLength -= 4;
            nodeRad -= 0.5;
        }
        if(animateSec == 300){
            bigFontSize = 45;
            if(level+1<10)
                bigFontWidth = 24;
            else
                bigFontWidth = 48;
            bigFontHeight = 30;
            smallFontSize = 14;
            smallFontWidth = 8;
            smallFontHeight = 10;
            lineLength = origLineLength;
            centRad = 50;
            animatingWin = false;
            animateSec = 0;
            nodeRad = 8;
            mesFontSize = 45;
        }
        if(animateSec == 201){
            if(!devGame)
                resetGame();
            else
                resetDevGame();
            if(level+1 == 10)
                bigFontWidth *= 2;
        }
    }

    function animateLose(){
        if(animateSec <= 50){
            animateSec++;
            mesFontSize += 0.5;
            bigTextAlpha = 1-(1/50)*animateSec;
            bigFontSize = 45+animateSec;
            bigFontWidth += 0.5;
            bigFontHeight += 0.5;
            displaceY = ((centerOffsetY-200)/50)*animateSec;
            lineLength += 4;
            centRad++;
            nodeRad += 0.4;
            smallFontWidth += 0.2;
            smallFontHeight += 0.2;
            smallFontSize = 14+((animateSec*2)/5);
        }
        else if(animateSec<=101 && animateSec>51){
            animateSec++;
            bigTextAlpha = 1;
            bigFontSize = 45+(100-animateSec);
            smallFontSize = 14+((100-animateSec)*2)/5;
            bigFontWidth -= 0.5;
            bigFontHeight -= 0.5;
            smallFontWidth -= 0.2;
            smallFontHeight -= 0.2;
            displaceY = ((centerOffsetY-200)/50)*(100-animateSec);
            nodeRad -= 0.4;
            lineLength -= 4;
            centRad--;
        }
        if(animateSec == 51)
            bigTextAlpha = 0;
        if(animateSec == 102){
            bigFontSize = 45;
            if(level+1<10)
                bigFontWidth = 24;
            else
                bigFontWidth = 48;
            bigFontHeight = 30;
            mesFontSize = 45;
            smallFontSize = 14;
            smallFontWidth = 8;
            smallFontHeight = 10;
            lineLength = origLineLength;
            centRad = 50;
            animatingLose = false;
            animateSec = 0;
            nodeRad = 8;
        }
    }
    
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
                    animatingLose = true;
                    console.log(i+"i");
                }
            }
            for(var ii = 0; ii < numAt; ii++){
                if(numAdd[ii]>=90-tolerance && numAdd[ii]<=90+tolerance){
                    gameOver = true;
                    animatingLose = true;
                    console.log(ii+"ii"+numAdd[ii]);
                }
            } 
            numAt++;
            if(numAt >= numAdd.length && !gameOver){
                gameWin = true;
                animatingWin = true;
            }
        }
    }
    
    function resetGame(){
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
        speed = levSpeed[level]*2.1;
        degrees = new Array(startNum);
        for(var j = 0; j < degrees.length; j++){
            degrees[j] = (360/startNum)*j;
        }
        numAdd = new Array(getAmount);
        for(var ii = 0; ii < numAdd.length; ii++){
            numAdd[ii] = undefined;
        }
        numAt = 0;
        gameOver = false;
        gameWin = false;
    }

    function resetDevGame(){
        degrees = new Array(startNum);
        for(var j = 0; j < degrees.length; j++){
            degrees[j] = (360/startNum)*j;
        }
        numAdd = new Array(getAmount);
        for(var ii = 0; ii < numAdd.length; ii++){
            numAdd[ii] = undefined;
        }
        numAt = 0;
        gameOver = false;
        gameWin = false;
    }
    
    $(document).keydown(function (e) {
        if (e.keyCode === 32) {
            addItem();
            return false;
        }
        if((gameOver || gameWin) && e.keyCode === 13 && !devGame && !animatingWin && (!animatingLose || (animatingLose && animateSec>=50))){
            if(animatingLose)
                animateSec++;
            resetGame();
        }
        if((gameOver || gameWin) && e.keyCode === 13 && devGame && !animatingWin && (!animatingLose || (animatingLose && animateSec>=50))){
            if(animatingLose)
                animateSec++;
            resetDevGame();
        }
    });

    $('.levBut').click(function(){
        toggleLevBut = !toggleLevBut;

        if(toggleLevBut){
            $('ol').css('visibility','visible');
            $('.setLevBut').css('visibility','visible');
            $('.levBut').html("Close Level Creator");
        }
        if(!toggleLevBut){
            $('ol').css('visibility','hidden');
            $('.setLevBut').css('visibility','hidden');
            $('.levBut').html("Open Level Creator");
        }
    });

    $('.setLevBut').click(function(){
        startNum = parseInt($(".startNum").val());
        getAmount = parseInt($(".startGet").val());
        speed = parseFloat($(".speed").val())*2.1;
        resetDevGame();
        devGame = true;
    });
});
