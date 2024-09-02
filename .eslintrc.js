module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
   '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    //'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'require-await': 'error',
    'semi-style': ['error', 'last'],
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',
    //'@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-restricted-imports': [ 'error', 'dayjs' ]
  },
  ignorePatterns: ['src/types/globals.d.ts', '.eslintrc.js', 'dist'],
  overrides: [
    {
      files: [
        '**/test/**/*.test.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}