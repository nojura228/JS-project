let index = -1;
let userInput = document.getElementById("userInput");
let tokens = [];
let operators = [];
let rpnExpresion = [];

document.getElementById("userInput").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9/*\-+()]/g, '');
});

document.getElementById("evaluate").addEventListener("click", function () {
    tokenize();
    toRPN();
    //for (let i = 0; i < tokens.length; i++) {
    //  alert(tokens[i].value + " " + tokens[i].type);
    //}
    evaluate();
    alert(operators.pop());
    reset();
});

function tokenize() {
    while (hasNext()) {
        next();
        if (isNumber(userInput.value.charAt(index))) {
            let str = userInput.value.charAt(index);
            while (isNumber(ahead())) {
                next();
                str += userInput.value.charAt(index);
            }
            tokens.push({ type: "NUMBER", value: str });
        } else if (isOperator(userInput.value.charAt(index))) {
            tokens.push({ type: "OPERATOR", value: userInput.value.charAt(index) });
        } else if (userInput.value.charAt(index) == "(") {
            tokens.push({ type: "LPAREN", value: userInput.value.charAt(index) });
        } else if (userInput.value.charAt(index) == ")") {
            tokens.push({ type: "RPAREN", value: userInput.value.charAt(index) });
        }
    }
}

function hasNext() {
    return userInput.value.charAt(index + 1) != "";
}

function next() {
    return index++;
}

function ahead() {
    return userInput.value.charAt(index + 1);
}

function isNumber(number) {
    return number >= "0" && number <= "9"
}

function isOperator(operator) {
    switch (operator) {
        case "+":
            return true;
        case "-":
            return true;
        case "*":
            return true;
        case "/":
            return true;
    }
}

function toRPN() {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type == "NUMBER") {
            rpnExpresion.push(tokens[i].value);
        } else if (tokens[i].type == "LPAREN") {
            operators.push(tokens[i].value);
        } else {
            if (operators.length == 0) {
                operators.push(tokens[i].value);
            } else {
                if (tokens[i].value == "-" || tokens[i].value == "+") {
                    tranfer();
                    operators.push(tokens[i].value);
                } else if (tokens[i].type == "RPAREN") {
                    while (operators[operators.length - 1] != "(") {
                        rpnExpresion.push(operators.pop());
                    }
                    operators.pop();
                } else {
                    if (operators[operators.length - 1] == "-" || operators[operators.length - 1] == "+") {
                        operators.push(tokens[i].value);
                    } else {
                        tranfer();
                        operators.push(tokens[i].value);
                    }
                }
            }
        }
    }
    while (operators.length != 0) {
        rpnExpresion.push(operators.pop());
    }
}

function tranfer() {
    while (operators.length != 0 && operators[operators.length - 1] != "(") {
        rpnExpresion.push(operators.pop());
    }
}

function evaluate() {
    for (let  i = 0; i < rpnExpresion.length; i++) {
        if (isNumber(rpnExpresion[i])) {
            operators.push(rpnExpresion[i]);
        } else {
            let temp = operators.pop();
            operators.push(operation(rpnExpresion[i], operators.pop(), temp));
        }
    }
}

function operation(op, a, b) {
    switch (op) {
        case "+":
            return parseFloat(a) + parseFloat(b);
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
    }
}

function reset() {
    index = -1;
    userInput = document.getElementById("userInput");
    tokens = [];
    operators = [];
    rpnExpresion = [];
}