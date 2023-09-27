const webpack = require('webpack');
const config = {
    mode: 'development',
    devServer: {
        headers: {
            'X-Frame-Options': 'sameorigin'
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/)
    ]
};
module.exports = config;