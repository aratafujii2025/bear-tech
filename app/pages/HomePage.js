// Import the Link component from 'next/link'
import Link from 'next/link';
import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <>
      {/* Your component content */}
      <div className="homeAll">
        <div className="podcastSoundWaveWaveformPatter"></div>
        <div className="todoketai">届けたい声を</div>
        <div className="aI">AI でクリアに</div>
        <div className="unnamed2">
          <div className="textBlock">吃音症患者向け、連発・伸発・難発を取り除く音声変換</div>
          <div className="textBlock">録音体験をポジティブにするフィードバック</div>
        </div>
        {/* Use Link component to create a navigation link */}
        <Link href="/start">
          <a style={{ textDecoration: 'none' }}>
            <div className="startButton">
              <div className="startText">始める</div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
