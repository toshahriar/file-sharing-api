import express, { Router } from 'express';

/**
 * AbstractRouter class providing a common structure for routers.
 * @abstract
 * @class AbstractRouter
 */
export abstract class AbstractRouter {
    /**
     * Property to hold the Express Router instance.
     * @protected
     * @readonly
     * @type {Router} router - Express Router instance.
     */
    protected readonly router: Router;

    /**
     * Constructor for the AbstractRouter class.
     * Initializes the router property with a new instance of the Express Router and calls the register method.
     */
    public constructor() {
        this.router = express.Router();
        this.register();
    }

    /**
     * Abstract method to be implemented by concrete classes.
     * Should be used to register routes on the Express Router instance.
     * @abstract
     */
    abstract register(): void;

    /**
     * Getter method to retrieve the Express Router instance.
     * @returns {Router} Express Router instance.
     */
    getRouter = (): Router => this.router;
}
