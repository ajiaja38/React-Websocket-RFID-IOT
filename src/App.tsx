import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { IPayloadRMQ } from "./types/interface/IPayload.rmq";
import { ResponseEntity } from "./types/interface/ResponseEntity";
import Swal from "sweetalert2";

function App() {
  const [data, setData] = useState<IPayloadRMQ[]>([]);

  useEffect((): (() => void) => {
    const socket = io("wss://presensi-service.lskk.co.id/");
    socket.on("connect", (): void => {
      console.log({ id: socket.id });
    });

    socket.on("rfid-payload", (data: IPayloadRMQ): void => {
      console.log("Received RFID data:", data);
      setData((prevState): IPayloadRMQ[] => [...prevState, data]);
    });

    socket.on(
      "response-user-85f335f1-c93b-4eb2-af31-66f29ff93b3d",
      (data: ResponseEntity) => {
        Swal.fire({
          title: "Notification",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    );

    return (): void => {
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
            <thead>
              <tr>
                <td>MAC</td>
                <td>ID</td>
                <td>Type</td>
              </tr>
            </thead>
            <tbody>
              {data
                .map((item, index: number) => (
                  <tr key={index}>
                    <td>{item.mac}</td>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
}

export default App;
