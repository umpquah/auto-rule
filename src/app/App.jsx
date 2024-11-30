import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { DEFAULT_SETTINGS_JSON } from "./settings/defaults";
import { AppError } from "../model";
import Game from "./Game";
import ConfigPanel from "./ConfigPanel"
import Message from "../components/message";
import '../style.scss';

// import VariableBuilder from "../model/config/variable/builder";
import Group from "../model/config/group";

import { entries } from "lodash";
import { ExpressionWithUnits } from "../model/config/variable/expression";

const App = ({
    settings = DEFAULT_SETTINGS_JSON
}) => {
    const [error, setError] = useState(null);

    try { 
        const group = new Group(
            null,
            "group",
            {
                number: 1,
                word: "cat",
                otherWord: { literal: "cake" },
                otherNumber: { literal: 99 },
                calculatedAnswer: { expr: "6 * 7"},
                calculatedString: { exprString: "The answer is ${6 * 7}"},
                formattedAmount: { exprWithUnits: ["1 + 2 + 3", "mouse", "mice"] },
                isFancy: { chance: 0.5 },
                steps: { range: [1, 100] },
                prize: { select: ["toy", "candy", "kitten", "sticker"] },
            },
        );

        console.log("Group:");
        console.dir(group.value);
    } catch (e) {
        if (e instanceof AppError) {
            console.log(`*** ${e.key} - ${e.category} Error: ${e.message}`);
        } else {
            throw e;
        }
    }


    return (
        <Container id="main">
            Nothing here.
            {/* <Message {...error} isError={true} />
            <Tabs fill defaultActiveKey="game">
                <Tab eventKey="game" title="Game">
                    <Game settings={settings} setError={setError} />
                </Tab>
                <Tab eventKey="config-panel" title="Config">
                    <ConfigPanel setError={setError} />
                </Tab>
            </Tabs> */}
        </Container>
    );
}

export default App;