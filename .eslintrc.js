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
        }]
    }
}