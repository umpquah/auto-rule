
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SPINNING_DELAY } from "../../app/settings";
import Section from "./Section";
import Spinner from "./Spinner";
import Timer from "./Timer";


const Step = Object.freeze({
    PREAMBLE: 0,
    SPIN: 1,
    ACTION: 2,
    WAIT: 3,
    DONE: 4,
});

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
    const [step, setStep] = useState(
        preamble ? Step.PREAMBLE : Step.SPIN
    );

    useEffect(() => {
        if (step === Step.SPIN) {
            setTimeout(() => {
                const newStep = action ? Step.ACTION : wait ? Step.WAIT : Step.DONE;
                setStep(newStep);
                if (newStep === Step.DONE)
                    whenActionDone();
            }, SPINNING_DELAY);
        }
    }, [action, wait, step, whenActionDone]);

    const preambleDone = () => {
        setStep(Step.SPIN);
    }

    const actionDone = () => {
        setStep(Step.DONE);
        whenActionDone();
    }

    const timerDone = () => {
        whenTimerDone();
    }

    return (
        <Container className="stage">
            <Section
                className="stage-banner"
                visible={title}
                content={title}
            />
            <Section
                className="description"
                visible={description}
                content={description}
            />
            <Section
                className="preamble"
                visible={step === Step.PREAMBLE}
                content={preamble?.content}
                button={{ label: preamble?.confirm ?? "Ok", onClick: preambleDone }}
            />
            <Spinner visible={step === Step.SPIN} />
            <Section
                className="announce"
                visible={step >= Step.ACTION && announce}
                content={announce}
            />
            <Section
                className="action"
                visible={step >= Step.ACTION && action}
                content={action?.content}
                button={
                    { label: action?.confirm ?? "Done", onClick: actionDone, disabled: step !== Step.ACTION }
                }
            />
            <Timer 
                visible={step === Step.WAIT}
                wait={wait}
                timerDone={timerDone}
            />
        </Container>
    );
};

export default Stage;