const path = require("path");

module.exports = {
  mode: "none",
  entry: "./public/js/components/raptor.js",
  output: {
    path: __dirname + "/dist/",
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
