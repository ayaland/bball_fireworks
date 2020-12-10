// const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    resolve: {
        extensions: [".js", ".json", ".css"]
    },
  
    entry: "./src/start.js",
    
    output: {
        path: path.resolve(__dirname, "frontend", "src"),
        filename: 'bundle.js'
    },
    
    devtool: "source-map",
};
