// import { useState } from "react";
import { Container } from "react-bootstrap";
import Message from "../components/message";

const ConfigPanel = ({ settings }) => {  
  // const [message, setMessage] = useState("");
  const message = "";

  return (
    <Container fluid>
      <Message body={message} isError={false} />
      <pre>
        {settings && JSON.stringify(settings, null, 2)}
      </pre>
    </Container>
  );
};
  
export default ConfigPanel;