
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SPINNING_DELAY } from "../../settings";
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
        next,
    },
    whenActionDone,
}) => {
    const [spinning, setSpinning] = useState(!preamble);
    const [preambling, setPreambling] = useState(true);
    const showAnnouncement = !preambling && announce;
    const showAction = !preambling && action;
    const showPreambleButton = preamble && preambling && !spinning;
    // const showTimer = waiting || finished;

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

    return (
        <Container className="stage">
            {title && <StageBanner title={title} />}
            {description && <div>{description}</div>}
            {preamble && <div>{preamble}</div>}
            {showPreambleButton && 
                <ConfirmButton 
                    label={preambleConfirm || "Ok"}
                    onClick={preambleDone}
                />
            }
            {spinning && <Spinner />}
            {showAnnouncement &&
                <Instruction message={announce} className="announcement" />
            }
            {showAction &&
                <Instruction message={action} className="action" />
            }
            {showAction &&
                <ConfirmButton label={actionConfirm || "Done"} onClick={whenActionDone} />
            }
            {/* {showTimer &&
                <Timer wait={wait} whenDone={waitingDone} timerHidden={timerHidden} />
            }  */}
        </Container>
    );
};

export default Stage;