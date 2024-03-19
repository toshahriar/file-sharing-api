import { ResponseStatusEnum } from '@core/enums';
import { ResponseModel } from '@core/lib/responder/models';

/**
 * ResponseBuilder class for building and sending success response.
 *
 * @class ResponseBuilder
 */
export class ResponseBuilder {
    /**
     * Model property to hold response model
     *
     * @private
     * @type {any} model - Response Model.
     */
    private model: any;

    /**
     * Response object to hold express response object
     *
     * @private
     * @type {any} res - Express response object.
     */
    private res: any;

    /**
     * Constructor for SuccessResponseBuilder.
     *
     * @param {any} res - Express response object.
     * @param {number} code - HTTP status code for the success response.
     * @param {ResponseStatusEnum} status - Response status enumeration for the success response.
     * @param {string} message - Human-readable message for the success response.
     */
    constructor(res: any, code: number, status: any, message: string) {
        this.reset();
        this.res = res;
        this.model.setCode(code);
        this.model.setStatus(status);
        this.model.setMessage(message);
    }

    /**
     * Send the success response.
     *
     * @returns {Object} Express response object.
     */
    public success(): object {
        const values = this.model.getValues();

        return this.res.status(this.model.getCode()).send({
            code: 200,
            status: ResponseStatusEnum.SUCCESS,
            message: '',
            ...values,
        });
    }

    /**
     * Send the error response.
     *
     * @returns {Object} Express response object.
     */
    public error(): object {
        const values = this.model.getValues();

        return this.res.status(this.model.getCode()).send({
            code: 500,
            status: ResponseStatusEnum.ERROR,
            message: 'Internal Server Error!',
            ...values,
        });
    }

    /**
     * Set the HTTP status code for the success response.
     *
     * @param {number} value - HTTP status code.
     * @returns {this} This SuccessResponseBuilder instance.
     */
    public code(value: any): this {
        this.model.setCode(value);
        return this;
    }

    /**
     * Set the response status enumeration for the success response.
     *
     * @param {ResponseStatusEnum} value - Response status enumeration.
     * @returns {this} This SuccessResponseBuilder instance.
     */
    public status(value: any): this {
        this.model.setStatus(value);
        return this;
    }

    /**
     * Set the human-readable message for the success response.
     *
     * @param {string} value - Human-readable message.
     * @returns {this} This SuccessResponseBuilder instance.
     */
    public message(value: any): this {
        this.model.setMessage(value);
        return this;
    }

    /**
     * Set additional data for the success response.
     *
     * @param {any} value - Additional data.
     * @returns {this} This SuccessResponseBuilder instance.
     */
    public data(value: any): this {
        this.model.setData(value);
        return this;
    }

    /**
     * Set meta information for the success response.
     *
     * @param {any} value - Meta information.
     * @returns {this} This SuccessResponseBuilder instance.
     */
    public meta(value: any): this {
        this.model.setMeta(value);
        return this;
    }

    /**
     * Set includes for the success response.
     *
     * @param {any} value - Includes information.
     * @returns {this} This SuccessResponseBuilder instance.
     */
    public includes(value: any): this {
        this.model.setIncludes(value);
        return this;
    }

    /**
     * Reset the SuccessResponseBuilder to its initial state.
     *
     * @private
     * @returns {this} This SuccessResponseBuilder instance.
     */
    private reset(): this {
        this.model = new ResponseModel();
        return this;
    }
}
