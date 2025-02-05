const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "ReactSelectDropdown",
    libraryTarget: "umd",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match .js and .jsx files
        loader: "esbuild-loader",
        options: {
          loader: "jsx", // Tell esbuild to transform JSX
          target: "es2015",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ],
      },
    ],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  }
};
