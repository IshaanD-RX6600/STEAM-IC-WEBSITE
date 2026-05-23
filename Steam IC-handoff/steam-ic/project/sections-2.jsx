/* sections-2.jsx — Propulsion (maglev mechanism), Power Loop, Transition Zone */

/* ============================================================
   Propulsion — SCMaglev-derived linear synchronous motor explainer
   ============================================================ */
function Propulsion({ accent, animationSpeed = 1 }) {
  const [playing, setPlaying] = useState(true);

  return (
    <section id="propulsion" className="section section--paper" data-screen-label="03 Propulsion">
      <div className="container">
        <SectionHead num="02" label="Track & Propulsion" title="A travelling magnetic wave," em="the train surfs it." />

        <div className="grid-2" style={{ alignItems: "start" }}>
          <div>
            <p className="body-l">
              On high-speed corridors NexRail uses Japan's SCMaglev pattern.
              Superconducting electromagnets in the bogies — cooled to −269&nbsp;°C
              and therefore loss-free — energise. The guideway's <em>null-flux
              coils</em> respond by inducing currents that lift the train ~10&nbsp;cm
              clear of the track, guide it laterally, and shove it forward via
              a linear synchronous motor (LSM).
            </p>
            <p className="body-m mt-24">
              No physical contact. No rolling friction. No track wear. The same
              LSM, run in reverse during braking, becomes a generator — feeding
              kinetic energy straight back into the third rail for nearby trains
              to consume.
            </p>
            <div className="grid mt-32" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Stat k="Levitation gap" v="100 mm" />
              <Stat k="LSM frequency" v="0 – 8.5 Hz" />
              <Stat k="Magnet coolant" v="Liquid He" />
              <Stat k="Regen recovery" v="17 – 30 %" footnote="Qin et al, 2021" />
            </div>
            <button
              className="tog mt-32"
              data-on={playing}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "⏸  pause animation" : "▶  play animation"}
            </button>
          </div>

          <Schematic id="FIG · B" title="LSM coil interaction" status={playing ? "▶ LIVE" : "❚❚ PAUSED"}>
            <LSMAnimation playing={playing} accent={accent} animationSpeed={animationSpeed} />
            <div className="tiny mono mt-16" style={{ color: "var(--ink-mute)" }}>
              ↑ red = traveling magnetic wave · blue = train's superconducting magnets · the wave drags the magnets forward
            </div>
          </Schematic>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v, footnote }) {
  return (
    <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 12 }}>
      <div className="tiny mono" style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>{k}</div>
      <div className="mono" style={{ fontSize: 22, marginTop: 6, letterSpacing: "-0.02em" }}>{v}</div>
      {footnote && <div className="tiny" style={{ marginTop: 4 }}>— {footnote}</div>}
    </div>
  );
}

