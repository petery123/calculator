let equationData = {
    num1: "", 
    num2: "", 
    operator: "",
    valuePresent: function(property){
        return this[property] !== "";
    }
};

const display = document.querySelector("#display");
const operatorBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");
const equalsBtn = document.querySelector("#equal");
const percentBtn = document.querySelector("#percent");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const decimalBtn = document.querySelector("#decimal");

numberBtns.forEach((button) => button.addEventListener("click", handleNumberInput));
operatorBtns.forEach((button) => button.addEventListener("click", handleOperatorInput));
equalsBtn.addEventListener("click", handleEquals);
percentBtn.addEventListener("click", handlePercent);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", backSpace);
decimalBtn.addEventListener("click", addDecimal);

function handleOperatorInput(event){
    if (equationData.valuePresent("num1") && !equationData.valuePresent("num2")){
        if (equationData.valuePresent("operator")){
            equationData.operator= event.target.id;
            display.textContent = equationData.operator;
        }
        equationData.operator= event.target.id;
        display.textContent += ` ${equationData.operator} `;
    }
}

function handleNumberInput(event){
    if (!equationData.valuePresent("operator")){
        equationData.num1 += event.target.id; 
        display.textContent = equationData.num1;
    }else{
        equationData.num2 += event.target.id;
        display.textContent += event.target.id;
    }
};

function handleEquals(){
    if (equationData.valuePresent("num1") && equationData.valuePresent("num2") && equationData.valuePresent("operator")){
        display.textContent = operate(+equationData.num1, equationData.operator, +equationData.num2);
        if (display.textContent === "ERROR"){
            equationData.num1 = "";
        }else{
            equationData.num1 = display.textContent;
        }
        equationData.num2 = "";
        equationData.operator= "";
    }
}

function backSpace(){
    if (equationData.valuePresent("operator") && !equationData.valuePresent("num2")){
        display.textContent = display.textContent.slice(0, (display.textContent.length-3)); // specifically for removing operator (when there is a number and there is an operator)
    }else if(equationData.valuePresent("num2") && equationData.num2.split("").includes("e")){ //checks if in exponential form
        display.textContent = display.textContent.slice(0, display.textContent.length - equationData.num2.length);
    }else if (display.textContent === "" || (equationData.valuePresent("num1") && equationData.num1.split("").includes("e"))){
        display.textContent = "";
        equationData = replaceData();
        return;
    }else{
        display.textContent = display.textContent.slice(0, (display.textContent.length-1));
    };
    equationData = replaceData(...display.textContent.split(" ").slice());
}


function handlePercent(){
    if (equationData.valuePresent("num1") && !equationData.valuePresent("operator")){
        equationData.num1 = String(divide(+equationData.num1, 100));
        display.textContent = equationData.num1;
    }
    if (equationData.valuePresent("operator") && equationData.valuePresent("num2")){
        equationData.num2 = String(divide(+equationData.num2, 100));
        display.textContent = display.textContent.slice(0, (equationData.num1.length + 3)); //3 is the length of " [operator] "
        display.textContent += equationData.num2;
        
    }
}

function addDecimal(event){
    if (!equationData.valuePresent("operator") && !equationData.num1.split("").includes(".")){
        display.textContent += ".";
        equationData.num1 += ".";
    }else if (equationData.valuePresent("operator") && !equationData.num2.split("").includes(".")){
        display.textContent += ".";
        equationData.num2 += ".";
    }
}

function clear(event){
    equationData.num1 = "";
    equationData.num2 = "";
    equationData.operator= "";
    display.textContent = "";
}

function replaceData(a = "", b = "", c = ""){
    return {
        num1: a, 
        num2: c, 
        operator: b,
        valuePresent: function(property){
            return this[property] !== "";
        }
    };
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