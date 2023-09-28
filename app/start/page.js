"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './page.css';

function StartPage() {
  const [scriptInput, setScriptInput] = useState(""); // State to store the user's input

  // Use the useRouter hook to access routing functionality
  const router = useRouter();

  // Handler function to update the input value
  const handleInputChange = (event) => {
    setScriptInput(event.target.value);
  };

  function handleNextPress() {
    if (scriptInput === "") {
      console.log("EMPTY");
      // TODO: Add error message in the UI displaying "no text has been inputted"
    } else {
      console.log(scriptInput);
      router.push('/upload');
    }
  }

  function handleSkipPress() {
    router.push('/upload');
  }

    return (
        <div className="root">
          <div className="inputTextOpt">台本を入力（任意）</div>
          <textarea
                className="textBox"
                placeholder="台本を入力してください"
                value={scriptInput} // Bind the value to the state
                onChange={handleInputChange} // Handle changes in the textarea
            />
              <button className="nextButton" onClick={handleNextPress}>
                <div className="next">次へ</div>
              </button>
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
      );
}

export default StartPage;
