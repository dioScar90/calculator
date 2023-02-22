const arg1 = document.querySelector("#arg1");
const arg2 = document.querySelector("#arg2");
const operator = document.querySelector("#operator");
const calculator = new Calculator();

function changeDisplay(value) {
    const display = document.querySelector("#display");
    display.innerHTML = value;
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
        calculator.setOperator(key);
        // operator.value = key;
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

function changeInput(id) {
    // const input = document.querySelector("#click-value");
    // const form = document.querySelector("#form-calc");
    // input.value = id;
    // form.submit();
}