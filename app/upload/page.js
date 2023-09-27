"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // You can handle file upload logic here
      // For example, send the file to a server using Axios or fetch
      console.log('Uploading file:', selectedFile.name);
    } else {
      alert('Please select an MP3 file to upload.');
    }
  };

  function handleNextPress(){
     router.push('/done');
  }

  return (
    <div>
      <div className="titletext">音声をアップロード</div>
      <div className="uploadbox">
        <div className="uploaddescription">
          <div className="uploadImage"></div>
          <div className="textBlock">編集したい音声ファイルを</div>
          <div className="textBlock2">アップロード</div>
        </div>
      </div>
      <div className="textBlock3">ファイルはmp3フォーマットを使用してください</div>
      <button className="changebutton" onClick={handleNextPress}>
        <div className="changetext">変換</div>
      </button>
    </div>
  );
}

export default UploadPage;