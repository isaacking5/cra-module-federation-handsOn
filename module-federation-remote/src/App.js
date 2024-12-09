import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import FaceDetectionWorkerModel from "./FaceDetectionWorkerModel";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const faceDetectionWorkerModel = new FaceDetectionWorkerModel();
    console.log(faceDetectionWorkerModel.place);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Remote Entry 1: {count}</span>
          <button onClick={() => setCount(count + 1)}>Add count</button>
        </a>
      </header>
    </div>
  );
}

export default App;
