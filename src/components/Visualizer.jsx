import React, { useRef, useEffect, useState } from "react";
import { bubbleSort } from "../algorithms/sorting/bubbleSort";
import { mergeSort } from "../algorithms/sorting/mergeSort";
import {selectionSort} from "../algorithms/sorting/selectionSort";
import {insertionSort} from "../algorithms/sorting/insertionSort";
import {quickSort} from "../algorithms/sorting/quickSort";
import {heapSort} from "../algorithms/sorting/heapSort";
import { dijkstra } from "../algorithms/pathfinding/dijkstra";
import { dfs } from "../algorithms/pathfinding/dfs";
import { bfs } from "../algorithms/pathfinding/bfs";
import { generateArray } from "../utils/helpers";
import { aStar } from "../algorithms/pathfinding/astar";

export default function Visualizer({ mode, size, speed, running, setRunning }) {
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState({ row: 2, col: 2 });
  const [target, setTarget] = useState({ row: 6, col: 17 });
  const playingRef = useRef(false);

  // Generate array or grid depending on mode
  useEffect(() => {
    if (mode === "sorting") {
      setArray(generateArray(size, 20, 260));
    } else {
      const rows = 10;
      const cols = 20;
      const g = Array.from({ length: rows }, () => Array(cols).fill(false));
      setGrid(g);
      setStart({ row: 2, col: 2 });
      setTarget({ row: 7, col: 17 });
    }
  }, [mode, size]);

  // Run animation sequence
  useEffect(() => {
    if (animations.length && running) {
      playAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animations, running]);

  // Sorting setup
  // function prepareSort(alg = "bubble") {
  //   const arr = array.slice();
  //   let anims = [];
  //   if (alg === "bubble") anims = bubbleSort(arr);
  //   else anims = mergeSort(arr);
  //   setAnimations(anims);
  //   setRunning(true);
  // }
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

  // // Pathfinding setup
  // function preparePathfinding() {
  //   const anims = bfs(grid, start, target);
  //   setAnimations(anims);
  //   setRunning(true);
  // }

  function preparePathfinding(alg) {
    const algos = { bfs, dfs, dijkstra, aStar };
    setAnimations(algos[alg](grid, start, target));
    setRunning(true);
  }

  // Decide which animation to run
  function playAll() {
    playingRef.current = true;
    if (mode === "sorting") playSorting();
    else playPathfinding();
  }

  // Sorting animation logic
  function playSorting() {
    const bars = document.getElementsByClassName("array-bar");
    const anims = animations;
    let arr = array.slice();

    anims.forEach((step, i) => {
      setTimeout(() => {
        if (step.type === "compare") {
          const [a, b] = step.indices;
          bars[a].style.background = "#60a5fa";
          bars[b].style.background = "#60a5fa";
          setTimeout(() => {
            if (bars[a]) bars[a].style.background = "";
            if (bars[b]) bars[b].style.background = "";
          }, speed - 10);
        } else if (step.type === "swap") {
          const [a, b] = step.indices;
          const ha = arr[a];
          const hb = arr[b];
          arr[a] = hb;
          arr[b] = ha;
          bars[a].style.height = arr[a] + "px";
          bars[b].style.height = arr[b] + "px";
        } else if (step.type === "overwrite") {
          const idx = step.index;
          arr[idx] = step.value;
          if (bars[idx]) bars[idx].style.height = arr[idx] + "px";
        } else if (step.type === "markSorted") {
          const idx = step.index;
          if (bars[idx]) bars[idx].style.background = "#10b981";
        }

        if (i === anims.length - 1) {
          setRunning(false);
          playingRef.current = false;
        }
      }, i * speed);
    });
  }

  // Pathfinding animation logic
  function playPathfinding() {
    const anims = animations;
    anims.forEach((step, i) => {
      setTimeout(() => {
        if (step.type === "visit") {
          const { row, col } = step.cell;
          const el = document.getElementById(`cell-${row}-${col}`);
          if (el) el.style.background = "#2563eb";
        } else if (step.type === "path") {
          const { row, col } = step.cell;
          const el = document.getElementById(`cell-${row}-${col}`);
          if (el) el.style.background = "#10b981";
        }

        if (i === anims.length - 1) {
          setRunning(false);
          playingRef.current = false;
        }
      }, i * speed);
    });
  }

  // Toggle wall for BFS grid
  function toggleWall(r, c) {
    const g = grid.map((row) => row.slice());
    g[r][c] = !g[r][c];
    setGrid(g);
  }

  // Render component
  return (
    <div>
      {mode === "sorting" ? (
        <div>
          <div className="visualizer">
            <div
              style={{ display: "flex", alignItems: "flex-end", height: 260 }}
            >
              {array.map((v, idx) => (
                <div
                  className="array-bar"
                  key={idx}
                  style={{
                    height: v + "px",
                    width: Math.max(6, 420 / array.length) + "px",
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="legend">
            Sorting Visualizer • Compare = blue, Swap = animation, Sorted =
            green
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
            <button className="btn small" onClick={() => prepareSort("bubble")}>
              Bubble Sort
            </button>
            <button className="btn small" onClick={() => prepareSort("merge")}>
              Merge Sort
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="visualizer">
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, color: "#9ca3af", marginBottom: 8 }}
                  >
                    Grid (click to toggle walls)
                  </div>
                  <div className="grid">
                    {grid.map((row, r) =>
                      row.map((cell, c) => {
                        const id = `cell-${r}-${c}`;
                        const isStart = r === start.row && c === start.col;
                        const isTarget = r === target.row && c === target.col;
                        return (
                          <div
                            id={id}
                            key={id}
                            className={`cell ${cell ? "wall" : ""}`}
                            onClick={() => toggleWall(r, c)}
                            style={{
                              background: isStart
                                ? "#f97316"
                                : isTarget
                                ? "#ef4444"
                                : undefined,
                            }}
                          ></div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div style={{ width: 220, marginLeft: 12 }}>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>
                    Start: {start.row},{start.col}
                  </div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>
                    Target: {target.row},{target.col}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <button
                      className="btn small"
                      onClick={() => {
                        const anims = bfs(grid, start, target);
                        setAnimations(anims);
                        setRunning(true);
                      }}
                    >
                      Run BFS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="legend">
            Pathfinding Visualizer • Visits = blue, Final Path = green
          </div>
        </div>
      )}
    </div>
  );
}
