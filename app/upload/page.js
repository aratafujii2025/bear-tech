"use client"

import React, { createContext, useState, useEffect, useContext} from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import { TextContext } from '../start/page';
import axios from 'axios' 

function UploadPage() {
  const router = useRouter();
  const fileTypes = ["WAV"];
  const [showEmptyFileError, setShowEmptyFileError] = useState(false); // State to control error message display
  const intended_text = useContext(TextContext);

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
      let original_text = "私の名前は斎藤佑樹です。よろしくお願いします。"
          let transcribed = "私のなな名前は斎藤ゆうきででです。よよよよろしくお願いします。"
          console.log(intended_text);
          const params = new FormData();
          const selectDom = document.getElementById("uploadButton").files[0];
          if(selectDom == null){
            console.log("empty");
          }
          params.append('uploadButton', selectDom);
          axios.post("/api/speechtotext", params)
            .then(function(response){
              console.log(response);
              const gsurl = response.data.data;
              axios.get("/api/speechtotext", {params: {url: gsurl}})
                .then(function(response){
                  transcribed = response.data.data;
                  console.log(transcribed);
                  axios.get("/api/openai", {params:{original: original_text, transcribed: transcribed}})
                    .then(function(response){
                      console.log(response);
                      const chat_gpt_response = response.data.data.message.content;
                    })
                    .catch(function(err){
                      console.log(err);
                    });
                })
                .catch(function(err){
                  console.log(err);
                })
            })
            .catch(function(err){
              console.log(err);
            })

          axios.post("/api/cleanvoice", params)
            .then(function(response){
              const url = response.data.data;
              console.log(url);
              const id = setInterval(function(){
                axios.get("/api/cleanvoice", {params: {url: url}})
                  .then(function(res){
                    if(res.data.data.status == "SUCCESS"){
                      clearInterval(id);
                      console.log(res.data.data.url);
                      const download_url = res.data.data.url;
                    }
                  })
                  .catch(function(err){
                    console.log(err)
                  })
                }
                , 5000)
              })
            .catch(function(err){
              console.log(err);
            })
      router.push('/done');
    }
  }
  
  return (
    <div>
      <div className="titletext">音声をアップロード</div>
      <div className="uploadbox">
        <div className="uploaddescription">
          <div className="uploadImage" alt="image of sound"></div>
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

// export { URLContext, GPTContext };

