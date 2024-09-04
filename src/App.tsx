import { useCallback, useEffect, useRef, useState } from "react";
import { COLS, createEmptyGrid, DIRECTIONS, ROWS } from "./utils/utils";
import { twMerge } from "tailwind-merge";
import { PlayPauseButton } from "./components/PlayPauseButton";
import { Button } from "./components/Button";
import { Select } from "./components/Select";

function App() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [speed, setSpeed] = useState(100);

  const getGridSize = () => {
    const size = Math.min(
      (window.innerWidth - 32) / COLS,
      (window.innerHeight - 200) / ROWS,
      15,
    );

    return size;
  };
  const [cellSize, setCellSize] = useState(getGridSize());

  useEffect(() => {
    const handleResize = () => {
      setCellSize(getGridSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const speedRef = useRef(speed);
  speedRef.current = speed;

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
          row.map((cell, colIdx) => {
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

    setTimeout(runGameOfLife, speedRef.current);
  }, [setGrid]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const toggleCellState = (rowToToggle: number, colToToggle: number) => {
    setGrid((g) =>
      g
        .map((arr) => [...arr])
        .map((row, rowIdx) =>
          row.map((cell, colIdx) =>
            rowIdx === rowToToggle && colIdx === colToToggle
              ? cell
                ? 0
                : 1
              : cell,
          ),
        ),
    );
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      toggleCellState(row, col);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-4 p-4">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#a333ee_100%)]"></div>
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
        <Select
          label="speed selector"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        >
          <option value={1000}>Slow</option>
          <option value={500}>Medium</option>
          <option value={100}>Fast</option>
          <option value={50}>Lightning</option>
        </Select>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${cellSize}px)`,
        }}
      >
        {grid.map((rows, rowIdx) =>
          rows.map((cell, colIdx) => (
            <button
              key={`${rowIdx}-${colIdx}`}
              className={twMerge(
                "border border-[#9050e9]",
                cell ? "bg-[#ad7bee]" : "bg-[#240643]",
              )}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
              onClick={() => toggleCellState(rowIdx, colIdx)}
            />
          )),
        )}
      </div>
    </div>
  );
}

export default App;
