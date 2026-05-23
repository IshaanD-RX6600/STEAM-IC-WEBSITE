/* shared.jsx — small utility components used across the site */

const { useState, useEffect, useRef, useMemo, useLayoutEffect } = React;

/* ---------- useTweaks-like access to defaults (read-only fallback) ---------- */
function readDefaults() {
  return Object.assign({
    accent: "#b00020",
    livery: "white",
    showGrid: false,
    animationSpeed: 1.0,
    torontoLine: "yonge",
  }, window.__NEXRAIL_DEFAULTS__ || {});
}

/* ---------- Section wrapper with intersection observer ---------- */
function Section({ id, tone = "paper", children, label, screenLabel }) {
  return (
    <section
      id={id}
      className={`section section--${tone}`}
      data-screen-label={screenLabel || label || id}
    >
      <div className="container">{children}</div>
    </section>
  );
}

/* ---------- Section header ---------- */
function SectionHead({ num, label, title, em }) {
  return (
    <div className="section-head">
      <div className="num">
        <span className="accent">§ {num}</span>
        <br />
        {label}
      </div>
      <h2>
        {title}
        {em ? <> <span className="em">{em}</span></> : null}
      </h2>
    </div>
  );
}

/* ---------- Eyebrow ---------- */
function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="dot" />
      {children}
    </div>
  );
}

/* ---------- Spec strip cell ---------- */
function SpecCell({ label, value, unit, footnote }) {
  return (
    <div className="cell">
      <div className="label">{label}</div>
      <div className="value">
        {value}
        {unit ? <span className="unit">{unit}</span> : null}
      </div>
      {footnote ? <div className="tiny" style={{ marginTop: 6 }}>{footnote}</div> : null}
    </div>
  );
}

/* ---------- Animated number ---------- */
function CountUp({ to, suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = null;
    let raf = 0;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ---------- Schematic block ---------- */
function Schematic({ id, title, status = "INTERACTIVE", children, style }) {
  return (
    <div className="schematic" style={style}>
      <div className="schematic-head">
        <span>{id} — {title}</span>
        <span className="right">{status}</span>
      </div>
      {children}
    </div>
  );
}

/* ---------- Pulsing dot ---------- */
function PulseDot({ color = "var(--accent)", size = 8 }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size, height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 0 0 ${color}`,
        animation: "pulse 1.8s infinite",
        verticalAlign: "middle",
      }}
    />
  );
}

/* ---------- Mark (small NexRail mark) ---------- */
function Mark({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden>
      {/* N glyph stylized as a track + train profile */}
      <rect x="0.5" y="0.5" width="17" height="17" stroke={color} strokeWidth="1" rx="1" />
      <path d="M3.5 13.5 L3.5 4.5 L8 11 L8 4.5 L14.5 4.5" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="square" />
      <circle cx="14.5" cy="13.5" r="1" fill="var(--accent)" />
    </svg>
  );
}

/* ---------- Logotype ---------- */
function NexRailLogo({ size = 22, color = "var(--ink)" }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      color: color,
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      fontSize: size * 0.55,
    }}>
      <Mark size={size} color={color} />
      <span>NEXRAIL</span>
    </div>
  );
}

/* ---------- exports ---------- */
Object.assign(window, {
  readDefaults, Section, SectionHead, Eyebrow,
  SpecCell, CountUp, Schematic, PulseDot, Mark, NexRailLogo,
});
