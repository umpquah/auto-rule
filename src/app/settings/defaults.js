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
            description: { expr: "`Step into the ${room}.`" },
            preamble: { content: "This is a preamble.", confirm: "Okey Dokey!" },
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
                wait: { duration: { expr: "seconds" }, hidden: false },
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
                announce: { exprString: "You will get a [${outcome}]." },
                next: { expr: "outcome" },
            }
        },
        reward: {
            title: "Reward",
            parameters: {
                item: "ice cream",
                verb: "eat",
                // count: { range: [1, 3], units: ["scoop"] },
                count: { range: [1, 3] },
            },
            preamble: "Ready for a reward?",
            resolution: {
                // announce: { exprString: "You may ${verb} [${count$display} of ${item}]." },
                announce: { exprString: "You may ${verb} [${count} scoops] of ${item}]." },
                action: { 
                    content: { exprString: "${verb} your ${item} before continuing." },
                    confirm: "Yum! (Done.)"
                },
                next: "wait",
            },
        },
        penalty: {
            title: "Penalty",
            parameters: {
                item: "dishes",
                verb: "wash",
                // count: { range: [1, 3], units: ["pile"] },
                count: { range: [1, 3]  },
            },
            resolution: {
                // announce:  {exprString: "You must ${verb} [${count$display} of ${item}]" },
                announce:  {exprString: "You must ${verb} [${count} piles] of ${item}]" },
                action: { 
                    content: { exprString: "${verb} the ${item}, then continue." },
                },
                next: "wait",
            }
        },
    },
};

export const DEFAULT_SETTINGS_JSON = JSON.stringify(DEFAULT_SETTINGS);