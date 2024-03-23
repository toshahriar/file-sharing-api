import { MiddlewareProvider } from '@app/middlewares';

/**
 * Retrieves registered middlewares based on provided aliases.
 *
 * @param aliases A string or an array of strings representing middleware aliases.
 * @returns An array containing registered middlewares corresponding to the provided aliases.
 */
export const middleware = (aliases: string | string[]): any[] => {
    const registeredMiddlewares: object = MiddlewareProvider.registerRouteMiddlewares();

    if (typeof aliases === 'string') {
        const middleware = registeredMiddlewares[aliases];
        return middleware ? [middleware] : [];
    }

    if (Array.isArray(aliases)) {
        return aliases.reduce((result, alias) => {
            const middleware = registeredMiddlewares[alias];
            if (middleware) result.push(middleware);
            return result;
        }, []);
    }

    return [];
};
