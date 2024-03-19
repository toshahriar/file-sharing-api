import { isEmptyObject } from '@core/lib/common';

/**
 * ResponseModel class for managing and representing response data.
 * @class ResponseModel
 */
export class ResponseModel {
    /**
     * HTTP status code for the response.
     * @private
     * @type {number} code - Status code.
     */
    private code: number;

    /**
     * Response status string (e.g., 'success', 'error').
     * @private
     * @type {string} status - Response status.
     */
    private status: string;

    /**
     * Human-readable message associated with the response.
     * @private
     * @type {string} message - Response message.
     */
    private message: string;

    /**
     * Detailed reason for the response, if applicable.
     * @private
     * @type {string} reason - Response reason.
     */
    private reason: string;

    /**
     * Main data payload of the response.
     * @private
     * @type {any} data - Response data.
     */
    private data: any;

    /**
     * Error information associated with the response.
     * @private
     * @type {any} error - Response error details.
     */
    private error: any;

    /**
     * Reference error information associated with the response.
     * @private
     * @type {any} referenceError - Reference error details.
     */
    private referenceError: any;

    /**
     * Error characteristic information associated with the response.
     * @private
     * @type {any} errorCharacteristic - Error characteristic details.
     */
    private errorCharacteristic: any;

    /**
     * Meta information associated with the response.
     * @private
     * @type {any} meta - Meta details.
     */
    private meta: any;

    /**
     * Additional includes information associated with the response.
     * @private
     * @type {object} includes - Additional includes data.
     */
    private includes: object;

    /**
     * Constructor for ResponseModel.
     * @param {number} code - HTTP status code for the response.
     * @param {string} status - Response status string.
     * @param {string} message - Human-readable message for the response.
     * @param {string} reason - Detailed reason for the response.
     * @param {any} data - Main data payload for the response.
     * @param {any} error - Error information for the response.
     * @param {any} referenceError - Reference error information for the response.
     * @param {any} errorCharacteristic - Error characteristic information for the response.
     * @param {any} meta - Meta information for the response.
     */
    constructor(
        code = 200,
        status = '',
        message = '',
        reason = '',
        data = '',
        error = '',
        referenceError = '',
        errorCharacteristic = '',
        meta = ''
    ) {
        this.setCode(code);
        this.setStatus(status);
        this.setMessage(message);
        this.setReason(reason);
        this.setData(data);
        this.setError(error);
        this.setReferenceError(referenceError);
        this.setErrorCharacteristic(errorCharacteristic);
        this.setMeta(meta);
    }

    /**
     * Get the HTTP status code for the response.
     * @returns {number} HTTP status code.
     */
    public getCode(): number {
        return this.code;
    }

    /**
     * Set the HTTP status code for the response.
     * @param {any} value - HTTP status code.
     */
    public setCode(value: any) {
        this.code = parseInt(value, 10);
    }

    /**
     * Get the response status string.
     * @returns {string} Response status.
     */
    public getStatus(): string {
        return this.status;
    }

    /**
     * Set the response status string.
     * @param {string} value - Response status.
     */
    public setStatus(value: string) {
        this.status = value;
    }

    /**
     * Get the human-readable message for the response.
     * @returns {string} Response message.
     */
    public getMessage(): string {
        return this.message;
    }

    /**
     * Set the human-readable message for the response.
     * @param {string} value - Response message.
     */
    public setMessage(value: string) {
        this.message = value;
    }

    /**
     * Get the detailed reason for the response.
     * @returns {string} Response reason.
     */
    public getReason(): string {
        return this.reason;
    }

    /**
     * Set the detailed reason for the response.
     * @param {string} value - Response reason.
     */
    public setReason(value: string) {
        this.reason = value;
    }

    /**
     * Get the main data payload for the response.
     * @returns {any} Response data.
     */
    public getData(): any {
        return this.data;
    }

    /**
     * Set the main data payload for the response.
     * @param {any} value - Response data.
     */
    public setData(value: string) {
        this.data = value;
    }

    /**
     * Get the error information for the response.
     * @returns {any} Response error details.
     */
    public getError(): any {
        return this.error;
    }

    /**
     * Set the error information for the response.
     * @param {any} value - Response error details.
     */
    public setError(value: string) {
        this.error = value;
    }

    /**
     * Get the reference error information for the response.
     * @returns {any} Reference error details.
     */
    public getReferenceError(): any {
        return this.referenceError;
    }

    /**
     * Set the reference error information for the response.
     * @param {any} value - Reference error details.
     */
    public setReferenceError(value: string) {
        this.referenceError = value;
    }

    /**
     * Get the error characteristic information for the response.
     * @returns {any} Error characteristic details.
     */
    public getErrorCharacteristic(): any {
        return this.errorCharacteristic;
    }

    /**
     * Set the error characteristic information for the response.
     * @param {any} value - Error characteristic details.
     */
    public setErrorCharacteristic(value: string) {
        this.errorCharacteristic = value;
    }

    /**
     * Get the meta information for the response.
     * @returns {any} Meta details.
     */
    public getMeta(): any {
        return this.meta;
    }

    /**
     * Set the meta information for the response.
     * @param {any} value - Meta details.
     */
    public setMeta(value: string) {
        this.meta = value;
    }

    /**
     * Get the additional includes data for the response.
     * @returns {object} Additional includes data.
     */
    public getIncludes(): object {
        return this.includes;
    }

    /**
     * Set the additional includes data for the response.
     * @param {object} value - Additional includes data.
     */
    public setIncludes(value: object) {
        this.includes = value;
    }

    /**
     * Get all the response values as an object.
     * @returns {object} Object containing all response values.
     */
    public getValues(): object {
        let values: any = {
            status: this.status,
            code: this.code,
        };

        if (this.message) {
            values.message = this.message;
        }

        if (this.reason) {
            values.reason = this.reason;
        }

        if (this.data) {
            values.data = this.data;
        }

        if (this.error) {
            values.error = this.error;
        }

        if (this.referenceError) {
            values.referenceError = this.referenceError;
        }

        if (this.errorCharacteristic) {
            values.errorCharacteristic = this.errorCharacteristic;
        }

        if (this.meta) {
            values.meta = this.meta;
        }

        if (this.includes && !isEmptyObject(this.includes)) {
            values = {
                ...values,
                ...this.includes,
            };
        }

        return values;
    }
}
