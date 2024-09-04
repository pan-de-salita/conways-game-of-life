import { useState } from "react";
import { COLS, createEmptyGrid, ROWS } from "./utils/utils";
import { twMerge } from "tailwind-merge";

function App() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-blue-500 p-4">
      <h1 className="text-xl md:text-2xl">Conway's Game of Life</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`,
          gridTemplateRows: `repeat(${ROWS}, 20px)`,
        }}
      >
        {grid.map((rows, rowIdx) =>
          rows.map((col, colIdx) => (
            <button
              key={`${rowIdx}-${colIdx}`}
              className={twMerge(
                "border border-[#9050e9]",
                grid[rowIdx][colIdx] ? "bg-[#ad7bee]" : "bg-[#240643]",
              )}
            />
          )),
        )}
      </div>
    </div>
  );
}

export default App;
