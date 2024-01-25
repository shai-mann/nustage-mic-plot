// SceneComponent.tsx
import React, { useState } from "react";
import "./SceneComponent.css";
import { Scene } from "../App";

interface SceneComponentProps {
  scene: Scene;
  onSceneChange: (scene: Partial<Scene>) => void;
}

const SceneComponent: React.FC<SceneComponentProps> = ({
  scene,
  onSceneChange,
}) => {
  const [actorName, setActorName] = useState("");
  const [editable, setEditable] = useState(false);
  const [editedSceneName, setEditedSceneName] = useState(scene.name);

  const createHandleKeyDown = (func: () => void) => {
    return (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        func();
      }
    };
  };

  const handleAddActor = () => {
    if (actorName.trim() !== "") {
      onSceneChange({ actors: scene.actors.concat(actorName) });
      setActorName("");
    }
  };

  const handleDeleteActor = (actor: string) => {
    onSceneChange({ actors: scene.actors.filter((a) => a !== actor) });
  };

  const handleToggleEdit = () => {
    setEditable(!editable);
  };

  const handleSceneNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSceneName(e.target.value);
  };

  const handleEditSceneName = () => {
    onSceneChange({ name: editedSceneName });
    setEditable(false);
  };

  return (
    <div className="component">
      <div className="scene-title" onClick={handleToggleEdit}>
        {editable ? (
          <input
            type="text"
            value={editedSceneName}
            onChange={handleSceneNameChange}
            onBlur={handleEditSceneName}
            onKeyDown={createHandleKeyDown(handleEditSceneName)}
            autoFocus
          />
        ) : (
          scene.name
        )}
      </div>
      <div className="actor-list">
        {scene.actors.map((actor) => (
          <div key={actor} className="actor-tag">
            {actor}
            <button
              onClick={() => handleDeleteActor(actor)}
              className="delete-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={actorName}
        onChange={(e) => setActorName(e.target.value)}
        onKeyDown={createHandleKeyDown(handleAddActor)}
        placeholder="Add actor"
        className="actor-input"
      />
    </div>
  );
};

export default SceneComponent;
