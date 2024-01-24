// SceneComponent.tsx
import React, { useState } from 'react';
import './SceneComponent.css';

interface SceneComponentProps {
  scene: { number: number; actors: string[] };
  onAddActor: (actorName: string) => void;
}

const SceneComponent: React.FC<SceneComponentProps> = ({ scene, onAddActor }) => {
  const [actorName, setActorName] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddActor();
    }
  };

  const handleAddActor = () => {
    if (actorName.trim() !== '') {
      onAddActor(actorName);
      setActorName('');
    }
  };

  return (
    <div className="component">
      <h2 className="scene-title">Scene {scene.number}</h2>
      <p className="actor-list">{scene.actors.join(', ')}</p>
      <input
        type="text"
        value={actorName}
        onChange={(e) => setActorName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add actor"
        className="actor-input"
      />
    </div>
  );
};

export default SceneComponent;
