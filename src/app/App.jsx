import { useEffect, useState } from "react";
import { Container, Modal, Tab, Tabs } from "react-bootstrap";
import Game from "./Game";
import ConfigPanel from "./ConfigPanel"
import { getDefaultSpecs } from "./settings";
import '../style.scss';
import yaml from "js-yaml";

const App = () => {
    const [error, setError] = useState("");
    const [gameSpecs, setGameSpecs] = useState(getDefaultSpecs());

    useEffect(() => {
        const fetchYaml = async () => {
            const response = await fetch("./sample.yml");
            const content = await response.text()
            console.log(content);
        };
        fetchYaml();
    });

    const obj = yaml.load(`
        top:
            foo: 4
            bar: 6
        bottom:
            - 2
            - 3
            - 4    
    `);
    console.log(obj);

    return (
        <>
            Hi
            {/* <Container id="main">
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
            </Modal> */}
        </>
    );
}

export default App;