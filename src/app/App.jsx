import { useState } from "react";
import { Container, Modal, Tab, Tabs } from "react-bootstrap";
import Game from "./Game";
import ConfigPanel from "./ConfigPanel"
import { getDefaultSpecs } from "./settings";
import '../style.scss';

const App = () => {
    const [error, setError] = useState("");
    const [gameSpecs, setGameSpecs] = useState(getDefaultSpecs());

    return (
        <>
            <Container id="main">
                <Tabs fill defaultActiveKey="game">
                    <Tab eventKey="game" title="Game">
                        <Game specsJson={gameSpecs} setError={setError} />
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