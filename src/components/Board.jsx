import { useState } from "react";
import Test from "./test";

export default function Board() {
  const [count, setCount] = useState(0);
  function Increment() {
    setCount(count + 1);
  }
  function Decrement() {
    setCount(count - 1);
    if (count <= 0) {
      setCount(0);
    }
  }
  return (
    <div>
      <div class="w-48 h-48 text-center text-sky-400/100">
        <h2>{count}</h2>
      </div>
      <div className="buttonContainer">
        <button
          type="button"
          onClick={Increment}
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          +
        </button>
        <button
          onClick={Decrement}
          type="button"
          class="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          -
        </button>
      </div>
    </div>
  );
}
