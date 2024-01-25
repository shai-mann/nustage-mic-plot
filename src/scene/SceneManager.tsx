// App.tsx
import React, { FC, useState } from "react";
import "./SceneManager.css";
import { Scene } from "../App";
import SceneComponent from "./SceneComponent";

interface SceneManagerProps {
  scenes: Scene[];
  setScenes: (func: (scenes: Scene[]) => Scene[]) => void;
}

const SceneManager: FC<SceneManagerProps> = ({ scenes, setScenes }) => {
  const [newSceneName, setNewSceneName] = useState("");

  const createScene = () => {
    const sceneName =
      newSceneName.trim() !== "" ? newSceneName : `Scene ${scenes.length + 1}`;
    const newScene: Scene = {
      name: sceneName,
      actors: [],
    };
    setScenes((prevScenes) => [...prevScenes, newScene]);
    setNewSceneName("");
  };

  const onSceneChange = (index: number, scene: Partial<Scene>) => {
    setScenes((prevScenes) => {
      const updatedScenes = [...prevScenes];
      updatedScenes[index] = {
        ...prevScenes[index],
        ...scene,
      };
      return updatedScenes;
    });
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Scenes</h1>
        <div className="header-controls">
          <input
            type="text"
            value={newSceneName}
            onChange={(e) => setNewSceneName(e.target.value)}
            placeholder="Scene Name"
            className="scene-name-input"
          />
          <button className="add-button" onClick={createScene}>
            Add Scene
          </button>
        </div>
      </div>
      <div className="scenes">
        {scenes.map((scene, index) => (
          <SceneComponent
            key={index}
            scene={scene}
            onSceneChange={(scene) => onSceneChange(index, scene)}
          />
        ))}
      </div>
    </>
  );
};

export default SceneManager;
