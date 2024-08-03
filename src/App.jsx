import { useState } from "react";
import "./index.css";
import MainBoard from "./components/MainBoard";
import Client from "./Clients";
import Login from "./Login";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Login /> */}
      <Client />
    </>
  );
}

export default App;
