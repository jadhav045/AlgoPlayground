import React from "react";

export default function Controls({
  mode,
  setMode,
  size,
  setSize,
  speed,
  setSpeed,
  onGenerate,
  onStart,
  onReset,
  onClearGrid,
}) {
  return (
    <div
      className="controls"
      style={{ display: "flex", gap: 12, alignItems: "center" }}
    >
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="small"
      >
        <option value="sorting">Sorting</option>
        <option value="pathfinding">Pathfinding</option>
      </select>

      <label
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          fontSize: 13,
        }}
      >
        Size
        <input
          className="range"
          type="range"
          min={10}
          max={80}
          value={size}
          onChange={(e) => setSize(+e.target.value)}
        />
      </label>

      <label
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          fontSize: 13,
        }}
      >
        Speed
        <input
          className="range"
          type="range"
          min={5}
          max={500}
          value={speed}
          onChange={(e) => setSpeed(+e.target.value)}
        />
      </label>

      <button className="btn small" onClick={onGenerate}>
        Generate
      </button>
      <button className="btn small" onClick={onStart}>
        Start
      </button>
      <button className="btn small" onClick={onReset}>
        Reset
      </button>
      {mode === "pathfinding" && (
        <button className="btn small" onClick={onClearGrid}>
          Clear Walls
        </button>
      )}
    </div>
  );
}
