
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SPINNING_DELAY } from "../../app/settings";
import ConfirmButton from "./ConfirmButton";
import Instruction from "./Instruction";
import Spinner from "./Spinner";
import StageBanner from "./StageBanner";
import Timer from "./Timer";


const Stage = ({
    title,
    description,
    preamble,
    preambleConfirm,
    resolution: {
        announce,
        action,
        actionConfirm,
        wait,
        hideTime,
    },
    whenActionDone,
    whenTimerDone,
}) => {
    const [spinning, setSpinning] = useState(!preamble);
    const [preambling, setPreambling] = useState(true);
    const [actionPending, setActionPending] = useState(!!action);

    const showAnnouncement = !preambling && announce;
    const showAction = !preambling && action;
    const preambleWaiting = preamble && preambling && !spinning;
    const showTimer = !preambling && wait;

    useEffect(() => {
        if (spinning) {
            setTimeout(() => {
                setSpinning(false);
                setPreambling(false);
            }, SPINNING_DELAY);
        }
    }, [spinning]);

    const preambleDone = () => {
        setSpinning(true);
    }

    const actionDone = () => {
        setActionPending(false);
        whenActionDone();
    }

    const timerDone = () => {

    }

    return (
        <Container className="stage">
            {title && 
                <StageBanner title={title} />
            }
            {description &&
                 <div>{description}</div>
            }
            {preamble && 
                <div>{preamble}</div>
            }
            {preambleWaiting && 
                <ConfirmButton label={preambleConfirm || "Ok"} onClick={preambleDone} />
            }            
            {spinning && 
                <Spinner />
            }
            {showAnnouncement &&
                <Instruction message={announce} className="announcement" />
            }
            {showAction &&
                <Instruction message={action} className="action" />
            }
            {showAction && actionPending &&
                <ConfirmButton label={actionConfirm || "Done"} onClick={actionDone} />
            }
            {showTimer &&
                <Timer wait={wait} hideTime={hideTime} timerDone={timerDone} />
            } 
        </Container>
    );
};

export default Stage;