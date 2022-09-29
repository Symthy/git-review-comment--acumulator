/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // SyntaxError: Unexpected token 'export' はこれで解決 ref: https://github.com/facebook/jest/issues/12036
    '^d3-(.*)$': `d3-$1/dist/d3-$1`
  }
};
