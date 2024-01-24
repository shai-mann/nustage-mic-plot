// App.tsx
import React, { useState } from 'react';
import SceneComponent from './scene/SceneComponent';
import './App.css';

export interface Scene {
  number: number;
  name: string;
  actors: string[];
}

const App: React.FC = () => {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [newSceneName, setNewSceneName] = useState('');

  const addScene = () => {
    const sceneName = newSceneName.trim() !== '' ? newSceneName : `Scene ${scenes.length + 1}`;
    const newScene: Scene = { number: scenes.length + 1, name: sceneName, actors: [] };
    setScenes((prevScenes) => [...prevScenes, newScene]);
    setNewSceneName('');
  };

  const addActor = (sceneIndex: number, actorName: string) => {
    setScenes((prevScenes) => {
      const updatedScenes = [...prevScenes];
      updatedScenes[sceneIndex].actors.push(actorName);
      return updatedScenes;
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Scene-by-Scene Breakdown</h1>
        <div className="header-controls">
          <input
            type="text"
            value={newSceneName}
            onChange={(e) => setNewSceneName(e.target.value)}
            placeholder="Scene Name"
            className="scene-name-input"
          />
          <button className="add-button" onClick={addScene}>
            Add Scene
          </button>
        </div>
      </div>
      <div className="scenes">
        {scenes.map((scene, index) => (
          <SceneComponent key={index} scene={scene} onAddActor={(actorName) => addActor(index, actorName)} />
        ))}
      </div>
    </div>
  );
};

export default App;
