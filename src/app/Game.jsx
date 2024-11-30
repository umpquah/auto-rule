import { useEffect, useState } from "react";
import { Container, /* Tab, Tabs */ } from "react-bootstrap";

import { AppError, StageManager } from "../model";
import { DEFAULT_SETTINGS_JSON } from "./settings";

import Stage from "../components/stage";
import '../style.scss';

function Game() {
    const [state, setState] = useState({ stages: [] });

    const handleActionDone = () => {
        console.log("ACTION DONE");
    }

    const handleTimerDone = () => {
        console.log("TIMER DONE");
    }

    useEffect(() => {
        try {
            const manager = new StageManager(JSON.parse(DEFAULT_SETTINGS_JSON));
            setState(manager.props);
        } catch (err) {
            if (err instanceof AppError) 
                console.error(`*** ${err.name} @ ${err.key}: ${err.message}`);
            else
                throw err;
        }
    }, []);

    const { stages } = state;

    return (
        <Container id="app">
            {stages.map(({key, ...props}) => (
                <Stage 
                    key={key}
                    whenActionDone={handleActionDone}
                    whenTimerDone={handleTimerDone}
                    {...props} 
                />
            ))}
        </Container>
    )
}

export default Game;

