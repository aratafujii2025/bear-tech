"use client"

import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext } from 'react';
import './page.css';

// Create a context for the scriptInput state
const TextContext = createContext();

function StartPage() {
  const [scriptInput, setScriptInput] = useState(""); // State to store the user's input
  const [showEmptyTextError, setShowEmptyTextError] = useState(false); // State to control error message display

  const router = useRouter();

  const handleInputChange = (event) => {
    setScriptInput(event.target.value);
    // Hide the error message when the user starts typing again
    setShowEmptyTextError(false);
  };

  function handleNextPress() {
    if (scriptInput.trim() === "") {
      // If scriptInput is empty, show the error message
      setShowEmptyTextError(true);
    } else {
      console.log(scriptInput);
      router.push('/upload');
    }
  }

  function handleSkipPress() {
    router.push('/upload');
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
        
        {/* Conditionally render the error message */}
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

// Export the TextContext for other components to use

export { TextContext };
