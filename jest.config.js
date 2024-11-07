// jest.config.js
module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json'
        }
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
        '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JavaScript files
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    transformIgnorePatterns: [
        '/node_modules/(?!date-fns)', // Transform date-fns module
    ],
};