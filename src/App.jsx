import { useState } from "react";
import "./index.css";
import MainBoard from "./components/MainBoard";
import Client from "./Clients";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Client />
    </>
  );
}

export default App;
