import {useState} from "react";
import './App.css';

import Input from "./components/Input/Input";
import Game from "./components/Game/Game";

function App() {
  const [matrixLength, setMatrixLength] = useState(3)

  const onChange = (evt)=>{
    setMatrixLength(evt.target.value)
  }

  return (
    <div className="App">
      <Input value={matrixLength} onChange={onChange}/>
      <Game matrixLength={matrixLength}/>
    </div>
  );
}

export default App;
