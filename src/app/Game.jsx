import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import { AppError, StageManager } from "../model";


import Stage from "../components/stage";
import '../style.scss';

function Game({ settings }) {
    const [manager, setManager] = useState(null);
    const [gameState, setGameState] = useState(null);

    const handleActionDone = () => {
        console.log("ACTION DONE");
    }

    const handleTimerDone = () => {
        console.log("TIMER DONE");
    }

    useEffect(() => {
        if (settings) {
            try {
                const manager = new StageManager(JSON.parse(settings));
                setManager(manager);
                setGameState(manager.state);
            } catch (err) {
                if (err instanceof AppError) 
                    console.log(`*** ${err.key} - ${err.category} Error: ${err.message}`);
                else
                    throw err;
            }
        }
    }, [settings]);

    const handleNext = () => {
        manager.advance();
        setGameState({...manager.state});
    }

    const stages = gameState?.stages ?? [];

    return (
        <Container id="app">
            <div>{stages.length}</div>
            <Button onClick={handleNext}>Next</Button>
            {stages.map(({key: stageKey, round, ...props}) => (
                <Stage 
                    key={stageKey + round}
                    whenActionDone={handleActionDone}
                    whenTimerDone={handleTimerDone}
                    {...props} 
                />
            ))}
        </Container>
    )
}

export default Game;


