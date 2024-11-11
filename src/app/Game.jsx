import { useEffect, useState } from "react";
import { Container, /* Tab, Tabs */ } from "react-bootstrap";
import { StageManager } from "../model";
import Stage from "../components/stage";
import { DEFAULT_SETTINGS_JSON } from "../settings";
import AppError from "../model/app-error";
import '../style.scss';

function Game() {
    const [state, setState] = useState({ stages: [] });

    const handleActionDone = () => {
        console.log("ACTION DONE");
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
                <Stage key={key} whenActionDone={handleActionDone} {...props} />
            ))}
        </Container>
    )
}

export default Game;


