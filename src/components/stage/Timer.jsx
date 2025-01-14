
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { ONE_SECOND } from "../../app/settings";

const Timer = ({ visible, wait, timerDone }) => {
    const {hidden, duration} = wait ?? {};
    const [remaining, setRemaining] = useState(duration);
    const [running, setRunning] = useState(duration > 0);

    useEffect(() => {
        if (running & visible) {
            console.log("start timer");
            const interval = setInterval(() => {
                setRemaining((prev) => {
                    if (prev === 0) {
                        clearInterval(interval);
                        setRunning(false);
                        timerDone();
                        return 0;
                    } else {
                        return prev - 1;
                    }
                });
            }, ONE_SECOND);
            return () => clearInterval(interval);
        }
    }, [running, visible, setRunning, timerDone]);

    if (!visible)
        return null;

    const clock = (hidden && remaining > 0) ? "-??-" : formatTime(remaining);
    const realPercent = 100 * (1 - remaining / duration);
    let percent = realPercent;
    if (hidden && remaining > 0) {
        // randomly sweep between lower half and upper half (up to 90%)
        console.log("RANDOM SWEEP");
        percent = ((remaining % 2) + Math.random()) * 45;
    }
    return (
        <div className="section timer">
            <ProgressBar now={percent} />
            <div>{clock}</div>
        </div>
    );
};

const formatTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = (seconds % 60).toString().padStart(2, "0");
    let hoursPrefix;
    if (hours > 1) {
        minutes = minutes.toString().padStart(2, "0");
        hoursPrefix = `${hours}:`;
    } else {
        hoursPrefix = "";
    }
    return `${hoursPrefix}${minutes}:${seconds}`;
};

export default Timer;