/* eslint-disable no-template-curly-in-string */
const DEFAULT_SETTINGS = {
    parameters: [
        { 
            secondsMultiplier: 60,
            room: { select: ["bedroom", "parlor", "study", "den", "cabin"] },
        },
    ],
    initialStage: "wait",
    stages: {
        wait: {
            title: "Waiting",
            description: "Wait a certain amount of time",
            preamble: { content: "We will now determine wait time.", confirm: "Continue" },
            parameters: { 
                time: { range: [1, 2], units: ["minute"] },
            },
            resolution: {
                announce: { exprString: "You will wait [${time$display}]." },
                wait: { duration: { expr: "time * secondsMultiplier" }, hidden: false },
                next: "decide",
            },
        },
        decide: {
            title: "What Next?",
            description: "Deciding reward or penalty...",
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
                announce: { exprString: "You will get a [${outcome}]." },
                next: { expr: "outcome" },
            }
        },
        reward: {
            title: "Reward",
            parameters: {
                item: "ice cream",
                verb: "Eat",
                count: { range: [1, 3], units: ["scoop"] },
            },
            description: "Determining your reward",
            preamble: "Ready for a reward?",
            resolution: {
                announce: { exprString: "You may ${verb.toLowerCase()} [${count$display} of ${item}]." },
                action: { 
                    content: { exprString: "${verb} your ${item} before continuing." },
                    confirm: "Yum! (Done.)"
                },
                clearBeforeNext: true,
                next: "wait",
            },
        },
        penalty: {
            title: "Penalty",
            parameters: {
                item: "dishes",
                verb: "Wash",
                count: { range: [1, 3], units: ["pile"] },
            },
            resolution: {
                announce:  {exprString: "You must ${verb.toLowerCase()} [${count$display} of ${item}]" },
                action: { 
                    content: { exprString: "${verb} the ${item}, then continue." },
                },
                next: "wait",
                clearBeforeNext: true,
            }
        },
    },
};

export const DEFAULT_SETTINGS_JSON = JSON.stringify(DEFAULT_SETTINGS);