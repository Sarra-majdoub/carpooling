import image3 from './img_3.png'
import './SentenceHeader.css';
function SentenceHeader() {
    return (
        <div>
            <h1 className="sentenceHeader">Come And Join Us !</h1>
            <img src={image3} alt="Avatar" className="avatar" />
        </div>
    );
}
export default SentenceHeader;