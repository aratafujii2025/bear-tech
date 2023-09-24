import React from 'react';
import './DonePage.css';


function DonePage() {

  const router = useRouter();

  function backToTop(){
    router.push('/');
  }

  
  return (
    <><div className="root"></div>
    <div className="donetitle">変換完了</div>
    <div className="soundelements">
        <div className="rectangle2"></div>
        <div className="rectangle3"></div>
        <div className="listen1">変換された音声の試聴</div>
        <div className="listen2">変換前の音声</div>
        <div className="time">1:40</div>
        <div className="time2">1:40</div>
      </div>
    <div className="advicebox">
      <div className="heading">AI からのメッセージ：</div>
      <div className="advice">
        ほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほにゃららほ
      </div>
      <div className="scroll">
      </div>
    </div>
    <button className="backtotop" onClick={backToTop}>
        <div className="backtotoptext">トップへ戻る</div>
      </button>
      <button className="downloadvoice">
        <div className="downloadtext">音声をダウンロード</div>
      </button></> 
  );
}

export default DonePage;