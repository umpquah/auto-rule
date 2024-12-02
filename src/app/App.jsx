import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Game from "./Game";
import ConfigPanel from "./ConfigPanel"
import Message from "../components/message";
import { DEFAULT_SETTINGS_JSON } from "./settings";
import '../style.scss';

const App = ({
    settings = DEFAULT_SETTINGS_JSON
}) => {
    const [error, setError] = useState(null);

    return (
        <Container id="main">
            <p>Nothing here.</p>
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
    );
}

export default App;