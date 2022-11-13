import Kiwi from './kiwi.jpeg';
import altText from '../../altText.txt';
import './kiwi-image.scss';

class KiwiImage {

    render() {
        const img = document.createElement('img');
        img.alt = altText;
        img.src = Kiwi;
        img.classList.add('kiwi-image')
        const body = document.querySelector('body');
        body.appendChild(img)
    }
};

export default KiwiImage;