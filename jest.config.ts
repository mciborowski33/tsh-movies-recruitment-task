import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    config: '<rootDir>/src/config',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    db: '<rootDir>/src/db',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    routes: '<rootDir>/src/routes',
    utilities: '<rootDir>/src/utilities',
    '^validators/(.*)$': '<rootDir>/src/validators/$1',
  },
  testRegex: '((\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
