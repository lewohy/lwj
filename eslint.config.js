import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import parser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        plugins: {
            unicorn: eslintPluginUnicorn,
            '@stylistic': stylistic,
            '@stylistic/js': stylisticJs,
            '@stylistic/ts': stylisticTs,
            react,
        },
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        rules: {
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                },
            ],
            'array-bracket-newline': [
                'warn',
                {
                    multiline: true,
                },
            ],
            'array-bracket-spacing': ['warn', 'never'],
            '@stylistic/js/array-element-newline': [
                'warn',
                {
                    consistent: true,
                    multiline: true,
                },
            ],
            'arrow-parens': ['warn', 'always'],
            'arrow-spacing': [
                'warn',
                {
                    before: true,
                    after: true,
                },
            ],
            '@stylistic/ts/block-spacing': ['warn', 'always'],
            '@stylistic/ts/brace-style': [
                'warn',
                '1tbs',
                {
                    allowSingleLine: false,
                },
            ],
            'comma-dangle': ['warn', 'always-multiline'],
            'comma-spacing': [
                'warn',
                {
                    before: false,
                    after: true,
                },
            ],
            'comma-style': ['warn', 'last'],
            'computed-property-spacing': ['warn', 'never'],
            'dot-location': ['warn', 'property'],
            'eol-last': ['warn', 'always'],
            'function-call-argument-newline': ['warn', 'consistent'],
            'func-call-spacing': ['warn', 'never'],
            'function-paren-newline': ['warn', 'multiline-arguments'],
            'generator-star-spacing': [
                'warn',
                {
                    before: true,
                    after: false,
                },
            ],
            'implicit-arrow-linebreak': ['warn', 'beside'],
            '@stylistic/indent': ['warn', 4],
            '@stylistic/indent-binary-ops': ['warn', 4],
            'jsx-quotes': ['warn', 'prefer-double'],
            'key-spacing': [
                'warn',
                {
                    beforeColon: false,
                    afterColon: true,
                    mode: 'strict',
                },
            ],
            'keyword-spacing': [
                'warn',
                {
                    before: true,
                    after: true,
                },
            ],
            'linebreak-style': ['warn', 'windows'],
            'max-statements-per-line': [
                'warn',
                {
                    max: 1,
                },
            ],
            'max-len': [
                'warn',
                {
                    code: 80,
                    tabWidth: 4,
                    ignoreComments: true,
                    ignoreTrailingComments: true,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                },
            ],
            'multiline-ternary': ['warn', 'always-multiline'],
            'new-parens': ['warn', 'always'],
            'newline-per-chained-call': [
                'warn',
                {
                    ignoreChainWithDepth: 2,
                },
            ],
            'no-confusing-arrow': ['warn'],
            'no-extra-parens': ['off'],
            'no-extra-semi': ['warn'],
            'no-floating-decimal': ['warn'],
            'no-mixed-operators': ['warn'],
            'no-mixed-spaces-and-tabs': ['warn'],
            'no-multi-spaces': ['warn'],
            'no-multiple-empty-lines': ['warn'],
            'no-tabs': ['warn'],
            'no-trailing-spaces': ['warn'],
            'no-whitespace-before-property': ['warn'],
            'object-curly-newline': [
                'warn',
                {
                    ObjectExpression: 'always',
                    ObjectPattern: {
                        multiline: true,
                    },
                    ImportDeclaration: {
                        multiline: true,
                    },
                    ExportDeclaration: {
                        multiline: true,
                    },
                },
            ],
            'object-curly-spacing': ['warn', 'always'],
            'object-property-newline': ['warn'],
            'one-var-declaration-per-line': ['warn', 'always'],
            'operator-linebreak': ['warn', 'after'],
            'padded-blocks': ['warn', 'never'],
            'padding-line-between-statements': [
                'warn',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'return',
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'block-like',
                },
                {
                    blankLine: 'always',
                    prev: 'block-like',
                    next: '*',
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'block',
                },
                {
                    blankLine: 'always',
                    prev: 'block',
                    next: '*',
                },
            ],
            'quote-props': ['warn', 'as-needed'],
            quotes: [
                'warn',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true,
                },
            ],
            'rest-spread-spacing': ['warn', 'never'],
            semi: ['warn', 'always'],
            'semi-spacing': [
                'warn',
                {
                    before: false,
                    after: true,
                },
            ],
            'semi-style': ['warn', 'last'],
            'space-before-blocks': ['warn', 'always'],
            'space-before-function-paren': ['warn', 'never'],
            'space-in-parens': ['warn', 'never'],
            'space-infix-ops': ['warn'],
            'space-unary-ops': [
                'warn',
                {
                    words: true,
                    nonwords: false,
                },
            ],
            'spaced-comment': ['warn', 'always'],
            'switch-colon-spacing': [
                'warn',
                {
                    after: true,
                    before: false,
                },
            ],
            'template-curly-spacing': ['warn', 'never'],
            'template-tag-spacing': ['warn', 'never'],
            'wrap-iife': ['warn', 'inside'],
            'wrap-regex': ['warn'],
            'yield-star-spacing': ['warn', 'after'],
            '@typescript-eslint/adjacent-overload-signatures': 'warn',
            '@typescript-eslint/array-type': [
                'warn',
                {
                    default: 'array',
                },
            ],
            '@typescript-eslint/await-thenable': 'warn',
            '@typescript-eslint/ban-types': 'warn',
            '@typescript-eslint/class-literal-property-style': ['warn', 'fields'],
            '@typescript-eslint/class-methods-use-this': [
                'warn',
                {
                    ignoreOverrideMethods: false,
                    ignoreClassesThatImplementAnInterface: false,
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            'react/jsx-first-prop-new-line': ['error', 'always'],
        },
        languageOptions: {
            parser: parser,
            parserOptions: {
                project: './tsconfig.json',
            },
            globals: {
                ...globals.browser,
            },
        },
    },
);
