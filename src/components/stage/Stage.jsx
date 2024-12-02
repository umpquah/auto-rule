
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SPINNING_DELAY } from "../../app/settings";
import ConfirmButton from "./ConfirmButton";
import Instruction from "./Instruction";
import Section from "./Section";
import Spinner from "./Spinner";
import StageBanner from "./StageBanner";
import Timer from "./Timer";


const Stage = ({
    title,
    description,
    preamble,
    resolution: {
        announce,
        action,
        wait,
    },
    whenActionDone,
    whenTimerDone,
}) => {
    const [spinning, setSpinning] = useState(!preamble);
    const [preambling, setPreambling] = useState(!!preamble);
    const [actionPending, setActionPending] = useState(!!action);

    const preambleComplete = !preambling && !spinning;
    const showAnnouncement = preambleComplete && announce;
    const showAction = preambleComplete && action;
    const showTimer = preambleComplete && wait;

    useEffect(() => {
        if (spinning) {
            setTimeout(() => {
                setSpinning(false);
            }, SPINNING_DELAY);
        }
    }, [spinning]);

    const preambleDone = () => {
        setPreambling(false);
        setSpinning(true);
    }

    const actionDone = () => {
        setActionPending(false);
        whenActionDone();
    }

    const timerDone = () => {
        whenTimerDone();
    }

    return (
        <Container className="stage">
            {title && 
                <StageBanner title={title} />
            }
            {description &&
                <Section content={description} />
            }
            {preambling && 
                <Section content={preamble.content} />
            }
            {preambling && 
                <ConfirmButton label={preamble?.confirmation || "Ok"} onClick={preambleDone} />
            }            
            {spinning && 
                <Spinner />
            }
            {showAnnouncement &&
                <Instruction message={announce} className="announcement" />
            }
            {showAction &&
                <Instruction message={action.content} className="action" />
            }
            {showAction && actionPending &&
                <ConfirmButton label={action?.confirm || "Done"} onClick={actionDone} />
            }
            {showTimer &&
                <Timer wait={wait} hideTime={wait?.hidden} timerDone={timerDone} />
            }
        </Container>
    );
};

export default Stage;