/* main.jsx — orchestrator: top nav, chapter rail, sections in order, tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#b00020",
  "showGrid": false,
  "animationSpeed": 1.0,
  "torontoLine": "yonge",
  "showLabels": false,
  "tickerSpeed": 1.0
}/*EDITMODE-END*/;

const SECTIONS = [
  { id: "hero",          label: "Overview" },
  { id: "anatomy",       label: "Anatomy" },
  { id: "propulsion",    label: "Propulsion" },
  { id: "power",         label: "Power" },
  { id: "transition",    label: "Transition" },
  { id: "ai",            label: "AI Command" },
  { id: "accessibility", label: "Accessibility" },
  { id: "climate",       label: "Climate" },
  { id: "toronto",       label: "Toronto" },
  { id: "funding",       label: "Funding" },
  { id: "results",       label: "Results" },
  { id: "refs",          label: "References" },
];

function TopNav() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");
  return (
    <div className="topnav">
      <div className="brand">
        <Mark size={18} />
        <span>NEXRAIL</span>
        <span style={{ color: "var(--ink-mute)", marginLeft: 12, fontWeight: 400 }}>
          / Engineering walk-through
        </span>
      </div>
      <div className="meta">
        <div className="live"><span className="pulse" /> CCS LIVE</div>
        <div>TORONTO · {hh}:{mm}:{ss} EDT</div>
        <div>DOC v0.4</div>
      </div>
    </div>
  );
}

function ChapterRail() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose center is closest to the viewport center
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const best = visible.reduce((a, b) => {
          const ay = Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2);
          const by = Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2);
          return ay < by ? a : b;
        });
        if (best?.target?.id) setActive(best.target.id);
      },
      { threshold: [0.1, 0.5, 0.9] }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="chapter-rail">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          data-active={active === s.id}
          onClick={() => {
            const el = document.getElementById(s.id);
            if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
          }}
        >
          <span>{String(i + 1).padStart(2, "0")}</span>
          <span className="tick" />
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // grid background toggle
  useEffect(() => {
    document.body.classList.toggle("has-grid", !!t.showGrid);
    return () => document.body.classList.remove("has-grid");
  }, [t.showGrid]);

  // apply accent variable
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  return (
    <div className="page">
      <TopNav />
      <ChapterRail />

      <Hero accent={t.accent} showLabels={t.showLabels} />
      <Anatomy accent={t.accent} />
      <Propulsion accent={t.accent} animationSpeed={t.animationSpeed} />
      <PowerLoop accent={t.accent} animationSpeed={t.animationSpeed} />
      <Transition accent={t.accent} animationSpeed={t.animationSpeed} />
      <AICommand accent={t.accent} animationSpeed={t.tickerSpeed} />
      <Accessibility accent={t.accent} animationSpeed={t.animationSpeed} />
      <Climate accent={t.accent} />
      <Toronto accent={t.accent} activeLine={t.torontoLine} onLineChange={(v) => setTweak("torontoLine", v)} />
      <Funding accent={t.accent} />
      <Results accent={t.accent} />
      <Refs />

      <TweaksPanel title="NexRail · Tweaks">
        <TweakSection label="Visual" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#b00020", "#0a2540", "#1f8a5b", "#c98a14", "#0e0e10"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakToggle
          label="Engineering grid"
          value={t.showGrid}
          onChange={(v) => setTweak("showGrid", v)}
        />
        <TweakToggle
          label="Train dimensions on"
          value={t.showLabels}
          onChange={(v) => setTweak("showLabels", v)}
        />

        <TweakSection label="Motion" />
        <TweakSlider
          label="Animation speed"
          value={t.animationSpeed}
          min={0.25} max={2.5} step={0.05}
          unit="×"
          onChange={(v) => setTweak("animationSpeed", v)}
        />
        <TweakSlider
          label="Ticker speed"
          value={t.tickerSpeed}
          min={0.25} max={3} step={0.05}
          unit="×"
          onChange={(v) => setTweak("tickerSpeed", v)}
        />

        <TweakSection label="Toronto deployment" />
        <TweakSelect
          label="Active line"
          value={t.torontoLine}
          options={[
            { value: "yonge", label: "Yonge Spine" },
            { value: "east", label: "Lakeshore East" },
            { value: "west", label: "Lakeshore West" },
            { value: "cross", label: "Pearson Cross-Town" },
          ]}
          onChange={(v) => setTweak("torontoLine", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
