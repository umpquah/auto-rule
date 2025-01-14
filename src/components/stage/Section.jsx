import { Button } from "react-bootstrap";

const Section = ({
    visible,
    className,
    content,
    button,
}) => {
    if (!visible)
        return null;

    const contentParts = content.match(/(([^[\]]+)|(\[.+?\]))/g);
    const spans = contentParts.map((text, index) => (
        (text[0] === "[")
            ? <span className="callout" key={index}>{text.substring(1, text.length - 1)}</span>
            : <span key={index}>{text}</span>
    ));

    return (
        <div className={`section ${className}`}>
            <div className="content">
                {spans}
            </div>
            { button && 
                <Button onClick={button.onClick}>
                    {button.label}
                </Button>
            }
        </div>
    );
};

export default Section;