module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        'eslint:recommended',
        "plugin:@typescript-eslint/recommended",
        'plugin:vue/vue3-recommended',
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        // "@typescript-eslint/rule-name": "error",
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "always"
        }],
        "@typescript-eslint/no-explicit-any": ["off"], // any可用
        "vue/max-attributes-per-line": ["error", {
            "singleline": 3, // 如果同一标签在同一行，那么最多支持三个属性
            "multiline": {
                "max": 3, // 折行后同一行最多三个属性
                "allowFirstLine": false // 同一标签在不同行，首行不允许写属性
            }
        }]
    }
}