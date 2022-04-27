// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser : true,
        es2021  : true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion : 'latest',
        sourceType  : 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'indent'          : ['warn', 4, { 'SwitchCase': 1 }],
        'linebreak-style' : [
            'warn','unix'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        semi: [
            'warn',
            'always'
        ],
        'object-curly-newline'                            : ['warn',{ 'multiline': true, 'consistent': true }],
        'react/jsx-indent-props'                          : ['warn', 4],
        'jsx-a11y/label-has-associated-control'           : 'off',
        'jsx-a11y/no-noninteractive-element-interactions' : 'off',
        'react/jsx-props-no-spreading'                    : 0,
        'react/jsx-curly-brace-presence'                  : 0,
        'jsx-a11y/control-has-associated-label'           : 0,
        'arrow-parens'                                    : 0,
        'import/no-cycle'                                 : 0,
        'react/prop-types'                                : [2, { 'ignore': ['qaData', 'trackingData', 'marketing'] }],
        'camelcase'                                       : [0, {'allow': ['^UNSAFE_']}],
        'padded-blocks'                                   : ['warn', { 'switches': 'never', 'blocks': 'never', 'classes': 'always' }],
        'key-spacing'                                     : ['warn', {
            'align': {
                'beforeColon' : true,
                'afterColon'  : true,
                'on'          : 'colon'
            }
        }],
    },
};
