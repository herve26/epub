module.exports = {
    entry: './app/index.js',
    output: {
        path: './app',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
        ]
    }
}