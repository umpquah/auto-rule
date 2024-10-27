
import  { useEffect } from "react";
import { Container, /* Tab, Tabs */} from "react-bootstrap";
import { 
  Chance,
  Constant,
  Environment,
  Expression,
  Range,
  Select,
  StringExpression,
} from "../model/variable";
import '../style.scss';

function App() {

  useEffect(() => {
    const created = [
      new Chance("foo", 0.5),
      new Range("count", [1, 4]),
      new Select("food", ["cake", "pie", "brownie"]),
      new Constant("color", "blue"),
      new Constant("answer", 42),
    ];
    const environment = new Environment();
    created.forEach((v) => environment.add(v));
    const e1 = new Expression("result", "answer * count", environment);
    console.log(e1.value);
    const e2 = new Expression("result", "`${answer * count} ${food}s`", environment);
    console.log(e2.value);
    const e3 = new StringExpression("result", "${answer * count} ${food}s", environment);
    console.log(e3.value);
  }, []);

  return (
    <Container id="app">
      [Placeholder - working on model currently]
    </Container>
  )
}

export default App;


