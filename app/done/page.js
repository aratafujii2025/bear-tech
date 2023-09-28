"use client"

import React, {useContext} from 'react';
import { useRouter} from 'next/navigation';
import './page.css';
import {TextContext} from '../start/page';
import {URLContext, GPTContext} from '../upload/page';

function DonePage() {

  const router = useRouter();
  const scriptInput = useContext(TextContext); 
  // const gptMessage = useContext(GPTContext);
  // const urlLink = useContext(URLContext);
  console.log("1");
  console.log(TextContext);

  function backToTop(){
    router.push('/');
  }

  function handleDownload() {
    const link = document.createElement('a');
    //link.href = urlLink; // Assuming urlLink is a direct link to the WAV file
    link.download = 'downloaded_audio.wav'; // Specify the desired file name with .wav extension
    link.style.display = 'none'; // Hide the link
    document.body.appendChild(link); // Append the link to the document's body
    link.click();
    document.body.removeChild(link); // Remove the link from the document
  }
  
  
  return (
    <><div className="root"></div>
    <div className="donetitle">変換完了</div>
    <div className="downloadBox">
      <div className="downloadboxTitle">変換完了</div>
      <div className="downloadMessage">あなたのアップロードした音声から、連発、難発、伸発を取り除きました。以下のボタンからダウンロードしてください。</div>

      </div>
    <div className="advicebox">
      <div className="heading">AI からのメッセージ：</div>
      {/* <div className="advice">{gptMessage}</div>  */}
    </div>
    <button className="backtotop" onClick={backToTop}>
        <div className="backtotoptext">トップへ戻る</div>
      </button>
      <button className="downloadButton">
        <div className="downloadtext" onClick={handleDownload}>音声をダウンロード</div>
      </button>
      </> 
  );
}

export default DonePage;