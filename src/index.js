import HelloWorldButton from './components/hello-world-button/hello-world-button';
import addImage from './add-image';
import Heading from './components/heading/heading.js'


const heading = new Heading();
heading.render();

addImage();

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

if( process.env.NODE_ENV === 'production' ) {
    console.log('Production Mode');
} else if( process.env.NODE_ENV === 'developement' ) {
    console.log('Deveopment Mode');
}

HelloWorldButton.methodThatDoesnotExis();