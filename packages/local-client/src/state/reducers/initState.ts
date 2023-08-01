import { setRandomId } from "../../utils/random-id";
import { ICell } from "../cell-type";
const cells: ICell[] = [
  {
    id: setRandomId(),
    type: "text",
    content: `**cnbook** - 
    is an interactive coding application. You can write Javascript, see it executed, and write comprehensive documentation using markdown.
    You can write React code and import any available packages. Example: *import axios from 'axios'*.
    `,
  },
  {
    id: setRandomId(),
    type: "code",
    content: `import {useState} from 'react'
    const Counter = () => {
      const [counter, setCounter] = useState(0);
      return <>
          <button onClick={() => setCounter(prevState => prevState + 1)}>increment</button>
          <h2>Count: {counter}</h2>
        </>
    }
    render(<Counter />)`,
  },
  {
    id: setRandomId(),
    type: "code",
    content: `const App = () => {
      return <section>
          <h2>Hello from App!</h2>
          <h3>Component from previous cell :</h3>
          {
            /* Counter was declared in an earlier cell.
               But we can access any variables from previous cells.
            */
          }
          <Counter />
        </section>
    }
    render(<App />)`,
  },
];

export const initState = cells.reduce((acc, cell) => {
  acc[cell.id] = cell;
  return acc;
}, {} as { [key: string]: ICell });
export const initOrder = cells.map((cell) => cell.id);
