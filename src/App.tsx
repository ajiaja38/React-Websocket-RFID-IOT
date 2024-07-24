import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { IPayloadRMQ } from "./types/interface/IPayload.rmq";
import { ResponseEntity } from "./types/interface/ResponseEntity";

function App() {
  const [data, setData] = useState<IPayloadRMQ[]>([]);

  useEffect(() => {
    const socket = io("wss://lab2.smartsystem.id/");
    socket.on("connect", () => {
      console.log({ id: socket.id });
    });

    socket.on("rfid-payload", (data: IPayloadRMQ) => {
      console.log("Received RFID data:", data);
      setData((prevState) => [...prevState, data]);
    });

    socket.on(
      "response-user-477b7302-38f7-40a3-b610-8e48af5a1e01",
      (data: ResponseEntity) => {
        console.log(data);
      }
    );

    return () => {
      socket.off("connect");
      socket.off("rfid-payload");
      socket.off("response-payload");
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Websocket</h1>
      <p>Please Scan Card in Machine to see your Information</p>
      <div className="card">
        {data.length ? (
          <table>
            <tr>
              <td>MAC</td>
              <td>ID</td>
              <td>Type</td>
            </tr>
            {data
              .map((item, index: number) => (
                <tr key={index}>
                  <td>{item.mac}</td>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                </tr>
              ))
              .reverse()}
          </table>
        ) : null}
      </div>
    </>
  );
}

export default App;
