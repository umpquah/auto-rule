const Instruction = ({ message, className }) => {
    const contents = message.match(/(([^[\]]+)|(\[.+?\]))/g);
    return (
        <div className={"section " + className}>
            {contents.map((text, index) => (
                (text[0] === "[")
                    ? makeCallout(text, index)
                    : <span key={index}>{text}</span>
            ))}
        </div>
    );
};

const makeCallout = (bracketedText, index) => {
    const len = bracketedText.length;
    return <span className="callout" key={index}>{bracketedText.substring(1, len - 1)}</span>
}

export default Instruction;

