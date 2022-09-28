module.exports = {
  plugins: ["stylelint-scss"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  "string-quotes": "single",
  ignoreFiles: ["/dist/*", "**/node_modules/**"],
  rules: {
    "at-rule-no-unknown": null, // 推奨ルール
    "scss/at-rule-no-unknown": true, // 推奨ルール
    "selector-class-pattern": null, // ケバブケース以外(BEM等)はエラーになるため無効化
    "keyframes-name-pattern": null, // ケバブケース以外(BEM等)はエラーになるため無効化
    "max-nesting-depth": [
      3,
      {
        ignore: ["blockless-at-rules", "pseudo-classes"],
      },
    ],
    "max-line-length": 120,
  },
};
