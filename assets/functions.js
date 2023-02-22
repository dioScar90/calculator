const arg1 = document.querySelector("#arg1");
const arg2 = document.querySelector("#arg2");
const operator = document.querySelector("#operator");
const teste = new Teste();

function novoProp() {
    teste.mudaProp('fila duma égua');
    teste.printa();
}

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
    const calculator = new Calculator(arg1.value, arg2.value, operator.value);
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
        resetValues();
        changeDisplay(0);
        return;
    }
    
    if (arg1.value == '') {
        arg1.value = +key;
        changeDisplay(key);
        return;
    }

    if (['+','-','*','/'].indexOf(key) > -1) {
        operator.value = key;
        return;
    }

    if (arg2.value == '' && operator.value != '') {
        arg2.value = +key;
        changeDisplay(key);
        return;
    }

    if (key == "=")
        fazIsso();
}

function changeInput(id) {
    // const input = document.querySelector("#click-value");
    // const form = document.querySelector("#form-calc");
    // input.value = id;
    // form.submit();
}