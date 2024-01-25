import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import { Scene } from "../App";
import "./MicPlot.css";
import { plot } from "./plot";

interface MicPlotProps {
  scenes: Scene[];
}

const MicPlot: React.FC<MicPlotProps> = ({ scenes }) => {
  const [numMics, setNumMics] = useState(1);

  const data = useMemo(() => {
    // Your algorithm to populate data based on scenes and numMicrophones
    // You can replace this with your actual logic
    const micPlot = plot(scenes, numMics);

    const updatedData = Array.from({ length: numMics }, (_, micIndex) => {
      const micRow: { [key: string]: string } = { mic: `Mic ${micIndex + 1}` };
      scenes.forEach((scene, sceneIndex) => {
        const person = micPlot[micIndex][sceneIndex];
        micRow[`scene${sceneIndex + 1}`] = person === null ? "" : person;
      });
      return micRow;
    });
    return updatedData;
  }, [scenes, numMics]);

  const columns = useMemo(() => {
    // Define the columns based on scenes
    const sceneColumns = scenes.map((_, sceneIndex) => ({
      Header: `Scene ${sceneIndex + 1}`,
      accessor: `scene${sceneIndex + 1}`,
    }));

    return [{ Header: "Mic", accessor: "mic" }, ...sceneColumns];
  }, [scenes]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="mic-plot">
      <h2>Mic Plot</h2>
      <div className="mic-controls">
        <label htmlFor="numMicrophones">Number of Mics:</label>
        <input
          type="number"
          id="numMicrophones"
          value={numMics}
          onChange={(e) => setNumMics(parseInt(e.target.value, 10))}
          min="1"
        />
      </div>
      <table {...getTableProps()} className="mic-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MicPlot;
