import { useEffect, useRef, useState } from "react";
import {
  SIR_NAME,
  BATCH,
  STUDENTS,
  STUDENT_NAME,
  REASONS,
  NO_MESSAGES,
  PROMISES,
} from "./config";

const STEPS = 4;

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const s = localStorage.getItem("theme");
      if (s) return s;
    } catch {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function Confetti() {
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 2.5,
    dur: 3 + Math.random() * 3,
    color: ["#818cf8", "#34d399", "#fb7185", "#fbbf24", "#38bdf8"][i % 5],
    size: 6 + Math.random() * 8,
    rot: Math.random() * 360,
  }));
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.size,
            height: p.size * 1.6,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function Intro({ next }) {
  const words = "Sir, amader ekta chhoto request achhe.".split(" ");
  return (
    <section className="page intro">
      <div className="intro-main">
        <p className="tag">Webskitters Academy · {BATCH}</p>
        <h1 className="hero">
          {words.map((w, i) => (
            <span
              className="word"
              key={i}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              {w}&nbsp;
            </span>
          ))}
        </h1>
        <p className="lead">
          Amader placement howar age porjonto jodi week-e at least 2 ta kore
          class conduct kora jeto, tahole amader jonno khub helpful hoto Ete
          amader regular revision-o hoye jeto and concepts-gulo practice-e rakha
          possible kore din sir ..
        </p>
        <button className="btn primary" onClick={next}>
          Proposal ta dekhi
        </button>
      </div>
      <aside className="glass side">
        <span className="side-label">Request from</span>
        {STUDENTS.map((n) => (
          <div className="person" key={n}>
            <span className="avatar">
              {n
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </span>
            <span className="pname">{n}</span>
          </div>
        ))}
        <span className="side-foot">{BATCH}</span>
      </aside>
    </section>
  );
}

function Why({ next }) {
  return (
    <section className="page">
      <h2>Kano ei class dorkar?</h2>
      <div className="grid">
        {REASONS.map((r, i) => (
          <article
            className="glass card"
            key={i}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
      <button className="btn primary" onClick={next}>
        Amader Proposal
      </button>
    </section>
  );
}

function Ask({ yes }) {
  const stage = useRef(null);
  const noRef = useRef(null);
  const [pos, setPos] = useState(null);
  const [tries, setTries] = useState(0);

  const dodge = () => {
    const s = stage.current,
      b = noRef.current;
    if (!s || !b) return;
    const sr = s.getBoundingClientRect(),
      br = b.getBoundingClientRect();
    setPos({
      x: Math.random() * (sr.width - br.width),
      y: Math.random() * (sr.height - br.height),
    });
    setTries((t) => t + 1);
  };
  const onMove = (e) => {
    const r = noRef.current?.getBoundingClientRect();
    if (!r) return;
    if (
      Math.hypot(
        e.clientX - (r.left + r.width / 2),
        e.clientY - (r.top + r.height / 2),
      ) < 90
    )
      dodge();
  };

  const scale = Math.min(1 + tries * 0.08, 1.7);
  const msg = NO_MESSAGES[Math.min(tries, NO_MESSAGES.length - 1)];

  return (
    <section className="page">
      <p className="tag">Proposal</p>
      <h2 className="big">Sir, class ta din amader</h2>
      <ul className="terms">
        <li>
          Week e <b>2 ta</b> class
        </li>
        <li>
          Jotodin na <b>placement</b> hoy
        </li>
        <li>Timing apnar suvidha moto</li>
      </ul>
      <p className="msg" aria-live="polite">
        {tries > 0 ? msg : `${SIR_NAME}, apnar uttor?`}
      </p>
      <div className="glass stage" ref={stage} onPointerMove={onMove}>
        <button
          className="btn yes"
          style={{ transform: `scale(${scale})` }}
          onClick={yes}
        >
          Yes 💙
        </button>
        <button
          ref={noRef}
          className="btn no"
          tabIndex={-1}
          style={pos ? { position: "absolute", left: pos.x, top: pos.y } : {}}
          onPointerEnter={dodge}
          onPointerDown={(e) => {
            e.preventDefault();
            dodge();
          }}
          onFocus={(e) => {
            e.target.blur();
            dodge();
          }}
          onClick={(e) => e.preventDefault()}
        >
          No
        </button>
      </div>
    </section>
  );
}

function Thanks() {
  return (
    <section className="page center thanks">
      <Confetti />
      <div className="glass thanks-card">
        <div className="ring">
          <svg viewBox="0 0 52 52" width="64" height="64" aria-hidden="true">
            <path
              className="tick"
              d="M14 27 l8 8 l16 -17"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <span className="stamp">Deal confirmed</span>
        <h1 className="hero small">Thank you, {SIR_NAME}!</h1>
        <p className="lead">
          Apnar support amader kache onek boro.Thanks Again
        </p>
        <div className="promises">
          {PROMISES.map((p, i) => (
            <div
              className="promise"
              key={i}
              style={{ animationDelay: `${0.9 + i * 0.15}s` }}
            >
              <b>{p.k}</b>
              <span>{p.t}</span>
            </div>
          ))}
        </div>
        <div className="signs">
          {STUDENTS.map((n) => (
            <span className="sign" key={n}>
              {n}
            </span>
          ))}
        </div>
        <p className="foot">
          {STUDENT_NAME} · {BATCH} · Webskitters Academy
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [theme, toggle] = useTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <main>
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <button
        className="glass theme-btn"
        onClick={toggle}
        aria-label="Toggle light and dark mode"
      >
        {theme === "dark" ? "☀ Light" : "☾ Dark"}
      </button>
      <div className="dots" aria-hidden="true">
        {Array.from({ length: STEPS }, (_, i) => (
          <i key={i} className={i <= step ? "on" : ""} />
        ))}
      </div>
      <div className="wrap" key={step}>
        {step === 0 && <Intro next={() => setStep(1)} />}
        {step === 1 && <Why next={() => setStep(2)} />}
        {step === 2 && <Ask yes={() => setStep(3)} />}
        {step === 3 && <Thanks />}
      </div>
    </main>
  );
}
