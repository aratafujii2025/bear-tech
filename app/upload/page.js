"use client"

import React, { createContext, useState, useEffect, useContext} from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import './page.css';
import { TextContext } from '../start/page';
import axios from 'axios' 

function UploadPage() {

  //HERE!
  //Do what I did here to pass things to the next page.
  //check this for details https://nextjs.org/docs/app/api-reference/functions/use-search-params
  const searchParams = useSearchParams();
  const isSkipped = searchParams.has("skip");
  const original_text = searchParams.get("text");

  console.log(isSkipped);
  console.log(original_text);

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
      //TODO
      //Show a loading mask here
          let transcribed = "私のなな名前は斎藤ゆうきででです。よよよよろしくお願いします。"
          console.log(intended_text);
          const params = new FormData();
          const selectDom = document.getElementById("uploadButton").files[0];
          console.log(selectDom);
          if(selectDom == null){
            console.log("empty");
          }
          params.append('file', selectDom); // DO NOT CHANGE FROM 'file'
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

      //TODO
      //Make sure that the entire above code finishes running before running the router
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

