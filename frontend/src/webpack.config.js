// const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    resolve: {
        extensions: [".js", ".json", ".css"]
    },
  
    entry: { 
        index: path.resolve(__dirname, "/frontend/src"),
        filename: 'start.js' 
    },
    
    output: {
        path: path.resolve(__dirname, "/frontend/src"),
        filename: 'bundle[contenthash].js'
    },
    
    devtool: "source-map",
};
