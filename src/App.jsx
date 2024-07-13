import { useState } from "react";
import "./index.css";
import MainBoard from "./components/MainBoard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainBoard />
    </>
  );
}

export default App;
