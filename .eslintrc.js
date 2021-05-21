module.exports = {
        extends: [
            'plugin:vue/essential'
        ],
        parserOptions: {
            parser: 'babel-eslint',
            sourceType: 'module',
            allowImportExportEverywhere: true
        },
        rules: {
            // 分号;结尾
            'semi': ['warn',
                'always'
            ],
            // 引号，
            'quotes': [
                'warn',
                'single'
            ],
            // var报警告
            'no-unused-vars' : ['warn',{
                'args': 'none',
                'vars': 'local',
                'args': 'none'
            }],
            'require-jsdoc' : ['warn',{
                'require': {
                    'FunctionDeclaration': true
                }
            }]
        }
    };