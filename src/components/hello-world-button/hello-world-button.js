// import './hello-world-button.css';
import './hello-world-button.scss';

class HelloWorldButton {

    // this is class property which is still not supported in some browsers
    helloWorldButtonClassname = 'hello-world-button';

    render() {
        const button = document.createElement('button');
        button.innerHTML = 'Hello World Button';
        button.classList.add( this.helloWorldButtonClassname );

        const body = document.querySelector('body');
        body.appendChild(button);

        button.onclick = ( event ) => {
            const p = document.createElement('p');
            p.innerHTML = 'Hello Wolrd Button Clicked Text';
            p.classList.add('hello-world-text');
            body.appendChild(p);
        }
    }
}
export default HelloWorldButton;
