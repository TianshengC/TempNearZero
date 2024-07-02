module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/", "<rootDir>/tests"],
  testMatch: ["**/tests/**/*.js", "**/?(*.)+(spec|test).js"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/integration/errorHandlerHelper.js",
  ],
  moduleFileExtensions: ["js", "json", "jsx", "node"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
};
