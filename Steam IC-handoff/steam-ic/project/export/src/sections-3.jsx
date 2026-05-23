/* sections-3.jsx — AI Central Command, Accessibility, Climate Adaptation */

/* ============================================================
   AI Central Command — mock dashboard
   ============================================================ */
function AICommand({ accent, animationSpeed = 1 }) {
  const [tick, setTick] = useState(0);
  const events = useRef([
    { ts: "06:42:11", ev: "Train N-12 dispatched · King St → Union", val: "ON-TIME", type: "ok" },
    { ts: "06:42:08", ev: "Wheelchair user detected · Bloor-Yonge platform 3", val: "RAMP DEPLOY", type: "ok" },
    { ts: "06:42:02", ev: "Wind speed advisory · Don Valley pylons", val: "27 km/h gust", type: "warn" },
    { ts: "06:41:58", ev: "Regen received · 642 kWh · N-07 braking", val: "+642 kWh", type: "ok" },
    { ts: "06:41:51", ev: "Door obstruction cleared · N-04 car 2", val: "RESOLVED", type: "ok" },
    { ts: "06:41:47", ev: "Speed reduction · ice forecast on track 4-N", val: "350 → 280", type: "warn" },
    { ts: "06:41:42", ev: "Solar yield peak · Etobicoke depot", val: "+1.4 MW", type: "ok" },
    { ts: "06:41:36", ev: "Maintenance zone 3 cleared", val: "GREEN", type: "ok" },
    { ts: "06:41:30", ev: "Emergency drill · Scarborough platform 2", val: "DRILL", type: "warn" },
    { ts: "06:41:22", ev: "Lightning strike Sec.18 · routed to backup", val: "REROUTED", type: "ok" },
  ]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800 / Math.max(animationSpeed, 0.1));
    return () => clearInterval(id);
  }, [animationSpeed]);

  const visibleEvents = events.current.slice(0, 8);

  return (
    <section id="ai" className="section section--ink" data-screen-label="06 AI Command">
      <div className="container">
        <SectionHead num="05" label="AI Central Command" title="One intelligence." em="The whole network." />

        <div className="grid-2 mb-32" style={{ alignItems: "start" }}>
          <p className="body-l" style={{ color: "rgba(255,255,255,0.78)" }}>
            The AI doesn't dispatch trains. It runs the network. Passenger flow,
            weather response, accessibility detection, maintenance routing,
            emergency coordination — all on one adaptive platform that grows
            alongside the cities it serves rather than aging out beside them.
          </p>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              <span className="dot" />OPERATIONAL DOMAINS
            </div>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                "Schedule + headway",
                "Weather + ice / wind",
                "Accessibility detection",
                "Emergency / 911",
                "Maintenance routing",
                "Regen balancing",
                "Solar yield",
                "Geo-fence transitions",
              ].map((d) => (
                <div key={d} className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  → {d}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dash">
          <div className="dash-bar">
            <div className="flex gap-12">
              <PulseDot color="var(--signal-green)" /> <span>NEXRAIL CCS · TORONTO LIVE</span>
            </div>
            <div className="right">
              <span>2026-05-14 · 06:42:14 EDT</span>
              <span>UPTIME 99.997 %</span>
              <span>NODES 18/18</span>
            </div>
          </div>

          <div className="grid-3" style={{ gap: 0 }}>
            {/* Live map panel */}
            <div className="panel">
              <div className="panel-h">NETWORK · LIVE</div>
              <NetworkMiniMap accent={accent} />
              <div style={{ marginTop: 10 }}>
                <div className="stat"><span className="k">Active trains</span><span className="v">42</span></div>
                <div className="stat"><span className="k">In transit</span><span className="v">38</span></div>
                <div className="stat"><span className="k">At platform</span><span className="v">4</span></div>
                <div className="stat"><span className="k">In maintenance</span><span className="v">6</span></div>
              </div>
            </div>

            {/* Event ticker */}
            <div className="panel">
              <div className="panel-h">EVENT TICKER</div>
              <div>
                {visibleEvents.map((e, i) => (
                  <div key={i + tick} className={`ticker-row ${e.type === "warn" ? "warn" : ""}`}>
                    <span className="ts">{e.ts}</span>
                    <span className="ev">{e.ev}</span>
                    <span className="val">{e.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Energy panel */}
            <div className="panel">
              <div className="panel-h">ENERGY · ROLLING 60 MIN</div>
              <EnergyChart tick={tick} accent={accent} />
              <div style={{ marginTop: 14 }}>
                <div className="stat"><span className="k">Demand</span><span className="v">8.4 MW</span></div>
                <div className="stat"><span className="k">Regen recovered</span><span className="v">2.1 MW</span></div>
                <div className="stat"><span className="k">Solar in</span><span className="v">0.6 MW</span></div>
                <div className="stat"><span className="k">Net from grid</span><span className="v" style={{ color: "var(--signal-green)" }}>5.7 MW</span></div>
              </div>
            </div>
          </div>

          {/* Secondary row */}
          <div className="grid-3" style={{ gap: 0, borderTop: "1px solid #1c1c20" }}>
            <div className="panel">
              <div className="panel-h">WEATHER · GTA</div>
              <div className="stat"><span className="k">Temp</span><span className="v">−4 °C</span></div>
              <div className="stat"><span className="k">Wind</span><span className="v">SW 22 km/h · g 31</span></div>
              <div className="stat"><span className="k">Precip</span><span className="v">light snow</span></div>
              <div className="stat"><span className="k">Heated rail</span><span className="v" style={{ color: "#c98a14" }}>ACTIVE</span></div>
              <div className="stat"><span className="k">Wind barriers</span><span className="v">deployed</span></div>
              <div className="stat"><span className="k">Speed limit</span><span className="v">280 km/h ▼ from 430</span></div>
            </div>

            <div className="panel">
              <div className="panel-h">ACCESSIBILITY</div>
              <div className="stat"><span className="k">Wheelchair detections</span><span className="v">14 today</span></div>
              <div className="stat"><span className="k">Ramps deployed</span><span className="v">14 / 14</span></div>
              <div className="stat"><span className="k">Avg deploy time</span><span className="v">2.3 s</span></div>
              <div className="stat"><span className="k">Lock-in occupancy</span><span className="v">3 active</span></div>
              <div className="stat"><span className="k">Emergency drills</span><span className="v">1 (Scarborough)</span></div>
              <div className="stat"><span className="k">Assist calls</span><span className="v" style={{ color: "var(--signal-green)" }}>0 open</span></div>
            </div>

            <div className="panel">
              <div className="panel-h">MAINTENANCE · 12 H ROTATION</div>
              <div style={{ marginTop: 6, display: "grid", gap: 4 }}>
                {[
                  { z: "Z-01 · Yonge North", state: "running", color: "var(--signal-green)" },
                  { z: "Z-02 · Bloor Cross", state: "running", color: "var(--signal-green)" },
                  { z: "Z-03 · Lakeshore West", state: "maint · 02:14 remaining", color: "var(--signal-amber)" },
                  { z: "Z-04 · Don Valley", state: "running · backup track", color: "var(--signal-amber)" },
                  { z: "Z-05 · Scarborough", state: "running", color: "var(--signal-green)" },
                  { z: "Z-06 · Etobicoke", state: "running", color: "var(--signal-green)" },
                ].map((z) => (
                  <div key={z.z} style={{ display: "grid", gridTemplateColumns: "10px 1fr auto", gap: 10, fontSize: 12, padding: "4px 0", alignItems: "center" }}>
                    <span style={{ width: 8, height: 8, background: z.color, borderRadius: "50%" }} />
                    <span style={{ color: "#c8c8cc" }}>{z.z}</span>
                    <span style={{ color: "#8a8a90" }}>{z.state}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="tiny mono mt-16" style={{ color: "rgba(255,255,255,0.4)" }}>
          MOCK DATA — illustrative of operational telemetry. The same AI integrates passenger management, accessibility, weather, maintenance, regen balancing, and 911 coordination through a single API surface.
        </p>
      </div>
    </section>
  );
}

function NetworkMiniMap({ accent }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      setT(((now - start) / 1000) % 60);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  // train positions along the Y-shaped diagram
  const positions = [0.1, 0.3, 0.55, 0.78].map((p) => (p + t / 60) % 1);
  return (
    <svg viewBox="0 0 320 160" width="100%">
      {/* track lines (Y shape) */}
      <line x1="20" y1="80" x2="200" y2="80" stroke="#3a3a3e" strokeWidth="2" />
      <line x1="200" y1="80" x2="300" y2="40" stroke="#3a3a3e" strokeWidth="2" />
      <line x1="200" y1="80" x2="300" y2="120" stroke="#3a3a3e" strokeWidth="2" />
      {/* stations */}
      {[
        [20, 80, "UN"],
        [80, 80, "BL"],
        [140, 80, "ED"],
        [200, 80, "FH"],
        [260, 60, "SC"],
        [300, 40, "RH"],
        [260, 100, "ET"],
        [300, 120, "HM"],
      ].map(([x, y, lbl]) => (
        <g key={lbl}>
          <circle cx={x} cy={y} r="3" fill="#fff" stroke="#3a3a3e" strokeWidth="1" />
          <text x={x} y={y - 7} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#8a8a90">{lbl}</text>
        </g>
      ))}
      {/* moving train dots */}
      {positions.map((p, i) => {
        // sample the main line
        const x = 20 + p * 180;
        return (
          <circle key={i} cx={x} cy={80} r="3" fill={accent}>
            <animate attributeName="r" values="3;4;3" dur="1.4s" repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}

function EnergyChart({ tick, accent }) {
  // generate stable random-ish bars from a seed
  const bars = useMemo(() => {
    const out = [];
    for (let i = 0; i < 60; i++) {
      const draw = 50 + 40 * Math.sin(i / 4) + 10 * Math.sin(i / 1.7);
      const regen = 10 + 20 * Math.max(0, Math.sin(i / 3 + 0.5));
      out.push({ draw, regen });
    }
    return out;
  }, []);
  return (
    <svg viewBox="0 0 280 90" width="100%">
      {bars.map((b, i) => (
        <g key={i}>
          <rect x={i * 4.5} y={90 - b.draw} width="3.5" height={b.draw} fill={accent} opacity="0.85" />
          <rect x={i * 4.5} y={90 - b.draw - b.regen} width="3.5" height={b.regen} fill="var(--signal-green)" opacity="0.85" />
        </g>
      ))}
      <line x1="0" y1="90" x2="280" y2="90" stroke="rgba(255,255,255,0.2)" />
      <text x="0" y="10" fontFamily="var(--font-mono)" fontSize="8" fill="#8a8a90">MW</text>
    </svg>
  );
}

/* ============================================================
   Accessibility section
   ============================================================ */
function Accessibility({ accent, animationSpeed = 1 }) {
  const [phase, setPhase] = useState("approach"); // approach | detect | deploy | board | locked
  useEffect(() => {
    const seq = ["approach", "detect", "deploy", "board", "locked"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % seq.length;
      setPhase(seq[i]);
    }, 2200 / Math.max(animationSpeed, 0.1));
    return () => clearInterval(id);
  }, [animationSpeed]);

  return (
    <section id="accessibility" className="section section--white" data-screen-label="07 Accessibility">
      <div className="container">
        <SectionHead num="06" label="Accessibility" title="Built in," em="not bolted on." />

        <div className="grid-2 mb-32" style={{ alignItems: "start" }}>
          <p className="body-l">
            Every station has elevators, escalators, and stairwells. Every train
            has automatic wheelchair ramps at designated doors. Lock-in ports
            are aligned with the door and a wider aisle. The maintenance
            walkway running alongside the elevated track is the same height
            as the cabin floor — so during an emergency the same ramps work
            anywhere on the line.
          </p>
          <p className="body-m">
            AI cameras detect mobility-aid users on the platform. The ramp is
            deployed before the train fully stops. Response teams are notified.
            The wheelchair user doesn't have to ask — the train already knows.
          </p>
        </div>

        <Schematic id="FIG · E" title="Auto-ramp boarding sequence" status={phase.toUpperCase()}>
          <RampAnimation phase={phase} accent={accent} />
          <div className="grid-4 mt-24">
            {[
              ["approach", "01 · Approach", "Train decelerates into platform"],
              ["detect", "02 · Detect", "AI identifies mobility-aid user"],
              ["deploy", "03 · Deploy", "Ramp extends at 2.4 s"],
              ["board", "04 · Board", "Aligned with lock-in port"],
              ["locked", "05 · Locked", "Train resumes service"],
            ].slice(0, 4).map(([id, t, sub]) => (
              <div
                key={id}
                style={{
                  borderTop: phase === id ? `2px solid ${accent}` : "1px solid var(--rule)",
                  paddingTop: 12,
                  opacity: phase === id ? 1 : 0.55,
                  transition: "opacity 200ms, border-color 200ms",
                }}
              >
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.12em" }}>{t}</div>
                <div className="body-s mt-8">{sub}</div>
              </div>
            ))}
          </div>
        </Schematic>

        <div className="grid-3 mt-48">
          <NumberedCard n="A" title="Auto ramps at every accessibility door">
            Powered ramps deploy in 2.4 s. The accessibility door is 1.4&nbsp;m
            wide. Lock-in ports are inboard of the door.
          </NumberedCard>
          <NumberedCard n="B" title="Level walkways for emergencies">
            The maintenance path next to the elevated track is at cabin-floor
            height. Ramps work the same way during an emergency evacuation
            as at a station.
          </NumberedCard>
          <NumberedCard n="C" title="On-glass guidance">
            Cabin windows include a transparent display layer. AI directs
            individual passengers — wayfinding for wheelchair users, low-vision
            cues, language-aware route info — onto the glass.
          </NumberedCard>
        </div>
      </div>
    </section>
  );
}

function RampAnimation({ phase, accent }) {
  // ramp angle: deployed by step 3
  const rampDeployed = phase === "deploy" || phase === "board" || phase === "locked";
  // user position: platform → ramp → cabin → lock-in
  const userX = {
    approach: 30,
    detect: 60,
    deploy: 60,
    board: 180,
    locked: 280,
  }[phase];
  const aiHighlight = phase === "detect";
  const trainStopped = phase !== "approach";

  return (
    <svg viewBox="0 0 720 280" width="100%">
      {/* Platform */}
      <rect x="0" y="200" width="360" height="80" fill="#f0eee6" />
      <rect x="0" y="196" width="360" height="4" fill="#cfcdc4" />
      {/* tactile strip */}
      <g fill="#c98a14">
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={20 + i * 28} cy="198" r="2" />
        ))}
      </g>

      {/* Train (right side) */}
      <g style={{ transition: "transform 600ms cubic-bezier(.4,0,.2,1)", transform: trainStopped ? "translateX(0)" : "translateX(160px)" }}>
        <g transform="translate(360, 80)">
          {/* car cross-section facing us */}
          <path
            d="
              M 0 0
              L 360 0
              L 360 130
              L 0 130
              Z
            "
            fill="#fff"
            stroke="var(--ink)"
            strokeWidth="1.2"
          />
          {/* accent stripe */}
          <rect x="0" y="56" width="360" height="3" fill={accent} />
          {/* door opening */}
          <rect x="60" y="20" width="120" height="100" fill="#10131a" />
          {/* door open animation */}
          <rect
            x={trainStopped ? "60" : "120"}
            y="20"
            width="60"
            height="100"
            fill="#fff"
            stroke="var(--ink)"
            strokeWidth="0.8"
            style={{ transition: "x 500ms" }}
          />
          <rect
            x={trainStopped ? "180" : "120"}
            y="20"
            width="60"
            height="100"
            fill="#fff"
            stroke="var(--ink)"
            strokeWidth="0.8"
            style={{ transition: "x 500ms" }}
          />
          {/* wheelchair symbol on side */}
          <g transform="translate(20, 70)">
            <circle cx="10" cy="10" r="10" fill={accent} />
            <text x="10" y="14" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="#fff" fontWeight="600">♿</text>
          </g>

          {/* Lock-in port inside */}
          <rect x="200" y="36" width="80" height="80" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity={phase === "locked" ? 1 : 0.4} />
          {phase === "locked" && (
            <text x="240" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={accent}>LOCKED IN</text>
          )}

          {/* AI camera detection halo */}
          {aiHighlight && (
            <g transform="translate(-300, 60)">
              <circle cx="0" cy="0" r="36" fill="none" stroke={accent} strokeWidth="1.4">
                <animate attributeName="r" values="20;48;20" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <text x="0" y="-46" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={accent}>AI · DETECTED</text>
            </g>
          )}
        </g>
      </g>

      {/* Ramp */}
      <g style={{ transition: "transform 500ms" }}>
        <rect
          x="360"
          y="196"
          width={rampDeployed ? 80 : 8}
          height="6"
          fill={accent}
          style={{ transition: "width 600ms" }}
        />
        {rampDeployed && (
          <text x="370" y="190" fontFamily="var(--font-mono)" fontSize="9" fill={accent}>RAMP · 2.4 s</text>
        )}
      </g>

      {/* User (wheelchair) */}
      <g style={{ transition: "transform 700ms cubic-bezier(.4,0,.2,1)", transform: `translateX(${userX}px)` }}>
        <g transform="translate(30, 168)">
          {/* head */}
          <circle cx="0" cy="0" r="6" fill="var(--ink)" />
          {/* body */}
          <path d="M 0 6 L 0 22" stroke="var(--ink)" strokeWidth="2.4" />
          {/* arm + wheel */}
          <path d="M 0 14 L 14 20" stroke="var(--ink)" strokeWidth="2.4" />
          {/* wheel */}
          <circle cx="6" cy="32" r="12" fill="none" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="6" cy="32" r="2" fill="var(--ink)" />
        </g>
      </g>

      {/* Caption */}
      <g>
        <text x="20" y="30" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--ink)">{
          {
            approach: "Train approaches · ramp stowed",
            detect: "AI camera detects mobility-aid user",
            deploy: "Ramp extends — 2.4 s",
            board: "User boards via aligned ramp",
            locked: "Locked into accessibility port — train clears",
          }[phase]
        }</text>
      </g>
    </svg>
  );
}

/* ============================================================
   Climate Adaptation
   ============================================================ */
function Climate({ accent }) {
  const [mode, setMode] = useState("winter");
  const modes = {
    winter: {
      label: "Toronto winter",
      detail: "Heated rail panels (powered by the same 750 V bus) prevent ice. GFRP windbreaker panels deploy on exposed corridors. The AI throttles speed when freezing rain is forecast.",
      kit: ["Heated rail", "Wind barriers", "Snow brush", "De-ice for nose"],
    },
    desert: {
      label: "Riyadh / Phoenix climate",
      detail: "Sand-shielding fairings cover the bogies. UV-grade powder coat on the shell. Solar yield doubles. Cooling drops the regen buffer threshold.",
      kit: ["Sand fairings", "UV powder coat", "Expanded solar", "Cooled buffer"],
    },
    seismic: {
      label: "Seismic / Tokyo profile",
      detail: "Base-isolated pylons. Pre-positioned safe-stop logic in the AI. Heavier cross-bracing on elevated segments through known fault corridors.",
      kit: ["Base-isolated pylons", "Cross-bracing", "Safe-stop logic", "Vibration sensors"],
    },
    flood: {
      label: "Coastal / monsoon",
      detail: "Pylon footings rated for storm surge. Sealed undercarriage. Redundant traction shoes. Elevated tracks already keep the running surface above flood elevation.",
      kit: ["Surge-rated footings", "Sealed undercarriage", "Redundant shoes", "Hi-grade drainage"],
    },
  };
  const data = modes[mode];

  return (
    <section id="climate" className="section section--paper" data-screen-label="08 Climate">
      <div className="container">
        <SectionHead num="07" label="Climate adaptability" title="Same train." em="Different city, different kit." />

        <div className="grid-2 mb-24" style={{ alignItems: "start" }}>
          <p className="body-l">
            NexRail's structural core is shared across every deployment.
            What changes — pylon footings, wind barriers, sand shielding,
            heated rail — is a modular climate kit, specified at construction
            for the host city. The AI command layer adapts in software.
          </p>
          <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
            {Object.entries(modes).map(([k, v]) => (
              <button key={k} className="tog" data-on={mode === k} onClick={() => setMode(k)}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-2" style={{ alignItems: "start" }}>
          <Schematic id="FIG · F" title={`Climate kit · ${data.label}`} status="MODULAR">
            <ClimateIllustration mode={mode} accent={accent} />
          </Schematic>

          <div>
            <h3 style={{ fontSize: 26 }}>{data.label}</h3>
            <p className="body-m mt-16">{data.detail}</p>
            <div className="rule mt-24" />
            <div className="grid mt-24" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {data.kit.map((k, i) => (
                <div key={k} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 12 }}>
                  <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)" }}>MODULE {String(i + 1).padStart(2, "0")}</div>
                  <div className="body-s" style={{ color: "var(--ink)", marginTop: 4 }}>{k}</div>
                </div>
              ))}
            </div>

            <div className="card mt-32">
              <Eyebrow>Why this matters</Eyebrow>
              <p className="body-s mt-16">
                CFD studies confirm that aerodynamic cart shapes plus
                0.3–0.4 porosity GFRP barriers cut crosswind force on the
                train and on the supporting pylons. The structure stays light;
                the kit handles the climate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClimateIllustration({ mode, accent }) {
  return (
    <svg viewBox="0 0 600 320" width="100%">
      {/* sky */}
      {mode === "winter" && (
        <g>
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={Math.random() * 600} cy={Math.random() * 120} r="1.2" fill="#cfcdc4" />
          ))}
        </g>
      )}
      {mode === "desert" && (
        <g>
          <circle cx="100" cy="50" r="22" fill="#f6c45a" />
          <rect x="0" y="200" width="600" height="120" fill="#f0e2c0" />
        </g>
      )}
      {mode === "seismic" && (
        <g>
          <path d="M0 220 L60 215 L120 222 L180 218 L240 226 L300 219 L360 224 L420 217 L480 223 L540 218 L600 224 L600 320 L0 320 Z" fill="#e0ddd3" />
        </g>
      )}
      {mode === "flood" && (
        <g>
          <rect x="0" y="240" width="600" height="80" fill="#cfe4f0" />
          <line x1="0" y1="240" x2="600" y2="240" stroke="#7ba8c1" strokeWidth="0.8" />
          <line x1="0" y1="250" x2="600" y2="250" stroke="#7ba8c1" strokeWidth="0.4" opacity="0.5" />
          <line x1="0" y1="260" x2="600" y2="260" stroke="#7ba8c1" strokeWidth="0.4" opacity="0.5" />
        </g>
      )}

      {/* track / pylons */}
      <g>
        <rect x="0" y="170" width="600" height="14" fill="#e0ddd3" />
        {/* pylons */}
        {[120, 320, 520].map((x) => (
          <g key={x}>
            <rect x={x - 14} y="184" width="28" height="100" fill="#cfcdc4" />
            {mode === "seismic" && (
              <g>
                <rect x={x - 22} y="270" width="44" height="14" fill="#1a1a1c" />
                <text x={x} y="294" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-mute)">base-isolated</text>
              </g>
            )}
            {mode === "flood" && (
              <rect x={x - 18} y="244" width="36" height="20" fill="#a8a59c" />
            )}
            {/* cross-bracing for seismic */}
            {mode === "seismic" && (
              <g stroke="#888580" strokeWidth="1">
                <line x1={x - 14} y1="200" x2={x + 14} y2="260" />
                <line x1={x + 14} y1="200" x2={x - 14} y2="260" />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* simplified train */}
      <g transform="translate(180, 110)">
        <path
          d="
            M 0 30
            C 20 30, 30 16, 60 10
            C 90 4, 110 2, 130 2
            L 240 2
            C 256 2, 266 8, 266 18
            L 266 58
            L 30 58
            C 12 58, 0 50, 0 40
            Z
          "
          fill="#fff"
          stroke="var(--ink)"
          strokeWidth="1"
        />
        <rect x="80" y="14" width="170" height="14" fill="#10131a" />
        <rect x="20" y="34" width="240" height="2" fill={accent} />
        {/* sand fairing */}
        {mode === "desert" && <rect x="20" y="58" width="240" height="6" fill="#c98a14" />}
      </g>

      {/* climate kit overlays */}
      {mode === "winter" && (
        <g>
          {/* heated rail strip */}
          <rect x="0" y="186" width="600" height="3" fill="#c98a14" />
          <g stroke="#c98a14" strokeWidth="0.6">
            {Array.from({ length: 60 }).map((_, i) => (
              <line key={i} x1={i * 10} y1="184" x2={i * 10 + 4} y2="190" />
            ))}
          </g>
          {/* wind barrier panels */}
          <g>
            <rect x="0" y="120" width="600" height="3" fill="var(--ink)" />
            {[40, 100, 160, 220, 280, 460, 520].map((x) => (
              <rect key={x} x={x} y="100" width="40" height="40" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
            ))}
          </g>
          <text x="20" y="98" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)">GFRP WIND BARRIER · 0.35 porosity</text>
          <text x="20" y="208" fontFamily="var(--font-mono)" fontSize="9" fill="#c98a14">HEATED RAIL · 750 V bus</text>
        </g>
      )}

      {mode === "desert" && (
        <g>
          <g fill="#f6c45a" opacity="0.6">
            {[0, 80, 160, 240, 320, 400, 480, 560].map((x) => (
              <path key={x} d={`M ${x} 250 q 20 -8, 40 0`} stroke="#c98a14" strokeWidth="0.6" fill="none" />
            ))}
          </g>
          <text x="20" y="280" fontFamily="var(--font-mono)" fontSize="9" fill="#c98a14">SAND FAIRINGS + UV-GRADE POWDER COAT</text>
        </g>
      )}

      {mode === "seismic" && (
        <text x="20" y="306" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)">BASE-ISOLATED PYLONS · X-BRACING · SAFE-STOP LOGIC</text>
      )}

      {mode === "flood" && (
        <text x="20" y="288" fontFamily="var(--font-mono)" fontSize="9" fill="#3a7095">SURGE-RATED FOOTINGS · ELEVATED ABOVE FLOOD ELEVATION</text>
      )}

      {/* lightning rod (always present) */}
      <g>
        <line x1="320" y1="184" x2="320" y2="60" stroke="#888580" strokeWidth="1" />
        <polygon points="316,60 324,60 320,40" fill="#888580" />
        <text x="328" y="50" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-mute)">lightning rod</text>
      </g>
    </svg>
  );
}

Object.assign(window, { AICommand, Accessibility, Climate });
