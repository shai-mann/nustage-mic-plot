// MicPlot.tsx
import React, { useState, useEffect } from 'react';

interface MicPlotProps {
  scenes: { name: string; actors: string[] }[];
}

const MicPlot: React.FC<MicPlotProps> = ({ scenes }) => {
  const [numMicrophones, setNumMicrophones] = useState(1); // Initial number of microphones, you can set it accordingly
  const [micData, setMicData] = useState<string[][]>([]);

  // useEffect to update micData when scenes or numMicrophones change
  useEffect(() => {
    // Your algorithm to populate micData based on scenes and numMicrophones
    // You can replace this with your actual logic
    const updatedMicData = Array.from({ length: numMicrophones }, () =>
      scenes.map((scene) => (scene.actors.length > 0 ? scene.actors.join(', ') : ''))
    );
    setMicData(updatedMicData);
  }, [scenes, numMicrophones]);

  return (
    <div>
      <h2>Mic Plot</h2>
      <label htmlFor="numMicrophones">Number of Microphones:</label>
      <input
        type="number"
        id="numMicrophones"
        value={numMicrophones}
        onChange={(e) => setNumMicrophones(parseInt(e.target.value))}
      />
      <table>
        <thead>
          <tr>
            <th></th>
            {scenes.map((scene, index) => (
              <th key={index}>{scene.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {micData.map((micRow, micIndex) => (
            <tr key={micIndex}>
              <td>Mic {micIndex + 1}</td>
              {micRow.map((actorList, sceneIndex) => (
                <td key={sceneIndex}>{actorList}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MicPlot;
