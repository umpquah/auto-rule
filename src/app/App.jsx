import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { DEFAULT_SETTINGS_JSON } from "./settings/defaults";
import { AppError, StageManager } from "../model";
import Game from "./Game";
import ConfigPanel from "./ConfigPanel"
import Message from "../components/message";
import '../style.scss';


import Stage from "../model/config/stage-manager/stage";
import ConfigGroup from "../model/config/group";

/* eslint-disable no-template-curly-in-string */
const App = ({
    settings = DEFAULT_SETTINGS_JSON
}) => {
    const [error, setError] = useState(null);

    try { 
        const manager = new StageManager(
            {
                initialStage: "bar",
                stages: {
                    stageA: {
                        title: "Stage A",
                        description: "this is stage A",
                        preamble: { content: "Are you ready?", confirm: "Yes!" },
                        parameters: [
                            {
                                number: 17,
                                word: "cat",
                                mouseCount: { range: [0, 3] },
                                isFancy: { chance: 0.5 },
                                cookies: { range: [5, 10] },
                                prize: { select: ["toy", "candy", "kitten", "sticker"] },
                            },
                            {
                                fancyReport: { expr: "isFancy ? 'fancy' : 'plain'" },
                                cookieReport: { exprString: "You get ${cookies} cookies!" },
                                mouseReport: { exprWithUnits: ["mouseCount", "mouse", "mice"] },
                                prizeReport: { exprString: "You win a ${prize}!" },
                            }
                        ],
                        resolution: {
                            next: "foo",
                            announce: { content: { exprString: "Come get your ${prize}."} },
                            wait: { 
                                duration: { expr: "cookies"},
                                hidden: { expr: "isFancy"},
                            },
                        }
                    },
                },
            }
        );

        // const outer = new ConfigGroup(null, "outer", null);

        // const stageA = new Stage(
        //     outer,
        //     "stageA",
        //     {
        //         title: "Stage A",
        //         description: "this is stage A",
        //         preamble: { content: "Are you ready?", confirm: "Yes!" },
        //         parameters: [
        //             {
        //                 number: 17,
        //                 word: "cat",
        //                 mouseCount: { range: [0, 3] },
        //                 isFancy: { chance: 0.5 },
        //                 cookies: { range: [5, 10] },
        //                 prize: { select: ["toy", "candy", "kitten", "sticker"] },
        //             },
        //             {
        //                 fancyReport: { expr: "isFancy ? 'fancy' : 'plain'" },
        //                 cookieReport: { exprString: "You get ${cookies} cookies!" },
        //                 mouseReport: { exprWithUnits: ["mouseCount", "mouse", "mice"] },
        //                 prizeReport: { exprString: "You win a ${prize}!" },
        //             }
        //         ],
        //         resolution: {
        //             next: "foo",
        //             announce: { content: { exprString: "Come get your ${prize}."} },
        //             wait: { 
        //                 duration: { expr: "cookies"},
        //                 hidden: { expr: "isFancy"},
        //             },
        //         }
        //     }
        // );

        // console.dir(stageA.value);
        console.dir(manager.value);

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