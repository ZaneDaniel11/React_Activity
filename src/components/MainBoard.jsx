import Board from "./Board";
import Test from "./test";
export default function MainBoard() {
  return (
    <div class="flex">
      <div>
        <div className="header">
          <h1>Team 1</h1>
        </div>
        <Board />
      </div>

      <div>
        <div className="header">
          <h1>Team 2</h1>
        </div>
        <Board />
      </div>
      <Test />
    </div>
  );
}
