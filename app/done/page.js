"use client"

import React, {useContext} from 'react';
import { useRouter} from 'next/navigation';
import './page.css';
import { TextContext } from '../start/page'; 

function DonePage() {

  const router = useRouter();
  const scriptInput = useContext(TextContext); 
  console.log("1");
  console.log(TextContext);

  function backToTop(){
    router.push('/');
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
      <div className="advice">
        ほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほ
      </div>
    </div>
    <button className="backtotop" onClick={backToTop}>
        <div className="backtotoptext">トップへ戻る</div>
      </button>
      <button className="downloadButton">
        <div className="downloadtext">音声をダウンロード</div>
      </button>
      </> 
  );
}

export default DonePage;