import HelloWorldButton from './components/hello-world-button/hello-world-button';
import addImage from './add-image';
import Heading from './components/heading/heading.js'


const heading = new Heading();
heading.render();

addImage();

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();