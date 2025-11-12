import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Controls from "./components/Controls";
import { DEFAULTS } from "./config";
import Visualizer from "./components/VIsualizer";

export default function App() {
  const [mode, setMode] = useState("sorting");
  const [size, setSize] = useState(DEFAULTS.ARRAY_SIZE);
  const [speed, setSpeed] = useState(DEFAULTS.SPEED);
  const [running, setRunning] = useState(false);

  const handleGenerate = () => {
    // Visualizer listens to size/mode and regenerates
    // toggle running to false
    setRunning(false);
    // simple way: force rerender by changing key? Not needed since Visualizer uses effect on size/mode
  };

  const handleStart = () => {
    // Just set running true; Visualizer uses animations prepared by buttons inside it
    setRunning(true);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleClearGrid = () => {
    // instruct visualizer via reload for simplicity
    window.location.reload();
  };

  return (
    <div className="app">
      <Navbar />
      <Controls
        mode={mode}
        setMode={setMode}
        size={size}
        setSize={setSize}
        speed={speed}
        setSpeed={setSpeed}
        onGenerate={handleGenerate}
        onStart={handleStart}
        onReset={handleReset}
        onClearGrid={handleClearGrid}
      />
      <Visualizer
        mode={mode}
        size={size}
        speed={speed}
        running={running}
        setRunning={setRunning}
      />

      <div style={{ marginTop: 16, fontSize: 13, color: "#9ca3af" }}>
        <strong>Tip:</strong> Use the controls to switch between Sorting and
        Pathfinding. Click grid tiles to toggle walls.
      </div>
    </div>
  );
}
