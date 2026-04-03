// @ts-check
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const typeCheckedRules = {
    ...tsPlugin.configs['recommended-type-checked'].rules,

    '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
            allowExpressions: false,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        },
    ],

    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',

    '@typescript-eslint/typedef': [
        'error',
        {
            parameter: true,
            arrowParameter: true,
            propertyDeclaration: true,
            memberVariableDeclaration: true,
        },
    ],

    '@typescript-eslint/no-inferrable-types': 'off',

    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',

    '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
};

export default [
    {
        ignores: [
            '**/node_modules/**',
            '**/build/**',
            '**/dist/**',
            '**/generated/**',
            '**/coverage/**',
            "eslint.config.mjs",
            "**/vite-env.d.ts",
            "**/vite.config.ts",
            "**/reportWebVitals.ts",
            "**/__test__/**",
        ],
    },

    js.configs.recommended,

    {
        files: ['client/**/*.ts', 'client/**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './client/tsconfig.app.json',
                tsconfigRootDir: process.cwd(),
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: typeCheckedRules,
    },

    {
        files: ['server/**/*.ts', 'server/**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: [
                    './server/tsconfig.build.json',
                    './server/tsconfig.test.json'
                ],
                tsconfigRootDir: process.cwd(),
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: typeCheckedRules,
    },
];