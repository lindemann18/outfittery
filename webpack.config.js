'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var fs = require('fs');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.NODE_ENV || 'development';
var isTest = ENV === 'test' || ENV === 'test-watch' || ENV === 'test-coverage';
var isReportedTest = ENV === 'test-coverage';
var isStage = ENV === 'staging';
var isProd = ENV === 'production';
var baseUrl = '/mlp1/';

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    config.entry = isTest ? {} : {
        app: ['babel-polyfill', './src/app/app'],
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    config.output = isTest ? {} : {
        // Absolute output directory
        path: __dirname + '/dist',

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: (isStage || isProd) ? baseUrl : 'http://localhost:8099/',

        // Filename for entry points
        // Only adds hash in build mode
        filename: (isStage || isProd) ? '[name].[hash].js' : '[name].bundle.js',

        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: (isStage || isProd) ? '[name].[hash].js' : '[name].bundle.js'
    };

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isStage || isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'source-map';// 'eval-source-map';
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */

    // Initialize module
    config.module = {
        preLoaders: [],
        loaders: [{
            // JS LOADER
            // Reference: https://github.com/babel/babel-loader
            // Transpile .js files using babel-loader
            // Compiles ES6 and ES7 into ES5 code
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            // CSS LOADER
            // Reference: https://github.com/webpack/css-loader
            // Allow loading css through js
            //
            // Reference: https://github.com/postcss/postcss-loader
            // Postprocess your css with PostCSS plugins
            test: /\.css$/,
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files in production builds
            //
            // Reference: https://github.com/webpack/style-loader
            // Use style-loader in development.
            loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
        }, {
            // SASS LOADER
            // Reference: https://github.com/webpack/sass-loader
            // Allow loading sass through js
            //
            // Reference: https://github.com/postcss/postcss-loader
            // Postprocess your css with PostCSS plugins
            test: /\.sass$/,
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files in production builds
            //
            // Reference: https://github.com/webpack/style-loader
            // Use style-loader in development.
            loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!resolve-url!sass?sourceMap')
        }, {
            // ASSET LOADER
            // Reference: https://github.com/webpack/file-loader
            // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
            // Rename the file using the asset hash
            // Pass along the updated reference to your code
            // You can add here any file extension you want to get copied to your output
            test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|pjpeg|svg|json)$/,
            loader: 'file'
        }, {
            // HTML LOADER
            // Reference: https://github.com/webpack/raw-loader
            // Allow loading html through js
            test: /\.html$/,
            loader: 'ngtemplate!html'
        }]
    };

    // ISPARTA LOADER
    // Reference: https://github.com/ColCh/isparta-instrumenter-loader
    // Instrument JS files with Isparta for subsequent code coverage reporting
    // Skips node_modules and files that end with .test.js
    if (isReportedTest) {
        config.module.preLoaders.push({
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'isparta-instrumenter'
        })
    }

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    config.postcss = [
        autoprefixer()
    ];

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [];

    // Skip rendering index.html in test mode
    if (!isTest) {
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // Render index.html
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/public/index.ejs',
                inject: 'body',
                baseUrl: '/',
                gtmScript: isProd ? fs.readFileSync(__dirname + '/src/public/js/gtm.js', 'utf8') : '',
            }),

            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files
            // Disabled when in test mode or not in build mode
            new ExtractTextPlugin('[name].[hash].css', {disable: !(isStage || isProd)})
        )
    }

    // Add build specific plugins
    if (isStage || isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({ mangle: false }),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        )
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal',
        host: '0.0.0.0',
    };

    config.resolve = {
        extensions: ['', '.js', '.html', '.sass'],
        alias: {
            envVars: __dirname + '/src/app/env/' + ENV + '.js',
            directives: __dirname + '/src/app/directives',
            components: __dirname + '/src/app/components',
            services: __dirname + '/src/app/services',
            shared: __dirname + '/src/app/shared',
            node_modules: __dirname + '/node_modules',
            controllers: __dirname + '/src/app/controllers',
            pages: __dirname + '/src/app/pages',
            config: __dirname + '/src/app/config',
            img: __dirname + '/src/public/img',
            i18n: __dirname + '/src/public/i18n',
            styles: __dirname + '/src/app/styles',
            icons: __dirname + '/src/app/icons',
        }
    };

    return config;
}();
