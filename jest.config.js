module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'text', 'lcov'],
    modulePaths: ['<rootDir>/src'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};