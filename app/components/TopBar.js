// Import the Link component from 'next/link'
import Link from 'next/link';
import React from 'react';
import './TopBar.css';

function TopBar() {
  return (
    <div className="TopBar">
     <div className="logopic"></div>
     <div className="companyname">
     <Link href="/" className="home" style={{ textDecoration: 'none' }}>
      べあてっく
      </Link>
      </div>
     <div className="frameback">
       {/* Use Link component to create navigation links */}
       <Link href="/" className="home" style={{ textDecoration: 'none' }}>
         ホーム
       </Link>
       <Link href="/contact" className="contact" style={{ textDecoration: 'none' }}>
         お問い合わせ
       </Link>
     </div>
    </div>
  );
}

export default TopBar;