function LSMAnimation({ playing, accent, animationSpeed }) {
  const [t, setT] = useState(0);
  const raf = useRef(0);
  const last = useRef(performance.now());
  useEffect(() => {
    if (!playing) return;
    const tick = (now) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT((v) => (v + dt * animationSpeed) % 1000);
      raf.current = requestAnimationFrame(tick);
    };
    last.current = performance.now();
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, animationSpeed]);

  // Wave phase
  const phase = (t * 60) % 80;

  return (
    <svg viewBox="0 0 600 340" width="100%">
      {/* Track structure */}
      <rect x="20" y="180" width="560" height="14" fill="#e0ddd3" />
      <line x1="20" y1="180" x2="580" y2="180" stroke="#cfcdc4" />

      {/* Null-flux coil grid */}
      <g>
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 30 + i * 40;
          // wave intensity at this coil
          const intensity = Math.max(0, Math.sin(((x - phase) / 80) * Math.PI * 2));
          const opacity = 0.15 + 0.85 * intensity;
          return (
            <g key={i}>
              <rect x={x - 12} y="80" width="24" height="80" fill="none" stroke="var(--rule-strong)" strokeWidth="1" />
              {/* coil active state */}
              <rect
                x={x - 10} y="82" width="20" height="76"
                fill={accent}
                opacity={opacity * 0.5}
              />
              <text x={x} y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-mute)">C{i + 1}</text>
            </g>
          );
        })}
        <text x="30" y="220" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)">NULL-FLUX COILS (guideway)</text>
      </g>

      {/* Train body riding above */}
      <g style={{ transform: "translateY(0)" }}>
        {/* magnet bank with vertical motion to show levitation gap */}
        <g style={{ transform: `translateY(${Math.sin(t * 4) * 1.2}px)` }}>
          {/* superconducting magnets */}
          {[0, 1, 2, 3].map((i) => {
            const cx = 180 + i * 60;
            return (
              <g key={i}>
                <rect x={cx - 22} y="22" width="44" height="40" fill="var(--maglev)" rx="2" />
                <text x={cx} y="46" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#fff" fontWeight="600">
                  {i % 2 === 0 ? "N" : "S"}
                </text>
              </g>
            );
          })}
          {/* train body outline */}
          <rect x="150" y="14" width="300" height="56" fill="none" stroke="var(--ink)" strokeWidth="1.2" rx="6" />
          <text x="160" y="11" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-mute)">SUPERCONDUCTING MAGNET BANK · 0 Ω · −269 °C</text>
        </g>

        {/* gap indicator */}
        <g>
          <line x1="145" y1="70" x2="145" y2="78" stroke={accent} strokeWidth="1" />
          <line x1="145" y1="74" x2="158" y2="74" stroke={accent} strokeWidth="1" />
          <text x="100" y="77" fontFamily="var(--font-mono)" fontSize="9" fill={accent}>100 mm GAP</text>
        </g>
      </g>

      {/* Wave indicator arrow */}
      <g>
        <line x1={30 + phase} y1="240" x2={30 + phase + 30} y2="240" stroke={accent} strokeWidth="2" />
        <polygon points={`${30 + phase + 30},240 ${30 + phase + 24},236 ${30 + phase + 24},244`} fill={accent} />
        <text x={30 + phase + 36} y="244" fontFamily="var(--font-mono)" fontSize="9" fill={accent}>WAVE FRONT</text>
      </g>

      {/* Force diagram */}
      <g transform="translate(20, 270)">
        <text fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" fontWeight="600">FORCE BUDGET</text>
        <g transform="translate(0, 14)">
          <rect x="0" y="0" width="120" height="10" fill={accent} />
          <text x="128" y="9" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">F_thrust</text>
          <rect x="0" y="14" width="100" height="10" fill="var(--maglev)" />
          <text x="108" y="23" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">F_lift</text>
          <rect x="0" y="28" width="40" height="10" fill="#888580" />
          <text x="48" y="37" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">F_drag (air only — no rolling friction)</text>
        </g>
      </g>
    </svg>
  );
}

/* ============================================================
   Power Loop — third rail + regen + solar
   ============================================================ */
