"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

function UploadPage() {
  const router = useRouter();
  const fileTypes = ["WAV"];
  const [showEmptyFileError, setShowEmptyFileError] = useState(false); // State to control error message display


  useEffect(() => {
    const uploadButton = document.getElementById('uploadButton');
    const fileChosen = document.getElementById('file-chosen');


    uploadButton.addEventListener('change', function () {
      fileChosen.textContent = this.files[0].name;
      setShowEmptyFileError(false);
    });

    // Clean up event listener when the component unmounts
    return () => {
      uploadButton.removeEventListener('change', function () {
        fileChosen.textContent = this.files[0].name;
      });
    };
  }, []);


  function handleNextPress() {
    const fileChosen = document.getElementById('file-chosen');
    if (fileChosen.textContent === "No file chosen") {
      setShowEmptyFileError(true);
      // TODO: Add error message in the UI displaying "no audio has been inputted"
    } else {
      router.push('/done');
    }
  }
  
  

  return (
    <div>
      <div className="titletext">音声をアップロード</div>
      <div className="uploadbox">
        <div className="uploaddescription">
          <div className="uploadImage"></div>
          <div className="textBlock">編集したい音声ファイルを</div>
          <input type="file" id="uploadButton" accept=".wav" hidden/>
          <label for="uploadButton">アップロード<br></br></label>
          <span id="file-chosen">No file chosen</span>
        </div>
      </div>
      <div className="textBlock3">ファイルはwavフォーマットを使用してください</div>
      {showEmptyFileError && <div className="emptyfileerror">ファイルがアップロードされていません。</div>}
      <button className="changebutton" onClick={handleNextPress}>
        <div className="changetext">変換</div>
      </button>

    </div>

  );
};

export default UploadPage;

