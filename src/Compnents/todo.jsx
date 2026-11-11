
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
    } catch (err) {
      console.log('Audio error:', err);
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Audio error:', err);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="container">
      <audio ref={audioRef} src="/song.mpeg" loop preload="auto" />

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 50%, #a18cd1 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
          position: relative;
          padding: 20px;
        }

        .heart-bg {
          position: absolute;
          font-size: 24px;
          animation: floatUp 6s infinite ease-in;
          opacity: 0.7;
          user-select: none;
        }

        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }

        .magic-btn {
          padding: 18px 40px;
          font-size: 22px;
          font-weight: bold;
          color: #ff2a5f;
          background: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          animation: pulse 1.5s infinite;
          transition: transform 0.3s;
          z-index: 10;
        }

        .magic-btn:hover {
          transform: scale(1.08);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }

        .card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 30px;
          padding: 35px 25px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 10;
        }

        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .photo-frame {
          width: 200px;
          height: 200px;
          margin: 0 auto 20px;
          border-radius: 50%;
          padding: 6px;
          background: linear-gradient(45deg, #ff0844, #ffb199, #ff0844);
          box-shadow: 0 10px 25px rgba(255, 8, 68, 0.4);
        }

        .photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid white;
        }

        .title {
          font-size: 32px;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
          margin-bottom: 12px;
        }

        .title-heart {
          display: inline-block;
          animation: heartbeat 0.8s infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          40% { transform: scale(1); }
          60% { transform: scale(1.3); }
        }

        .message {
          font-size: 17px;
          color: #fff;
          line-height: 1.6;
          font-weight: 500;
          text-shadow: 0 1px 5px rgba(0,0,0,0.15);
          margin-bottom: 20px;
        }

        .music-btn {
          padding: 10px 22px;
          font-size: 15px;
          font-weight: bold;
          color: #ff2a5f;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 25px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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

          <h1 className="title">
            I <span className="title-heart">❤️</span> Sahiba
          </h1>

          <p className="message">
            तुम मेरी दुनिया की सबसे खूबसूरत खुशी हो।
            तुम्हारी एक मुस्कान मेरा पूरा दिन बना देती है।
            हमेशा मेरे साथ रहना! 💖✨
          </p>

          <button className="music-btn" onClick={toggleMusic}>
            {isPlaying ? '⏸️ गाना रोकें' : '🎶 Play Our Song ❤️'}
          </button>
        </div>
      )}
    </div>
  );
}
