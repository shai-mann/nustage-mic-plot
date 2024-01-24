import React, { useState } from 'react';
import SceneComponent from './scene/SceneComponent';
import './App.css';

interface Scene {
  number: number;
  actors: string[];
}

const App: React.FC = () => {
  const [scenes, setScenes] = useState<Scene[]>([]);

  const addScene = () => {
    const newScene: Scene = { number: scenes.length + 1, actors: [] };
    setScenes((prevScenes) => [...prevScenes, newScene]);
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
      <h1 className="title">Scene-by-Scene Breakdown</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {scenes.map((scene, index) => (
          <SceneComponent key={index} scene={scene} onAddActor={(actorName) => addActor(index, actorName)} />
        ))}
      </div>
      <button className="button" onClick={addScene}>
        Add Scene
      </button>
    </div>
  );
};

export default App;
