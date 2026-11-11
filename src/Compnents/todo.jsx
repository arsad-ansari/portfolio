
import React, { useState, useRef } from 'react';
import gfPic from '../girlfriend.jpeg';

export default function Todo() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleOpenSurprise = async () => {
    setShowSurprise(true);

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Song error:', error);
    }
  };

  const toggleMusic = async () => {
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="container">
      <audio ref={audioRef} src="/song.mpeg" loop />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ff758c, #ff7eb3, #a18cd1);
          font-family: Arial, sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }
        .magic-btn, .music-btn {
          padding: 15px 25px;
          border: none;
          border-radius: 30px;
          background: white;
          color: #ff2a5f;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
        }
        .card {
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(15px);
          border: 2px solid white;
          border-radius: 25px;
          padding: 30px 20px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          z-index: 2;
        }
        .photo-frame {
          width: 200px;
          height: 200px;
          margin: 0 auto 20px;
          border-radius: 50%;
          padding: 5px;
          background: #ff0844;
        }
        .photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid white;
        }
        .title {
          color: white;
          font-size: 28px;
          margin-bottom: 15px;
        }
        .message {
          color: white;
          font-size: 17px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .heart-bg {
          position: absolute;
          animation: floatUp 6s infinite ease-in;
          font-size: 25px;
        }
        @keyframes floatUp {
          from { transform: translateY(100vh); }
          to { transform: translateY(-100vh); }
        }
      `}</style>

      {['❤️', '💖', '💕', '🌹', '✨', '💗'].map((emoji, i) => (
        <span
          key={i}
          className="heart-bg"
          style={{
            left: `${15 + i * 14}%`,
            animationDelay: `${i * 0.9}s`
          }}
        >
          {emoji}
        </span>
      ))}

      {!showSurprise ? (
        <button className="magic-btn" onClick={handleOpenSurprise}>
          मेरी जान, यहाँ क्लिक करो ❤️
        </button>
      ) : (
        <div className="card">
          <div className="photo-frame">
            <img src={gfPic} alt="My Love" />
          </div>

          <h1 className="title">❤️ I Love You Jaan ❤️</h1>

          <p className="message">
            तुम मेरी दुनिया की सबसे खूबसूरत खुशी हो।
            तुम्हारी एक मुस्कान मेरा पूरा दिन बना देती है।
            हमेशा मेरे साथ रहना! 💖✨
          </p>

          <button className="music-btn" onClick={toggleMusic}>
            {isPlaying ? '⏸️ गाना रोकें' : '🎵 गाना चलाएं'}
          </button>
        </div>
      )}
    </div>
  );
}
