
import React, { useState, useRef } from "react";
import "../App.css";
import gfPic from "../girlfriend.jpeg";

export default function Todo() {
  const [stage, setStage] = useState(0);
  const [opening, setOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const openGift = () => {
    if (opening) return;

    setOpening(true);

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
          <section className="welcome-screen">
            <div className="welcome-heart">❤️</div>
            <p className="small-heading">MADE WITH LOVE</p>

            <h1>
              Hey <span>Sahiba</span>!
            </h1>

            <p className="welcome-message">
              Meri jaan, meri duniya...
              <br />
              Aaj tumhare liye kuch bahut special hai.
            </p>

            <div className="welcome-flowers">🌹 💐 🌹</div>

            <button onClick={() => setStage(1)}>
              Meri Jaan, Yahan Click Karo ❤️
            </button>

            <p className="bottom-note">
              A little piece of my heart, just for you.
            </p>
          </section>
        )}

        {stage === 1 && (
          <section className="gift-screen">
            <p className="small-heading">JUST FOR YOU</p>

            <h1>
              A Gift For <span>My World</span>
            </h1>

            <div className={`gift-scene ${opening ? "opening" : ""}`}>
              <div className="gift-rays">✨</div>
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
              A little gift filled with all my love.
            </p>

            <button onClick={openGift} disabled={opening}>
              {opening ? "Opening Your Gift... ✨" : "Jaan, Apna Gift Kholo 🎁"}
            </button>
          </section>
        )}

        {stage === 2 && (
          <section className="photo-screen reveal">
            <p className="small-heading">MY FAVOURITE PERSON</p>

            <h1>
              My Beautiful <span>Sahiba</span> ❤️
            </h1>

            <div className="photo-frame">
              <img src={gfPic} alt="Sahiba" />
              <div className="photo-caption">
                My favourite person ❤️
              </div>
            </div>

            <p className="welcome-message">
              Meri duniya ki sabse khoobsurat muskurahat.
            </p>

            <button onClick={() => setStage(3)}>
              Meri Jaan, Ek Baat Suno 💌
            </button>
          </section>
        )}

        {stage === 3 && (
          <section className="letter-screen reveal">
            <div className="letter-icon">💌</div>
            <p className="small-heading">A MESSAGE FROM MY HEART</p>

            <h1>
              Dear <span>Sahiba</span>...
            </h1>

            <div className="love-letter">
              <p className="letter-greeting">
                Meri pyaari Sahiba ❤️
              </p>

              Tum meri zindagi ki sabse khoobsurat
              khushi ho.

              tumhe apni zindagi main paakar main bahut khush hoon.

              Moharram main tumhari ek jhalak paane ka intezaar rehta tha.

              Tum sirf meri mohabbat nahi,
              meri jaan ho, meri poori duniya ho.

              Main chahta hoon ki tum hamesha
              khush raho aur muskurati raho.

              <p className="letter-ending">
                I Love You Forever! ❤️
              </p>

              <p className="letter-sign">
                Only Yours,
                <br />
                With All My Love ❤️
              </p>
            </div>

            <button onClick={() => setStage(4)}>
              Jaan, Aakhri Surprise Dekho 💖
            </button>
          </section>
        )}

        {stage === 4 && (
          <section className="final-screen reveal">
            <div className="final-heart">❤️</div>

            <p className="small-heading">MY FOREVER PERSON</p>

            <h1>
              I <span>❤️</span> Sahiba
            </h1>

            <h2>You Are My World</h2>

            <p className="welcome-message">
              Meri jaan, meri duniya.
              <br />
              Meri har khushi tumse hai.
              <br />
              Forever & Always! ✨
            </p>

            <button onClick={playSong}>
              {isPlaying ? "⏸️ Pause Our Song" : "Sahiba, Ye Song Tumhare Liye ❤️"}
            </button>

            <p className="bottom-note">
              Made with all my love, just for you ❤️
            </p>
          </section>
        )}
      </main>

      <div className="footer-text">
        MADE WITH ❤️ FOR SAHIBA
      </div>
    </div>
  );
}
