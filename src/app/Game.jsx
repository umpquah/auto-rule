import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AppError, StageManager } from "../model";
import { ADVANCE_DELAY } from "./settings";

import { Stage } from "../components";
import '../style.scss';

function Game({ specsJson, setError }) {
    const [manager, setManager] = useState(null);
    const [gameState, setGameState] = useState(null);

    const handleError = (err) => {
        if (err instanceof AppError) {
            const msg = `*** ${err.key} - ${err.category} Error: ${err.message}`;
            console.error(msg);
            setError(msg);
        }
        else
            throw err;
    }

    useEffect(() => {
        if (specsJson) {
            try {
                const manager = new StageManager(JSON.parse(specsJson));
                setManager(manager);
                setGameState(manager.state);
            } catch (err) {
                handleError(err);
            }
        }
    }, [specsJson, setError]);

    const nextStage = (branchChoice = null) => {
        setTimeout(() => {
            try {
                manager.advance(branchChoice = null);
                setGameState({...manager.state});
            } catch (err) {
                handleError(err);
            }
        }, ADVANCE_DELAY);
    };

    const stages = gameState?.stages ?? [];

    return (
        <Container id="app">
            <pre>
                {JSON.stringify(gameState, null, 2)}
            </pre>
            {stages.map(({key: stageKey, round, ...props}) => (
                <Stage 
                    key={stageKey + round}
                    whenActionDone={nextStage}
                    whenTimerDone={nextStage}
                    whenBranchingDone={nextStage}
                    {...props} 
                />
            ))}
        </Container>
    )
}

export default Game;


