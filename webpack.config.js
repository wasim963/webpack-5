const { type } = require('os');
const path = require( 'path' );

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, './dist' ), // expects absolute path, that is why used Node's path module
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    mode: 'none',
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
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                // Loaders - sass Loader
                // Loaders load from right to left, so sass-loader will load first then css-loader then style-loader
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
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
            }
        ]
    }
}