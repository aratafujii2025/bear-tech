"use client"

import { useRouter } from 'next/navigation';
import React, { createContext, useState} from 'react';
import './page.css';


export const TextContext = createContext();
export const SkipContext = createContext();

function StartPage() {
  const [scriptInput, setScriptInput] = useState(""); // State to store the user's input
  const [showEmptyTextError, setShowEmptyTextError] = useState(false); // State to control error message display
  const [skipPressed, setSkipPressed] = useState(false);

  const router = useRouter();

  const handleInputChange = (event) => {
    setScriptInput(event.target.value);
    setShowEmptyTextError(false);
  };

  function handleNextPress() {
    if (scriptInput.trim() === "") {
      setShowEmptyTextError(true);
    } else {
      console.log(scriptInput);
      router.push("/upload?text="+scriptInput);
    }
  }

  function handleSkipPress() {
    setSkipPressed(true);
    router.push("/upload?skip=1");
  }

  return (
    <TextContext.Provider value={scriptInput}>
      <div className="root">
        <div className="inputTextOpt">台本を入力（任意）</div>
        <textarea
          className="textBox"
          placeholder="台本を入力してください"
          value={scriptInput}
          onChange={handleInputChange}
        />
        <button className="nextButton" onClick={handleNextPress}>
          <div className="next">次へ</div>
        </button>
        {showEmptyTextError && <div className="emptytexterror">台本が入力されていません。</div>}
        <div className="description2">
          <div className="textBlock">台本がない場合はスキップを選択してください。</div>
          <div className="textBlock2">
            <p className="labelWrapper"></p>
          </div>
          <div className="textBlock3">
            <p></p>
          </div>
        </div>
        <button className="skipButton" onClick={handleSkipPress}>
          <div className="skip">スキップ</div>
        </button>
      </div>
    </TextContext.Provider>
  );
}

export default StartPage;
