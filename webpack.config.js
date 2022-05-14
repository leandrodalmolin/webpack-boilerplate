const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {

    // Environment options
    const isProduction = argv.mode === 'production';
    const useSourceMaps = !isProduction;

    const cssLoader = {
        loader: "css-loader",
        options: {
            sourceMap: useSourceMaps
        }
    };

    const sassLoader = {
        loader: "sass-loader",
        options: {
            sourceMap: useSourceMaps
        }
    };

    return {
        entry: {
            index: './src/assets/js/index.js',
        },
        devtool: useSourceMaps ? "inline-source-map" : false,
        devServer: {
            static: './dist',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin(),
            new ESLintPlugin(),
            new StylelintPlugin({
                context: './src/assets/scss/',
                files: '**/*.scss',
                // Automatically fixes problems (edits source files)
                fix: true,
            })
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
                {
                    test: /\.(scss|css)$/i,
                    use: [
                        // Do not use style-loader and mini-css-extract-plugin together
                        // For more: https://webpack.js.org/plugins/mini-css-extract-plugin/#examples
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        cssLoader,
                        'postcss-loader',
                        sassLoader
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
    }
};