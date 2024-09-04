import { useCallback, useRef, useState } from "react";
import { COLS, createEmptyGrid, DIRECTIONS, ROWS } from "./utils/utils";
import { twMerge } from "tailwind-merge";
import { PlayPauseButton } from "./components/PlayPauseButton";
import { Button } from "./components/Button";

function App() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid);
  const [isPlaying, setIsPlaying] = useState(false);

  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;

  const runGameOfLife = useCallback(() => {
    if (!playingRef.current) {
      return;
    }

    setGrid((g) => {
      // own attempt:
      return g
        .map((arr) => [...arr])
        .map((row, rowIdx) =>
          row.map((_, colIdx) => {
            const liveNeighbors = DIRECTIONS.reduce((acc, [x, y]) => {
              const neighborX = x + rowIdx;
              const neighborY = y + colIdx;

              if (
                neighborX >= 0 &&
                neighborX < ROWS &&
                neighborY >= 0 &&
                neighborY < COLS
              ) {
                return (acc += g[neighborX][neighborY] ? 1 : 0);
              }

              return acc;
            }, 0);

            let cell = g[rowIdx][colIdx];
            if (cell && (liveNeighbors < 2 || liveNeighbors > 3)) {
              cell = 0;
            } else if (!cell && liveNeighbors === 3) {
              cell = 1;
            }

            return cell;
          }),
        );

      // tutorial's attempt:
      // const newGrid = g.map((arr) => [...arr]);
      //
      // for (let row = 0; row < ROWS; row++) {
      //   for (let col = 0; col < COLS; col++) {
      //     let cell = newGrid[row][col];
      //     let liveNeighbors = 0;
      //
      //     DIRECTIONS.forEach(([directionX, directionY]) => {
      //       const neighborX = row + directionX;
      //       const neighborY = col + directionY;
      //
      //       if (
      //         neighborX >= 0 &&
      //         neighborX < ROWS &&
      //         neighborY >= 0 &&
      //         neighborY < COLS
      //       ) {
      //         liveNeighbors += g[neighborX][neighborY] ? 1 : 0;
      //       }
      //     });
      //
      //     if (cell && (liveNeighbors < 2 || liveNeighbors > 3)) {
      //       cell = 0;
      //     } else if (!cell && liveNeighbors === 3) {
      //       cell = 1;
      //     }
      //   }
      // }
      //
      // return newGrid;
    });

    setTimeout(runGameOfLife, 100);
  }, [setGrid]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-blue-500 p-4">
      <h1 className="text-xl md:text-2xl">Conway's Game of Life</h1>
      <div className="flex items-center gap-4">
        <PlayPauseButton
          isPlaying={isPlaying}
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (!isPlaying) {
              playingRef.current = true;
              runGameOfLife();
            }
          }}
        />
        <Button
          onClick={() => {
            setGrid((g) =>
              g
                .map((arr) => [...arr])
                .map((_) =>
                  Array.from(Array(COLS), () => (Math.random() > 0.75 ? 1 : 0)),
                ),
            );
          }}
        >
          Seed
        </Button>
        <Button
          onClick={() => {
            setGrid(createEmptyGrid());
            setIsPlaying(false);
          }}
        >
          Clear
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`,
          gridTemplateRows: `repeat(${ROWS}, 20px)`,
        }}
      >
        {grid.map((rows, rowIdx) =>
          rows.map((_, colIdx) => (
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
