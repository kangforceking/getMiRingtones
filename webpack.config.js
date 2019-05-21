const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: ['@babel/polyfill', './src/main.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [ 
            {
                test: /\.vue/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'vue-loader'
                }
            }, {
                test: /\.js$/,
                // include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    /* {
                        loader: 'style-loader'
                    },  {
                        loader: MiniCssExtractPlugin.loader
                    }, */ {
                        loader: 'vue-style-loader'
                    },{
                        loader: "css-loader"
                    }, {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'compressed'
                        }
                    }
                ]
            }, {
                test: /\.(jpg|jpeg|png|gif|webp|svg)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'file-loader'
                    }, {
                        loader: 'url-loader',
                        options: {
                            limit: 5000
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: '[name].[hash].css',
        //     chunkFilename: '[id].[hash].css',
        // }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: '铃声'
        })
    ]
}