import { parseISO } from 'date-fns';
import { isDate } from 'date-fns/fp';

/**
 * Check if an object is empty.
 *
 * @param {object} obj - Object to check for emptiness.
 * @returns {boolean} True if the object is empty, false otherwise.
 */
const isEmptyObject = (obj: object): boolean => Object.keys(obj).length === 0;

/**
 * Check if a value is a JSON object.
 *
 * @param {any} value - Value to check.
 *
 * @returns {boolean} True if the value is a JSON object, false otherwise.
 */
const isJsonObject = (value: any): value is Record<string, any> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

export { isEmptyObject, isJsonObject };
