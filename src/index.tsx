import { createRoot } from "react-dom/client";
import App from "./App";

const node = document.getElementById("root") as HTMLDivElement;
const root = createRoot(node);

root.render(<App />);
