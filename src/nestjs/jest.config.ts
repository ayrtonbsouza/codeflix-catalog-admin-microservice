export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@cam/core/(.*)$': '<rootDir>/../../../node_modules/@cam/core/dist/$1',
    '#seedwork/(.*)$': '<rootDir>/../../../node_modules/@cam/core/dist/@seedwork/$1',
    '#category/(.*)$': '<rootDir>/../../../node_modules/@cam/core/dist/category/$1',
  }
};
