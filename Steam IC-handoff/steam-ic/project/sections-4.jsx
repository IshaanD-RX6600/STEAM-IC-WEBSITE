/* sections-4.jsx — Toronto deployment, Funding/Maintenance, Results & References */

/* ============================================================
   Toronto deployment map
   ============================================================ */

const TORONTO_LINES = {
  yonge: {
    name: "Yonge Spine",
    color: "var(--accent)",
    stations: [
      { x: 540, y: 70, label: "Richmond Hill" },
      { x: 540, y: 140, label: "Finch" },
      { x: 540, y: 200, label: "North York Centre" },
      { x: 540, y: 270, label: "Eglinton" },
      { x: 540, y: 350, label: "Bloor-Yonge" },
      { x: 540, y: 430, label: "Union", terminus: true },
    ],
    desc: "The arterial north-south route. Maglev between Richmond Hill and North York; light-rail handoff before Eglinton to handle the dense Yonge corridor.",
  },
  east: {
    name: "Lakeshore East",
    color: "#1e3a8a",
    stations: [
      { x: 540, y: 430, label: "Union" },
      { x: 660, y: 430, label: "Riverside" },
      { x: 780, y: 410, label: "Scarborough" },
      { x: 900, y: 380, label: "Pickering" },
      { x: 1020, y: 360, label: "Oshawa", terminus: true },
    ],
    desc: "Full maglev corridor along the 401 ROW. Union to Oshawa in 22 minutes — a quarter of the current GO Train time.",
  },
  west: {
    name: "Lakeshore West",
    color: "#1f8a5b",
    stations: [
      { x: 540, y: 430, label: "Union" },
      { x: 420, y: 440, label: "Exhibition" },
      { x: 300, y: 460, label: "Mississauga City Centre" },
      { x: 180, y: 470, label: "Oakville" },
      { x: 60, y: 480, label: "Hamilton", terminus: true },
    ],
    desc: "The flagship test corridor. Hamilton to Union in 18 minutes. Replaces ~150 cars per train run at peak.",
  },
  cross: {
    name: "Pearson Cross-Town",
    color: "#c98a14",
    stations: [
      { x: 60, y: 280, label: "Pearson Airport" },
      { x: 200, y: 280, label: "Etobicoke" },
      { x: 340, y: 280, label: "Black Creek" },
      { x: 540, y: 270, label: "Eglinton" },
      { x: 720, y: 240, label: "Don Mills" },
      { x: 900, y: 230, label: "Scarborough Centre", terminus: true },
    ],
    desc: "East-west cross-town with airport interchange. Light rail to retain station density; bypasses the perennially over-burdened 401.",
  },
};

