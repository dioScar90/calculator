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

function calculate(e) {
    e.preventDefault();

    const formValues = new FormValues(e.target);
    let values = formValues.getValues(e.submitter.id);
    let key = values[e.submitter.id];

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