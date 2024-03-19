/**
 * Converts a string to snake_case.
 *
 * @param {string} input - The input string.
 * @returns {string} - The string converted to snake_case.
 */
const toSnakeCase = (input: string): string =>
    input.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Converts a string to camelCase.
 *
 * @param {string} input - The input string.
 * @returns {string} - The string converted to camelCase.
 */
const toCamelCase = (input: string): string =>
    input.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

/**
 * Converts a string to kebab-case.
 *
 * @param {string} input - The input string.
 * @returns {string} - The string converted to kebab-case.
 */
const toKebabCase = (input: string): string => input.replace(/_/g, '-');

/**
 * Converts a string to PascalCase.
 *
 * @param {string} input - The input string.
 * @returns {string} - The string converted to PascalCase.
 */
const toPascalCase = (input: string): string =>
    input.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase());

/**
 * Converts a string to Title Case.
 *
 * @param {string} input - The input string.
 * @returns {string} - The string converted to Title Case.
 */
const toTitleCase = (input: string): string =>
    input.replace(
        /(\w)(\w*)/g,
        (_, firstLetter, rest) => firstLetter.toUpperCase() + rest.toLowerCase()
    );

/**
 * Converts a string to UPPERCASE.
 *
 * @param {string} input - The input string.
 * @returns {string} - The string converted to UPPERCASE.
 */
const toUpperCase = (input: string): string => input.toUpperCase();

/**
 * Converts a string to lowercase.
 * @param {string} input - The input string.
 * @returns {string} - The string converted to lowercase.
 */
const toLowerCase = (input: string): string => input.toLowerCase();

/**
 * Converts a string to UPPER_SNAKE_CASE.
 *
 * @param {string} input - The input string.
 * @returns {string} - The string converted to UPPER_SNAKE_CASE.
 */
const toUpperSnakeCase = (input: string): string => input.toUpperCase().replace(/-/g, '_');

/**
 * Converts a string to lower_snake_case.
 *
 * @param {string} input - The input string.
 * @returns {string} - The string converted to lower_snake_case.
 */
const toLowerSnakeCase = (input: string): string => input.toLowerCase().replace(/-/g, '_');

export {
    toSnakeCase,
    toCamelCase,
    toKebabCase,
    toPascalCase,
    toTitleCase,
    toUpperCase,
    toLowerCase,
    toUpperSnakeCase,
    toLowerSnakeCase,
};
