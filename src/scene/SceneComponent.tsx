// SceneComponent.tsx
import React, { useState } from 'react';
import './SceneComponent.css';
import { Scene } from '../App';

interface SceneComponentProps {
  scene: Scene;
  onAddActor: (actorName: string) => void;
  onDeleteActor: (actorname: string) => void;
}

const SceneComponent: React.FC<SceneComponentProps> = ({ scene, onAddActor, onDeleteActor }) => {
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
      <h2 className="scene-title">{scene.name}</h2>
      <div className="actor-list">
        {scene.actors.map((actor) => (
          <div key={actor} className="actor-tag">
            {actor}
            <button onClick={() => onDeleteActor(actor)} className="delete-button">
              X
            </button>
          </div>
        ))}
      </div>
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
