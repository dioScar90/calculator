class FormValues {
    #data;
    #newObj;

    constructor(form) {
        this.#data = new FormData(form);
        this.#newObj = new Object();
    }

    #processValues(id) {
        for (const [name, val] of this.#data) {
            if (name == id) {
                this.#newObj[name] = val;
                return;
            }
        }
    }

    getValues(id) {
        this.#processValues(id);
        return this.#newObj;
    }
}

class Calculator {
    #arg1;
    #arg2;
    #operator;

    constructor(arg1, arg2, operator) {
        this.#arg1 = +arg1;
        this.#arg2 = +arg2;
        this.#operator = operator;
    }

    getArg1 = () => this.#arg1;
    setArg1 = (arg1) => this.#arg1 = arg1;
    
    getArg2 = () => this.#arg2;
    setArg2 = (arg2) => this.#arg2 = arg2;
    
    getOperator = () => this.#operator;
    setOoperator = (operator) => this.#operator = operator;

    #add() {
        return this.#arg1 + this.#arg2;
    }
    #subtract() {
        return this.#arg1 - this.#arg2;
    }
    #multiply() {
        return this.#arg1 * this.#arg2;
    }
    #divide() {
        return this.#arg1 / this.#arg2;
    }

    calculate() {
        switch (this.#operator) {
            case '+' :
                return this.#add();
            case '-' :
                return this.#subtract();
            case '*' :
                return this.#multiply();
            case '/' :
                return this.#divide();
            default:
                throw "Error during calculate.";
        }
    }
}

class Teste {
    #prop1;

    constructor() {
        this.#prop1 = 'começou essa bagaca';
        this.#printaPop();
    }

    #printaPop() {
        console.log(this.#prop1);
    }

    printa() {
        this.#printaPop();
    }

    mudaProp(value) {
        this.#prop1 = value;
    }
}