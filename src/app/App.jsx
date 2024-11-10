import { useEffect, useState } from "react";
import { Container, /* Tab, Tabs */ } from "react-bootstrap";
import { Stage } from "../model";
import Entity from "../model/entity";
import '../style.scss';

/* eslint-disable no-template-curly-in-string */
// const parameters = [
//     {
//         timeUnit: "minute",
//         secondsMultiplier: 60,
//         room: { select: ["bedroom", "parlor", "study", "den", "cabin"] },
//     },
//     {
//         time: { range: [1, 3] },
//         hideTime: { chance: 0.2 },
//     },
//     {
//         seconds: { expr: "time * secondsMultiplier" },
//     },
//     {
//         foo: { chance: 0.5 },
//         count: { range: [1, 4] },
//         food: { select: ["cake", "pie", "brownie"] },
//         color: "blue",
//         answer: 42,
//     },
//     {
//         result1: { expr: "answer * count" },
//         result2: { expr: "`${answer * count} ${food}s`" },
//         result3: { stringExpr: "${answer * count} ${food}s" },
//     },
// ];
const globalSpecs = {
    room: { select: ["bedroom", "parlor", "study", "den", "cabin"] },
};
const stageSpecs = [
    {
        parameters: {
            ducks: { range: [10, 20],  },
            isBig: { chance: 0.5 },
        },
        title: { expr: "isBig ? 'BIG pond' : 'little pond'" },
        description: { exprString: "A tale of ${ducks} ducks"},
        resolution: {
            next: "foo",
            announce: { exprString: "Pet the ${ducks} ducks!" },
        },
    },
    {
        parameters: [
            {
                mice: { range: [0, 3], units: ["mouse", "mice"] },
                scoops: { range: [1, 2], units: ["ice cream scoop"] },
            },
        ],
        title: { exprString: "Desert in the ${room}" },
        description: { exprString: "${scoops$display}" },
        preamble: { exprString: "You have ${mice$display}" },
        resolution: {
            next: "bar",
        },
    }
];


function App() {

    const [stages, setStages] = useState([]);

    useEffect(() => {
        try {
            // const outer = new Entity(null, "outer", null, true);
            // outer.environment.add(outer, parameters);
            // outer.environment.add(outer, resolution);
            // Object.keys(resolution).forEach((key) => {
            //     console.log(outer.environment.bindings[key].value);
            // });
            // environment.add("", parameters);
            // // environment.variables.forEach((v) => console.log(`${v}`));
            // environment.add("", resolution);
            // Object.keys(resolution).forEach((key) => {
            //     console.log(environment.bindings[key].value);
            // });
            setStages([]);
            const outer = new Entity();
            outer.environment.add(outer, globalSpecs);
            stageSpecs.forEach((stageSpec, i) => {
                const stage = new Stage(outer, `stage${i}`, stageSpec);
                setStages((prev) => [...prev, stage.props]);
            });
        } catch (err) {
            console.error(`*** ERROR: ${err.key}: ${err.message}`);
        }
    }, []);

    return (
        <Container id="app">
            <pre>
                {JSON.stringify(stages, null, 2)}
            </pre>
        </Container>
    )
}

export default App;


