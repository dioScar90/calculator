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
        this.#arg1 = '';
        this.#arg2 = '';
        this.#operator = '';
        this.#dot = false;
        this.#zerosAfterDot = 0;
    }
    
    getArg1 = () => {
        let stringArg1 = this.#arg1.toString();
        if (this.#dot === true) {
            stringArg1 += '0'.repeat(this.#zerosAfterDot);
        }
        return this.#returnToDisplay(stringArg1);
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

        if (this.#arg1 === '') {
            this.#arg1 = intValue;
            return;
        }
        this.#arg1 = +(this.#arg1 + '0') + intValue;
    }
    
    getArg2 = () => {
        let stringArg2 = this.#arg2.toString();
        if (this.#dot === true) {
            stringArg2 += '0'.repeat(this.#zerosAfterDot);
        }
        return this.#returnToDisplay(stringArg2);
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
        this.#arg2 = +(this.#arg2 + '0') + intValue;
    }
    
    getOperator = () => this.#operator;
    setOperator = (operator) => {
        this.#operator = operator;

        let result = this.#arg2 !== '' ? this.#prepareCalculation(true) : false;
        if (result !== false)
            this.#arg1 = result;
        
        this.#arg2 = '';
        this.#dot = false;
        this.#zerosAfterDot = 0;
        
        return value === false ? false : this.#returnToDisplay(result);
    }
    
    getDot = () => this.#dot;
    setDot = () => this.#dot = true;

    #isInteger = (value) => Number.isInteger(value);

    #cleanAll() {
        this.#arg1 = '';
        this.#arg2 = '';
        this.#operator = '';
        this.#dot = false;
        this.#zerosAfterDot = 0;
    }

    // Casa decimal limitada em 8 dígitos. Pode colocar até 20.
    #returnToDisplay = (value) => (+value).toLocaleString('pt-BR', { maximumFractionDigits: 8 } );

    #changePropertiesAfterCalculation(result) {
        this.#cleanAll();
        
        if (!this.#isInteger(result) && !isNaN(result)) {
            this.#dot = true;
            this.#zerosAfterDot = result.toString().split('.')[1].length;
        }

        this.#arg1 = result;
    }

    #add = () => this.#arg1 + this.#arg2;
    #subtract = () => this.#arg1 - this.#arg2;
    #multiply = () => this.#arg1 * this.#arg2;
    #divide = () => this.#arg1 / this.#arg2;

    #prepareCalculation(onlyCalc = false) {
        let result = 0;

        switch (this.#operator) {
            case '+' :
                result = this.#add();
                break;
            case '-' :
                result = this.#subtract();
                break;
            case '*' :
                result = this.#multiply();
                break;
            case '/' :
                result = this.#divide();
                break;
            default:
                this.#cleanAll();
                throw "ERR";
        }

        if (onlyCalc !== true)
            this.#changePropertiesAfterCalculation(result);
        
        return this.#returnToDisplay(result);
    }

    calculate = () => this.#prepareCalculation();

    callAC() {
        this.#cleanAll();
    }
}