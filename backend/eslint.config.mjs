import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2022,
			globals: {
				...globals.node,
			},
		},
		rules: {
			'indent': ['error', 'tab'],
			'quotes': ['error', 'single'],
			'no-trailing-spaces': ['error'],
			'max-len': ['error', {
				code: 120,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true
			}],
			'no-multiple-empty-lines': ['error', {
				max: 1,
				maxEOF: 0
			}],
			'semi': ['error', 'always'],
			'comma-dangle': ['error', 'always-multiline'],
			'no-console': 'warn',
			'consistent-return': 'error',
			'arrow-parens': ['error', 'always'],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
		},
	},

	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 2022,
			globals: {
				...globals.node,
			},
		},
		rules: {
			'indent': ['error', 'tab'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'always'],
		},
	}
);
