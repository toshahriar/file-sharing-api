import { AbstractValidator } from '@core/abstracts';

/**
 * Validator for file uploads.
 *
 * @class FileValidator
 * @extends {AbstractValidator}
 */
export class FileValidator extends AbstractValidator {
    /**
     * Rules for file validation.
     *
     * @type {object}
     * @memberof FileValidator
     */
    rules: object = {
        file: 'required',
    };
}
