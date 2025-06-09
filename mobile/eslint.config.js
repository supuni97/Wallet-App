import eslintPluginImport from "eslint-plugin-import";

export default [
  {
    plugins: {
      import: eslintPluginImport,
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [["@", "./mobile"]],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "import/no-unresolved": "error",
    },
  },
];
