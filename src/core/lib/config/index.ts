/**
 * Configuration utility function.
 * Retrieves configuration values based on keys, with caching for improved performance.
 *
 * @function
 * @param {string} key - The configuration key, in dot-notation format (e.g., 'database.connection.url').
 * @param {any} value - Default value to be returned if the key is not found. Default is an empty string.
 * @returns {any} - The configuration value associated with the key.
 */
export const config = (function () {
    // Map to cache configuration values for faster retrieval.
    const configMap = new Map();

    return function (key, value = '') {
        // If the key is found in the cache, return the cached value.
        if (configMap.has(key)) {
            return configMap.get(key);
        }

        // Split the key into an array using dot-notation.
        const keyArray = key.split('.');

        // If the key is not in dot-notation format, cache the value and return it.
        if (keyArray.length <= 1) {
            configMap.set(key, value);
            return value;
        }

        // Load configuration data from the corresponding file.
        let data = require(`../../../config/${keyArray[0]}`);

        // Traverse the configuration data based on the keyArray.
        for (let i = 1; i < keyArray.length; i++) {
            if (keyArray[i] !== undefined && keyArray[i].length) {
                data = data[keyArray[i]];
            } else {
                // If an undefined or empty key is encountered, set data to the default value.
                data = value;
                break;
            }
        }

        // Cache the retrieved configuration value.
        configMap.set(key, data);

        // Return the retrieved configuration value.
        return data;
    };
})();
