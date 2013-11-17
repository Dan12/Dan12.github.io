$(document).ready(function () {
//Initializing variables
var c = document.getElementById("myCanvas");
var canvas = c.getContext("2d");
var go = false;
var dirn = "down";
var height = [];
var height_add = 0;
var seconds = 1;
var score = 1;
var score_mult = 1;
var space_down = false;
var space_down_first = false;
var space_up_first = false;
var barrier_active = false;
var mult_active = false;
var shield_level = 3;
var shield_countdown = 30;
var shield_countdown_on = false;
var shield_up_active = false;
var shield_up_appear = 0;
var shield_up_x = 100;
var shield_up_y = 100;
var mult_appear = 0;
var barrier_x = 500;
var barrier_y = 100;
var barrier_appear = 0;
var barrier_appear_max = 80;
var rocket_seconds = 0;
var rocket_y = 130;
var power = 0;
var height_max = 4;
var star_1_x = 50;
var star_1_y = 100;
var star_2_x = 125;
var star_2_y = 200;
var star_3_x = 250;
var star_3_y = 150;
var star_4_x = 375;
var star_4_y = 130;
var star_y_setter = 100;
var mult_y = 100;
var mult_x = 100;
var level = 0;

//Function to assign legnth values in an array with 100 slots
function assign() {
    if (seconds === 1) {
        height[0] = 10;
        for (var repeat_1 = 1; repeat_1 <= 99; repeat_1++) {
            height_max = Math.floor(Math.random() * 5 + 2);
            height_add = Math.floor(Math.random() * height_max + 1);
            if (dirn === "down") {
                height[repeat_1] = height[repeat_1 - 1] + (height_add);
            }
            if (dirn === "up") {
                height[repeat_1] = height[repeat_1 - 1] - (height_add);
            }
            if (height[repeat_1] > 40 && dirn === "down") {
                dirn = "up";
            }
            if (height[repeat_1] < 10 && dirn === "up") {
                dirn = "down";
            }
        }
    }

    if (seconds > 1) {
        for (var repeat_2 = 1; repeat_2 <= 99; repeat_2++) {
            height_max = Math.floor(Math.random() * 5 + 2);
            if (repeat_2 < 99) {
                height[repeat_2 - 1] = height[repeat_2];
            }
            if (repeat_2 === 98) {
                height_add = Math.floor(Math.random() * height_max + 1);
                if (dirn === "down") {
                    height[repeat_2] = height[repeat_2 - 1] + (height_add);
                }
                if (dirn === "up") {
                    height[repeat_2] = height[repeat_2 - 1] - (height_add);
                }
                if (height[repeat_2] > 40 && dirn === "down") {
                    dirn = "up";
                }
                if (height[repeat_2] < 10 && dirn === "up") {
                    dirn = "down";
                }
            }
        }
    }
}

//Function to execute every 40 milliseconds to draw everything and call functions
setInterval(function () {
    if (go === false) {
        canvas.clearRect(0, 0, 500, 300);
        canvas.fillStyle = "White";
        canvas.font = "14px Arial";
        canvas.fillText("Press Enter to start", 15, 25);
        canvas.fillText("Press Space to move", 15, 60);
        canvas.fillText("Try to get the highest score by flying for as long as possible", 15, 95);
        canvas.fillText("without hitting the landscape or the barriers", 15, 110);
        canvas.fillText("If you die, just press enter to start a new game", 15, 145);
        canvas.fillText("Power Ups:", 15, 180);
        canvas.fillText("Yellow Circle=Score Multiplier", 15, 195);
        canvas.fillText("White Square=Shield Up", 15, 210);
    }
    if (go) {
        $('.seconds').remove();
        assign();
        canvas.clearRect(0, 0, 500, 300);
        seconds++;
        score += 1 * score_mult;
        rocket_seconds++;
        rocket_power();
        barrier_check();
        mult_check();
        //drawing landscape
        canvas.fillStyle = "lime";
        for (var repeat = 0; repeat < 100; repeat++) {
            canvas.fillRect((0 + (repeat * 5)), 0, 5, 20 + height[repeat]);
            canvas.fillRect((0 + (repeat * 5)), 230 + height[repeat], 5, 70);
        }
        star_movement();
        //color stars
        //Star 1
        canvas.fillStyle = "gray";
        canvas.beginPath();
        canvas.arc(star_1_x, star_1_y, 6, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = "lightGray";
        canvas.beginPath();
        canvas.arc(star_1_x, star_1_y, 4, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = "white";
        canvas.beginPath();
        canvas.arc(star_1_x, star_1_y, 2, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        //star 2
        canvas.fillStyle = "gray";
        canvas.beginPath();
        canvas.arc(star_2_x, star_2_y, 6, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = "lightGray";
        canvas.beginPath();
        canvas.arc(star_2_x, star_2_y, 4, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = "white";
        canvas.beginPath();
        canvas.arc(star_2_x, star_2_y, 2, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        //star 3
        canvas.fillStyle = "gray";
        canvas.beginPath();
        canvas.arc(star_3_x, star_3_y, 6, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = "lightGray";
        canvas.beginPath();
        canvas.arc(star_3_x, star_3_y, 4, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = "white";
        canvas.beginPath();
        canvas.arc(star_3_x, star_3_y, 2, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        //star 4
        canvas.fillStyle = "gray";
        canvas.beginPath();
        canvas.arc(star_4_x, star_4_y, 6, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = "lightGray";
        canvas.beginPath();
        canvas.arc(star_4_x, star_4_y, 4, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = "white";
        canvas.beginPath();
        canvas.arc(star_4_x, star_4_y, 2, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        //end color stars
        //drawing barrier if present
        canvas.fillStyle = "lime";
        if (barrier_active) {
            canvas.fillRect(barrier_x, barrier_y, 10, 100);
        }
        //Drawing score multiplier
        if (mult_active) {
            canvas.fillStyle = "yellow";
            canvas.beginPath();
            canvas.arc(mult_x + 7.5, mult_y + 10, 20, 0, Math.PI * 2, true);
            canvas.closePath();
            canvas.fill();
            canvas.fillStyle = "gray";
            canvas.fillRect(mult_x - 5, mult_y, 5, 20);
            canvas.beginPath();
            canvas.moveTo(mult_x, mult_y);
            canvas.lineTo(mult_x + 10, mult_y + 20);
            canvas.lineTo(mult_x + 5, mult_y + 20);
            canvas.lineTo(mult_x - 5, mult_y);
            canvas.closePath();
            canvas.fill();
            canvas.beginPath();
            canvas.moveTo(mult_x + 5, mult_y + 20);
            canvas.lineTo(mult_x + 10, mult_y + 20);
            canvas.lineTo(mult_x + 20, mult_y);
            canvas.lineTo(mult_x + 15, mult_y);
            canvas.closePath();
            canvas.fill();
            canvas.fillRect(mult_x + 15, mult_y, 5, 20);
        }
        //Drawing Shield_Up
        if (shield_up_active) {
            canvas.fillStyle = "white";
            canvas.fillRect(shield_up_x, shield_up_y, 40, 40);
            canvas.fillStyle = "red";
            canvas.fillRect(shield_up_x, shield_up_y + 15, 40, 10);
            canvas.fillRect(shield_up_x + 15, shield_up_y, 10, 40);
        }
        //drawing spaceship
        canvas.fillStyle = "red";
        canvas.fillRect(50, rocket_y, 20, 20);
        if (shield_level === 3) {
            canvas.fillStyle = "rgba(0,0,255,.5)";
            canvas.beginPath();
            canvas.arc(50 + 10, rocket_y + 10, 17, 0, Math.PI * 2, true);
            canvas.closePath();
            canvas.fill();
        }
        if (shield_level === 2) {
            canvas.fillStyle = "rgba(255,170,0,.5)";
            canvas.beginPath();
            canvas.arc(50 + 10, rocket_y + 10, 17, 0, Math.PI * 2, true);
            canvas.closePath();
            canvas.fill();
        }
        if (shield_countdown_on) {
            shield_countdown--;
            if (shield_countdown < 0) {
                shield_countdown_on = false;
                shield_countdown = 30;
            }
        }
        die_check();
        hit_mult_check();
        hit_shield_up_check();
        if (shield_level < 3) {
            shield_up_check();
        }
        //display score
        canvas.fillStyle = "black";
        canvas.font = "14px Arial";
        canvas.fillText("Score: " + score, 15, 295);
        canvas.fillText("Score Multiplier: " + score_mult, 110, 295);
        canvas.fillText("Shield Level: " + shield_level, 250, 295);
        canvas.fillText("Level: " + level, 380, 295);
        if (seconds === 800) {
            level++;
            seconds = 2;
        }
    }
}, 40);

//Randomly Spawns Shield_Ups
function shield_up_check() {
    shield_up_appear = Math.floor(Math.random() * 1000 + 1);
    if (shield_up_appear === 10 && shield_up_active === false) {
        shield_up_active = true;
        shield_up_y = 85 + Math.floor(Math.random() * 25 + 1);
        shield_up_x = 500;
    }
    if (shield_up_active) {
        shield_up_x -= 5;
    }
    if (shield_up_active && shield_up_x <= -10) {
        shield_up_active = false;
    }
}

//Randomly Spawns score multipliers
function mult_check() {
    mult_appear = Math.floor(Math.random() * 600 + 1);
    if (mult_appear === 10 && mult_active === false) {
        mult_active = true;
        mult_y = 85 + Math.floor(Math.random() * 25 + 1);
        mult_x = 500;
    }
    if (mult_active) {
        mult_x -= 5;
    }
    if (mult_active && mult_x <= -10) {
        mult_active = false;
    }
}

//Control star movement
function star_movement() {
    star_y_setter = 85 + Math.floor(Math.random() * 130 + 1);
    star_1_x -= 5;
    star_2_x -= 5;
    star_3_x -= 5;
    star_4_x -= 5;
    if (star_1_x <= 0) {
        star_1_x = 500;
        star_1_y = star_y_setter;
    }
    if (star_2_x <= 0) {
        star_2_x = 500;
        star_2_y = star_y_setter;
    }
    if (star_3_x <= 0) {
        star_3_x = 500;
        star_3_y = star_y_setter;
    }
    if (star_4_x <= 0) {
        star_4_x = 500;
        star_4_y = star_y_setter;
    }
}

//Randomly Spawns barriers
function barrier_check() {
    if (level === 0) {
        barrier_appear_max = 80;
    }
    if (level === 1) {
        barrier_appear_max = 70;
    }
    if (level === 2) {
        barrier_appear_max = 45;
    }
    if (level === 3) {
        barrier_appear_max = 20;
    }
    if (level === 4) {
        barrier_appear_max = 10;
    }
    barrier_appear = Math.floor(Math.random() * barrier_appear_max + 1);
    if (barrier_appear === 4 && barrier_active === false) {
        barrier_active = true;
        barrier_y = 70 + Math.floor(Math.random() * 65 + 1);
        barrier_x = 500;
    }
    if (barrier_active) {
        barrier_x -= (4 + level);
    }
    if (barrier_active && barrier_x <= -10) {
        barrier_active = false;
    }
}

//Checks to see if score multiplier hit
function hit_mult_check() {
    if (mult_active) {
        if (mult_x - 10 <= 70 && mult_x + 30 >= 50) {
            if (rocket_y + 20 > mult_y - 10 && rocket_y < mult_y + 30) {
                mult_active = false;
                score_mult++;
            }
        }
    }
}

//Checks to see if shield up hit
function hit_shield_up_check() {
    if (shield_up_active) {
        if (shield_up_x <= 70 && shield_up_x + 40 >= 50) {
            if (rocket_y + 20 > shield_up_y - 10 && rocket_y < shield_up_y + 40) {
                shield_up_active = false;
                shield_level++;
            }
        }
    }
}

//checks to see if ship hit landscape or barriers
function die_check() {
    if (rocket_y < (20 + height[9]) || rocket_y < (20 + height[14]) || (rocket_y + 20) > (230 + height[9]) || (rocket_y + 20) > (230 + height[14])) {
        if (shield_countdown_on === false) {
            shield_level--;
            shield_countdown_on = true;
        }
        if (shield_level <= 0) {
            go = false;
            alert("Your Score was: " + score);
        }
    }
    if (barrier_active) {
        if (barrier_x < 70 && barrier_x > 40) {
            if (rocket_y + 20 > barrier_y && rocket_y < barrier_y + 100) {
                if (shield_countdown_on === false) {
                    shield_level--;
                    shield_countdown_on = true;
                }
                if (shield_level <= 0) {
                    go = false;
                    alert("Your Score was: " + score);
                }
            }
        }
    }
}

//Sets motion of rocket
function rocket_power() {
    if (space_down === false && space_up_first) {
        power += 1.25 * (rocket_seconds / 50);
        space_down_first = false;
    }
    if (space_down === false && space_up_first === false) {
        rocket_seconds = 0;
        space_up_first = true;
    }
    if (space_down && space_down_first === false) {
        rocket_seconds = 0;
        space_down_first = true;
    }
    if (space_down && space_down_first) {
        power -= 7 * (rocket_seconds / 50);
        space_up_first = false;
    }
    rocket_y += power;
}

//listens for keycodes
    $(document).keydown(function (e) {
        if (e.keyCode === 13) {
            go = true;
            seconds = 1;
            space_down = false;
            space_down_first = false;
            space_up_first = false;
            rocket_seconds = 0;
            rocket_y = 130;
            power = 0;
            star_1_x = 50;
            star_1_y = 100;
            star_2_x = 125;
            star_2_y = 200;
            star_3_x = 250;
            star_3_y = 150;
            star_4_x = 375;
            star_4_y = 130;
            barrier_active = false;
            barrier_x = 500;
            barrier_y = 100;
            score = 1;
            score_mult = 1;
            mult_active = false;
            mult_appear = 0;
            mult_y = 100;
            mult_x = 100;
            shield_level = 3;
            shield_countdown = 40;
            shield_countdown_on = false;
        }
        if (e.keyCode === 32) {
            space_down = true;
        }
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 32) {
            space_down = false;
        }
    });
});