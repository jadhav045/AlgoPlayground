import React from "react";

export default function Navbar() {
  return (
    <div className="header">
      <div className="brand">
        <img src="/favicon.svg" alt="logo" />
        <div>
          <div style={{ fontWeight: 700 }}>AlgoPlayground</div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>
            Visualize Sorting & Pathfinding
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#9ca3af" }}>
        Made for interviews · SDE-ready
      </div>
    </div>
  );
}
