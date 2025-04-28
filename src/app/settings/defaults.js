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

const NSFW_VALUES = {
    decideTitle: "Hydration or Relief?",
    optionOutcomes: ["some [relief]!", "some [hydration]!"],
    optionTitles: ["Pressure Relief", "Hydration"],
    rewardUnits: ["ounce"],
    rewardContent: "💦You may pee now!💦\nUp to [${quantity$display}], no more.",
    rewardConfirmation: "Done",
    penaltyUnits: ["ounce"],
    penaltyContent: "☕️🥃🥤 Time to fill up!\nDrink [${quantity$display}] of your favorite liquid.",
    penaltyConfirmation: "Done",
};

// const TEMP = {
//     decideTitle: "Filling Up or Relief?",
//     optionOutcomes: ["Let's relieve a bit of pressure...", "Time to fill up!"],
//     optionTitles: ["Pressure Relief", "Filling Up"],
//     rewardUnits: ["ounce"],
//     rewardContent: "You may pee now!\nAs much as [${quantity$display}], no more.",
//     rewardConfirmation: "💦😮‍💨Done",
//     penaltyUnits: ["ounce"],
//     penaltyContent: "Go ahead and have [${quantity$display}] of your favorite drink.",
//     penaltyConfirmation: "☕️🥃🥤Done",
// };

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
            secondsMultiplier: 60,
            baseAmount: 4,
        },
    ],
    initialStage: "wait",
    stages: {
        wait: {
            title: "Waiting",
            parameters: { 
                time: { range: [1, 2], units: ["minute"] },
            },
            resolution: {
                announce: { exprString: "Wait [${time$display}]." },
                wait: { duration: { expr: "time * secondsMultiplier" }, hidden: false },
                next: "decide",
            },
        },
        decide: {
            title: decideTitle,
            description: "Next, you get...",
            preamble: { content: "", confirm: "Continue"},
            parameters: [
                {
                    getReward: { chance: 0.5 },
                    options: { literal: optionOutcomes },
                },
            ],
            resolution: {
                announce: { expr: "getReward ? options[0] : options[1]" },
                next: { expr: "getReward ? 'reward' : 'penalty'" },
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
        // console.log("rot13 values:");
        // console.log(values);
        values = NSFW_VALUES;
    }
    return JSON.stringify(generateDefaultSpecs(values));
};
