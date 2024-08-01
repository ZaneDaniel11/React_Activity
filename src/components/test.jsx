import { useState } from "react";

export default function Test() {
  const [increment, IncrementB] = useState(0);
  function Increase() {
    IncrementB(increment + 1);
  }

  function Decrement() {
    IncrementB(increment - 1);
    if(increment <= 0)
    {
      IncrementB(0);
    }
  }
  return (
    <div>
      <h1>{increment} </h1>
      <button onClick={Increase}>+</button>
      <button onClick={Decrement}>-</button>
    </div>
  );
}
