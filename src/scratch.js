
  // const stageA = new Stage(
        //     outer,
        //     "stageA",
        //     {
        //         title: "Stage A",
        //         description: "this is stage A",
        //         preamble: { content: "Are you ready?", confirm: "Yes!" },
        //         parameters: [
        //             {
        //                 number: 17,
        //                 word: "cat",
        //                 mouseCount: { range: [0, 3] },
        //                 isFancy: { chance: 0.5 },
        //                 cookies: { range: [5, 10] },
        //                 prize: { select: ["toy", "candy", "kitten", "sticker"] },
        //             },
        //             {
        //                 fancyReport: { expr: "isFancy ? 'fancy' : 'plain'" },
        //                 cookieReport: { exprString: "You get ${cookies} cookies!" },
        //                 mouseReport: { exprWithUnits: ["mouseCount", "mouse", "mice"] },
        //                 prizeReport: { exprString: "You win a ${prize}!" },
        //             }
        //         ],
        //         resolution: {
        //             next: "foo",
        //             announce: { content: { exprString: "Come get your ${prize}."} },
        //             wait: { 
        //                 duration: { expr: "cookies"},
        //                 hidden: { expr: "isFancy"},
        //             },
        //         }
        //     }
        // );


const STAGE_SPEC =  {
    initialStage: "stageA",
    parameters: {
        room: { select: ["kitchen", "parlor", "living room", "bedroom"] },
    },
    stages: {
        stageA: {
            title: "Stage A",
            description: { exprString: "Welcome to the ${room}!" },
            preamble: { content: "Are you ready?", confirm: "Yes!" },
            parameters: [
                {
                    number: 17,
                    word: "cat",
                    mouseCount: { range: [0, 3] },
                    isFancy: { chance: 0.5 },
                    cookies: { range: [5, 10] },
                    prize: { select: ["toy", "candy", "kitten", "sticker"] },
                },
                {
                    fancyReport: { expr: "isFancy ? 'fancy' : 'plain'" },
                    cookieReport: { exprString: "You get ${cookies} cookies!" },
                    mouseReport: { exprWithUnits: ["mouseCount", "mouse", "mice"] },
                    prizeReport: { exprString: "You win a ${prize}!" },
                }
            ],
            resolution: {
                next: "stageA",
                announce: { content: { exprString: "Come get your ${prize}."} },
                wait: { 
                    duration: { expr: "cookies"},
                    hidden: { expr: "isFancy"},
                },
            }
        },
    },
};
