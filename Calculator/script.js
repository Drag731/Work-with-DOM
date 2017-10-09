var arrayOfButton = ['C', '^', 7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '÷', 0, '.', '=', '×'];

var parentElem = document.body;
var div = document.createElement('div');
var input = document.createElement('input');
input.setAttribute('value', '');
div.classList.add('calc');
parentElem.insertBefore(div, parentElem.children[0]);
div.insertBefore(input, parentElem.children[3]);


for (var i = 0; i < arrayOfButton.length; i++) {
    var button = document.createElement('button');
    div.appendChild(button);
    button.appendChild(document.createTextNode(arrayOfButton[i]));
};

div.insertBefore(input, div.children[3]);

var buttons = div.getElementsByTagName('button');

for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];

    if(buttons[i].innerHTML.search( /\d|\./ ) != -1)  {
		    buttons[i].classList.add('numbers');
    }
    if(button.innerHTML.search( /\+|\-|\÷|\×|\^/ ) != -1) {
		    buttons[i].classList.add('green', 'operators');
    }
    if(button.innerHTML == 'C') {
        buttons[i].classList.add('red', 'clear');
    }
    if(button.innerHTML == '=') {
		    buttons[i].classList.add('orange', 'result');
    }
};

var number = document.querySelectorAll('.numbers'),
    operator = document.querySelectorAll('.operators'),
  	result = document.querySelector('.result'),
  	clear = document.querySelector('.clear'),
  	resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", clickOfNumber);

    function clickOfNumber(e) {
        var currentString = input.value;
        var lastChar = currentString[currentString.length - 1];

        if (e.target.innerHTML == '.' && input.value == '.') {
            return;
        } else if (e.target.innerHTML == '.' && input.value != '' && lastChar.search( /\+|\-|\÷|\×|\^/ ) != -1) {
            return
        }
        if (resultDisplayed === false) {
            input.value += e.target.innerHTML;
        } else if (resultDisplayed === true && (lastChar.search( /\+|\-|\÷|\×|\^/ ) != -1)) {
            resultDisplayed = false;
            input.value += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.value = "";
            input.value += e.target.innerHTML;
        }
    }
}

// adding click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", clickOfOperator);

    function clickOfOperator(e) {
        var currentString = input.value;
        var lastChar = currentString[currentString.length - 1];
        if (!lastChar) {
            return;
        }
        if (lastChar.search( /\+|\-|\÷|\×|\^|\./ ) != -1) {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.value = newString;
        } else if (currentString.length == 0) {
            console.log("enter a number first");
        } else {
            input.value += e.target.innerHTML;
        }
    }
}

// on click of 'equal' button
result.addEventListener("click", resultAll);

function resultAll() {
    var inputString = input.value;
    // forming an array of numbers
    var numbers = inputString.split(/\+|\-|\×|\÷|\^/g);
    // forming an array of operators
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    var divide = operators.indexOf("÷");

    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");

    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var divide = operators.indexOf("^");

    while (divide != -1) {
        numbers.splice(divide, 2, Math.pow(numbers[divide], numbers[divide + 1]));
        operators.splice(divide, 1);
        divide = operators.indexOf("^");
    }

    var subtract = operators.indexOf("-");

    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");

    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation 
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.value = Math.round(numbers[0]*100000)/100000; // displaying the output

    resultDisplayed = true; // turning flag if result is displayed
}

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.value = "";
    resultDisplayed = false;
})

div.addEventListener('mousedown' , addClass);

function addClass(event) {
    var target = event.target;

    if (target.tagName != 'BUTTON') {
        return;
    }

    target.classList.add('light-blue');
}

div.addEventListener( "mouseup", removeClass);

function removeClass(event) {
    var target = event.target;

    if (target.tagName != 'BUTTON') {
        return;
    }

    target.classList.remove('light-blue');
}