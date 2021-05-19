//variables
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");

const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");

const screenInput = document.querySelector(".input");
const screenOutput = document.querySelector(".output");
const screenOperand= document.querySelector(".operand")

let currentNumber = "";
let lastNumber= "";
let operand;
let equateFlag = false;

//setup
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.textContent==="." && screenInput.textContent.includes("."))return;
        if(equateFlag===true) clear();
        if(operand !== undefined && screenOutput.textContent == ""){
            lastNumber = currentNumber;
            screenOutput.textContent = screenInput.textContent;
            if(button.textContent === "."){
                currentNumber = "0.";
                screenInput.textContent = "0.";
            } else {
            currentNumber = button.textContent;
            screenInput.textContent = button.textContent;
            }
        }else{
            if(button.textContent === "." && screenInput.textContent === ""){
                currentNumber = "0.";
                screenInput.textContent = "0.";
            }else{
            screenInput.textContent += button.textContent;
            currentNumber = screenInput.textContent;
            }
        }
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () =>{
        if(equateFlag===true) equateFlag= false;
        operand = button.textContent;
        screenOperand.textContent = operand;
    });
});

deleteButton.addEventListener("click", button => {
    screenInput.textContent = screenInput.textContent.slice(-(screenInput.textContent.length),-1);
    currentNumber = screenInput.textContent;
});

clearButton.addEventListener("click", button => {
    clear()
});

equalsButton.addEventListener("click", button => {
    equate();
});


//functions

function clear(){
    lastNumber = "";
    currentNumber = "";
    equateFlag = false;
    operand = undefined;
    screenInput.textContent = "";
    screenOutput.textContent = "";
    screenOperand.textContent = "";
}

function equate(){
    if(operation() == false)return;
    screenOutput.textContent = lastNumber;
    screenInput.textContent = "";
    screenOperand.textContent = "";
    currentNumber = "";
    operand = undefined;
    equateFlag = true;
}

function add(num1,num2){
  let sum = (num1+num2);
    if (sum.length>30)return sum.toFixed(20).toString();
    return sum.toString();
}
function subtract(num1,num2){
    let sum = (num1-num2);
    if (sum.length>30)return sum.toFixed(20).toString();
    return sum.toString();
}
function multiply(num1,num2){
    let sum = (num1*num2);
    if (sum.length>30)return sum.toFixed(20).toString();
    return sum.toString();
}
function divide(num1,num2){
    let sum = (num1/num2);
    if (sum.length>30)return sum.toFixed(20).toString();
    return sum.toString();
}

function operation(){
	if(lastNumber == "" || currentNumber == "")return false;
    if (operand === "+"){
        lastNumber = add(parseFloat(lastNumber),parseFloat(currentNumber));
        operand = undefined;
    }
    if (operand === "-"){
        lastNumber = subtract(parseFloat(lastNumber),parseFloat(currentNumber));
        operand = undefined;
    }
    if (operand === "/"){
        lastNumber = divide(parseFloat(lastNumber),parseFloat(currentNumber));
        operand = undefined;
    }
    if (operand === "*"){
        lastNumber = multiply(parseFloat(lastNumber),parseFloat(currentNumber));
        operand = undefined;
    }
}