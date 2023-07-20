import { FC } from "react";
import "./App.css";
import "bulmaswatch/superhero/bulmaswatch.min.css";
//import CodeCell from "./components/CodeCell/CodeCell";
import TextEditor from "./components/TextEditor/TextEditor";
const App: FC = () => {
  return (
    <>
      <TextEditor />
    </>
  );
};

export default App;
