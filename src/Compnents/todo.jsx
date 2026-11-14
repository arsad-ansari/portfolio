
import React, { useState, useRef } from "react";
import "../App.css";
import gfPic from "../girlfriend.jpeg";

export default function Todo() {
  const [stage, setStage] = useState(0);
  const [opening, setOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const openGift = async () => {
    if (opening) return;

    setOpening(true);

    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (AudioContext) {
        const audio = new AudioContext();
        await audio.resume();

        [880, 1174].forEach((frequency, index) => {
          const oscillator = audio.createOscillator();
          const gain = audio.createGain();

          oscillator.type = "sine";
          oscillator.frequency.value = frequency;

          gain.gain.setValueAtTime(0.0001, audio.currentTime);
          gain.gain.exponentialRampToValueAtTime(
            0.08,
            audio.currentTime + 0.05 + index * 0.15
          );
          gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audio.currentTime + 0.7 + index * 0.15
          );

          oscillator.connect(gain);
          gain.connect(audio.destination);

          oscillator.start(audio.currentTime + index * 0.15);
          oscillator.stop(audio.currentTime + 0.9);
        });

        setTimeout(() => audio.close(), 1500);
      }
    } catch (error) {
      console.log("Gift sound error:", error);
    }

    setTimeout(() => {
      setStage(2);
      setOpening(false);
    }, 1800);
  };

  const playSong = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log("Song play error:", error);
      }
    }
  };

  return (
    <div className="love-page">
      <audio
        ref={audioRef}
        src="/song.mpeg"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="floating-hearts">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}>❤️</span>
        ))}
      </div>

      <div className="falling-petals">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i}>🌹</span>
        ))}
      </div>

      <main className="love-card">
        <div className="top-label">
          ✦ A LITTLE SURPRISE FOR YOU ✦
        </div>

        {stage === 0 && (
          <div className="welcome-screen">
            <div className="welcome-heart">❤️</div>

            <div className="small-heading">MADE WITH LOVE</div>

            <h1 className="welcome-message">
              Hey <span>Sahiba</span>!
            </h1>

            <p>
              Meri jaan, meri duniya... Aaj tumhare liye
              kuch bahut special hai.
            </p>

            <div className="welcome-flowers">
              🌹 💐 🌹
            </div>

            <button onClick={() => setStage(1)}>
              Meri jaan, yahan click karo ❤️
            </button>

            <p>Just for you, my love ❤️</p>
          </div>
        )}

        {stage === 1 && (
          <div className="gift-screen">
            <div className="small-heading">JUST FOR YOU</div>

            <h1>A Gift For My World</h1>

            <div className={`gift-scene ${opening ? "opening" : ""}`}>
              <div className="gift-rays"></div>
              <div className="gift-light">❤️</div>

              <div className="gift-box">
                <div className="gift-body">
                  <div className="gift-band"></div>
                  <div className="gift-bow">🎀</div>
                </div>

                <div className="gift-lid">
                  <div className="lid-band"></div>
                </div>
              </div>
            </div>

            <p className="gift-message">
              Meri jaan, tumhare liye ek chhota sa gift ❤️
            </p>

            <button onClick={openGift} disabled={opening}>
              {opening ? "Opening... ❤️" : "Jaan, apna gift kholo 🎁"}
            </button>
          </div>
        )}

        {stage === 2 && (
          <div className="photo-screen reveal">
            <div className="small-heading">MY WORLD</div>

            <h1>My Beautiful Sahiba ❤️</h1>

            <div className="photo-frame">
              <img src={gfPic} alt="Sahiba" />
            </div>

            <h3 className="photo-caption">
              My favourite person ❤️
            </h3>

            <p>
              Meri jaan, tum meri zindagi ki sabse khoobsurat
              khushi ho. ❤️
            </p>

            <button onClick={() => setStage(3)}>
              Meri jaan, ek baat suno 💗
            </button>
          </div>
        )}

        {stage === 3 && (
          <div className="letter-screen reveal">
            <div className="letter-icon">💌</div>

            <div className="small-heading">FROM MY HEART</div>

            <h2>Dear Sahiba...</h2>

            <div className="love-letter">
              <p className="letter-greeting">
                Meri pyaari Sahiba ❤️
              </p>

              <p>
                Tum meri zindagi ki sabse khoobsurat khushi ho.
              </p>

              <p>
                Tumhe apni zindagi mein paakar main bahut khush hoon.
              </p>

              <p>
                Moharram mein tumhari ek jhalak paane ka intezaar rehta tha.
              </p>

              <p>
                Tum sirf meri mohabbat nahi, meri jaan ho,
                meri poori duniya ho.
              </p>

              <p>
                Main chahta hoon ki tum hamesha khush raho
                aur muskurati raho.
              </p>

              <p>
                I Love You Forever! ❤️
              </p>

              <p className="letter-ending">
                Only Yours,
              </p>

              <p className="letter-sign">
                With All My Love ❤️
              </p>
            </div>

            <button onClick={() => setStage(4)}>
              Jaan, aakhri surprise dekho 💌
            </button>
          </div>
        )}

        {stage === 4 && (
          <div className="final-screen reveal">
            <div className="final-heart">❤️</div>

            <div className="small-heading">FOREVER & ALWAYS</div>

            <h1 className="final-message">
              I ❤️ Sahiba
            </h1>

            <h2>You Are My World</h2>

            <p>
              Meri jaan, meri duniya. Meri har khushi tumse hai.
              Forever & Always! ✨
            </p>

            <button onClick={playSong}>
              {isPlaying
                ? "Song Pause Karo ❤️"
                : "Jaan, ye song tumhare liye 🎶"}
            </button>

            <p>Made with all my love for you ❤️</p>
          </div>
        )}
      </main>

      <div className="footer-text">
        MADE WITH ❤️ FOR SAHIBA
      </div>
    </div>
  );
}
