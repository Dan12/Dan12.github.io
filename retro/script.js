$(document).ready(function () {
    //get highscore
    var retrievedObject = localStorage.getItem('highscore');

    //experimental variables
    var grav = 0.62;
    var initVel = 5.5;
    var bombSpawnSecs = 14;
    var bombNum = 30;
    var playerJumpMove = 2;
    var empInverseIncrease = 8;
    var bombDieOnHit = true;
    var invincible = false;

    //Initializing variables
    var c = document.getElementById("myCanvas");
    var canvas = c.getContext("2d");
    var go = false;
    var leftPress = false;
    var rightPress = false;
    var spacePress = false;
    var upPress = false;
    var pause = false;
    var playerX = 235;
    var playerY = 330;
    var jumpSec = 0;
    var lives = 3;
    var padShow = false;
    var padX = -44;
    var padMove = 7;
    var gameOver = false;
    var points = 0;
    var empSecs = 0;
    var empFill = 0;
    var empColor = "Blue";
    var empActive = false;
    var empActiveSecs = 0;
    var padNoShow = 0;
    var bulletY = new Array(15);
    var bulletShow = new Array(15);
    var bulletX = new Array(15);
    var rainbowColor = new Array(15);
    for (var i = 0; i<15; i++){
        bulletY[i]=-50;
        bulletX[i]=-50;
        bulletShow[i]=false;
        rainbowColor[i]=1;
    }
    var bombShow = new Array(bombNum);
    var bombX = new Array(bombNum);
    var bombY = new Array(bombNum);
    for (i = 0; i<bombNum; i++){
        bombX[i] = -50;
        bombY[i] = -50;
        bombShow[i] = false;
    }
    var bombShowSecs = 0;
    var bulletShowSecs = 0;
    var rainbowColorSecs = 0;
    var gameOverSecs = 0;
    var devToolsOpen = false;
    var devToolsOpened = false;
    var img = new Image();
    img.src="spike.jpg";
    //while (!img.load){}

    //Function to execute every 40 milliseconds to draw everything and call functions
    setInterval(function () {
        if (!go && !pause && !gameOver) {
            canvas.clearRect(0, 0, 500, 400);
            gameOver = false;
            canvas.fillStyle = "Black";
            canvas.font = "14px Arial";
            canvas.fillText("Press Enter to start and to toggle pause", 15, 25);
            canvas.fillText("Press Space to jump and use the left and right arrow keys to move", 15, 60);
            canvas.fillText("You get one point for every bomb you shoot down", 15, 95);
            canvas.fillText("Your highscore will be saved locally on your browser",15,130)
            canvas.fillText("You will loose lives if a bomb reaches the ground or if the death pad hits you", 15, 165);
            canvas.fillText("If you die, just press enter to start a new game", 15, 200);
            canvas.fillText("You have three lives, good luck", 15, 235);
            canvas.fillText("Notes:", 15, 295);
            canvas.fillText("If you press enter at any time a new game will start", 15, 330);
            canvas.fillText("Opening the developer tools will disable your chance to get a new highscore", 15, 365);
        }
        if (go && !pause) {
            if (!empActive){
                getMovement();
                makeBullets();
                makeBombs();
            }
            setEmp();
            canvas.clearRect(0, 0, 500, 400);
            setBullets();
            setBombs();
            canvas.fillStyle = "Lime";
            canvas.fillRect(0,360,500,40);
            canvas.drawImage(img,padX,340,30,20);
            canvas.fillStyle = "Red";
            canvas.fillRect(playerX,playerY,30,30);
            canvas.fillStyle = "Black";
            canvas.fillRect(playerX+10,playerY-10,10,10);
            
            canvas.fillStyle = "Black";
            canvas.font = "14px Arial";
            canvas.fillText("Lives: "+lives, 20, 387);
            canvas.fillText("Points: "+points, 420, 387);
            canvas.fillText("EMP Bar:",166,387);
            canvas.fillRect(230,374,102,16);
            canvas.fillStyle = empColor;
            canvas.fillRect(231,375,empFill,14);
            if (empFill>=100){
                canvas.fillStyle = "White";
                canvas.font = "12px Arial";
                canvas.fillText("EMP Ready",248,386);
            }
            if (empActive){
                if (empActiveSecs<20){
                    canvas.fillStyle = "rgba(0,0,255,.4)";
                    canvas.beginPath();
                    canvas.arc(playerX+15,playerY+15,(35*empActiveSecs),0,2*Math.PI);
                    canvas.fill();
                }
                if (empActiveSecs<=50 && empActiveSecs>=20){
                    canvas.fillStyle = "rgba(255,255,255,"+((50-empActiveSecs)/30)+")";
                    canvas.fillRect(0,0,500,400);
                }
            }
        }
        if (pause && go && !gameOver){
            canvas.fillStyle = "Black";
            canvas.font = "70px Arial";
            canvas.fillText("Paused", 150, 215);
        }
        if (gameOver){
            if (gameOverSecs === 0){
                canvas.fillStyle = "Black";
                canvas.font = "70px Arial";
                canvas.fillText("Game Over", 65, 215);
                canvas.font = "24px Arial";
                canvas.fillText("Press Enter to start a new game",74,260);
                if ((retrievedObject === null || parseInt(retrievedObject)<points) && !devToolsOpened){
                    alert("Congradulations, you got a new highscore of "+points);
                    localStorage.setItem('highscore', points);
                }
                else{
                    alert("Highscore: "+parseInt(retrievedObject)); 
                }
                gameOverSecs++;
            }
        }
    }, 30);
    
    //Function to draw bombs
    function setBombs(){
        for (var i = 0; i<bombNum; i++){
            if (bombShow[i]){
                canvas.fillStyle = "Black";
                canvas.fillRect(bombX[i],bombY[i],15,15);
                canvas.fillStyle = "rgb(255,"+(255-(Math.floor((bombY[i]+15)/2)))+",0)";
                canvas.fillRect(bombX[i]+1,bombY[i]+1,13,13);
            }
        }
    }

    //Funtion to make bombs every 30*bombSpawnSec milliseconds
    function makeBombs(){
        if (bombShowSecs<bombSpawnSecs){
            bombShowSecs++;
        }
        if (bombShowSecs>=bombSpawnSecs){
            bombShowSecs = 0;
            for (var i = 0; i<bombNum; i++){
                if (!bombShow[i]){
                    bombShow[i] = true;
                    bombX[i] = Math.floor(Math.random() * 475 + 10);
                    bombY[i] = -15;
                    break;
                }
            }
        }
    }

    //Function the make bullets every 30*5 milliseconds
    function makeBullets(){
        if (bulletShowSecs<5);{
            bulletShowSecs++;
        }
        if (bulletShowSecs>=5){
            bulletShowSecs = 0;
            for (var i = 0; i<15; i++){
                if (!bulletShow[i]){
                    bulletShow[i] = true;
                    bulletX[i] = playerX+12;
                    bulletY[i] = playerY;
                    rainbowColor[i] = 1;
                    break;
                }
            }
        }
    }

    //Function to draw bullets and determine color
    function setBullets(){
        for (i = 0; i<15; i++){
            switch(rainbowColor[i]){
                case 1:
                    canvas.fillStyle = "Blue";
                    break;
                case 2:
                    canvas.fillStyle = "rgb(111, 255, 255)";
                    break;
                case 3:
                    canvas.fillStyle = "rgb(111, 0, 255)";
                    break;
                case 4:
                    canvas.fillStyle = "Red";
                    break;
                case 5:
                    canvas.fillStyle = "Orange";
                    break;   
                case 6:
                    canvas.fillStyle = "Yellow";
                    break;
                case 7:
                    canvas.fillStyle = "Green";
                    break;
            } 
            if (bulletShow[i]){
                canvas.fillRect(bulletX[i],bulletY[i],6,15);
                if (rainbowColor[i]>=7 && rainbowColorSecs>=10){
                    rainbowColor[i] = 1;
                }
                else if (rainbowColorSecs>=10){
                    rainbowColor[i]++;
                    rainbowColorSecs = 1;
                }
                else {
                    rainbowColorSecs++;
                }
            }
        }
    }

    //Function to fill up empbar and call emp animation
    function setEmp(){
        if (!empActive){
            empSecs++;
        }
        empFill = Math.floor(empSecs/empInverseIncrease);
        if (empFill>=100){
            empFill = 100;
            var r = (Math.floor(Math.random() * 180 + 1));
            var g = (Math.floor(Math.random() * 180 + 1));
            var b = (Math.floor(Math.random() * 180 + 1));
            empColor = "rgb("+r+","+g+","+b+")";
        }
        if (empFill>=100 && upPress){
            empActive = true;
        }
        if (empActive){
            empActiveSecs++;
        }
        if (empActiveSecs>=20){
            empSecs = 0;
            empColor = "Blue";
            padShow = false;
            padX = -44;
            for (var i = 0; i<15; i++){
                bulletY[i]=-50;
                bulletX[i]=-50;
                bulletShow[i]=false;
                rainbowColor[i]=1;
            }
            for (i = 0; i<bombNum; i++){
                bombY[i]=-50;
                bombX[i]=-50;
                if (bombShow[i]){
                    points++;
                }
                bombShow[i]=false;
            }
        }
        if (empActiveSecs>=50){
            empActive = false;
            empActiveSecs = 0;
        }
    }

    //Function to make all movements and check if hit
    function getMovement(){
        for (var i = 0; i<15; i++){
            if (bulletShow[i]){
                bulletY[i]-=8;
            }
            if (bulletY[i]<0){
                bulletShow[i] = false;
            }
        }
        for (i = 0; i<bombNum; i++){
            if (bombShow[i]){
                bombY[i]+=1;
            }
            if (bombY[i]>345){
                bombShow[i] = false;
                bombY[i] = -50;
                if (!invincible){
                    lives --;
                }
            }
        }
        if ((Math.floor(Math.random() * 30 + 1)) === 20 && !padShow){
            padShow = true;
            padNoShow = 0;
            if (playerX>235){
                padX = -30;
                padMove = 7;
            }
            else {
                padX = 500;
                padMove = -7;
            }
        }
        else {
            padNoShow++;
                if (padNoShow>80){
                padShow = true;
                padNoShow = 0;
                if (playerX>235){
                    padX = -30;
                    padMove = 7;
                }
                else {
                    padX = 500;
                    padMove = -7;
                }
            }
        }
        
        if (padShow){
            padX+=padMove;
        }
        
        if(padX<(-44) || padX[0]>510){
            padShow = false;
            padNoShow = 0;
        }
        
        if (playerX<padX+30 && playerX+30>padX && playerY>310){
            padShow = false;
            padX = -44;
            if (!invincible){
                lives --;
            }
        }
        
        for (i = 0; i<15; i++){
            for (var ii = 0; ii<bombNum; ii++){
                if (bulletShow[i] && bombShow[ii] && bombDieOnHit){
                    if (bulletX[i]+6>=bombX[ii] && bulletX[i]<=bombX[ii]+15 && bulletY[i]<=bombY[ii]+15 && bulletY[i]+15>=bombY[ii]){
                        bombShow[ii] = false;
                        bulletShow[i] = false;
                        points++;
                    }
                }
            }
        }
        
        if (spacePress){
            playerY-=((initVel*jumpSec)-(grav*jumpSec*jumpSec));
            jumpSec++;
        }
        if (jumpSec>1 && playerY>=330){
            spacePress = false;
            playerY = 330;
            jumpSec = 0;
        }
        if (rightPress && playerX<470){
            if (spacePress){
                playerX+=playerJumpMove;
            }
            else{
                playerX+=8;
            }
        }
        if (leftPress && playerX>0){
            if (spacePress){
                playerX-=playerJumpMove;
            }
            else{
                playerX-=8;
            }
        }
        if (playerX<0){
            playerX = 0;
        }
        if (playerX>470){
            playerX = 470;
        }
        if (lives<= 0){
            go = false;
            gameOver = true;
        }
    }

    //resets all variables
    function restart(){
    go = true;
    leftPress = false;
    rightPress = false;
    spacePress = false;
    upPress = false;
    pause = false;
    playerX = 235;
    playerY = 330;
    jumpSec = 0;
    lives = 3;
    padShow = false;
    padX = -44;
    padMove = 7;
    gameOver = false;
    points = 0;
    empSecs = 0;
    empFill = 0;
    empColor = "Blue";
    empActive = false;
    empActiveSecs = 0;
    padNoShow = 0;
    for (i = 0; i<15; i++){
        bulletY[i]=-50;
        bulletX[i]=-50;
        bulletShow[i]=false;
        rainbowColor[i]=1;
    }
    for (i = 0; i<bombNum; i++){
        bombX[i] = -50;
        bombY[i] = -50;
        bombShow[i] = false;
    }
    bombShowSecs = 0;
    bulletShowSecs = 0;
    rainbowColorSecs = 0;
    gameOverSecs = 0;    
    }

    //listens for keycodes
    $(document).keydown(function (e) {
        if (e.keyCode === 13) {
            if (!go){
                restart();
            }
            else {
                pause = !pause;
            }
        }
        if (e.keyCode === 32 && !pause) {
            spacePress = true;
        }
        if (e.keyCode === 39) {
            rightPress = true;
        }
        if (e.keyCode === 37) {
            leftPress = true;
        }
        if (e.keyCode === 38) {
            upPress = true;
        }
        // if (e.keyCode === 86) {
        //     if (go){
        //         pause = !pause;
        //     }
        // }
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 39) {
            rightPress = false;
        }
        if (e.keyCode === 37) {
            leftPress = false;
        }
        if (e.keyCode === 38) {
            upPress = false;
        }
    });

    //developer tools css
    $('.devToggle').click(function(){
        devToolsOpen = !devToolsOpen;
        devToolsOpened = true;

        if (devToolsOpen){
            $(this).html("Close developer tools");
            $('li').css("display","block");
            $('.name_list').css("display","inline-block");
            $('.grav').val(grav);
            $('.initVel').val(initVel);
            $('.bombSpawnSecs').val(bombSpawnSecs);
            $('.bombNum').val(bombNum);
            $('.playerJumpMove').val(playerJumpMove);
            $('.empInverseIncrease').val(empInverseIncrease);
            $('.bombDieOnHit').val(bombDieOnHit);
            $('.invincible').val(invincible);
        }
        if (!devToolsOpen){
            $(this).html("Open developer tools");
            $('li, .name_list').css("display","none");
        }
    });

    $('.saveDev').click(function(){
        grav = parseFloat($(".grav").val());
        initVel = parseFloat($(".initVel").val());
        bombSpawnSecs = parseInt($(".bombSpawnSecs").val());
        bombNum = parseInt($(".bombNum").val());
        playerJumpMove = parseInt($(".playerJumpMove").val());
        empInverseIncrease = parseInt($(".empInverseIncrease").val());
        bombDieOnHit = ($(".bombDieOnHit").val() === "true");
        invincible = ($(".invincible").val() === "true");
    });
});
