/* eslint-disable no-template-curly-in-string */
const DEFAULT_SETTINGS = {
    parameters: [
        { 
            secondsMultiplier: 60,
            room: { select: ["bedroom", "parlor", "study", "den", "cabin"] },
        },
    ],
    initialStage: "reward",
    stages: {
        wait: {
            title: "Waiting",
            description: { expr: "`Step into the ${room}.`" },
            preamble: "This is a preamble.",
            parameters: [
                { 
                    time: { range: [1, 3], units: ["minute"] },
                    hide: { chance: 0.2 },
                },
                { 
                    seconds: { expr: "time * secondsMultiplier" },
                },
            ],
            resolution: {
                announce: { expr: "hide ? 'Wait for a while...' : `Wait ${time$display}...`" },
                wait: { expr: "seconds" },
                hideTime: { expr: "hide" },
                next: "decide",
            },
        },
        decide: {
            title: "What Next?",
            parameters: [
                {
                    outcomes: { literal: ["reward", "penalty"] },
                    getReward: { chance: 0.4 },
                },
                {
                    outcome: { expr: "getReward ? outcomes[0] : outcomes[1]" }
                }
            ],
            resolution: {
                announce: "`You will get a [${outcome}].`",
                next: { expr: "outcome" },
            }
        },
        reward: {
            title: "Reward",
            parameters: {
                item: "ice cream",
                verb: "eat",
                count: { range: [1, 3], units: ["scoop"] },
            },
            preamble: "Ready for a reward?",
            preambleConfirm: "Ready!",
            resolution: {
                announce: { exprString: "You may ${verb} [${count$display} of ${item}]." },
                action: { exprString: "${capitalize(verb)} your ${item} before continuing." },
                actionConfirm: "Yum! (Done.)",
                next: "wait",
            },
        },
        penalty: {
            title: "Penalty",
            parameters: {
                item: "dishes",
                verb: "wash",
                count: { range: [1, 3], units: ["pile"] },
            },
            resolution: {
                announce: { exprString: "You must ${verb} [${count$display} of ${item}]" },
                action: { exprString: "${verb} the ${item}, then continue." },
                next: "wait",
            }
        },
    },
};

export const DEFAULT_SETTINGS_JSON = JSON.stringify(DEFAULT_SETTINGS);