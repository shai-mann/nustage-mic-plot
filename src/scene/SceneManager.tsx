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
      number: scenes.length + 1,
      name: sceneName,
      actors: [],
    };
    setScenes((prevScenes) => [...prevScenes, newScene]);
    setNewSceneName("");
  };

  const addActor = (sceneIndex: number, actorName: string) => {
    setScenes((prevScenes) => {
      const updatedScenes = [...prevScenes];
      updatedScenes[sceneIndex].actors.push(actorName);
      return updatedScenes;
    });
  };

  const deleteActor = (sceneIndex: number, actorName: string) => {
    setScenes((prevScenes) => {
      const updatedScenes = [...prevScenes];
      updatedScenes[sceneIndex].actors = updatedScenes[
        sceneIndex
      ].actors.filter((a) => a !== actorName);
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
            onAddActor={(actorName) => addActor(index, actorName)}
            onDeleteActor={(actorName) => deleteActor(index, actorName)}
          />
        ))}
      </div>
    </>
  );
};

export default SceneManager;
