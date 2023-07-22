import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import "./App.css";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CellList from "./components/CellList/CellList";

const App: FC = () => {
  return (
    <Provider store={store}>
      <section>
        <CellList />
      </section>
    </Provider>
  );
};

export default App;
