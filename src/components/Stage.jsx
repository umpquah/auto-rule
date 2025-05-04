import { keys } from "lodash";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SPINNING_DELAY } from "../app/settings";
import Section from "./Section";
import Spinner from "./Spinner";
import Timer from "./Timer";
import UserChoice from "./UserChoice";


const Step = Object.freeze({
    PREAMBLE: 0,
    SPIN: 1,
    CHOICE: 2,
    ACTION: 3,
    WAIT: 4,
    DONE: 5,
});

const Stage = ({
    title,
    description,
    preamble,
    resolution: {
        announce,
        action,
        wait,
    } = {},
    branching,
    whenActionDone,
    whenTimerDone,
    whenBranchingDone,
}) => {
    const [step, setStep] = useState(
        preamble ? Step.PREAMBLE : Step.SPIN
    );
    const [branchAnnounce, setBranchAnnounce] = useState(null);

    useEffect(() => {
        if (step === Step.SPIN) {
            setTimeout(() => {
                const newStep = (
                    branching
                    ? Step.CHOICE
                    : action 
                        ? Step.ACTION
                        : wait 
                            ? Step.WAIT 
                            : Step.DONE
                );
                setStep(newStep);
                if (newStep === Step.DONE)
                    whenActionDone();
            }, SPINNING_DELAY);
        }
    }, [action, wait, step, branching, whenActionDone]);

    const preambleDone = () => {
        setStep(Step.SPIN);
    }

    const branchingDone = (choice) => {
        setBranchAnnounce(branching[choice]?.announce);
        setStep(Step.DONE);
        whenBranchingDone(choice);
    }

    const actionDone = () => {
        setStep(Step.DONE);
        whenActionDone();
    }

    const timerDone = () => {
        whenTimerDone();
    }

    const announcement = announce ?? branchAnnounce;

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
            <UserChoice 
                visible={step === Step.CHOICE}
                options={keys(branching)}
                whenChoiceMade={branchingDone}
            />
            <Section
                className="announce"
                visible={step >= Step.ACTION && announce}
                content={announcement}
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