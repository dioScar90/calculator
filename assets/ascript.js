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
    #dot;
    #zerosAfterDot;

    constructor() {
        this.#arg1 = 0;
        this.#arg2 = 0;
        this.#operator = '';
        this.#dot = false;
        this.#zerosAfterDot = 0;
    }
    
    getArg1 = () => {
        let stringArg1 = this.#arg1.toString();
        if (this.#dot === true) {
            stringArg1 += '0'.repeat(this.#zerosAfterDot);
        }
        return stringArg1;
    }
    setArg1 = (value) => {
        let intValue = +value;
        if (this.#dot === true) {
            if (intValue == 0) {
                this.#zerosAfterDot++;
                return;
            }

            const numbersAfterSplit = this.#arg1.toString().split('.');
            const lenAfterDot = numbersAfterSplit.length > 1 ? numbersAfterSplit[1].length : 0;
            const tempNumber = this.#arg1 + +("0." + '0'.repeat(lenAfterDot) + intValue);
            this.#arg1 = +tempNumber.toFixed(lenAfterDot + 1);
            this.#zerosAfterDot = 0;
            return;
        }

        if (this.#arg1 == 0) {
            this.#arg1 = intValue;
            return;
        }
        const lenArg1 = this.#arg1.toString().length;
        this.#arg1 = +(this.#arg1 + '0') + intValue;
    }
    
    getArg2 = () => {
        let stringArg2 = this.#arg2.toString();
        if (this.#dot === true) {
            stringArg2 += '0'.repeat(this.#zerosAfterDot);
        }
        return stringArg2;
    }
    setArg2 = (value) => {
        let intValue = +value;
        if (this.#dot === true) {
            if (intValue == 0) {
                this.#zerosAfterDot++;
                return;
            }

            const numbersAfterSplit = this.#arg2.toString().split('.');
            const lenAfterDot = numbersAfterSplit.length > 1 ? numbersAfterSplit[1].length : 0;
            const tempNumber = this.#arg2 + +("0." + '0'.repeat(lenAfterDot) + intValue);
            this.#arg2 = +tempNumber.toFixed(lenAfterDot + 1);
            this.#zerosAfterDot = 0;
            return;
        }

        if (this.#arg2 == 0) {
            this.#arg2 = intValue;
            return;
        }
        const lenArg2 = this.#arg2.toString().length;
        this.#arg2 = +(this.#arg2 + '0') + intValue;
    }
    
    getOperator = () => this.#operator;
    setOperator = (operator) => {
        this.#operator = operator;
        this.#dot = false;
        this.#zerosAfterDot = 0;
    }
    
    getDot = () => this.#dot;
    setDot = () => this.#dot = true;

    #isInteger(value) {
        return Number.isInteger(value);
    }

    #cleanAll() {
        this.#arg1 = 0;
        this.#arg2 = 0;
        this.#operator = '';
        this.#dot = false;
        this.#zerosAfterDot = 0;
    }

    #changePropertiesAfterCalculation(result) {
        this.#cleanAll();
        
        if (!this.#isInteger(result)) {
            this.#dot = true;
            this.#zerosAfterDot = result.toString().split('.')[1].length;
        }

        this.#arg1 = result;
    }

    #add() {
        let result = this.#arg1 + this.#arg2;
        this.#changePropertiesAfterCalculation(result);
        return result;
    }
    #subtract() {
        let result = this.#arg1 - this.#arg2;
        this.#changePropertiesAfterCalculation(result);
        return result;
    }
    #multiply() {
        let result = this.#arg1 * this.#arg2;
        this.#changePropertiesAfterCalculation(result);
        return result;
    }
    #divide() {
        let result = this.#arg1 / this.#arg2;
        this.#changePropertiesAfterCalculation(result);
        return result;
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
                this.#cleanAll();
                throw "ERR";
        }
    }

    callAC() {
        this.#cleanAll();
    }
}