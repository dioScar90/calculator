const calculator = new Calculator();

function changeDisplay(value) {
    const display = document.querySelector("#display");
    display.firstElementChild.innerHTML = value;
}

function resetValues() {
    arg1.value = '';
    arg2.value = '';
    operator.value = '';
}

function fazIsso() {
    // const calculator = new Calculator(arg1.value, arg2.value, operator.value);
    let result = calculator.calculate();
    resetValues();
    arg1.value = result;
    changeDisplay(result);
}

function calculate(key) {
    if (key == "AC") {
        calculator.callAC();
        changeDisplay(0);
        return;
    }

    if (key == ".") {
        calculator.setDot();
        return;
    }

    if (key == "=") {
        let result = calculator.calculate();
        changeDisplay(result);
        return;
    }

    if (['+','-','*','/'].indexOf(key) > -1) {
        let result = calculator.setOperator(key);
        if (result !== false)
            changeDisplay(result);
        return;
    }
    
    if (calculator.getOperator() == '') {
        calculator.setArg1(key);
        let currentNumber = calculator.getArg1();
        changeDisplay(currentNumber);
        return;
    }
    
    if (calculator.getArg1() > 0 && calculator.getOperator() != '') {
        calculator.setArg2(key);
        let currentNumber = calculator.getArg2();
        changeDisplay(currentNumber);
        return;
    }
}

function preCalculate(e) {
    e.preventDefault();

    const formValues = new FormValues(e.target);
    let values = formValues.getValues(e.submitter.id);
    let key = values[e.submitter.id];

    calculate(key);
}

function keyPressed(e) {
    e = e || window.event;
    let key = e.keyCode || e.which;
    return key == 13 ? '=' : String.fromCharCode(key);
}

document.onkeydown = function(event) {
    let key = event.key;
    key = key   .replace("Enter", '=')
                .replace("Escape", "AC")
                .replace(',', '.');
                
    const possibleKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.', '=', "AC"];
    if (possibleKeys.indexOf(key) > -1) {
        calculate(key);
    }
};