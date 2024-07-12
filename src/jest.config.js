/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};
