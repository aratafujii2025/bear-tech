
import Link from 'next/link';
import React from 'react';
import './HomePage.css';

function HomePage() {
  return <>
    <div className="homeAll">
      <div className="podcastSoundWaveWaveformPatter" alt="multiple diagonal lines going across the screen"></div>
      <div className="todoketai">届けたい声を</div>
      <div className="aI">AI でクリアに</div>
      <div className="indentto">
        <div className="textBlock">吃音症患者向け、連発・伸発・難発を取り除く音声変換</div>
        <div className="textBlock">録音体験をポジティブにするフィードバック</div>
      </div>
      <Link href="/start" style={{ textDecoration: 'none' }}>
        <div className="startButton">
          <div className="startText">始める</div>
        </div>

      </Link>
    </div>
  </>;
}

export default HomePage;
