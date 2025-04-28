import { Button } from "react-bootstrap";

const Section = ({
    visible,
    className,
    content,
    button,
}) => {
    if (!visible)
        return null;

    const parseNewlines = (text) => {
        return text.split("\n").map((line, i) =>
            <span key={i}>{i > 0 && <br />}{line}</span>
        );
    };

    let spans;
    if (!!content) {
        const contentParts = content.match(/(([^[\]]+)|(\[.+?\]))/g);
        spans = contentParts.map((text, index) => (
            (text[0] === "[")
                ? <span className="callout" key={index}>{parseNewlines(text.substring(1, text.length - 1))}</span>
                : <span key={index}>{parseNewlines(text)}</span>
        ));
    } else {
        spans = [<span>{content}</span>];
    }

    return (
        <div className={`section ${className}`}>
            <div className="inner">
                <div className="message">
                    {spans}
                </div>
                { button && 
                    <Button onClick={button.onClick} disabled={button.disabled}>
                        {button.label}
                    </Button>
                }
                </div>
        </div>
    );
};

export default Section;