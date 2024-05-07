import './SentenceCard.css';
function SentenceCard(props) {
    return (
        <div className="SentenceCardDiv">
            <img src={props.image} alt={""}></img>
            <p>{props.sentence}</p>
        </div>
    )
}

export default SentenceCard;