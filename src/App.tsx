import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import "./App.css";
import "bulmaswatch/superhero/bulmaswatch.min.css";
//import CodeCell from "./components/CodeCell/CodeCell";
import TextEditor from "./components/TextEditor/TextEditor";

const App: FC = () => {
  return (
    <Provider store={store}>
      <section>
        <TextEditor />
      </section>
    </Provider>
  );
};

export default App;
