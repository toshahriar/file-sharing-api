import { toSnakeCase } from '@core/lib/string';

/**
 * AbstractDTO class providing common functionality for Data Transfer Objects.
 * @class AbstractDTO
 */
export class AbstractDTO {
    /**
     * Converts the DTO to a JSON string representation.
     * @returns {string} JSON string.
     */
    toString() {
        return JSON.stringify(this.getProperties());
    }

    /**
     * Converts the DTO to an array of key-value pairs.
     * @returns {Array} Array of key-value pairs.
     */
    toArray() {
        return Object.entries(this).map(([key, value]) => ({ key, value }));
    }

    /**
     * Converts the DTO to a response format.
     * @returns {object} Response format.
     */
    toResponse() {
        return this.getProperties(true);
    }

    /**
     * Converts the DTO to a plain JavaScript object.
     * @returns {object} Plain JavaScript object.
     */
    toObject() {
        return this.getProperties();
    }

    /**
     * Gets the properties of the DTO as an object, with an option to convert property name's case.
     * @param {boolean} convertCase - Flag to indicate whether to convert property name's case.
     * @private
     * @returns {object} Object containing the properties of the DTO.
     */
    getProperties(convertCase: boolean = false): object {
        return Object.getOwnPropertyNames(this).reduce(
            (properties: object, propertyName: string) => {
                const convertedPropName = convertCase ? toSnakeCase(propertyName) : propertyName;
                properties[convertedPropName] = this[propertyName];
                return properties;
            },
            {}
        );
    }
}
