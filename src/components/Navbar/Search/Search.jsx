import React, { useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  BsFillKeyboardFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const Search = () => {
  const [search, setSearch] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    // microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    // microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  return (
    <div className={cx("search")}>
      <div className={cx("input-search")}>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={search || transcript}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={cx("keyboard")}>
          <BsFillKeyboardFill fontSize={24} />
        </button>
      </div>
      <button className={cx("search-btn")}>
        <Link to={`/search/${search || transcript}`}>
          <AiOutlineSearch fontSize={24} style={{ justifyContent: "center" }} />
        </Link>
      </button>
      {!isListening && (
        <button
          className={cx("mic")}
          ref={microphoneRef}
          onClick={handleListing}
        >
          <BsFillMicFill fontSize={20} />
        </button>
      )}

      {isListening && (
        <div onClick={handleReset} className={cx("mic")}>
          <BsFillMicMuteFill fontSize={20} />
        </div>
      )}
    </div>
  );
};

export default Search;
