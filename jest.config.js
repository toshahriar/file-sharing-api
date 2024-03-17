const { pathsToModuleNameMapper } = require('ts-jest');

const jestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleNameMapper: pathsToModuleNameMapper({
        '@app/*': ['src/app/*'],
        '@config/*': ['src/config/*'],
        '@core/*': ['src/core/*'],
        '@routes/*': ['src/routes/*'],
    }),
};

module.exports = jestConfig;
