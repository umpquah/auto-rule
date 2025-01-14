import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AppError, StageManager } from "../model";
import { ADVANCE_DELAY } from "./settings";


import Stage from "../components/stage";
import '../style.scss';

function Game({ settings, setError }) {
    const [manager, setManager] = useState(null);
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        if (settings) {
            try {
                const manager = new StageManager(JSON.parse(settings));
                setManager(manager);
                setGameState(manager.state);
            } catch (err) {
                if (err instanceof AppError) {
                    const msg = `*** ${err.key} - ${err.category} Error: ${err.message}`;
                    console.error(msg);
                    setError(msg);
                }
                else
                    throw err;
            }
        }
    }, [settings, setError]);

    const nextStage = () => {
        setTimeout(() => {
            manager.advance();
            setGameState({...manager.state});
        }, ADVANCE_DELAY)
    };

    const stages = gameState?.stages ?? [];

    return (
        <Container id="app">
            {stages.map(({key: stageKey, round, ...props}) => (
                <Stage 
                    key={stageKey + round}
                    whenActionDone={nextStage}
                    whenTimerDone={nextStage}
                    {...props} 
                />
            ))}
        </Container>
    )
}

export default Game;