function PowerLoop({ accent, animationSpeed = 1 }) {
  const [mode, setMode] = useState("regen"); // "draw" | "regen"

  return (
    <section id="power" className="section section--white" data-screen-label="04 Power">
      <div className="container">
        <SectionHead num="03" label="Power & Energy" title="One rail, two directions." em="Braking trains power accelerating ones." />

        <div className="grid-2" style={{ alignItems: "start" }}>
          <Schematic id="FIG · C" title="Bidirectional third-rail loop" status={mode === "regen" ? "REGEN → GRID" : "DRAW ← GRID"}>
            <PowerAnimation mode={mode} accent={accent} animationSpeed={animationSpeed} />
            <div className="flex gap-8 mt-16">
              <button className="tog" data-on={mode === "draw"} onClick={() => setMode("draw")}>
                Train accelerating · draws
              </button>
              <button className="tog" data-on={mode === "regen"} onClick={() => setMode("regen")}>
                Train braking · returns
              </button>
            </div>
          </Schematic>

          <div>
            <p className="body-l">
              An electrified rail runs alongside the running tracks. A
              spring-loaded contact shoe on the undercarriage slides along the
              energised rail, delivering 750&nbsp;V DC to the propulsion bank,
              the cabin, and the heated rail panels.
            </p>
            <p className="body-m mt-24">
              When the LSM brakes, it runs in reverse — it becomes a generator.
              Recovered current flows back through the same shoe into the same
              rail, immediately available to any other train accelerating on
              the corridor. The same trick NYC's subway has used for decades,
              now amplified by maglev efficiency at higher speeds.
            </p>
            <div className="grid mt-32" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Stat k="Bus voltage" v="750 V DC" />
              <Stat k="Regen window" v="17 – 30 %" footnote="of traction energy" />
              <Stat k="Solar offset" v="~6 – 9 %" footnote="HVAC + cabin lighting" />
              <Stat k="Heated rail" v="shared bus" footnote="prevents ice / 0 fuel" />
            </div>
          </div>
        </div>

        {/* Three-card subsystem strip */}
        <div className="grid-3 mt-48">
          <div className="card">
            <Eyebrow>Source</Eyebrow>
            <h3 className="mt-16" style={{ fontSize: 22 }}>Substation feed</h3>
            <p className="body-s mt-16">Trackside substations rectify grid AC to a stable 750&nbsp;V DC. Spaced every 1.6&nbsp;km — the NYC reference distance — so no train is ever further than a few seconds from a hot section of rail.</p>
          </div>
          <div className="card">
            <Eyebrow>Recovery</Eyebrow>
            <h3 className="mt-16" style={{ fontSize: 22 }}>Onboard buffer</h3>
            <p className="body-s mt-16">An 84&nbsp;kWh lithium pack catches regen spikes that the rail can't absorb instantly, and feeds them back during the next acceleration. Tesla's pattern, train-scaled.</p>
          </div>
          <div className="card">
            <Eyebrow>Trim</Eyebrow>
            <h3 className="mt-16" style={{ fontSize: 22 }}>Roof &amp; canopy solar</h3>
            <p className="body-s mt-16">Thin-film monocrystalline on car roofs, stations, and track shading covers. The train never relies on solar for propulsion — but it offsets the easy loads: HVAC, lighting, signage.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PowerAnimation({ mode, accent, animationSpeed }) {
  const [t, setT] = useState(0);
  const raf = useRef(0);
  const last = useRef(performance.now());
  useEffect(() => {
    const tick = (now) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT((v) => (v + dt * animationSpeed) % 100);
      raf.current = requestAnimationFrame(tick);
    };
    last.current = performance.now();
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [animationSpeed]);

  // direction of flow
  const dir = mode === "regen" ? -1 : 1;
  const offset = (t * 80 * dir) % 40;

  return (
    <svg viewBox="0 0 600 360" width="100%">
      {/* Sun & solar arrows */}
      <g>
        <circle cx="60" cy="40" r="14" fill="#f6c45a" />
        <g stroke="#f6c45a" strokeWidth="1.4">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const r1 = 16, r2 = 22;
            const rad = (a * Math.PI) / 180;
            return <line key={a} x1={60 + r1 * Math.cos(rad)} y1={40 + r1 * Math.sin(rad)} x2={60 + r2 * Math.cos(rad)} y2={40 + r2 * Math.sin(rad)} />;
          })}
        </g>
        <text x="86" y="44" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink-soft)">solar</text>
      </g>

      {/* Substation (left) */}
      <g>
        <rect x="20" y="200" width="80" height="80" fill="var(--ink)" />
        <text x="60" y="225" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#fff">SUBSTATION</text>
        <text x="60" y="240" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#fff">750 V DC</text>
        <text x="60" y="260" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="20" fill={accent} fontWeight="600">⚡</text>
      </g>

      {/* Train 1 (left, accelerating) */}
      <g transform="translate(160, 120)">
        <rect x="0" y="0" width="180" height="60" fill="#fff" stroke="var(--ink)" strokeWidth="1.2" rx="6" />
        <rect x="6" y="34" width="168" height="3" fill={accent} />
        <text x="90" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--ink)">N-01 → accel.</text>
        <text x="90" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)">120 km/h ▲</text>
        {/* contact shoe */}
        <rect x="40" y="70" width="100" height="6" fill="#3a3a3e" />
        <line x1="50" y1="60" x2="50" y2="70" stroke="#3a3a3e" strokeWidth="2" />
        <line x1="130" y1="60" x2="130" y2="70" stroke="#3a3a3e" strokeWidth="2" />
      </g>

      {/* Train 2 (right, braking) */}
      <g transform="translate(390, 120)">
        <rect x="0" y="0" width="180" height="60" fill="#fff" stroke="var(--ink)" strokeWidth="1.2" rx="6" />
        <rect x="6" y="34" width="168" height="3" fill={accent} />
        <text x="90" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--ink)">N-02 ← brake</text>
        <text x="90" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)">110 km/h ▼</text>
        <rect x="40" y="70" width="100" height="6" fill="#3a3a3e" />
        <line x1="50" y1="60" x2="50" y2="70" stroke="#3a3a3e" strokeWidth="2" />
        <line x1="130" y1="60" x2="130" y2="70" stroke="#3a3a3e" strokeWidth="2" />
      </g>

      {/* Third rail */}
      <g>
        <rect x="100" y="200" width="480" height="8" fill="#888580" />
        <text x="100" y="195" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)">THIRD RAIL · BIDIRECTIONAL BUS</text>

        {/* animated current dashes */}
        <line
          x1="100" y1="204" x2="580" y2="204"
          stroke={accent}
          strokeWidth="3"
          strokeDasharray="14 26"
          strokeDashoffset={offset}
          opacity="0.9"
        />
      </g>

      {/* Running rails (just visual) */}
      <g>
        <rect x="100" y="220" width="480" height="3" fill="#cfcdc4" />
        <rect x="100" y="232" width="480" height="3" fill="#cfcdc4" />
      </g>

      {/* Flow arrows */}
      <g>
        {mode === "draw" ? (
          <>
            <ArrowFlow x1="100" y="190" x2="240" label="DRAW · 1.8 MW" color={accent} />
          </>
        ) : (
          <>
            <ArrowFlow x1="570" y="190" x2="430" label="REGEN · 540 kW returned" color="var(--signal-green)" reverse />
            <ArrowFlow x1="380" y="190" x2="240" label="immediate re-use" color={accent} reverse />
          </>
        )}
      </g>

      {/* Heated rail panel below */}
      <g>
        <rect x="100" y="250" width="480" height="14" fill="#fbe7c8" />
        <g stroke="#c98a14" strokeWidth="0.8">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={108 + i * 16} y1="250" x2={112 + i * 16} y2="264" />
          ))}
        </g>
        <text x="108" y="278" fontFamily="var(--font-mono)" fontSize="9" fill="#c98a14">HEATED RAIL — shares 750 V bus · prevents ice in winter</text>
      </g>

      {/* Solar contribution arrow */}
      <g>
        <line x1="60" y1="60" x2="240" y2="115" stroke="#f6c45a" strokeWidth="1.4" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite" />
        </line>
        <text x="160" y="80" fontFamily="var(--font-mono)" fontSize="9" fill="#c98a14">offset · HVAC</text>
      </g>

      {/* Legend */}
      <g transform="translate(20, 310)">
        <rect x="0" y="0" width="14" height="6" fill={accent} />
        <text x="20" y="6" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">propulsion current</text>
        <rect x="160" y="0" width="14" height="6" fill="var(--signal-green)" />
        <text x="180" y="6" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">regenerated current</text>
        <rect x="340" y="0" width="14" height="6" fill="#f6c45a" />
        <text x="360" y="6" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">solar offset</text>
      </g>
    </svg>
  );
}

