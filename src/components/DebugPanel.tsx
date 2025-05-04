import React, { useState } from "react";
import AudioTest from "./AudioTest";

const DebugPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {isExpanded && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: 0,
            width: "400px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>Debug Panel</h3>
            <button
              onClick={() => setIsExpanded(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ×
            </button>
          </div>
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <AudioTest />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          backgroundColor: "#3c5aa8",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Debug Audio"
      >
        🔊
      </button>
    </div>
  );
};

export default DebugPanel;
