// Pull in all the buttons and input
const answer = $('#answer')
const clearBtn = $('#clear');
const backspace = $('#backspace');
const topNum = $('#topNum');
const botNum = $('#botNum');
const operand = $('#operator');
const score = $('#score');
const missed = $('#missed');
const checkmark = $('#checkmark');
const timer = $('#timer');
const restart = $('#restart');
// const numbers = $('.numbers');
const numbers = document.querySelectorAll('.numbers');
let chosenTime = 10;
let chosen = '';
let maxNum = 10;

let correct = 0;
let wrong = 0;
let ans = 0;
let timeRemaining = chosenTime;


// Disable the keyboard
document.onkeydown = function (e) {
    return false;
}

// Start the game
let start = () => {   
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i); 
    score.text('0');
    missed.text('0');
    correct = 0;
    wrong = 0;
    ans = 0;
    timeRemaining = chosenTime;
    setInterval(timing, 1000);
    timing();
    problem('addition');
};

// Clear the input value
clearBtn.on("click", () => answer.val(''));

// Delete the last character
backspace.on("click", () => answer.val(answer.val().slice(0,-1)));

// Reset everything when Restart is clicked
restart.on("click", start);
// Add the button number to the input
numbers.forEach(number => {
    number.addEventListener('click', () => {
        answer.val(answer.val() + number.textContent);
        answer.change();
});
})

// Don't allow more than 5 digits in the answer
answer.change(() => {
    // console.log(answer.val().length);
    if (answer.val().length > 5) {
        answer.val(answer.val().slice(0, -1));
        answer.addClass('tooLong');
        setTimeout(() => answer.removeClass('tooLong'), 500);
    }
});

// Set the top and bottom numbers for the problem
let problem = (operator) => {  

    let a = randoms();
    let b = randoms();

    // determine which operation was chosen
    switch (operator) {
        case 'addition':  
            topNum.text(a);
            botNum.text(b);
            operand.text('+');
            ans = addition();
            break;
        case 'multiply':
            topNum.text(a);
            botNum.text(b);
            operand.text('x');
            ans = multiply();
            break;
        case 'subtraction': 
            if(a < b) {
                topNum.text(b);
                botNum.text(a);
            }
            else {
                topNum.text(a);
                botNum.text(b);
            }
            operand.text('-');
            ans = subtraction();
            break;
        case 'division':
            while(a % b !== 0) {
                a = randoms();
                b = randoms();
            }
            topNum.text(a);
            botNum.text(b);
            operand.html('<i class="fa-solid fa-divide"></i>');
            operand.css('font-size', '30px');
            ans = division();
            break;
        default:
            console.log("nothing");
            break;
    }
};

let checking = () => {
    // Check if input value = the value
    if (answer.val() == ans) {
        correct++;
        answer.addClass('correct');
        setTimeout(() => answer.removeClass('correct'), 100);
    }  
    else {
        wrong++;
        answer.addClass('tooLong');
        setTimeout(() => answer.removeClass('tooLong'), 100);
    }
    score.text(correct);
    missed.text(wrong);
    answer.val('');
    problem(chosen);

};

// Choose which numbers to place there
let randoms = () => Math.floor(Math.random() * maxNum);

// Complete math operations
let multiply = () => Number(topNum.text()) * Number(botNum.text());
let addition = () => Number(topNum.text()) + Number(botNum.text());
let subtraction = () => Number(topNum.text()) - Number(botNum.text());
let division = () => Number(topNum.text()) / Number(botNum.text());

// Check the answers when you click the checkmark
checkmark.on("click", checking);

// Set the timer
let timing = () => {
    // Determine minutes and seconds
    let minutes = "";
    let seconds = "";
    let mins = 0;
    let sec = 0;

    mins = Math.trunc(timeRemaining/60);
    sec = timeRemaining % 60;
    minutes = (mins<10) ? "0" + mins : mins;
    seconds = (sec<10) ? "0" + sec : sec;

    timer.text(minutes + ":" + seconds);
    timeRemaining--;

    if (timeRemaining < 0) {
        for (let i = 1; i < 99999; i++)
            window.clearInterval(i);
        timer.addClass('tooLong');
        setTimeout(() => timer.removeClass('tooLong'), 1000);
    }
};

// Set the operand
let setOperand = (operator) => {
    chosen = operator;
    console.log(chosen);
    problem(chosen);
    $('.modal-body').empty();
    $('.modal-body').html(
        `<div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="twelve" onclick="setMaxNums(this.id)">0-12</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="twenty" onclick="setMaxNums(this.id)">0-20</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="thirty" onclick="setMaxNums(this.id)">0-30</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="fifty" onclick="setMaxNums(this.id)">0-50</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="hundred" onclick="setMaxNums(this.id)">0-100</button>
        </div>
    </div>`
    );
};

// Set the max number for the equations
let setMaxNums = (maxNumber) => {
    // determine the max number
    switch(maxNumber) {
        case 'twelve':
            maxNum = 12;
            break;
        case 'twenty':
            maxNum = 20;
            break;
        case 'thirty':
            maxNum = 30;
            break;
        case 'fifty':
            maxNum = 50;
            break;
        case 'hundred':
            maxNum = 100;
            break;
        default:
            maxNum = 10;
            break;
    }    
    $('.modal-body').empty();
    $('.modal-body').html(
        `<div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="sixty" onclick="setTimes(this.id)">60 sec</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="ninety" onclick="setTimes(this.id)">90 sec</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="two" onclick="setTimes(this.id)">2 min</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 mb-2">
            <button type="button" class="w-100 oper" id="practice" onclick="setTimes(this.id)">Practice</button>
        </div>
    </div>`
    );
}

// Set the timer
let setTimes = (theTime) => {
    console.log(theTime);
    // determine the timer amount
    switch(theTime) {
        case 'sixty':
            chosenTime = 60;
            break;
        case 'ninety':
            chosenTime = 90;
            break;
        case 'two':
            chosenTime = 120;
            break;
        case 'practice':
            $('#theTop').remove();
            $('#theTime').replaceWith(
                `
                <div class="col-4 offset-2 align-self-center text-end">
                    <p class="infinite"><i class="fa-solid fa-infinity"></i></p>
                </div>
                `
            );
            break;
        default:
            chosenTime = 10;
            break;
    }    
    /*$('.modal-body').empty();
    $('.modal-body').html();*/
}


