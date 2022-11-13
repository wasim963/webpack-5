import HelloWorldButton from './components/hello-world-button/hello-world-button';
// import addImage from './add-image';
import Heading from './components/heading/heading.js';
// import _ from 'lodash';
import React from 'react';


const heading = new Heading();
// heading.render( _.upperFirst('hello world') );
heading.render( 'hello world' );

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();