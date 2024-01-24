// SceneComponent.tsx
import React, { useState } from 'react';
import './SceneComponent.css';

interface SceneComponentProps {
  scene: { number: number; actors: string[] };
  onAddActor: (actorName: string) => void;
}

const SceneComponent: React.FC<SceneComponentProps> = ({ scene, onAddActor }) => {
  const [actorName, setActorName] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
      <ul className="actor-list">
        {scene.actors.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul>
      <input
        type="text"
        value={actorName}
        onChange={(e) => setActorName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add actor"
        className="actor-input"
      />
    </div>
  );
};

export default SceneComponent;
