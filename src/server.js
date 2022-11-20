const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// serve static files to the browser - like css, js, img files etc
app.use('/static', express.static( path.resolve(__dirname, '../dist') ));

app.get( '/', ( req, res ) => {
    // res.send('Some Dummy Content');
    const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html');
    const contentFromHtmlFile = fs.readFileSync( pathToHtmlFile, 'utf-8' );
    res.send( contentFromHtmlFile );
} );

app.listen( 3000, () => {
    console.log('Application started at http://localhost:3000/')
} )
