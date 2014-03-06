$(document).ready(function(){
    
var y_total = 0;
var o_total = 0;
var card = 0;
var card_name = 0;
var money = 500;
var bet = 0;
var icon_x = 0;
var icon_y = 0;
var card_chosen_value = 0;
var bet_repeat = true;
var card_used = false;
var repeat = true;
var repeat_dealer = true;
var you_has_heart_ace = false;
var dealer_has_heart_ace = false;
var you_has_spade_ace = false;
var dealer_has_spade_ace = false;
var you_has_club_ace = false;
var dealer_has_club_ace = false;
var you_has_diamond_ace = false;
var dealer_has_diamond_ace = false;
var win = false;
var lose = false;
var blackjack = false;
var surrender = false;
var game_in_prog = false;
var can_double_down = true;
var can_surrender = true;
var bet_input = "";
var card_chosen_name = "";
var card_chosen_suit = "";
var dealer_hidden_card = "";
var game_over_message = "";
var heart_card_chosen = [];
var club_card_chosen = [];
var diamond_card_chosen = [];
var spade_card_chosen = [];
var dealer_chosen_cards = [];
var you_chosen_cards = [];
var icon_x_list = [];
var icon_y_list = [];
var o_icon_x_list = [];
var o_icon_y_list = [];

$('.total_money').html('Total money: $' + money);

//this generates a new card and make sure it has not been used before suffling the deck
function new_card() {
    while (repeat) {
        card = Math.floor(Math.random() * 13 + 1);

        switch (card) {
            case 1:
                card_chosen_value = 2;
                card_chosen_name = "Two";
                icon_x = 73;
                break;
            case 2:
                card_chosen_value = 3;
                card_chosen_name = "Three";
                icon_x = 146;
                break;
            case 3:
                card_chosen_value = 4;
                card_chosen_name = "Four";
                icon_x = 219;
                break;
            case 4:
                card_chosen_value = 5;
                card_chosen_name = "Five";
                icon_x = 292;
                break;
            case 5:
                card_chosen_value = 6;
                card_chosen_name = "Six";
                icon_x = 365;
                break;
            case 6:
                card_chosen_value = 7;
                card_chosen_name = "Seven";
                icon_x = 438;
                break;
            case 7:
                card_chosen_value = 8;
                card_chosen_name = "Eight";
                icon_x = 511;
                break;
            case 8:
                card_chosen_value = 9;
                card_chosen_name = "Nine";
                icon_x = 584;
                break;
            case 9:
                card_chosen_value = 10;
                card_chosen_name = "Ten";
                icon_x = 657;
                break;
            case 10:
                card_chosen_value = 10;
                card_chosen_name = "Jack";
                icon_x = 730;
                break;
            case 11:
                card_chosen_value = 10;
                card_chosen_name = "Queen";
                icon_x = 803;
                break;
            case 12:
                card_chosen_value = 10;
                card_chosen_name = "King";
                icon_x = 876;
                break;
            case 13:
                card_chosen_value = 11;
                card_chosen_name = "Ace";
                icon_x = 0;
                break;
        }
        card_name = Math.floor(Math.random() * 4 + 1);

        switch (card_name) {
            case 1:
                card_chosen_suit = "Hearts";
                icon_y = 196;
                break;
            case 2:
                card_chosen_suit = "Clubs";
                icon_y = 0;
                break;
            case 3:
                card_chosen_suit = "Diamonds";
                icon_y = 294;
                break;
            case 4:
                card_chosen_suit = "Spades";
                icon_y = 98;
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
        if (you_chosen_cards.length>0){
            for (var x = 0; x<you_chosen_cards.length; x++){
                var a = you_chosen_cards[x].split(' ');
                if (a[1] == 'Spades'){
                    spade_card_chosen.push(a[0]);
                }
                if (a[1] == 'Hearts'){
                    heart_card_chosen.push(a[0]);
                }
                if (a[1] == 'Clubs'){
                    club_card_chosen.push(a[0]);
                }
                if (a[1] == 'Diamonds'){
                    diamond_card_chosen.push(a[0]);
                }
            }
        }
        if (dealer_chosen_cards.length>0){
            for (var xx = 0; xx<dealer_chosen_cards.length; xx++){
                var aa = dealer_chosen_cards[xx].split(' ');
                if (aa[1] == 'Spades'){
                    spade_card_chosen.push(aa[0]);
                }
                if (aa[1] == 'Hearts'){
                    heart_card_chosen.push(aa[0]);
                }
                if (aa[1] == 'Clubs'){
                    club_card_chosen.push(aa[0]);
                }
                if (aa[1] == 'Diamonds'){
                    diamond_card_chosen.push(aa[0]);
                }
            }
        }
    }
    repeat = true;
}
//this is the initial gameplay, giving each player two cards
function play() {
    bet_input = $('#bet_input').val();
    bet = parseFloat(Math.round(bet_input));
    if (bet >= 1 && bet <= money) {
    } else {
        alert("That was an unacceptable value! Bet must be between 1 and "+money);
        document.getElementById('bet_input').disabled = false;
        game_in_prog = false;
        $('.play').css({"background-color":"#FFDE00","cursor":"pointer"});
        $('.stand').css({"background-color":"lightgray","cursor":"default"});
        $('.double_down').css({"background-color":"lightgray","cursor":"default"});
        $('.hit').css({"background-color":"lightgray","cursor":"default"});
        $('.surrender').css({"background-color":"lightgray","cursor":"default"});
        if(($('.game_field').height())>350){
            var h = $('.game_field').height()-350;
            $('.made_by').css('top',''+(600+h)+'px');
        }
        else if(($('.game_field').height())>150) {
            $('.made_by').css('top','600px');
        }else{
            $('.made_by').css('top','370px');
        }
        return;
    }
    $('.made_by').css('top','600px');
    $('.w_or_l_message').html("");
    y_total = 0;
    o_total = 0;
    you_has_heart_ace = false;
    dealer_has_heart_ace = false;
    you_has_spade_ace = false;
    dealer_has_spade_ace = false;
    you_has_diamond_ace = false;
    dealer_has_diamond_ace = false;
    you_has_club_ace = false;
    dealer_has_club_ace = false;
    repeat_dealer = true;
    blackjack = false;
    bet_repeat = true;
    win = false;
    lose = false;
    surrender = false;
    can_double_down = true;
    can_surrender = true;
    dealer_chosen_cards = [];
    you_chosen_cards = [];
    icon_y_list = [];
    icon_x_list = [];
    o_icon_y_list = [];
    o_icon_x_list = [];

    $('.bet').html('Bet: $' + bet);
    $('.total_money').html('Total money: $' + money);

    new_card();
    $('.after').after('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    you_chosen_cards.push(card_chosen_name + ' ' + card_chosen_suit);
    icon_x_list.push(icon_x);
    icon_y_list.push(icon_y);
    y_total += card_chosen_value;

    you_got_ace_check();

    new_card();
    $('.after').after('<p class="remove">Dealer got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    o_total += card_chosen_value;
    dealer_chosen_cards.push(card_chosen_name + ' ' + card_chosen_suit);
    o_icon_x_list.push(icon_x);
    o_icon_y_list.push(icon_y);

    dealer_got_ace_check();

    new_card();
    $('.after').after('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    you_chosen_cards.push(card_chosen_name + ' ' + card_chosen_suit);
    icon_x_list.push(icon_x);
    icon_y_list.push(icon_y);
    y_total += card_chosen_value;

    you_got_ace_check();

    new_card();
    o_total += card_chosen_value;
    dealer_chosen_cards.push(card_chosen_name + ' ' + card_chosen_suit);
    o_icon_x_list.push(icon_x);
    o_icon_y_list.push(icon_y);
    dealer_hidden_card = card_chosen_name + " " + card_chosen_suit;

    display();

    dealer_got_ace_check();

    you_has_ace_check();

    dealer_has_ace_check();

    if (o_total === 21 && y_total === 21){
        game_over_message = "Its a tie.";
        setTimeout(function () {
            game_over();
        },1);
    }

    if (o_total === 21 && y_total != 21) {
        game_over_message = "Dealer got Blackjack. You Lose.";
        lose = true;
        setTimeout(function () {
            game_over();
        },1);
    }

    if (y_total === 21 && o_total != 21) {
        game_over_message = "You got Blackjack! You Won!";
        blackjack = true;
        setTimeout(function () {
            game_over();
        },1);
    }


    display();

    $('.hit, .stand, .double_down, .surrender').css('display', 'block');
    $('.hit').html('Hit');
    $('.stand').html('Stand');
    $('.double_down').html('Double Down');
    $('.surrender').html('Surrender');

}
//this displays the current cards on the field
function display() {
    $('.card_img').remove();
    $('.you').html('Your Total: ' + y_total);
    for (var x = 0; x<you_chosen_cards.length; x++){
        $('.your_cards').append('<div class="card_img card'+x+'"></div>');
        $('.card'+x+'').css('background-position',''+(-icon_x_list[x])+'px '+(-icon_y_list[x])+'px');
    }
    for (var xx = 0; xx<dealer_chosen_cards.length; xx++){
        $('.dealer_cards').append('<div class="card_img o_card'+xx+'"></div>');
        $('.o_card'+xx+'').css('background-position',''+(-o_icon_x_list[xx])+'px '+(-o_icon_y_list[xx])+'px');
        if (dealer_chosen_cards[xx]==dealer_hidden_card){
            $('.o_card'+xx+'').css({"background-image":"url('card_back.png')","background-size":"71px 96px","background-position":"1px 1px"});
        }
    }
    if(($('.game_field').height())>350){
        var h = $('.game_field').height()-350;
        $('.made_by').css('top',''+(600+h)+'px');
    }
    else {
        $('.made_by').css('top','600px');
    }
}
//this calls the function your_turn
$('.hit').click(function () {
    if (!game_in_prog){
        return;
    }
    can_double_down = false;
    can_surrender = false;
    $('.double_down').css({"background-color":"lightgray","cursor":"default"});
    $('.surrender').css({"background-color":"lightgray","cursor":"default"});
    your_turn();
});
//this causes you to surrender and calls game_over function
$('.surrender').click(function () {
    if (can_surrender){
        if (!game_in_prog){
            return;
        }
        bet = Math.round(bet / 2);
        game_over_message = "You Surrendered";
        surrender = true;
        setTimeout(function () {
            game_over();
        },1);
    }
});
//this function gives the player a single card and checks if any events happened
function your_turn() {
    new_card();
    $('.after').after('<p class="remove">You got a ' + card_chosen_name + ' of ' + card_chosen_suit + '</p>');
    you_chosen_cards.push(card_chosen_name + ' ' + card_chosen_suit);
    icon_x_list.push(icon_x);
    icon_y_list.push(icon_y);
    y_total += card_chosen_value;

    you_got_ace_check();

    you_has_ace_check();

    display();

    if (y_total > 21) {
        game_over_message = "You Lost";
        lose = true;
        setTimeout(function () {
            game_over();
        }, 1);
    }
}
//this function checks if you have enough money to double down. If you do, it gives you one card and moves to the dealers turn
$('.double_down').click(function () {
    if (can_double_down){
        if (!game_in_prog){
            return;
        }
        if (bet * 2 > money) {
            alert("You do not have enough money to double down!");
        } else {
            bet = bet * 2;
            your_turn();
            if (y_total<=21){
                dealer_turn();
            }
        }
    }
});
//this function calls the dealers turn
$('.stand').click(function () {
    if (!game_in_prog){
        return;
    }
    dealer_turn();
});
//this function with play as the dealer, drawing a new card until it has won or breaks
function dealer_turn() {
    dealer_chosen_cards[1] = dealer_hidden_card;
    dealer_hidden_card = "none";
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
        dealer_chosen_cards.push(card_chosen_name + ' ' + card_chosen_suit);
        o_icon_x_list.push(icon_x);
        o_icon_y_list.push(icon_y);
        o_total += card_chosen_value;

        dealer_got_ace_check();

        dealer_has_ace_check();

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
    setTimeout(function () {
        game_over();
    }, 1);
}
//this function checks if you got an ace from the newcard function
function you_got_ace_check() {
    if (card_chosen_name === "Ace") {
        if (card_chosen_suit === "Hearts") {
            you_has_heart_ace = true;
        }
        if (card_chosen_suit === "Spades") {
            you_has_spade_ace = true;
        }
        if (card_chosen_suit === "Clubs") {
            you_has_club_ace = true;
        }
        if (card_chosen_suit === "Diamonds") {
            you_has_diamond_ace = true;
        }
    }
}
//this function checks if the dealer got an ace from the newcard function
function dealer_got_ace_check() {
    if (card_chosen_name === "Ace") {
        if (card_chosen_suit === "Hearts") {
            dealer_has_heart_ace = true;
        }
        if (card_chosen_suit === "Spades") {
            dealer_has_spade_ace = true;
        }
        if (card_chosen_suit === "Clubs") {
            dealer_has_club_ace = true;
        }
        if (card_chosen_suit === "Diamonds") {
            dealer_has_diamond_ace = true;
        }
    }
}
//this function checks if you have an ace; if you do, it will subtract 10 from your total
function you_has_ace_check() {
    if (y_total > 21) {
        if (you_has_diamond_ace) {
            y_total -= 10;
            you_has_diamond_ace = false;
        }
    }
    if (y_total > 21) {
        if (you_has_heart_ace) {
            y_total -= 10;
            you_has_heart_ace = false;
        }
    }
    if (y_total > 21) {
        if (you_has_spade_ace) {
            y_total -= 10;
            you_has_spade_ace = false;
        }
    }
    if (y_total > 21) {
        if (you_has_club_ace) {
            y_total -= 10;
            you_has_club_ace = false;
        }
    }
}
//this function checks if the dealer has an ace; if the dealer does, it will subtract 10 from the dealers total
function dealer_has_ace_check() {
    if (o_total > 21) {
            if (dealer_has_diamond_ace) {
                o_total -= 10;
                dealer_has_diamond_ace = false;
            }
        }
        if (o_total > 21) {
            if (dealer_has_heart_ace) {
                o_total -= 10;
                dealer_has_heart_ace = false;
            }
        }
        if (o_total > 21) {
            if (dealer_has_spade_ace) {
                o_total -= 10;
                dealer_has_spade_ace = false;
            }
        }
        if (o_total > 21) {
            if (dealer_has_club_ace) {
                o_total -= 10;
                dealer_has_club_ace = false;
            }
        }
}
//this function displays the gameover messages and deletes all elements
function game_over() {
    if (dealer_hidden_card != "none"){
        dealer_chosen_cards[1] = dealer_hidden_card;
        dealer_hidden_card = "none";
    }
    game_in_prog = false;
    display();
    $('.play').css({"background-color":"#FFDE00","cursor":"pointer"});
    $('.stand').css({"background-color":"lightgray","cursor":"default"});
    $('.double_down').css({"background-color":"lightgray","cursor":"default"});
    $('.hit').css({"background-color":"lightgray","cursor":"default"});
    $('.surrender').css({"background-color":"lightgray","cursor":"default"});
    document.getElementById('bet_input').disabled = false;
    $('.after').after(game_over_message);
    $('.w_or_l_message').html(game_over_message);
    alert(game_over_message);
    if (win) {
        money += bet;
        $('.after').after('<p class="remove">You Won $' + bet + '</p>');
    } else if (lose) {
        money -= bet;
        $('.after').after('<p class="remove">You Lost $' + bet + '</p>');
    } else if (blackjack) {
        money += Math.round(bet * 1.5);
        $('.after').after('<p class="remove">You won $' + bet * 1.5 + '</p>');
    } else if (surrender) {
        money -= bet;
        $('.after').after('<p class="remove">You Lost $' + bet + '</p>');
    }else {
        $('.after').after('<p class="remove">No money was gained or lost</p>');
    }
    $('.total_money').html('Total money: $' + money);
    $('.bet').html('Bet: $' + bet);
    if (money <= 0) {
        alert("You lost all your money");
        $('body').after('<h2>Reload Page To Play Again</h2>');
        $('div').remove();
        $('p').remove();
        $('h1').remove();
        $('h3').remove();
    }
}
//this function hides the message box and the close box button
$('.close_box').click(function () {
    $('.message_box').css('display','none');
    $('.close_box').css('display','none');
});
//this function calls start_game_check
$('.play').click(function () {
    start_game_check();
});
//this activates if enter key is pressed and calls start_game_function
$(document).keydown(function (e) {
    if (e.keyCode === 13) {
        start_game_check();
    }
});
//this checks if the game should be started and starts it if it should be by calling the play function
function start_game_check() {
    document.getElementById('bet_input').disabled = true;
    if (!game_in_prog){
        game_in_prog = true;
        $('.play').css({"background-color":"lightgray","cursor":"default"});
        $('.stand').css({"background-color":"#FFDE00","cursor":"pointer"});
        $('.double_down').css({"background-color":"#FFDE00","cursor":"pointer"});
        $('.hit').css({"background-color":"#FFDE00","cursor":"pointer"});
        $('.surrender').css({"background-color":"#FFDE00","cursor":"pointer"});
        play();
    }
}

});