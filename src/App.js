import "./App.css";
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ResultSearch from "./components/ResultSearch/ResultSearch";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/video/:idVideo" element={<VideoPlayer />} />
      </Routes>
      <Routes>
        <Route path="/search/:value" element={<ResultSearch />} />
      </Routes>
    </Router>
  );
};

export default App;

// AIzaSyD6ZWokTjJyKt77Ximc2dqD9FbBJb2PwU8
// AIzaSyBz6DPYH43Ph-nP7GeER2LoXjtGgfBMh90
// AIzaSyA_V6e16LlaK7sijU9M18UV3BOq26QJ510
// AIzaSyDtmJY38XxFTXpLYiEcR297PH8sASGQ5qY
