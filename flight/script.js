$(document).ready(function () {
//Initializing variables
var c = document.getElementById("myCanvas");
var canvas = c.getContext("2d");
var go = false;
var dirn = "down";
var height = [];
var height_add = 0;
var seconds = 1;
var space_down = false;
var space_down_first = false;
var space_up_first = false;
var barrier_active = false;
var barrier_x = 500;
var barrier_y = 100;
var barrier_appear = 0;
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
    if (go) {
        $('.seconds').remove();
        assign();
        canvas.clearRect(0, 0, 500, 300);
        seconds++;
        rocket_seconds++;
        rocket_power();
        barrier_check();
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
        //drawing spaceship
        canvas.fillStyle = "red";
        canvas.fillRect(50, rocket_y, 20, 20);
        die_check();
        //display score
        $('canvas').after('<p class="seconds">Score: ' + seconds + '</p>');
    }
}, 40);

//
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

function barrier_check() {
    barrier_appear = Math.floor(Math.random() * 80 + 1);
    if (barrier_appear === 50 && barrier_active === false) {
        barrier_active = true;
        barrier_y = 85 + Math.floor(Math.random() * 25 + 1);
        barrier_x = 500;
    }
    if (barrier_active) {
        barrier_x -= 4;
    }
    if (barrier_active && barrier_x <= -10) {
        barrier_active = false;
    }
}

function die_check() {
    if (rocket_y <= (20 + height[9]) || rocket_y <= (20 + height[14]) || (rocket_y + 20) >= (230 + height[9]) || (rocket_y + 20) >= (230 + height[14])) {
        go = false;
    }
    if (barrier_active) {
        if (barrier_x <= 70 && barrier_x >= 50) {
            if (rocket_y >= barrier_y && rocket_y <= barrier_y + 100) {
                go = false;
            }
        }
    }
}

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