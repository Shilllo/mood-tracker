import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },

        'no-undef': 'error',
        'no-console': 'off',
        'no-use-before-define': 'off',
        'require-await': 'error',
        '@typescript-eslint/no-floating-promises': 'error',

        // TypeScript
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-use-before-define': 'off',

        // Stylistic issues
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'comma-dangle': ['error', 'always-multiline'],

        // ECMAScript 6
        'arrow-body-style': 'warn',
        'no-var': 'error',
        'prefer-const': 'warn',
        'import/extensions': 'off',
    },
);
