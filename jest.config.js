module.exports = {
    collectCoverage: true,
    testEnvironment: 'jest-environment-node',
    moduleFileExtensions: [ "js" ],
    testRegex: "((\\.|/*.)(test))\\.js?$",
    testPathIgnorePatterns: [
        "/node_modules/"
    ],
    verbose: true,
    transform: {
        "^.+\\.js$": "babel-jest",
    },
}