function ArrowFlow({ x1, y, x2, label, color, reverse }) {
  const dir = (+x2) > (+x1) ? 1 : -1;
  const ax = +x2;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth="1.4" />
      <polygon
        points={`${ax},${y} ${ax - dir * 6},${+y - 4} ${ax - dir * 6},${+y + 4}`}
        fill={color}
      />
      <text
        x={(+x1 + +x2) / 2}
        y={+y - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

/* ============================================================
   TransitionZone — animated wheel-deploy as train passes geo-fence
   ============================================================ */
function Transition({ accent, animationSpeed = 1 }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const raf = useRef(0);
  const last = useRef(performance.now());
  useEffect(() => {
    if (!playing) return;
    const tick = (now) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT((v) => (v + dt * animationSpeed * 0.12) % 1.0);
      raf.current = requestAnimationFrame(tick);
    };
    last.current = performance.now();
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, animationSpeed]);

  // train position x: 0..1 → 40..1080
  const trainX = 40 + t * 1040;
  // wheels deploy when train approaches/passes geo-fence at 580
  const fenceX = 580;
  const wheelDeploy = trainX > fenceX - 60; // wheels engage starting just before the fence
  // speed indicator: 280 km/h before, ramping down through transition, then 120 km/h after
  const speed = trainX < fenceX - 120
    ? 280
    : trainX < fenceX
      ? 280 - ((trainX - (fenceX - 120)) / 120) * 160
      : 120;

  return (
    <section id="transition" className="section section--paper" data-screen-label="05 Transition">
      <div className="container">
        <SectionHead num="04" label="Transition zone" title="Maglev to light rail," em="without anyone noticing." />

        <div className="grid-2 mb-32" style={{ alignItems: "start" }}>
          <p className="body-l">
            Below 150&nbsp;km/h, SCMaglev trains ride on retractable rubber
            wheels — exactly the pattern Japan already uses. NexRail reuses that
            mechanism at <em>transition zones</em>: short straight-and-level
            segments where the AI guides the train down to safe wheel speed,
            deploys the wheels, and hands off to the third rail for the rest
            of the run.
          </p>
          <p className="body-m">
            Transition zones are placed deliberately — high-speed maglev for
            inter-city corridors, light rail through dense urban cores where
            tight curves and noise concerns matter more than top speed. The
            handoff is invisible to passengers. They feel the same train.
          </p>
        </div>

        <Schematic id="FIG · D" title="Transition zone — animated" status={`▶ ${Math.round(speed)} km/h · ${wheelDeploy ? "WHEELS DOWN" : "MAGLEV"}`}>
          <svg viewBox="0 0 1200 280" width="100%">
            {/* Sky/scenery background line */}
            <line x1="0" y1="220" x2="1200" y2="220" stroke="var(--rule-strong)" strokeWidth="1" />

            {/* Maglev section (0 - 580) */}
            <g>
              <rect x="0" y="220" width="580" height="14" fill="#e0ddd3" />
              <g stroke="#cfcdc4" strokeWidth="0.6">
                {Array.from({ length: 30 }).map((_, i) => (
                  <line key={i} x1={i * 20} y1="225" x2={i * 20} y2="231" />
                ))}
              </g>
              <text x="20" y="252" fontFamily="var(--font-mono)" fontSize="10" fill="var(--maglev)">SCMAGLEV · null-flux coils · −269 °C</text>
            </g>

            {/* Geo-fence boundary */}
            <g>
              <line x1={fenceX} y1="40" x2={fenceX} y2="260" stroke={accent} strokeWidth="1" strokeDasharray="4 4" />
              <rect x={fenceX - 80} y="30" width="160" height="16" fill={accent} />
              <text x={fenceX} y="42" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#fff">GEO-FENCE · TRANSITION</text>
            </g>

            {/* Light rail section (580 - 1200) */}
            <g>
              <rect x="580" y="220" width="620" height="14" fill="#e7e4dc" />
              {/* sleepers */}
              <g fill="#a8a59c">
                {Array.from({ length: 20 }).map((_, i) => (
                  <rect key={i} x={590 + i * 30} y="232" width="14" height="6" />
                ))}
              </g>
              {/* third rail */}
              <rect x="580" y="216" width="620" height="3" fill="#888580" />
              <text x="600" y="252" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink-mute)">LIGHT RAIL · 3rd rail · steel-on-steel · 120 km/h</text>
            </g>

            {/* The train */}
            <g transform={`translate(${trainX - 220}, 130)`}>
              <path
                d="
                  M 0 30
                  C 20 30, 30 16, 50 10
                  C 70 4, 90 2, 110 2
                  L 380 2
                  C 396 2, 406 8, 406 18
                  L 406 70
                  L 30 70
                  C 12 70, 0 60, 0 48
                  Z
                "
                fill="#fff"
                stroke="var(--ink)"
                strokeWidth="1.2"
              />
              <rect x="100" y="14" width="280" height="18" fill="url(#windowGrad)" />
              <rect x="20" y="38" width="380" height="3" fill={accent} />
              <text x="200" y="56" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--ink)">NEXRAIL · N-01</text>

              {/* wheels - animate down */}
              <g style={{ transition: "transform 600ms cubic-bezier(.4,0,.2,1)", transform: wheelDeploy ? "translateY(0)" : "translateY(-10px)", opacity: wheelDeploy ? 1 : 0.0 }}>
                <circle cx="80" cy="86" r="10" fill="#1a1a1c" stroke="#3a3a3e" strokeWidth="1.4" />
                <circle cx="80" cy="86" r="4" fill="#5a5a5e" />
                <circle cx="160" cy="86" r="10" fill="#1a1a1c" stroke="#3a3a3e" strokeWidth="1.4" />
                <circle cx="160" cy="86" r="4" fill="#5a5a5e" />
                <circle cx="280" cy="86" r="10" fill="#1a1a1c" stroke="#3a3a3e" strokeWidth="1.4" />
                <circle cx="280" cy="86" r="4" fill="#5a5a5e" />
                <circle cx="360" cy="86" r="10" fill="#1a1a1c" stroke="#3a3a3e" strokeWidth="1.4" />
                <circle cx="360" cy="86" r="4" fill="#5a5a5e" />
              </g>

              {/* levitation glow when maglev */}
              {!wheelDeploy && (
                <g>
                  <ellipse cx="200" cy="84" rx="200" ry="6" fill="var(--maglev)" opacity="0.25">
                    <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1.2s" repeatCount="indefinite" />
                  </ellipse>
                </g>
              )}
            </g>

            {/* speed readout */}
            <g transform="translate(900, 60)">
              <rect x="0" y="0" width="220" height="60" fill="var(--ink)" />
              <text x="14" y="20" fontFamily="var(--font-mono)" fontSize="10" fill="rgba(255,255,255,0.6)">CURRENT SPEED</text>
              <text x="14" y="48" fontFamily="var(--font-mono)" fontSize="26" fontWeight="600" fill="#fff">{Math.round(speed)} <tspan fontSize="14" fill="rgba(255,255,255,0.6)">km/h</tspan></text>
              <rect x="14" y="52" width="192" height="3" fill="rgba(255,255,255,0.15)" />
              <rect x="14" y="52" width={Math.round((speed / 430) * 192)} height="3" fill={accent} />
            </g>
          </svg>

          <div className="flex gap-8 mt-16">
            <button className="tog" data-on={playing} onClick={() => setPlaying((p) => !p)}>{playing ? "⏸ pause" : "▶ play"}</button>
            <button className="tog" onClick={() => setT(0)}>↺ reset</button>
            <button className="tog" onClick={() => setT(0.4)}>jump to transition</button>
          </div>
        </Schematic>

        <div className="grid-3 mt-48">
          <NumberedCard n="01" title="Approach">
            AI receives the geo-fence trigger 1.2&nbsp;km out. Begins controlled
            deceleration via regenerative braking — energy flows back into the
            third rail behind the train.
          </NumberedCard>
          <NumberedCard n="02" title="Handoff">
            At 150&nbsp;km/h, retractable rubber wheels deploy. Magnetic
            levitation is gradually unloaded onto the wheels over a level,
            straight 200&nbsp;m segment. No torque on the bogies during the
            transfer.
          </NumberedCard>
          <NumberedCard n="03" title="Light rail mode">
            Train continues drawing power from the third rail via the contact
            shoe. Wheels carry the load. Quieter, slower, perfectly suited to
            the urban grid the train just entered.
          </NumberedCard>
        </div>
      </div>
    </section>
  );
}

function NumberedCard({ n, title, children }) {
  return (
    <div style={{ borderTop: "1px solid var(--rule-strong)", paddingTop: 16 }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)" }}>STEP {n}</div>
      <h4 style={{ fontSize: 19, marginTop: 8, marginBottom: 10 }}>{title}</h4>
      <p className="body-s">{children}</p>
    </div>
  );
}

Object.assign(window, { Propulsion, PowerLoop, Transition });