function Toronto({ accent, activeLine = "yonge", onLineChange = () => {} }) {
  const [hover, setHover] = useState(null);
  const line = TORONTO_LINES[activeLine];

  return (
    <section id="toronto" className="section section--ink" data-screen-label="09 Toronto">
      <div className="container">
        <SectionHead num="08" label="Toronto deployment" title="Where it goes in the GTA," em="and how fast." />

        <div className="grid-2 mb-32" style={{ alignItems: "start" }}>
          <p className="body-l" style={{ color: "rgba(255,255,255,0.78)" }}>
            GO Transit already removes about 90,000 vehicles per day from GTA
            roads. NexRail's first four corridors are sized to take that further:
            elevated routes that don't compete for street-level land, fed by
            the existing GO and TTC interchanges at Union, Eglinton, and Bloor-Yonge.
          </p>
          <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
            {Object.entries(TORONTO_LINES).map(([k, v]) => (
              <button
                key={k}
                className="tog"
                data-on={activeLine === k}
                onClick={() => onLineChange(k)}
                style={{ borderColor: activeLine === k ? v.color : "rgba(255,255,255,0.2)", background: activeLine === k ? v.color : "rgba(255,255,255,0.05)", color: "#fff" }}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        <div className="toronto-map">
          <div className="flex-b mb-16">
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)" }}>FIG · G — GTA NETWORK PLAN · PHASE I</div>
            <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>1 : 250,000 (illustrative)</div>
          </div>

          <svg viewBox="0 0 1100 540" width="100%">
            <defs>
              <pattern id="lakePattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="5" x2="10" y2="5" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
              </pattern>
            </defs>

            {/* Lake Ontario */}
            <path d="M 0 480 Q 200 510, 400 490 T 1100 490 L 1100 540 L 0 540 Z" fill="#0a1a2e" />
            <rect x="0" y="480" width="1100" height="60" fill="url(#lakePattern)" />
            <text x="900" y="525" fontFamily="var(--font-mono)" fontSize="11" fill="rgba(255,255,255,0.3)" fontStyle="italic">Lake Ontario</text>

            {/* highway grid */}
            <g stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none">
              <line x1="0" y1="280" x2="1100" y2="280" />
              <line x1="540" y1="0" x2="540" y2="480" />
              <line x1="0" y1="180" x2="1100" y2="180" />
              <line x1="0" y1="380" x2="1100" y2="380" />
            </g>
            <text x="10" y="276" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.25)">401 / Hwy</text>
            <text x="544" y="14" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.25)">Yonge St</text>
            <text x="10" y="176" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.25)">Steeles</text>
            <text x="10" y="376" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.25)">Bloor</text>

            {/* All lines (dim, except active) */}
            {Object.entries(TORONTO_LINES).map(([k, v]) => {
              const active = k === activeLine;
              const opacity = active ? 1 : 0.18;
              return (
                <g key={k} opacity={opacity}>
                  <polyline
                    points={v.stations.map((s) => `${s.x},${s.y}`).join(" ")}
                    fill="none"
                    stroke={v.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {active && (
                    <polyline
                      points={v.stations.map((s) => `${s.x},${s.y}`).join(" ")}
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.2"
                      strokeDasharray="6 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.6"
                    >
                      <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.6s" repeatCount="indefinite" />
                    </polyline>
                  )}
                </g>
              );
            })}

            {/* Active line stations */}
            {line.stations.map((s, i) => (
              <g
                key={s.label}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                <circle cx={s.x} cy={s.y} r={s.terminus ? 10 : 7} fill="#0e0e10" stroke={line.color} strokeWidth="2" />
                {s.terminus && <circle cx={s.x} cy={s.y} r="4" fill={line.color} />}
                <text
                  x={s.x + 14}
                  y={s.y + 4}
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight={hover === i ? 600 : 400}
                  fill={hover === i ? "#fff" : "rgba(255,255,255,0.7)"}
                >
                  {s.label}
                </text>
              </g>
            ))}

            {/* Animated train along active line */}
            <AnimatedTrainOnLine stations={line.stations} color={line.color} />

            {/* Cardinal */}
            <g transform="translate(60, 40)" opacity="0.5">
              <text fontFamily="var(--font-mono)" fontSize="10" fill="#fff">N</text>
              <line x1="-2" y1="-12" x2="-2" y2="-2" stroke="#fff" strokeWidth="1" />
              <polygon points="-4,-10 0,-10 -2,-14" fill="#fff" />
            </g>
          </svg>

          <div className="grid-3 mt-24" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>SELECTED LINE</div>
              <div className="mt-8" style={{ fontSize: 22, color: "#fff", fontWeight: 500, letterSpacing: "-0.02em" }}>{line.name}</div>
              <p className="body-s mt-16" style={{ color: "rgba(255,255,255,0.7)" }}>{line.desc}</p>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>OPERATIONAL TARGET</div>
              <div className="grid mt-16" style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Stat k="Stations" v={String(line.stations.length)} />
                <Stat k="End-to-end" v={activeLine === "west" ? "18 min" : activeLine === "east" ? "22 min" : activeLine === "yonge" ? "16 min" : "24 min"} />
                <Stat k="Mode" v={activeLine === "cross" ? "Light rail" : "Hybrid"} />
                <Stat k="Phase" v="I" />
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>PROJECTED IMPACT (DAILY)</div>
              <div className="grid mt-16" style={{ gridTemplateColumns: "1fr", gap: 8 }}>
                <Stat k="Vehicle trips replaced" v="≈ 38,000" />
                <Stat k="CO₂ avoided" v="≈ 220 t / day" />
                <Stat k="Time saved · avg rider" v="34 min / day" />
              </div>
            </div>
          </div>
        </div>

        <p className="tiny mono mt-24" style={{ color: "rgba(255,255,255,0.4)" }}>
          STATIONS & ROUTES ARE ILLUSTRATIVE — they sketch a Phase-I deployment and would be refined with Metrolinx and the City of Toronto.
        </p>
      </div>
    </section>
  );
}

