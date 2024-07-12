let equationData = {
    num1: "", 
    num2: "", 
    operator: "",
    contains: function(property){
        return this[property] !== "";
    }
};

const display = document.querySelector("#display");
const operatorBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");
const equalsBtn = document.querySelector("#equal");
const percentBtn = document.querySelector("#percent");
const deleteBtn = document.querySelector("#delete");
const backSpaceBtn = document.querySelector("#backspace");
const decimalBtn = document.querySelector("#decimal");

numberBtns.forEach((button) => button.addEventListener("click", handleNumberInput));
operatorBtns.forEach((button) => button.addEventListener("click", handleOperatorInput));
equalsBtn.addEventListener("click", handleEquals);
percentBtn.addEventListener("click", handlePercent);
deleteBtn.addEventListener("click", clear);
backSpaceBtn.addEventListener("click", backSpace);
decimalBtn.addEventListener("click", addDecimal);

document.addEventListener("keydown", handleKeyboard);

function handleOperatorInput(event){
    if (!equationData.contains("num1") && event.target.textContent == "-" && !equationData.contains("operator")){ //handle entry of negative number at the start
        equationData.num1 = "-"; 
        display.textContent = equationData.num1;
    }else if (equationData.contains("operator") && (equationData.operator === "*" || equationData.operator === "/") && (!equationData.contains("num2"))){
        equationData.num2 = "-"; 
        display.textContent += equationData.num2;
    }else if (equationData.contains("num1") && equationData.num1 !== "-" && !equationData.contains("num2")){ //handle change of sign
        if (equationData.contains("operator")){
            backSpace();
        }
        equationData.operator = event.target.textContent;
        display.textContent += ` ${equationData.operator} `;
    }
}

function handleNumberInput(event){
    if (!equationData.contains("operator")){
        equationData.num1 += event.target.textContent; 
        display.textContent = equationData.num1;
    }else{
        equationData.num2 += event.target.textContent;
        display.textContent += event.target.textContent;
    }
};

function handleEquals(){
    if (equationData.contains("num1") && equationData.contains("num2") && equationData.contains("operator")){
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
    if (equationData.contains("operator") && !equationData.contains("num2")){
        display.textContent = display.textContent.slice(0, (display.textContent.length-3)); // specifically for removing operator (when there is a number and there is an operator)
    }else if(equationData.contains("num2") && equationData.num2.split("").includes("e")){ //checks if in exponential form
        display.textContent = display.textContent.slice(0, display.textContent.length - equationData.num2.length);
    }else if (display.textContent === "" || (equationData.contains("num1") && equationData.num1.split("").includes("e"))){
        display.textContent = "";
        equationData = replaceData();
        return;
    }else{
        display.textContent = display.textContent.slice(0, (display.textContent.length-1));
    };
    equationData = replaceData(...display.textContent.split(" ").slice());
}


function handlePercent(){
    if (equationData.contains("num1") && !equationData.contains("operator") && equationData.num1 !== "-"){
        equationData.num1 = String(divide(+equationData.num1, 100));
        display.textContent = equationData.num1;
    }
    if (equationData.contains("operator") && equationData.contains("num2")){
        equationData.num2 = String(divide(+equationData.num2, 100));
        display.textContent = display.textContent.slice(0, (equationData.num1.length + 3)); //3 is the length of " [operator] "
        display.textContent += equationData.num2;
        
    }
}

function addDecimal(event){
    if (!equationData.contains("operator") && !equationData.num1.split("").includes(".")){
        display.textContent += ".";
        equationData.num1 += ".";
    }else if (equationData.contains("operator") && !equationData.num2.split("").includes(".")){
        display.textContent += ".";
        equationData.num2 += ".";
    }
}

function handleKeyboard(event){
    const clickEvent = new MouseEvent('click');
    const keyMap = new Map([
        ["+", "plus"],
        ["-", "minus"],
        ["*", "times"],
        ["/", "divide"],
        [".", "decimal"],
        ["=", "equal"],
        ["Enter", "equal"],
        ["%", "percent"],
        ["Backspace", "backspace"],
        ["Delete", "delete"]
    ]);
    
    // Add numeric keys with corresponding values
    for (let i = 0; i <= 9; i++) {
        keyMap.set(i.toString(), `val${i}`);
    }
    let select = keyMap.get(event.key);
    if (select === undefined){
        return;
    }else{
        console.log(event.key);
        document.querySelector(`#${select}`).dispatchEvent(clickEvent);
    }    
}

function clear(){
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
        contains: function(property){
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