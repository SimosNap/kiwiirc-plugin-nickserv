const fs = require('fs');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    entry: './plugin.js',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: [{loader: 'exports-loader'}, {loader: 'babel-loader'}],
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
    }
};
