/* eslint-disable no-template-curly-in-string */
import { mapValues } from "lodash";
import rot13Cipher from "rot13-cipher";

const SFW_VALUES = {
    decideTitle: "Task or Treat?",
    optionOutcomes: ["a [treat]!", "a [task]!"],
    optionTitles: ["Treat", "Task"],
    rewardUnits: ["piece"],
    rewardContent: "You may eat [${quantity$display}] of candy.",
    rewardConfirmation: "Done",
    penaltyUnits: ["shovelful"],
    penaltyContent: "Dig [${quantity$display}] of dirt.",
    penaltyConfirmation: "Done",
};


const generateDefaultSpecs = ({
    decideTitle,
    optionOutcomes,
    optionTitles,
    rewardUnits,
    rewardContent,
    rewardConfirmation,
    penaltyUnits,
    penaltyContent,
    penaltyConfirmation,
}) => ({
    parameters: [
        { 
            secondsMultiplier: 60, // non-string -> literal value
            baseAmount: 4,
        },
    ],
    initialStage: "wait",
    stages: {
        wait: {
            title: "waiting", // string without prefix -> literal string
            parameters: { 
                time: ">> range(1, 3)" }, // expression as is
                timeUnits: ">> ['minute']",
            },
            resolution: {
                announce: ">$ Wait [${time$display}]", // expression surrounded by `...`
                wait: { 
                    duration: ">> time * secondsMultiplier",
                    hidden: false },
                next: "decide",
            },
        },
        // decide: {
        //     title: decideTitle,
        //     description: "Next, you get...",
        //     preamble: { content: "", confirm: "Continue"},
        //     parameters: [
        //         {
        //             getReward: { chance: 0.5 },
        //             options: { literal: optionOutcomes },
        //         },
        //     ],
        //     resolution: {
        //         announce: { expr: "getReward ? options[0] : options[1]" },
        //         next: { expr: "getReward ? 'reward' : 'penalty'" },
        //     }
        // },
        decide: {
            title: decideTitle,
            description: "You decide: You get...",
            branching: { 
                literal: {
                    [optionTitles[0]]: { announce: optionOutcomes[0], next: "reward" },
                    [optionTitles[1]]: { announce: optionOutcomes[1], next: "penalty" },
                },
            }
        },
        reward: {
            title: optionTitles[0],
            parameters: [
                {
                    count: { range: [1, 3] },
                },
                {
                    quantity: { expr: "baseAmount * count", units: rewardUnits}
                },
            ],
            resolution: {
                action: { 
                    content: { exprString: rewardContent},
                    confirm: rewardConfirmation,
                },
                clearBeforeNext: true,
                next: "wait",
            },
        },
        penalty: {
            title: optionTitles[1],
            parameters: [
                {
                    count: { range: [1, 3] },
                },
                {
                    quantity: { expr: "baseAmount * count", units: penaltyUnits}
                },
            ],
            resolution: {
                action: { 
                    content: { exprString: penaltyContent},
                    confirm: penaltyConfirmation,
                },
                clearBeforeNext: true,
                next: "wait",
            }
        },
    },
});

export const getDefaultSpecs = (sfw = true) => {
    let values;
    if (sfw) {
        values = SFW_VALUES;
    } else {
        // values = mapValues(NSFW_VALUES, (value) => {
        //     if (Array.isArray(value))
        //         return value.map((item) => rot13Cipher(item));
        //     else
        //         return rot13Cipher(value);
        // });
        values = SFW_VALUES;
    }
    return JSON.stringify(generateDefaultSpecs(values));
};
