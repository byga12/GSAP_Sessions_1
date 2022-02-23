import React, { useState } from "react";
import s from "./App.module.css";
import Carousel from "./Components/Carousel/Carousel";
import Textbar from "./Components/Textbar/Textbar";
import GlobalState from "./Context/Context";

function App() {
  const [text, setText] = useState("GSAP Sessions #1");

  return (
    <GlobalState.Provider value={{ text, setText }}>
      <div className={s.container}>
        <Textbar />
        <Carousel />
      </div>
    </GlobalState.Provider>
  );
}

export default App;
