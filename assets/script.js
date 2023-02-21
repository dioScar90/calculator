class FormValues {
    #data;
    #newObj;

    constructor(form) {
        this.#dadta = new FormData(form);
        this.#newObj = new Object();
    }

    #processValues() {
        for (const [name, val] of this.#data) {
            this.#newObj[name] = val;
        }
    }

    getValues() {
        this.#processValues();
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
        this.#operator = +operator;
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
                this.#add();
                break;
            case '-' :
                this.#subtract();
                break;
            case '/' :
                this.#multiply();
                break;
            case '*' :
                this.#divide();
                break;
            default:
                throw "Error during calculate.";
        }
    }
}