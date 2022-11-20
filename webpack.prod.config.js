const path = require( 'path' );
// const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin }  = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // for SPAs
    // entry: { // for MPAs
    //     'hello-world': './src/hello-world.js',
    //     'kiwi':  './src/kiwi.js'
    // },
    output: {
        path: path.resolve( __dirname, './dist' ), // expects absolute path, that is why used Node's path module
        // filename: '[name].[contenthash].js',
        filename: 'bundle.[contenthash].js',
        publicPath: '/static/',
        // clean: true // creates a new dist folder every time a build is,
        // // supported in webpack > 5.20, no need to use CleanWebpackPlugin
    },
    mode: 'development',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30 * 1024
        }
    },
    module: {
        rules: [
            /**
             * Assets - Images, svg, gif etc
             */
            {
                // Asset Type - resource - for large files like images
                test: /\.(jpg|png|jpeg)$/,
                type: 'asset/resource'
            },
            {   
                // Asset Type - Inline - For small files data-uri like svg images 
                // browser doesn't need to make http request fetch asset
                test: /\.(jpg|png|jpeg)$/,
                type: 'asset/inline'
            },
            {
                // General Asset Type - if asset is less than or equal to 8KB then it is inline type
                // else it is resource type by default 
                test: /\.(jpg|jpeg|png)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: { // condition which decides an asset is inline type or resorce type
                        // if asset size <= 3KB then inline else resourec
                        maxSize: 3 * 1024 // 3 kilobytes
                    }
                }
            },
            {
                // Asset Type - Source // Converts Text in JS String that can be used as string
                test: /\.txt/,
                type: 'asset/source'
            },
            /**
             * ---------- LOADERS ----------
             * Webpack enables use of loaders to preprocess files.
             * This allows you to bundle any static resource way beyond JavaScript
             */
            {
                // Loaders - which helps webapck use css, scss, handlers and other such files which JS is not able to use direcly
                // - styel loader and css loader
                test: /\.css$/,
                use: [ /*'style-loader' */ MiniCssExtractPlugin.loader , 'css-loader' ]
            },
            {
                // Loaders - sass Loader
                // Loaders load from right to left, so sass-loader will load first then css-loader then style-loader
                test: /\.scss$/,
                use: [ /*'style-loader' */ MiniCssExtractPlugin.loader , 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ], // ES6 and ES7 and onwards are coverted to ES5 for old browsers
                        plugins: [ '@babel/plugin-proposal-class-properties' ] // ES6 class properties are not supported in old browsers
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [ 'handlebars-loader' ]
            }
        ]
    },
    /**
     * Plugins are the backbone of webpack. Webpack itself is built on the same plugin system
     * that you use in your webpack configuration!
     * They also serve the purpose of doing anything else that a loader cannot do.
     * Webpack provides many such plugins out of the box.
     */
    plugins: [
        // this plugin is used to minimise/compress the size of generated bundle.js file
        // present by default in production, so no need to call this here in production mode
        // new TerserWebpackPlugin(),// present by default in webapck versions > 5, no need to install this plugin

        // style-loader - injects css into html style tag which makes the html file large and take time to load
        new MiniCssExtractPlugin( { // create a new css file for all the css in the project
            // filename: '[name].[contenthash].css' // this is for MPA
            filename: 'bundle.[contenthash].css'

        } ), 

        new CleanWebpackPlugin( {
            // Do not allow removal of current webpack assets
            // default: true
            protectWebpackAssets: false,

            cleanOnceBeforeBuildPatterns: [
                '**/*', // clears all with the folder defined at output.path
                path.join( process.cwd(), '/build/**' ) // cleas the build folder along with nested folders
            ]
        } ),

        /**
         * The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename which changes every
         * compilation. You can either let the plugin generate an HTML file for you, supply your own template
         * using lodash templates, or use your own loader.
         */
        // need 2 HtmlWebpackPlugin instanciations for 2 diff html files
        new HtmlWebpackPlugin( {
            filename: 'index.html',
            title: 'Webpack App',
            // chunks: [ 'kiwi' ], // decides which js and css file to inject in this html file
            // template: 'src/index.hbs',
            // description: 'Kiwi Image Page',
            minify: false, // By default true for prod
        } ),
        // new HtmlWebpackPlugin( {
        //     filename: 'hello-world.html',
        //     title: 'Hello Webpack',
        //     chunks: [ 'hello-world' ], // decides which js and css file to inject in this html file
        //     // template: 'src/index.hbs',
        //     description: 'Hello World Page',
        //     minify: false, // By default true for prod
        // } ),
        // // need 2 HtmlWebpackPlugin instanciations for 2 diff html files
        // new HtmlWebpackPlugin( {
        //     filename: 'kiwi.html',
        //     title: 'Hello Webpack',
        //     chunks: [ 'kiwi' ], // decides which js and css file to inject in this html file
        //     // template: 'src/index.hbs',
        //     description: 'Kiwi Image Page',
        //     minify: false, // By default true for prod
        // } )
    ]
}