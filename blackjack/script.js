$(document).ready(function(){
    
var y_total = 0;
var o_total = 0;
var card = 0;
var card_name = 0;
var money = 500;
var bet = 0;
var terminate_game = false;
var bet_repeat = true;
var card_used = false;
var repeat = true;
var repeat_dealer = true;
var you_has_ace = false;
var dealer_has_ace = false;
var win = false;
var lose = false;
var blackjack = false;
var bet_input = "";
var card_chosen_name = "";
var card_chosen_suit = "";
var dealer_hidden_card = "";
var game_over_message = "";
var card_chosen_value = 0;
var heart_card_chosen = [];
var club_card_chosen = [];
var diamond_card_chosen = [];
var spade_card_chosen = [];
var dealer_chosen_cards = [];
var you_chosen_cards = [];

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
    if (spade_card_chosen.length >= 12 && heart_card_chosen.length >= 12 && club_card_chosen.length >= 12 && diamond_card_chosen.length >= 12) {
        alert("Shuffling Deck...");
        $('.after').after('<p class="remove">Shuffling Deck</p>');
        spade_card_chosen = [];
        heart_card_chosen = [];
        club_card_chosen = [];
        diamond_card_chosen = [];
    }
    repeat = true;
}

function play() {
    while (bet_repeat) {
        bet_input = prompt("Enter bet. (greater than zero)", bet);
        bet = parseFloat(bet_input);
        if (bet > 0 && bet <= money) {
            bet_repeat = false;
        } else {
            alert("That was an unacceptable value!");
        }
    }
    y_total = 0;
    o_total = 0;
    you_has_ace = false;
    dealer_has_ace = false;
    repeat_dealer = true;
    blackjack = false;
    bet_repeat = true;
    win = false;
    lose = false;
    dealer_chosen_cards = [];
    you_chosen_cards = [];

    $('.bet').html('Bet: $' + bet);
    $('.total_money').html('Total money: $' + money);

    new_card();
    $('.after').after('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    you_chosen_cards.push(card_chosen_name + ' of ' + card_chosen_suit + ", ");
    y_total += card_chosen_value;

    if (card_chosen_name === "Ace") {
        you_has_ace = true;
    }

    new_card();
    $('.after').after('<p class="remove">Dealer got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    o_total += card_chosen_value;
    dealer_chosen_cards.push(card_chosen_name + ' of ' + card_chosen_suit + ", ");

    if (card_chosen_name === "Ace") {
        dealer_has_ace = true;
    }

    new_card();
    $('.after').after('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    you_chosen_cards.push(card_chosen_name + ' of ' + card_chosen_suit + ", ");
    y_total += card_chosen_value;

    if (card_chosen_name === "Ace") {
        you_has_ace = true;
    }

    new_card();
    o_total += card_chosen_value;
    dealer_chosen_cards.push('hidden, ');
    dealer_hidden_card = card_chosen_name + " of " + card_chosen_suit + ", ";

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
        game_over_message = "Dealer got Blackjack. You Lose.";
        lose = true;
        display();
        setTimeout(function () {
            game_over();
        },1);
    }

    if (y_total === 21) {
        game_over_message = "You got Blackjack! You Won!";
        blackjack = true;
        display();
        setTimeout(function () {
            game_over();
        },1);
    }


    display();

    $('.hit, .stand, .double_down').css('display', 'block');
    $('.hit').html('Hit');
    $('.stand').html('Stand');
    $('.double_down').html('Double Down');

}

function display() {
    $('.you').html('Your Total: ' + y_total);
    $('.your_cards').html(you_chosen_cards);
    $('.dealer_cards').html(dealer_chosen_cards);
}

$('.hit').click(function () {
    your_turn();
});

    function your_turn() {
    new_card();
    $('.after').after('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    you_chosen_cards.push(card_chosen_name + ' of ' + card_chosen_suit + ", ");
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
        game_over_message = "You Lost";
        lose = true;
        setTimeout(function () {
            game_over();
        }, 1);
    }
}

$('.double_down').click(function () {
    if (bet * 2 > money) {
        alert("You do not have enough money to double down!")
    } else {
        bet = bet * 2;
        your_turn();
        if (y_total<=21){
        dealer_turn();
    }
    }
});

$('.stand').click(function () {
    dealer_turn();
});

    function dealer_turn() {
    dealer_chosen_cards[1] = dealer_hidden_card;
    if (o_total > y_total) {
        game_over_message = "Dealer Won. You Lost.";
        lose = true;
        repeat_dealer = false;
    }
    if (o_total === y_total) {
        if (o_total > 19) {
            game_over_message = "Its a tie.";
            repeat_dealer = false;
        }
    }
    while (repeat_dealer) {
        new_card();
        $('.after').after('<p class="remove">Dealer got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
        dealer_chosen_cards.push(card_chosen_name + ' of ' + card_chosen_suit + ", ");
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
        if (o_total > 21) {
            game_over_message = "Dealer Lost. You Won!";
            win = true;
            repeat_dealer = false;
        }
        if (o_total > y_total) {
            if (o_total <= 21) {
                game_over_message = "Dealer Won. You Lost.";
                lose = true;
                repeat_dealer = false;
            }
        }
        if (o_total === y_total) {
            if (o_total > 19) {
                game_over_message = "Its a tie.";
                repeat_dealer = false;
            }
        }
    }
    display();
    setTimeout(function () {
        game_over();
    }, 1);
}

function game_over() {
    alert(game_over_message);
    $('.after').after(game_over_message);
    if (win) {
        money += bet;
        $('.after').after('<p class="remove">You Won $' + bet + '</p>');
    } else if (lose) {
        money -= bet;
        $('.after').after('<p class="remove">You Lost $' + bet + '</p>');
    } else if (blackjack) {
        money += bet * 1.5;
        $('.after').after('<p class="remove">You won $' + bet * 1.5 + '</p>');
    } else {
        $('.after').after('<p class="remove">No money was gained or lost</p>');
    }
    alert("Your total money is: $" + money);
    if (money <= 0) {
        alert("You lost all your money");
        alert("Reload page to play again");
        $('div').remove();
        $('p').remove();
        $('h1').remove();
        $('h3').remove();
        terminate_game = true;
    }
    if (terminate_game === false) {
        play();
    }
}

$('.play').click(function () {
    play();
    $('.play').hide();
});

});