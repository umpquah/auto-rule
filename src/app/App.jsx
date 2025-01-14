import { useState } from "react";
import { Container, Modal, Tab, Tabs } from "react-bootstrap";
import Game from "./Game";
import ConfigPanel from "./ConfigPanel"
import Message from "../components/message";
import { DEFAULT_SETTINGS_JSON } from "./settings";
import '../style.scss';

const App = ({
    settings = DEFAULT_SETTINGS_JSON
}) => {
    const [error, setError] = useState("");

    return (
        <>
            <Container id="main">
                <Message {...error} isError={true} />
                <Tabs fill defaultActiveKey="game">
                    <Tab eventKey="game" title="Game">
                        <Game settings={settings} setError={setError} />
                    </Tab>
                    <Tab eventKey="config-panel" title="Config">
                        <ConfigPanel setError={setError} />
                    </Tab>
                </Tabs>
            </Container>
            <Modal show={!!error}>
                <Modal.Header closeButton onHide={() => setError("")}>
                    <Modal.Title>
                        {error}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{error}</p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default App;