let firstNumber = "";
let secondNumber = "";
let operator = "";

const display = document.querySelector("#display");
const buttons = document.querySelector(".buttons");
const operatorBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");
const equalsBtn = document.querySelector("#equal");

numberBtns.forEach((button) => button.addEventListener("click", handleNumberInput));
operatorBtns.forEach((button) => button.addEventListener("click", handleOperatorInput));
equalsBtn.addEventListener("click", handleEquals);

function handleOperatorInput(event){
    if (firstNumber !== "" && secondNumber === ""){
        if (operator !== ""){
            operator = event.target.id;
            display.textContent = operator;
        }
        operator = event.target.id;
        display.textContent += ` ${operator} `;
    }
}

function handleNumberInput(event){
    if (operator === ""){
        firstNumber += event.target.id; 
        display.textContent = firstNumber;
    }else{
        secondNumber += event.target.id;
        display.textContent += event.target.id;
    }
};

function handleEquals(event){
    if (firstNumber !== "" && secondNumber !== "" && operator !== ""){
        display.textContent = operate(+firstNumber, operator, +secondNumber);
        if (display.textContent === "ERROR"){
            firstNumber = "";
        }else{
            firstNumber = display.textContent;
        }
        secondNumber = "";
        operator = "";
    }
}

add = function(num1, num2){
    return num1 + num2;
};

subtract = function(num1, num2){
    return num1 - num2;
};

multiply = function(num1, num2){
    return num1 * num2;
};

divide = function(num1, num2){
    if (num2 === 0){
        return "ERROR";
    }
    return num1 / num2;
};

operate = function(num1, operator, num2){
    switch (operator){
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}