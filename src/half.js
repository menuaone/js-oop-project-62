// @ts-check

// /**
//  * @param {Number} num
//  */
// export default (num) => {
//     const result = num / 2;
//     return result;
// };

export default class Validator {
    // TODO: maybe change flags on null check
    constructor(options = {}) {
        this.type = 'no type';
        this.minLengthNumber = null;
        this.value = null;
        this.options = {
            isContain: false,
            isRequired: false,
            isCheckMinLength: false,
            ...options,
        };
    }

    string() {
        this.type = 'string';
    }

    isValid(data) {
        if (!data) {
            return this.handleNoData();
        }

        const typeGuard = this.checkType(data);

        if (!typeGuard) {
            return console.log(`Type validation result: ${typeGuard}`);
        }

        // TODO: make validation pipeline
        this.options.isCheckMinLength && this.validateMinLength(data);
        this.options.isContain && this.validateContain(data);

        return typeGuard;
    }

    handleNoData() {
        if (!this.options.isRequired) {
            console.log(
                'Validation skipped: field is not required, but data is empty',
                true
            );
            return true;
        }

        console.log('Validation failed: data is required', false);
        return false;
    }

    // validators
    checkType(data) {
        const isValid = typeof data === this.type;
        console.log(`Type validation result: ${isValid}`);
        return isValid;
    }

    validateContain(data) {
        console.log(`Contain validation result: ${data.includes(this.value)}`);
        return data.includes(this.value);
    }

    validateMinLength(data) {
        console.log(
            `MinLength validation result: ${data.lenght > this.minLengthNumber}`
        );
        return data.lenght > this.minLengthNumber;
    }

    // builders
    // TODO: maybe remove flags
    contains(value) {
        this.value = value;
        this.options.isContain = true;
        return this;
    }

    minLength(num) {
        this.minLengthNumber = num;
        this.options.isCheckMinLength = true;
        return this;
    }

    required() {
        this.options.isRequired = true;
        return this;
    }

    getType() {
        console.log(this.type);
    }
    getValue() {
        console.log(this.value);
    }
    getMinLength() {
        console.log(this.minLengthNumber);
    }
}

const schema = new Validator();

schema.string();
