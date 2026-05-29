/* sections-1.jsx — Hero, Specs, Anatomy */

function Hero({ accent, showLabels }) {
  return (
    <section id="hero" className="hero section--paper" data-screen-label="01 Hero">
      <div className="container">
        <div className="hero-top">
          <div>
            <div className="eyebrow mb-24">
              <span className="dot" />
              STEAM Innovation Challenge · Cameron Heights C.I. · May 2026
            </div>
            <h1>
              A train designed
              <br />
              <span className="tail">to move a city</span>
              <br />
              without a footprint.
            </h1>
          </div>
          <div>
            <p className="lede">
              NexRail is an elevated hybrid maglev rail network. This page is an
              engineering walk-through of <em>the train itself</em> — its anatomy, its
              propulsion, its power loop, and the AI that runs it — built from
              technologies already operating in the world today.
            </p>
            <div className="flex gap-8 mt-24">
              <span className="pill"><span className="swatch" />SCMaglev-derived levitation</span>
              <span className="pill"><span className="swatch" />NYC-style third rail</span>
            </div>
            <div className="flex gap-8 mt-8">
              <span className="pill"><span className="swatch" />Tesla-class regen</span>
              <span className="pill"><span className="swatch" />REM funding model</span>
            </div>
          </div>
        </div>

        <div className="train-stage mt-32">
          <TrainSVG showLabels={showLabels} accent={accent} />
        </div>

        <div className="spec-strip mt-32">
          <SpecCell label="Top Speed (Maglev)" value="430" unit="km/h" footnote="Shinkansen-class corridors" />
          <SpecCell label="Cruise (Light Rail)" value="120" unit="km/h" footnote="Tight corners, urban core" />
          <SpecCell label="Pass. / 4-car consist" value="864" footnote="Seated + standees, ADA-rated" />
          <SpecCell label="GHG Reduction" value="≥ 90" unit="%" footnote="per pass-km vs. private car" />
          <SpecCell label="Operating Window" value="24/7" footnote="Zone-based maintenance" />
        </div>

        <div className="grid-3 mt-32">
          <div>
            <Eyebrow>The brief</Eyebrow>
            <p className="body-m mt-16">
              Cities are outgrowing their transit. Ground-level systems eat land,
              disrupt the streets they need to run on, and cap out long before
              demand does. NexRail lifts the network above the city it serves.
            </p>
          </div>
          <div>
            <Eyebrow>The premise</Eyebrow>
            <p className="body-m mt-16">
              Nothing on this page is speculative. SCMaglev runs in Japan. The L
              runs in Chicago. The third rail powers New York. Tesla's regen ships
              in every Model&nbsp;3. REM is open in Montreal. NexRail integrates them.
            </p>
          </div>
          <div>
            <Eyebrow>The output</Eyebrow>
            <p className="body-m mt-16">
              An elevated, hybrid maglev / light-rail system, run by one AI
              command layer, funded so passengers pay for service — not
              construction. Built to drop into any city, including Toronto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Anatomy — clickable hotspots on the side profile
   ============================================================ */
const ANATOMY_DATA = {
  nose: {
    n: "01", title: "Aerodynamic nose",
    body: "Shinkansen bullet-derived profile. Reduces drag at 430 km/h and presents minimum lateral surface to crosswinds. CFD-optimised for the elevated guideway's wind regime.",
    meta: ["Drag coeff. Cd ≈ 0.20", "Section: GFRP composite shell"],
  },
  windscreen: {
    n: "02", title: "Cockpit / forward LIDAR",
    body: "Driverless. The forward window is a sensor pod — stereo cameras, LIDAR, and millimeter-wave radar feed the AI central command in real time. The flight-deck shape is reserved for emergency manual override only.",
    meta: ["Sensor range: 1.2 km", "Manual override: certified jump-seat"],
  },
  shell: {
    n: "03", title: "Recycled-aluminum shell",
    body: "Lightweight, corrosion-resistant, and powder-coated. Recycled aluminum with composite reinforcement panels. Old shells are repurposed as replacement parts during the train's service life.",
    meta: ["Material: 6061-T6 recycled Al + GFRP", "Life: 35 yr designed, parts recycled"],
  },
  window: {
    n: "04", title: "Continuous cabin window",
    body: "Laminated electrochromic glass. Auto-tints in direct sun, doubles as the AI guidance display surface near accessibility doors — text and arrows render directly on the glass.",
    meta: ["Coating: e-chromic, 5-stop range", "Doubles as wayfinding HUD"],
  },
  door: {
    n: "05", title: "Accessibility door + auto ramp",
    body: "Designated wheelchair entry doors detect approaching mobility-aid users via station-side cameras and deploy a powered ramp before the train fully stops. Wider opening and an aligned lock-in port inside.",
    meta: ["Deploy time: 2.4 s", "Width: 1.4 m (vs 0.9 m standard)"],
  },
  solar: {
    n: "06", title: "Roof solar array",
    body: "Thin-film monocrystalline panels covering 60% of the roof. Doesn't pretend to power the train — it offsets cabin HVAC and lighting, reducing draw from the third rail by ~6–9% in good conditions.",
    meta: ["Output: ~14 kW peak / car", "Offsets: HVAC + cabin lighting"],
  },
  magnet: {
    n: "07", title: "Superconducting magnet array",
    body: "SCMaglev-style. Cooled to near absolute zero, generating intense magnetic fields with zero electrical resistance. Levitates the car ~10 cm above the guideway and is propelled forward by the track's null-flux coils — no rolling friction, no track wear.",
    meta: ["Cooling: liquid helium · −269 °C", "Levitation gap: 100 mm"],
  },
  shoe: {
    n: "08", title: "Third-rail contact shoe",
    body: "On light-rail corridors, the train draws power from a NYC-pattern third rail through a sprung graphite-bronze contact shoe. The same rail accepts regen current flowing back from braking trains.",
    meta: ["Voltage: 750 V DC", "Bidirectional · accepts regen"],
  },
  wheel: {
    n: "09", title: "Retractable rubber wheel",
    body: "Below 150 km/h the train rides on rubber wheels — exactly the SCMaglev pattern. Above that threshold, geo-fenced transition zones cue the AI to retract them and hand off to magnetic levitation. The transition is straight-and-level by design.",
    meta: ["Threshold: 150 km/h", "Transition: AI geo-fenced"],
  },
};

function Anatomy({ accent }) {
  const [active, setActive] = useState("magnet");
  const data = ANATOMY_DATA[active];

  return (
    <section id="anatomy" className="section section--white" data-screen-label="02 Anatomy">
      <div className="container">
        <SectionHead num="01" label="Anatomy" title="Nine systems," em="one train." />

        <div className="anatomy-layout" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>
          <div className="anatomy-stage" style={{ padding: "32px 0" }}>
            <TrainSVG
              accent={accent}
              hotspots={true}
              activeHotspot={active}
              onHotspotClick={(id) => setActive(id)}
            />
            <div style={{ padding: "0 24px", marginTop: 8 }}>
              <div className="tiny mono">
                INTERACT · Click any numbered marker to inspect a subsystem
              </div>
            </div>
          </div>

          <div className="card" style={{ position: "sticky", top: 80 }}>
            <div className="eyebrow">
              <span className="dot" />SUBSYSTEM · {data.n}
            </div>
            <h3 className="mt-16">{data.title}</h3>
            <p className="body-m mt-16">{data.body}</p>
            <div className="rule mt-24" />
            <div className="mt-16" style={{ display: "grid", gap: 8 }}>
              {data.meta.map((m, i) => (
                <div key={i} className="tiny mono">
                  → {m}
                </div>
              ))}
            </div>
            <div className="mt-24 flex gap-8" style={{ flexWrap: "wrap" }}>
              {Object.keys(ANATOMY_DATA).map((k) => (
                <button
                  key={k}
                  className="tog"
                  data-on={active === k}
                  onClick={() => setActive(k)}
                  style={{ padding: "4px 9px", fontSize: 10 }}
                >
                  {ANATOMY_DATA[k].n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Front-view cross-section */}
        <div className="grid-2 mt-48" style={{ alignItems: "start" }}>
          <div>
            <Eyebrow>Front cross-section</Eyebrow>
            <h3 className="mt-16" style={{ fontSize: 26 }}>What's actually inside.</h3>
            <p className="body-m mt-16">
              Cabin floor sits 480&nbsp;mm above the platform edge — the same level
              as station platforms and elevated maintenance walkways. Underneath
              are the superconducting magnet array, the regen-energy buffer, and
              the edge-compute AI node. Above, a thin-film solar array and the
              HVAC plant.
            </p>
            <p className="body-m mt-16">
              The wheelchair lock-in port is the dashed area to the left. Aligned
              with the accessibility door and the platform ramp, it gives a
              single uninterrupted boarding path from station to seat.
            </p>
            <div className="mt-24" style={{ display: "grid", gap: 8 }}>
              {[
                ["shell", "Recycled aluminum shell"],
                ["solar", "Roof solar array"],
                ["cabin", "Cabin · seats + lock-in"],
                ["accessibility", "Accessibility lock-in"],
                ["magnet", "Superconducting magnet bank"],
                ["regen", "Regen buffer (84 kWh)"],
                ["ai", "Edge-compute AI node"],
                ["wheel", "Retractable rubber wheels"],
                ["thirdrail", "Third-rail contact shoe"],
              ].map(([k, label]) => (
                <button
                  key={k}
                  className="tog"
                  data-on={false}
                  onMouseEnter={(e) => {
                    e.currentTarget.parentElement.parentElement.parentElement.querySelector('[data-csx]')?.setAttribute('data-hl', k);
                    e.currentTarget.dataset.on = "true";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.parentElement.parentElement.parentElement.querySelector('[data-csx]')?.removeAttribute('data-hl');
                    e.currentTarget.dataset.on = "false";
                  }}
                  style={{ padding: "8px 12px", textAlign: "left", justifyContent: "flex-start" }}
                >
                  → {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <CrossSectionHover accent={accent} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Wrapper that exposes a `data-csx` attribute for sibling buttons to toggle */
function CrossSectionHover({ accent }) {
  const [hl, setHl] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      setHl(el.getAttribute("data-hl"));
    });
    obs.observe(el, { attributes: true, attributeFilter: ["data-hl"] });
    return () => obs.disconnect();
  }, []);
  return (
    <div data-csx ref={ref} className="schematic" style={{ background: "var(--paper)" }}>
      <div className="schematic-head">
        <span>FIG · A — front cross-section</span>
        <span className="right">{hl ? hl.toUpperCase() : "BASE VIEW"}</span>
      </div>
      <CrossSectionSVG accent={accent} highlight={hl} />
    </div>
  );
}

Object.assign(window, { Hero, Anatomy });
