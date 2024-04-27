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
const restart = $('#restart');
// const numbers = $('.numbers');
const numbers = document.querySelectorAll('.numbers');
const chosen = 'multiply';

let correct = 0;
let wrong = 0;
let ans = 0;

score.text('0');
missed.text('0');

// Disable the keyboard
document.onkeydown = function (e) {
    return false;
}

// Clear the input value
clearBtn.on("click", () => answer.val(''));

// Delete the last character
backspace.on("click", () => answer.val(answer.val().slice(0,-1)));

// Add the button number to the input
numbers.forEach(number => {
    number.addEventListener('click', () => {
        answer.val(answer.val() + number.textContent);
        answer.change();
});
})

// Don't allow more than 5 digits in the answer
answer.change(() => {
    console.log(answer.val().length);
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
            console.log(ans);
            break;
        case 'multiply':
            topNum.text(a);
            botNum.text(b);
            operand.text('x');
            ans = multiply();
            console.log(ans);
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
            console.log(ans);
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
            console.log(ans);
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
let randoms = () => Math.floor(Math.random() * 12);

// Complete math operations
let multiply = () => Number(topNum.text()) * Number(botNum.text());
let addition = () => Number(topNum.text()) + Number(botNum.text());
let subtraction = () => Number(topNum.text()) - Number(botNum.text());
let division = () => Number(topNum.text()) / Number(botNum.text());

// Check the answers when you click the checkmark
checkmark.on("click", checking);

problem(chosen);
randoms();