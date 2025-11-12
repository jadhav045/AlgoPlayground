import React, { useRef, useEffect, useState } from "react";
import { Play, RotateCcw, Zap, Grid3x3, BarChart3, Info } from "lucide-react";

// Import sorting algorithms
import { bubbleSort } from "./algorithms/sorting/bubbleSort";
import { selectionSort } from "./algorithms/sorting/selectionSort";
import { insertionSort } from "./algorithms/sorting/insertionSort";
import { mergeSort } from "./algorithms/sorting/mergeSort";
import { quickSort } from "./algorithms/sorting/quickSort";
import { heapSort } from "./algorithms/sorting/heapSort";

// Import pathfinding algorithms
import { bfs } from "./algorithms/pathfinding/bfs";
import { dfs } from "./algorithms/pathfinding/dfs";
import { dijkstra } from "./algorithms/pathfinding/dijkstra";
// import { aStar } from "./algorithms/pathfinding/aStar";

// Import utilities
import { generateArray } from "./utils/helpers";
import { aStar } from "./algorithms/pathfinding/astar";
import ProjectLevelBanner from "./ProjectLevelBanner";

export default function AlgoVisualizer() {
  const [mode, setMode] = useState("sorting");
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [running, setRunning] = useState(false);
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState({ row: 2, col: 2 });
  const [target, setTarget] = useState({ row: 7, col: 17 });
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [selectedPathAlgo, setSelectedPathAlgo] = useState("bfs");
  const playingRef = useRef(false);

  // Algorithm info
  const algoInfo = {
    bubble: {
      name: "Bubble Sort",
      complexity: "O(n²)",
      description: "Simple comparison-based algorithm",
    },
    selection: {
      name: "Selection Sort",
      complexity: "O(n²)",
      description: "Finds minimum element repeatedly",
    },
    insertion: {
      name: "Insertion Sort",
      complexity: "O(n²)",
      description: "Builds sorted array incrementally",
    },
    merge: {
      name: "Merge Sort",
      complexity: "O(n log n)",
      description: "Divide and conquer approach",
    },
    quick: {
      name: "Quick Sort",
      complexity: "O(n log n)",
      description: "Efficient partition-based sorting",
    },
    heap: {
      name: "Heap Sort",
      complexity: "O(n log n)",
      description: "Uses heap data structure",
    },
  };

  const pathAlgoInfo = {
    bfs: {
      name: "Breadth-First Search",
      description: "Explores layer by layer",
    },
    dfs: { name: "Depth-First Search", description: "Explores deeply first" },
    dijkstra: {
      name: "Dijkstra's Algorithm",
      description: "Weighted shortest path",
    },
    aStar: { name: "A* Search", description: "Uses heuristics for efficiency" },
  };

  useEffect(() => {
    if (mode === "sorting") {
      setArray(generateArray(size, 20, 260));
    } else {
      const rows = 10;
      const cols = 20;
      const g = Array.from({ length: rows }, () => Array(cols).fill(false));
      setGrid(g);
    }
  }, [mode, size]);

  useEffect(() => {
    if (animations.length && running) {
      playAll();
    }
  }, [animations, running]);

  function prepareSort(alg) {
    const arr = array.slice();
    const algos = {
      bubble: bubbleSort,
      selection: selectionSort,
      insertion: insertionSort,
      merge: mergeSort,
      quick: quickSort,
      heap: heapSort,
    };
    setAnimations(algos[alg](arr));
    setRunning(true);
  }

  function preparePathfinding(alg) {
    const algos = { bfs, dfs, dijkstra, aStar };
    setAnimations(algos[alg](grid, start, target));
    setRunning(true);
  }

  function playAll() {
    playingRef.current = true;
    if (mode === "sorting") playSorting();
    else playPathfinding();
  }

  function playSorting() {
    const bars = document.getElementsByClassName("array-bar");
    const anims = animations;
    let arr = array.slice();

    anims.forEach((step, i) => {
      setTimeout(() => {
        if (step.type === "compare") {
          const [a, b] = step.indices;
          if (bars[a]) bars[a].style.background = "#3b82f6";
          if (bars[b]) bars[b].style.background = "#3b82f6";
          setTimeout(() => {
            if (bars[a]) bars[a].style.background = "#6366f1";
            if (bars[b]) bars[b].style.background = "#6366f1";
          }, speed - 10);
        } else if (step.type === "swap") {
          const [a, b] = step.indices;
          [arr[a], arr[b]] = [arr[b], arr[a]];
          if (bars[a]) bars[a].style.height = arr[a] + "px";
          if (bars[b]) bars[b].style.height = arr[b] + "px";
        } else if (step.type === "overwrite") {
          arr[step.index] = step.value;
          if (bars[step.index])
            bars[step.index].style.height = arr[step.index] + "px";
        } else if (step.type === "markSorted") {
          if (bars[step.index]) bars[step.index].style.background = "#10b981";
        }

        if (i === anims.length - 1) {
          setRunning(false);
          playingRef.current = false;
        }
      }, i * speed);
    });
  }

  function playPathfinding() {
    const anims = animations;
    anims.forEach((step, i) => {
      setTimeout(() => {
        if (step.type === "visit") {
          const { row, col } = step.cell;
          const el = document.getElementById(`cell-${row}-${col}`);
          if (
            el &&
            !el.classList.contains("start") &&
            !el.classList.contains("target")
          ) {
            el.style.background = "#3b82f6";
          }
        } else if (step.type === "path") {
          const { row, col } = step.cell;
          const el = document.getElementById(`cell-${row}-${col}`);
          if (
            el &&
            !el.classList.contains("start") &&
            !el.classList.contains("target")
          ) {
            el.style.background = "#10b981";
          }
        }

        if (i === anims.length - 1) {
          setRunning(false);
          playingRef.current = false;
        }
      }, i * speed);
    });
  }

  function toggleWall(r, c) {
    if (
      (r === start.row && c === start.col) ||
      (r === target.row && c === target.col)
    )
      return;
    const g = grid.map((row) => row.slice());
    g[r][c] = !g[r][c];
    setGrid(g);
  }

  function resetVisualization() {
    setRunning(false);
    playingRef.current = false;
    setAnimations([]);

    if (mode === "sorting") {
      setArray(generateArray(size, 20, 260));
    } else {
      const cells = document.querySelectorAll(".grid-cell");
      cells.forEach((cell) => {
        if (
          !cell.classList.contains("start") &&
          !cell.classList.contains("target") &&
          !cell.classList.contains("wall")
        ) {
          cell.style.background = "";
        }
      });
    }
  }

  const currentAlgoInfo =
    mode === "sorting"
      ? algoInfo[selectedAlgo]
      : pathAlgoInfo[selectedPathAlgo];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  AlgoPlayground
                </h1>
                <p className="text-sm text-slate-400">
                  Visualize algorithms in action
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setMode("sorting")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  mode === "sorting"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Sorting
              </button>
              <button
                onClick={() => setMode("pathfinding")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  mode === "pathfinding"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                Pathfinding
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Algorithm Info Card */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4">
              <div className="flex items-start gap-2 mb-2">
                <Info className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold">
                    {currentAlgoInfo.name}
                  </h3>
                  {mode === "sorting" && (
                    <p className="text-purple-300 text-sm">
                      Time: {currentAlgoInfo.complexity}
                    </p>
                  )}
                  <p className="text-slate-300 text-xs mt-1">
                    {currentAlgoInfo.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Controls
                </h3>

                {mode === "sorting" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">
                        Algorithm
                      </label>
                      <select
                        value={selectedAlgo}
                        onChange={(e) => setSelectedAlgo(e.target.value)}
                        className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={running}
                      >
                        <option value="bubble">Bubble Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                        <option value="heap">Heap Sort</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">
                        Array Size: {size}
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="w-full accent-purple-500"
                        disabled={running}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">
                        Algorithm
                      </label>
                      <select
                        value={selectedPathAlgo}
                        onChange={(e) => setSelectedPathAlgo(e.target.value)}
                        className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={running}
                      >
                        <option value="bfs">Breadth-First Search</option>
                        <option value="dfs">Depth-First Search</option>
                        <option value="dijkstra">Dijkstra Algorithm</option>
                        <option value="aStar">A* Search</option>
                      </select>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-sm text-slate-300 mb-2">
                        Start Position
                      </div>
                      <div className="text-orange-400 font-mono text-sm">
                        Row {start.row}, Col {start.col}
                      </div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-sm text-slate-300 mb-2">
                        Target Position
                      </div>
                      <div className="text-red-400 font-mono text-sm">
                        Row {target.row}, Col {target.col}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 italic bg-slate-700/30 p-2 rounded">
                      💡 Click cells to toggle walls
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Speed: {speed === 100 ? "Instant" : `${101 - speed}ms`}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={101 - speed}
                    onChange={(e) => setSpeed(101 - Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    mode === "sorting"
                      ? prepareSort(selectedAlgo)
                      : preparePathfinding(selectedPathAlgo)
                  }
                  disabled={running}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30"
                >
                  <Play className="w-4 h-4" />
                  {running ? "Running..." : "Start Visualization"}
                </button>

                <button
                  onClick={resetVisualization}
                  disabled={running}
                  className="w-full bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Legend */}
              <div className="border-t border-slate-700 pt-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">
                  Legend
                </h4>
                <div className="space-y-2 text-xs">
                  {mode === "sorting" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                        <span className="text-slate-400">Unsorted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-slate-400">Comparing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                        <span className="text-slate-400">Sorted</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="text-slate-400">Start</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-slate-400">Target</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-600 rounded"></div>
                        <span className="text-slate-400">Wall</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-slate-400">Visited</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                        <span className="text-slate-400">Path</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
              {mode === "sorting" ? (
                <div className="flex items-end justify-center h-96 gap-0.5">
                  {array.map((value, idx) => (
                    <div
                      key={idx}
                      className="array-bar transition-all duration-75"
                      style={{
                        height: `${value}px`,
                        width: `${Math.max(4, 700 / array.length)}px`,
                        backgroundColor: "#6366f1",
                        borderRadius: "2px 2px 0 0",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center min-h-96">
                  <div
                    className="inline-grid gap-1"
                    style={{ gridTemplateColumns: `repeat(20, 28px)` }}
                  >
                    {grid.map((row, r) =>
                      row.map((cell, c) => {
                        const isStart = r === start.row && c === start.col;
                        const isTarget = r === target.row && c === target.col;
                        return (
                          <div
                            key={`${r}-${c}`}
                            id={`cell-${r}-${c}`}
                            onClick={() => toggleWall(r, c)}
                            className={`grid-cell w-7 h-7 rounded cursor-pointer transition-all ${
                              isStart
                                ? "start bg-orange-500"
                                : isTarget
                                ? "target bg-red-500"
                                : cell
                                ? "wall bg-slate-600"
                                : "bg-slate-700 hover:bg-slate-600"
                            }`}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProjectLevelBanner currentLevel={1} />

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="text-center text-slate-400 text-sm">
          <p>
            Built with React & Tailwind CSS • Explore sorting and pathfinding
            algorithms
          </p>
        </div>
      </div>
    </div>
  );
}
