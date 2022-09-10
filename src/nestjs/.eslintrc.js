module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'prettier'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'plugin:import/recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'camelcase': 'off',
    'import/no-unresolved': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never',
        'js': 'never'
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': [
          'PascalCase'
        ],
        'custom': {
          'regex': '^I[A-Z]',
          'match': true
        }
      }
    ],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'dot-notation': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'lines-between-class-members': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-classes-per-file': 'off',
    'prettier/prettier': 'error'
  },
  settings: {
    'import/resolver': {
      'typescript': {}
    }
  }
};
