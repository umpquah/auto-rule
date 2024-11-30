import { Alert } from "react-bootstrap";

const MessageHeader = ({ text }) => {
  return (
    text && <><span className="header">{text}</span><br /></> 
  );
};

const Message = ({ header, body, isError }) => {
  return (
    body 
    ? <Alert variant={ isError ? "danger" : "primary" }>
        <MessageHeader text={header} />
        {body} 
      </Alert>
    : "" 
  );
};

export default Message;
