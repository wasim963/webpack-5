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
            }
        ]
    }
}