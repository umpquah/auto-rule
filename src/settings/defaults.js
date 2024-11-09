
const DEFAULT_SETTINGS = {
    variables: [
        { 
            timeUnit: "minute",
            secondsMultiplier: 60,
            room: { select: ["bedroom", "parlor", "study", "den", "cabin"] },
        },
    ],
    initialStage: "wait",
    stages: {
        wait: {
            title: "Waiting",
            description: { expr: "`Step into the ${room}.`" },
            preamble: "This is a preamble'",
            variables: [
                { 
                    time: { range: [1, 3] },
                    hideTime: { chance: 0.2 },
                },
                { 
                    seconds: { expr: "time * secondsMultiplier" },
                },
            ],
            resolution: {
                announce: { expr: "hideTime ? 'Wait for a while...' : `Wait [${formatWithUnits(time, timeUnit)}]...`" },
                wait: { expr: "seconds" },
                timerHidden: { expr: "hideTime" },
                next: "wait",
            },
        },

        // decide: {
        //     title: "What Next?",
        //     parameters: {
        //         static: { outcomes: ["reward", "penalty"] },
        //         chance: { getReward: 0.4 } 
        //     },
        //     calculations: {
        //         outcome: "getReward ? outcomes[0] : outcomes[1]",
        //     },
        //     resolution: {
        //         announce: "`You will get a [${outcome}].`",
        //         next: "outcome",
        //     }
        // },
        // reward: {
        //     title: "Reward",
        //     parameters: {
        //         static: { 
        //             item: "ice cream",
        //             unit: "scoop",
        //             verb: "eat",
        //         },
        //         range: { count: [1, 3] },
        //     },
        //     resolution: {
        //         announce: "`You may ${verb} [${formatWithUnits(count, unit)} of ${item}].`",
        //         action: "`${capitalize(verb)} your ${item} before continuing.`",
        //         next: "'wait'",
        //     }
        // },
        // penalty: {
        //     title: "Penalty",
        //     parameters: {
        //         static: { 
        //             item: "dishes",
        //             unit: "pile",
        //             verb: "wash",
        //         },
        //         range: { count: [1, 3] },
        //     },
        //     resolution: {
        //         announce: "`You must ${verb} [${formatWithUnits(count, unit)} of ${item}].`",
        //         action: "`${capitalize(verb)} the ${item}, then continue.`",
        //         next: "'wait'",
        //     }
        // },
    },
}




export const DEFAULT_SETTINGS_JSON = JSON.stringify(DEFAULT_SETTINGS);