$(document).ready(function(){
var y_total = 0;
var o_total = 0;
var card = 0;
var card_used = false;
var repeat = true;
var repeat_dealer = true;
var you_has_ace = false;
var dealer_has_ace = false;
var card_chosen_name = "";
var card_chosen_suit = "";
var card_name = "";
var card_chosen_value = 0;
var heart_card_chosen = [];
var club_card_chosen = [];
var diamond_card_chosen = [];
var spade_card_chosen = [];

function new_card() {
    while (repeat) {
        card = Math.floor(Math.random() * 13 + 1);

        switch (card) {
            case 1:
                card_chosen_value = 2;
                card_chosen_name = "Two";
                break;
            case 2:
                card_chosen_value = 3;
                card_chosen_name = "Three";
                break;
            case 3:
                card_chosen_value = 4;
                card_chosen_name = "Four";
                break;
            case 4:
                card_chosen_value = 5;
                card_chosen_name = "Five";
                break;
            case 5:
                card_chosen_value = 6;
                card_chosen_name = "Six";
                break;
            case 6:
                card_chosen_value = 7;
                card_chosen_name = "Seven";
                break;
            case 7:
                card_chosen_value = 8;
                card_chosen_name = "Eight";
                break;
            case 8:
                card_chosen_value = 9;
                card_chosen_name = "Nine";
                break;
            case 9:
                card_chosen_value = 10;
                card_chosen_name = "Ten";
                break;
            case 10:
                card_chosen_value = 10;
                card_chosen_name = "Jack";
                break;
            case 11:
                card_chosen_value = 10;
                card_chosen_name = "Queen";
                break;
            case 12:
                card_chosen_value = 10;
                card_chosen_name = "King";
                break;
            case 13:
                card_chosen_value = 11;
                card_chosen_name = "Ace";
                break;
            default:
                card_chosen_value = 0;
                card_chosen_name = "";
                break;
        }
        card_name = Math.floor(Math.random() * 4 + 1);

        switch (card_name) {
            case 1:
                card_chosen_suit = "Hearts";
                break;
            case 2:
                card_chosen_suit = "Clubs";
                break;
            case 3:
                card_chosen_suit = "Diamonds";
                break;
            case 4:
                card_chosen_suit = "Spades";
                break;
            default:
                card_chosen_suit = "";
                break;
        }

        if (card_chosen_suit === "Hearts") {
            for (var j = 0; j < heart_card_chosen.length; j++) {
                if (card_chosen_name === heart_card_chosen[j]) {
                    card_used = true;
                }
            }
            if (card_used === false) {
                heart_card_chosen.push(card_chosen_name);
                repeat = false;
            }
        }

        if (card_chosen_suit === "Clubs") {
            for (var k = 0; k < club_card_chosen.length; k++) {
                if (card_chosen_name === club_card_chosen[k]) {
                    card_used = true;
                }
            }
            if (card_used === false) {
                club_card_chosen.push(card_chosen_name);
                repeat = false;
            }
        }

        if (card_chosen_suit === "Diamonds") {
            for (var l = 0; l < diamond_card_chosen.length; l++) {
                if (card_chosen_name === diamond_card_chosen[l]) {
                    card_used = true;
                }
            }
            if (card_used === false) {
                diamond_card_chosen.push(card_chosen_name);
                repeat = false;
            }
        }

        if (card_chosen_suit === "Spades") {
            for (var m = 0; m < spade_card_chosen.length; m++) {
                if (card_chosen_name === spade_card_chosen[m]) {
                    card_used = true;
                }
            }
            if (card_used === false) {
                spade_card_chosen.push(card_chosen_name);
                repeat = false;
            }
        }

        card_used = false;
    }
    repeat = true;
}

function play() {
    y_total = 0;
    o_total = 0;
    you_has_ace = false;
    dealer_has_ace = false;
    repeat_dealer = true;

    $('.remove').remove();
    $('.opponent').html(o_total);
    $('.you').html(y_total);


    new_card();
    $('.before').before('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    y_total += card_chosen_value;

    if (card_chosen_name === "Ace") {
        you_has_ace = true;
    }

    new_card();
    $('.before').before('<p class="remove">Dealer got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    o_total += card_chosen_value;

    if (card_chosen_name === "Ace") {
        dealer_has_ace = true;
    }

    new_card();
    $('.before').before('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    y_total += card_chosen_value;

    if (card_chosen_name === "Ace") {
        you_has_ace = true;
    }

    new_card();
    o_total += card_chosen_value;

    if (card_chosen_name === "Ace") {
        dealer_has_ace = true;
    }

    if (o_total > 21) {
        if (dealer_has_ace) {
            o_total -= 10;
            dealer_has_ace = false;
        }
    }

    if (y_total > 21) {
        if (you_has_ace) {
            y_total -= 10;
            you_has_ace = false;
        }
    }

    if (o_total === 21) {
        $('.before').before('<p class="remove">Dealer got Blackjack. You Lose.</p>');
    }

    if (y_total === 21) {
        $('.before').before('<p class="remove">You got Blackjack! You Won!</p>');
    }


    display();

    $('.hit').html('Hit');
    $('.stand').html('Stand');

}

function display() {
    $('.opponent').html(o_total);
    $('.you').html(y_total);
}

$('.hit').click(function () {
    new_card();
    $('.before').before('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    y_total += card_chosen_value;


    if (card_chosen_name === "Ace") {
        you_has_ace = true;
    }

    if (y_total > 21) {
        if (you_has_ace) {
            y_total -= 10;
            you_has_ace = false;
        }
    }
    display();
    if (y_total > 21) {
        $('.before').before('<p class="remove">You Lost</p>');
    }
});

$('.stand').click(function () {
    if (o_total > y_total) {
        repeat_dealer = false;
    }
    while (repeat_dealer) {
        new_card();
        $('.before').before('<p class="remove">Dealer got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
        o_total += card_chosen_value;


        if (card_chosen_name === "Ace") {
            dealer_has_ace = true;
        }

        if (o_total > 21) {
            if (dealer_has_ace) {
                o_total -= 10;
                dealer_has_ace = false;
            }
        }
        display();
        if (o_total > 21) {
            $('.before').before('<p class="remove">Dealer Lost. You Won!</p>');
            repeat_dealer = false;
        }
        if (o_total > y_total) {
            if (o_total <= 21) {
                $('.before').before('<p class="remove">Dealer Won. You Lost.</p>');
                repeat_dealer = false;
            }
        }
    }
});

$('.play').click(function () {
    play();
});

});