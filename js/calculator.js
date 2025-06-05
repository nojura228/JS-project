let index = -1;
const userInput = document.getElementById("userInput");
const tokens = [];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

document.getElementById("evaluate").addEventListener("click", function () {
    while (hasNext()) {
        next();
        if (isNumber(userInput.value.charAt(index))) {
            let str = userInput.value.charAt(index);
            while (isNumber(ahead())) {
                next();
                str += userInput.value.charAt(index);
            }
            tokens.push(str);
        } else if (isOperator(userInput.value.charAt(index))) {
            tokens.push(userInput.value.charAt(index));
        }
    }
    alert(tokens.toString());
});

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
    return numbers[number] == parseInt(number);
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
        default:
            return false;
    }
}