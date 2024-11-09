import { useEffect } from "react";
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
    scoops: { range: [1, 10] }
};
const stageSpecs = [
    {
        parameters: {
            ducks: { range: [10, 20] },
            isBig: { chance: 0.5 },
        },
        title: { expr: "isBig ? 'BIG pond' : 'little pond'" },
        description: { stringExpr: "A tale of ${ducks} ducks"},
        resolution: {
            next: "foo",
            announce: { stringExpr: "Pet the ${ducks} ducks!" },
        },
    },
    {
        title: { stringExpr: "Desert in the ${room}" },
        description: { stringExpr: "${scoops} ice cream scoops" },
        preamble: "One upon a time",
        resolution: {
            next: "bar",
        },
    }
];


function App() {

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
            const outer = new Entity();
            outer.environment.add(outer, globalSpecs);
            stageSpecs.forEach((stageSpec, i) => {
                const stage = new Stage(outer, `stage${i}`, stageSpec);
                for (let i = 0; i < 5; i++) {
                    stage.refresh();
                    console.log(stage.props);
                    console.log();
                }
            });
        } catch (err) {
            console.error("*** ERROR:", err)
        }
    }, []);

    return (
        <Container id="app">
            [Placeholder - working on model currently]
        </Container>
    )
}

export default App;


