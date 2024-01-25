// App.tsx
import React, { useState } from "react";
import MicPlot from "./plot/MicPlot";
import "./App.css";
import SceneManager from "./scene/SceneManager";

export interface Scene {
  number: number;
  name: string;
  actors: string[];
}

const App = () => {
  const [scenes, setScenes] = useState<Scene[]>([]);

  return (
    <div className="container">
      <div className="split-container">
        <div className="left-panel">
          <SceneManager scenes={scenes} setScenes={setScenes} />
        </div>
        <div className="divider-line"></div>
        <div className="right-panel">
          <MicPlot scenes={scenes} />
        </div>
      </div>
    </div>
  );
};

export default App;
