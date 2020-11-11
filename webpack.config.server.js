const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    entry: './src/server/index.ts',
    target: 'node', // support native modules
    devtool: "inline-source-map",
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                include: [
                    path.resolve(__dirname, "src/server")
                ]
            },
        ]
    },
    plugins: [
        new NodemonPlugin()
    ]
};
