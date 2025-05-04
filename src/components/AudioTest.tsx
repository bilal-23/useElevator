import React, { useState } from "react";
import { useElevator } from "../../lib/useElevator";
import elevatorMusic from "../../lib/assets/elevator.mp3";

const AudioTest: React.FC = () => {
  const [testMessage, setTestMessage] = useState<string | null>(null);

  // Create elevator with explicit audio=true setting
  const { startElevating, isElevating } = useElevator({
    audio: true,
    duration: 2000,
    startCallback: () => setTestMessage("Audio should be playing now!"),
    endCallback: () => setTestMessage("Finished! Did you hear the ding?"),
  });

  // Function to test audio directly
  const testAudio = () => {
    try {
      const audio = new Audio(elevatorMusic);
      audio.volume = 1.0;
      audio.onplay = () => setTestMessage("Test audio is playing!");
      audio.onerror = (e) => setTestMessage(`Error playing test audio: ${e}`);

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Audio playing successfully"))
          .catch((e) => {
            console.error("Audio play error:", e);
            setTestMessage(`Audio play error: ${e.message}`);
          });
      }
    } catch (error) {
      console.error("Audio creation error:", error);
      setTestMessage(`Failed to create audio: ${error}`);
    }
  };

  return (
    <div
      className="audio-test"
      style={{ padding: "2rem", textAlign: "center" }}
    >
      <h2>Audio Test Component</h2>

      <div style={{ margin: "1rem 0" }}>
        <button
          onClick={startElevating}
          disabled={isElevating}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            marginRight: "1rem",
          }}
        >
          {isElevating ? "Elevating..." : "Test Elevator Audio"}
        </button>

        <button
          onClick={testAudio}
          style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
        >
          Test Basic Audio
        </button>
      </div>

      {testMessage && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
        >
          {testMessage}
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h3>Troubleshooting</h3>
        <ul style={{ textAlign: "left" }}>
          <li>Make sure your browser allows audio playback</li>
          <li>Check that audio files are correctly loaded</li>
          <li>
            Try interacting with the page first (some browsers require user
            interaction before playing audio)
          </li>
          <li>Verify the console for any errors</li>
        </ul>
      </div>
    </div>
  );
};

export default AudioTest;