function AnimatedTrainOnLine({ stations, color }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      setT(((now - start) / 12000) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stations]);

  // segments
  const segs = [];
  for (let i = 0; i < stations.length - 1; i++) {
    segs.push({ from: stations[i], to: stations[i + 1] });
  }
  // find current position
  const seg = Math.floor(t * segs.length);
  const local = (t * segs.length) % 1;
  const s = segs[seg];
  if (!s) return null;
  const x = s.from.x + (s.to.x - s.from.x) * local;
  const y = s.from.y + (s.to.y - s.from.y) * local;
  // angle for rotation
  const angle = (Math.atan2(s.to.y - s.from.y, s.to.x - s.from.x) * 180) / Math.PI;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      <rect x="-18" y="-5" width="36" height="10" rx="5" fill="#fff" stroke={color} strokeWidth="1.4" />
      <rect x="-14" y="-1" width="28" height="2" fill={color} />
      <circle cx="14" cy="0" r="2.2" fill={color} />
      <circle r="14" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

/* ============================================================
   Funding + Maintenance
   ============================================================ */
function Funding({ accent }) {
  return (
    <section id="funding" className="section section--white" data-screen-label="10 Funding">
      <div className="container">
        <SectionHead num="09" label="Funding & Maintenance" title="The REM model," em="adapted." />

        <div className="grid-2 mb-48" style={{ alignItems: "start" }}>
          <p className="body-l">
            Montreal's REM proved a model: the Quebec government sold fare rights
            to CDPQ Infra, a public pension fund. Construction capital came from
            an institutional investor seeking long-term, low-risk yield — separated
            from the price riders actually pay at the turnstile.
          </p>
          <p className="body-m">
            NexRail takes the same approach. The highest-traffic corridor
            (Lakeshore West) gets built first, proves the system, and starts
            generating fare revenue while the rest is still under construction.
            Investors are paid from the long-tail of farebox; riders are
            insulated from the build cost.
          </p>
        </div>

        <Schematic id="FIG · H" title="Funding flow" status="REM-DERIVED">
          <FundingDiagram accent={accent} />
        </Schematic>

        <div className="grid-2 mt-48" style={{ alignItems: "start" }}>
          <div>
            <Eyebrow>Maintenance posture</Eyebrow>
            <h3 className="mt-16" style={{ fontSize: 26 }}>12&nbsp;hours running. 12&nbsp;hours maintenance.</h3>
            <p className="body-m mt-16">
              Individual trains operate on a 12-hour duty / 12-hour
              maintenance cycle. Zone-based scheduling takes one corridor
              section offline at low-traffic windows; backup parallel tracks
              keep service continuous.
            </p>
            <p className="body-m mt-16">
              The elevated maintenance walkway alongside every track has a
              dual purpose: worker access and emergency evacuation route.
              Stock parts come, in part, from retired car shells — the system
              is designed to recycle itself.
            </p>
          </div>

          <div className="card">
            <Eyebrow>Why hybrid is the financial decision</Eyebrow>
            <p className="body-m mt-16">
              The Shanghai Maglev cost ≈&nbsp;CAD&nbsp;$1.7&nbsp;billion for 30&nbsp;km.
              Reserving maglev for corridors where speed and noise actually
              matter, and using conventional light rail elsewhere, lands
              NexRail in a cost-competitive profile without surrendering the
              high-speed advantages where they count.
            </p>
            <div className="rule mt-24" />
            <ul className="numlist mt-24">
              <li><span className="n">01</span><div><h4>Inter-city corridors → maglev</h4><p className="body-s">Speed and noise penalties dominate.</p></div></li>
              <li><span className="n">02</span><div><h4>Urban core → light rail</h4><p className="body-s">Tight curves, dense stops, lower top speed acceptable.</p></div></li>
              <li><span className="n">03</span><div><h4>Single rolling stock</h4><p className="body-s">Same train, both modes — no fleet split.</p></div></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FundingDiagram({ accent }) {
  return (
    <svg viewBox="0 0 1000 280" width="100%">
      {/* boxes */}
      {[
        { x: 20, y: 100, w: 160, h: 80, t: "Provincial Govt.", s: "Grants fare rights · transit authority" },
        { x: 220, y: 100, w: 180, h: 80, t: "Equity Group", s: "Pension fund · long-term capital", emph: true },
        { x: 440, y: 100, w: 200, h: 80, t: "NexRail Construction Co.", s: "Builds + operates · phased rollout" },
        { x: 680, y: 20, w: 200, h: 60, t: "Phase I (Lakeshore West)", s: "Earliest fare revenue" },
        { x: 680, y: 100, w: 200, h: 60, t: "Phase II (Yonge / Cross)", s: "Once Phase I revenue proves model" },
        { x: 680, y: 180, w: 200, h: 60, t: "Phase III (full GTA)", s: "Backed by audited operating P&L" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.emph ? accent : "#fff"} stroke="var(--ink)" strokeWidth="1.2" />
          <text x={b.x + 12} y={b.y + 22} fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill={b.emph ? "#fff" : "var(--ink)"}>
            {b.t}
          </text>
          <text x={b.x + 12} y={b.y + 40} fontFamily="var(--font-mono)" fontSize="9" fill={b.emph ? "rgba(255,255,255,0.85)" : "var(--ink-mute)"}>
            {b.s}
          </text>
        </g>
      ))}

      {/* arrows */}
      {[
        { from: [180, 140], to: [220, 140], label: "fare rights" },
        { from: [400, 140], to: [440, 140], label: "construction capital" },
        { from: [640, 130], to: [680, 50], label: "phase 1" },
        { from: [640, 140], to: [680, 130], label: "phase 2" },
        { from: [640, 150], to: [680, 210], label: "phase 3" },
      ].map((a, i) => (
        <g key={i}>
          <line x1={a.from[0]} y1={a.from[1]} x2={a.to[0]} y2={a.to[1]} stroke={accent} strokeWidth="1.4" />
          <polygon
            points={`${a.to[0]},${a.to[1]} ${a.to[0] - 6},${a.to[1] - 3} ${a.to[0] - 6},${a.to[1] + 3}`}
            fill={accent}
          />
          <text
            x={(a.from[0] + a.to[0]) / 2}
            y={(a.from[1] + a.to[1]) / 2 - 6}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill={accent}
          >
            {a.label}
          </text>
        </g>
      ))}

      {/* return arrow: fare revenue back to equity */}
      <g>
        <path
          d="M 880 50 Q 950 50, 950 140 Q 950 230, 880 230 Q 600 230, 400 220 Q 320 215, 310 180"
          fill="none"
          stroke="var(--signal-green)"
          strokeWidth="1.4"
          strokeDasharray="6 6"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
        </path>
        <polygon points="310,180 316,176 316,184" fill="var(--signal-green)" />
        <text x="640" y="245" fontFamily="var(--font-mono)" fontSize="10" fill="var(--signal-green)">long-tail farebox returns capital to investors over 30+ yr</text>
      </g>
    </svg>
  );
}

/* ============================================================
   Results — by-the-numbers slate
   ============================================================ */
function Results({ accent }) {
  return (
    <section id="results" className="section section--paper" data-screen-label="11 Results">
      <div className="container">
        <SectionHead num="10" label="Results" title="What this train" em="actually does." />

        <div className="grid-3 results-grid" style={{ gap: 0, borderTop: "1px solid var(--rule-strong)" }}>
          {[
            { k: "GHG reduction", v: "≥ 90 %", d: "per passenger-km vs. private car. Higher on emissions-independent corridors." },
            { k: "Per-train daily replacement", v: "≈ 150 cars", d: "1 train · 200 passengers · displaces ≈150 single-occupancy vehicles." },
            { k: "Annual CO₂ avoided / corridor", v: "≈ 690 t", d: "≈ 4.6 t/yr·car × 150 cars × 365 trips × duty cycle." },
            { k: "Rail-density emissions effect", v: "1.75 – 6 %", d: "reduction in transport-sector emissions per 100% increase in rail density (IEA, 2023)." },
            { k: "Service uptime target", v: "99.99 %", d: "Zone-based maintenance + backup parallel routes." },
            { k: "Designed lifespan", v: "35 yr", d: "Recycled aluminum + composite shell; parts recycled as replacements." },
          ].map((r) => (
            <div key={r.k} style={{ padding: 28, borderRight: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{r.k}</div>
              <div className="mono" style={{ fontSize: 36, color: "var(--ink)", fontWeight: 600, marginTop: 12, letterSpacing: "-0.02em" }}>{r.v}</div>
              <div className="body-s mt-16" style={{ maxWidth: "32ch" }}>{r.d}</div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="grid-2 mt-48" style={{ alignItems: "start", gap: 64 }}>
          <div>
            <Eyebrow>Conclusion</Eyebrow>
            <h2 className="mt-16" style={{ fontSize: 44 }}>
              The technologies are proven.<br />
              The funding model exists.<br />
              <span className="em" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--ink-soft)" }}>
                All that's required is implementation.
              </span>
            </h2>
          </div>
          <div>
            <p className="body-l">
              NexRail isn't a moonshot. SCMaglev runs in Yamanashi. The L threads
              the Chicago Loop every six minutes. New York's third rail has powered
              subways for over a century. Tesla's regenerative braking ships
              in every car they make. REM is moving real Montrealers right now.
            </p>
            <p className="body-m mt-24">
              Combining these systems is an engineering job, not a research
              question. That's the part that makes NexRail buildable.
            </p>
          </div>
        </div>

        <div className="rule mt-48" />
        <div className="mt-48">
          <TopDownSVG accent={accent} />
          <p className="tiny mono mt-16" style={{ color: "var(--ink-mute)" }}>FIG · I — 4-CAR CONSIST · 100 M · CAPACITY ~864 PASSENGERS</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   References / footer
   ============================================================ */
function Refs() {
  const refs = [
    ["CDPQ Infra. (2023)", "REM project overview.", "rem.info/en/about/rem"],
    ["Central Japan Railway Co. (2023)", "SCMaglev technology overview.", "global.jr-central.co.jp/en/company/scmaglev"],
    ["European Environment Agency (2023)", "CO2 emissions: Rail vs Road.", "eea.europa.eu"],
    ["International Energy Agency (2023)", "Rail transport and CO2 emissions.", "iea.org"],
    ["Japan Railway & Transport Review (2022)", "Aerodynamics of high-speed rail vehicles.", "East Japan Railway Culture Foundation"],
    ["Metrolinx (2023)", "GO Expansion: Ridership & emissions impact.", "metrolinx.com"],
    ["New York MTA (2024)", "NYC subway third rail infrastructure.", "new.mta.info"],
    ["Qin et al. (2021)", "Energy regeneration in maglev systems.", "J. Rail Transport Planning & Mgmt 18, 100247"],
    ["Tesla, Inc. (2023)", "Regenerative braking technology.", "tesla.com"],
  ];
  return (
    <section id="refs" className="section section--paper" data-screen-label="12 References">
      <div className="container">
        <div className="rule mb-48" />
        <div className="grid-2" style={{ alignItems: "start" }}>
          <div>
            <Eyebrow>References</Eyebrow>
            <h2 className="mt-16" style={{ fontSize: 40 }}>The library this train is built on.</h2>
          </div>
          <div>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid var(--rule)" }}>
              {refs.map(([a, t, src], i) => (
                <li key={i} style={{ borderBottom: "1px solid var(--rule)", padding: "16px 0", display: "grid", gridTemplateColumns: "32px 1fr", gap: 12 }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.12em" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="mono" style={{ fontSize: 12, color: "var(--ink)" }}>{a}</div>
                    <div className="body-s">{t} <span style={{ color: "var(--ink-mute)" }}>· {src}</span></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="footer">
        <div>
          <NexRailLogo />
          <p className="body-s mt-24" style={{ maxWidth: "42ch" }}>
            A modular elevated hybrid maglev transit network. Built from
            technology that already exists. Presented to the STEAM Innovation
            Challenge at Cameron Heights C.I., May&nbsp;2026.
          </p>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Document</div>
          <div className="body-s mt-8">NexRail / Engineering Walk-through</div>
          <div className="tiny mt-8" style={{ color: "var(--ink-mute)" }}>v 0.4 · 2026-05-14</div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Tweak it</div>
          <div className="body-s mt-8">Use the Tweaks toggle in the toolbar to change accent colour, livery, animation speed, and active Toronto line.</div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Toronto, Funding, Results, Refs });
