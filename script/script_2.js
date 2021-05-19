// After going in blind, I attemted some improvements in version 2
// of the calculator.
//


// redo functions to store numbers and operators in arrays before equate
// solve arrays with a loop
// display full string of operations in output
// display sum in input and "=" in operand after pressing equate
// pressing any number clears after equate but operators continue.
// zero division error
// add key-inputs for the buttons



//variables
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");

const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");

const screenInput = document.querySelector(".input");
const screenOutput = document.querySelector(".output");
const screenOperand = document.querySelector(".operand")

let currentNumber = "";
let lastNumber = "";
let operand;
let equateFlag = false;
let numbers = [];
let operands = [];

//setup
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "." && screenInput.textContent.includes(".")) return;
        if (equateFlag === true) clear();
        if (operand !== undefined && screenInput.textContent != "") {
            lastNumber = currentNumber;
            numbers.push(lastNumber);
            operands.push(operand);
            screenOutput.textContent += screenInput.textContent + operand;
            screenOperand.textContent = "";
            operand = undefined;
            let check = ((screenOutput.textContent).charAt(screenOutput.textContent.length - 1));
            if (button.textContent === "." && check.match(/[\+\-\*\/]/)) {
                currentNumber = "0.";
                screenInput.textContent = "0.";
            } else {
                currentNumber = button.textContent;
                screenInput.textContent = button.textContent;
            }
        } else {
            if (button.textContent === "." && screenInput.textContent == "") {
                currentNumber = "0.";
                screenInput.textContent = "0.";
            } else {
                screenInput.textContent += button.textContent;
                currentNumber = screenInput.textContent;
            }
        }
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (isNaN(screenInput.textContent)) return clear();
        if (equateFlag === true) {
            equateFlag = false;
            screenOutput.textContent = "";
            currentNumber = screenInput.textContent;
            lastNumber = "";
            operand = button.textContent;
            screenOperand.textContent = operand;
        } else {
            operand = button.textContent;
            screenOperand.textContent = operand;
        }
    });
});

deleteButton.addEventListener("click", button => {
    buttonDelete();
});

clearButton.addEventListener("click", button => {
    clear();
});


equalsButton.addEventListener("click", button => {
    buttonEqual();
});

// keyboard

window.addEventListener("keydown", button => {
    button.preventDefault();
    if (button.code === "Delete") clear();
    if (button.code === "Backspace") buttonDelete();
    if (button.code === "Enter" || button.code === "NumpadEnter") buttonEqual();
    numberButtons.forEach(e => {
        if (button.key === e.dataset.number) e.click();
        if (button.key === "," && e.dataset.number === ".") e.click();
    });
    operationButtons.forEach(e => {
        if (button.key === e.dataset.operator) e.click();
    });
});

//functions

function buttonDelete() {
    screenInput.textContent = screenInput.textContent.slice(-(screenInput.textContent.length), -1);
    currentNumber = screenInput.textContent;
}

function buttonEqual() {
    if (equateFlag === true) {
        //return clear()
        screenOutput.textContent = "";
        screenOperand.textContent = "";
        operand = undefined;
        currentNumber = screenInput.textContent;
        lastNumber = screenOutput.textContent;
        equateFlag = false;
        return;
    };
    if (screenOutput.textContent == "") return;
    numbers.push(currentNumber);
    equate();
}

function clear() {
    operands = [];
    numbers = [];
    lastNumber = "";
    currentNumber = "";
    equateFlag = false;
    operand = undefined;
    screenInput.textContent = "";
    screenOutput.textContent = "";
    screenOperand.textContent = "";
}

function equate() {
    operation();
    screenOutput.textContent += screenInput.textContent;
    screenInput.textContent = lastNumber;
    screenOperand.textContent = "=";
    currentNumber = lastNumber;
    operand = undefined;
    equateFlag = true;
}

function add(num1, num2) {
    let sum = (num1 + num2);
    if (sum.length > 30) return sum.toFixed(20).toString();
    return sum.toString();
}
function subtract(num1, num2) {
    let sum = (num1 - num2);
    if (sum.length > 30) return sum.toFixed(20).toString();
    return sum.toString();
}
function multiply(num1, num2) {
    let sum = (num1 * num2);
    if (sum.length > 30) return sum.toFixed(20).toString();
    return sum.toString();
}
function divide(num1, num2) {
    if (num2 == 0) return "You tried to divide by Zero";
    let sum = (num1 / num2);
    if (sum.length > 30) return sum.toFixed(20).toString();
    return sum.toString();
}

function operation() {
    let i = 0;
    let sum = numbers[0];

    while (i < operands.length) {

        if (operands[i] === "+") {
            sum = add(parseFloat(sum), parseFloat(numbers[i + 1]));
        }
        if (operands[i] === "-") {
            sum = subtract(parseFloat(sum), parseFloat(numbers[i + 1]));
        }
        if (operands[i] === "/") {
            sum = divide(parseFloat(sum), parseFloat(numbers[i + 1]));
            if (sum == "You tried to divide by Zero") {
                return lastNumber = sum;
            }
        }
        if (operands[i] === "*") {
            sum = multiply(parseFloat(sum), parseFloat(numbers[i + 1]));
        }
        i++;
    }
    lastNumber = sum;
    numbers = [];
    operands = [];
}