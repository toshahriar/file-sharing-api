import ValidatorJs from 'validatorjs';

/**
 * AbstractValidator class providing a common structure for validators.
 * @abstract
 * @class AbstractValidator
 */
export abstract class AbstractValidator {
    /**
     * Property to hold the validation rules.
     * @abstract
     * @type {object} rules - Validation rules.
     */
    abstract rules: any;

    /**
     * Property to hold custom validation error messages.
     * @type {object} messages - Custom validation error messages.
     */
    messages: any = {};

    /**
     * Validate the provided data using the validation rules and custom messages.
     * @param {any} data - Data to be validated.
     * @returns {object} ValidatorJs instance for the provided data.
     */
    validate(data: any): any {
        return new ValidatorJs(data, this.rules, this.messages);
    }
}
