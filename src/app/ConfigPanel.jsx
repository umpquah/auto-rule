// import { useState } from "react";
import { Container } from "react-bootstrap";

const ConfigPanel = ({ settings }) => {  
  // const [message, setMessage] = useState("");
  const message = "";

  return (
    <Container fluid>
      <pre>
        {settings && JSON.stringify(settings, null, 2)}
      </pre>
    </Container>
  );
};
  
export default ConfigPanel;