import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/CellList/CellList";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

const App: FC = () => {
  return (
    <Provider store={store}>
      <article>
        <CellList />
      </article>
    </Provider>
  );
};

export default App;
