module.exports = {
  singleQuote: false,
  jsxSingleQuote: false,
  bracketSpacing: true,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  arrowParens: "avoid",
  plugins: [require("prettier-plugin-imports")],
  importOrder: ["^react$", "<THIRD_PARTY_MODULES>", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
