module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
	plugins: [
		'react', // eslint-plugin-react
		'@typescript-eslint', // @typescript-eslint/eslint-plugin
    'prettier',
    'react-refresh',
	],
  extends: [
    'eslint:recommended', // eslint
    'plugin:react/recommended', // eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/eslint-plugin
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
