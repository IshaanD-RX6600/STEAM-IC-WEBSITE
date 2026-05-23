/* train-svg.jsx — the master NexRail train side profile, plus a top-down view and a cross-section. */

/* ============================================================
   TrainSVG — side profile of the NexRail lead car (Shinkansen-inspired)
   ============================================================ */
function TrainSVG({
  width = "100%",
  showLabels = false,
  hotspots = false,
  activeHotspot = null,
  onHotspotClick = () => {},
  accent = "var(--accent)",
  bodyColor = "#ffffff",
  windowColor = "#10131a",
  showWheels = false,        // toggles retractable rubber wheels deployed/retracted
  showMagField = false,      // overlays magnetic field lines
  style = {},
}) {
  // hotspot positions in viewBox coords (1600x260)
  const HS = [
    { id: "nose",      x: 90,   y: 130, n: 1, title: "Aerodynamic Nose" },
    { id: "windscreen",x: 200,  y: 100, n: 2, title: "Cockpit / Forward LIDAR" },
    { id: "shell",     x: 420,  y: 78,  n: 3, title: "Recycled Aluminum Shell" },
    { id: "window",    x: 700,  y: 102, n: 4, title: "Cabin Window Strip" },
    { id: "door",      x: 1010, y: 130, n: 5, title: "Accessibility Door + Auto Ramp" },
    { id: "solar",     x: 1280, y: 70,  n: 6, title: "Roof Solar Array" },
    { id: "magnet",    x: 540,  y: 200, n: 7, title: "Superconducting Magnet" },
    { id: "shoe",      x: 880,  y: 200, n: 8, title: "Third-rail Contact Shoe" },
    { id: "wheel",     x: 1200, y: 200, n: 9, title: "Retractable Rubber Wheel" },
  ];

  return (
    <svg
      viewBox="0 0 1600 260"
      width={width}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="bodySheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(0,0,0,0.04)" />
          <stop offset="0.45" stopColor="rgba(0,0,0,0)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.06)" />
        </linearGradient>
        <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c1018" />
          <stop offset="1" stopColor="#1c2230" />
        </linearGradient>
        <linearGradient id="noseShadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(0,0,0,0.10)" />
          <stop offset="0.6" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <pattern id="trackTies" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="30" height="20" fill="#e7e4dc" />
        </pattern>
      </defs>

      {/* Elevated track / guideway */}
      <g>
        {/* guideway slab */}
        <rect x="0" y="220" width="1600" height="14" fill="#e0ddd3" />
        <rect x="0" y="234" width="1600" height="2" fill="#c4c0b4" />
        {/* maglev guide coils — thin vertical ticks */}
        <g stroke="#c4c0b4" strokeWidth="1">
          {Array.from({ length: 80 }).map((_, i) => (
            <line key={i} x1={i * 20} y1="224" x2={i * 20} y2="230" />
          ))}
        </g>
        {/* third rail (offset, dotted) */}
        <rect x="320" y="218" width="1280" height="3" fill="#888580" />
      </g>

      {/* === Main body === */}
      <g>
        {/* outer shell */}
        <path
          d="
            M 0 132
            C 60 132, 95 110, 160 92
            C 220 76, 270 70, 340 70
            L 1530 70
            C 1565 70, 1580 80, 1580 100
            L 1580 196
            L 80 196
            C 50 196, 20 190, 4 170
            C -2 162, -2 145, 0 132
            Z
          "
          fill={bodyColor}
          stroke="#1a1a1c"
          strokeWidth="1.2"
        />
        {/* subtle body sheen */}
        <path
          d="
            M 0 132
            C 60 132, 95 110, 160 92
            C 220 76, 270 70, 340 70
            L 1530 70
            C 1565 70, 1580 80, 1580 100
            L 1580 196
            L 80 196
            C 50 196, 20 190, 4 170
            C -2 162, -2 145, 0 132
            Z
          "
          fill="url(#bodySheen)"
          pointerEvents="none"
        />
        {/* nose shadow */}
        <path
          d="
            M 0 132
            C 60 132, 95 110, 160 92
            C 220 76, 270 70, 340 70
            L 380 70
            L 380 196
            L 80 196
            C 50 196, 20 190, 4 170
            C -2 162, -2 145, 0 132
            Z
          "
          fill="url(#noseShadow)"
          pointerEvents="none"
        />
      </g>

      {/* === Cockpit windscreen (wraparound) === */}
      <g>
        <path
          d="
            M 70 128
            C 110 118, 140 100, 190 88
            C 240 78, 280 76, 320 76
            L 320 124
            L 90 132
            Z
          "
          fill="url(#windowGrad)"
        />
        {/* inner reflection band */}
        <path
          d="
            M 100 122
            C 140 112, 170 98, 220 92
            L 220 100
            C 170 106, 140 118, 100 128
            Z
          "
          fill="rgba(255,255,255,0.07)"
        />
        {/* dual headlights */}
        <ellipse cx="60" cy="148" rx="14" ry="5" fill="#fff8d6" stroke="#1a1a1c" strokeWidth="0.8" />
        <ellipse cx="60" cy="148" rx="6" ry="2.4" fill="#fff" />
      </g>

      {/* === Roof equipment / antenna === */}
      <g>
        {/* roof crown line */}
        <line x1="340" y1="70" x2="1530" y2="70" stroke="#cfcdc4" strokeWidth="1" />
        {/* sensor / antenna mast */}
        <rect x="500" y="58" width="60" height="12" fill="#1a1a1c" />
        <rect x="514" y="50" width="32" height="8" fill="#3a3a3e" />
        <rect x="525" y="42" width="10" height="8" fill="#1a1a1c" />
        {/* solar panel array on roof */}
        <g>
          <rect x="900" y="60" width="500" height="10" fill="#0d1d3a" stroke="#1a1a1c" strokeWidth="0.6" />
          <g stroke="#1a3a6e" strokeWidth="0.5">
            {Array.from({ length: 25 }).map((_, i) => (
              <line key={i} x1={900 + i * 20} y1="60" x2={900 + i * 20} y2="70" />
            ))}
          </g>
        </g>
      </g>

      {/* === Window strip with frames === */}
      <g>
        {/* continuous black window band */}
        <rect x="340" y="94" width="1180" height="32" fill="url(#windowGrad)" />
        {/* highlight strip */}
        <rect x="340" y="94" width="1180" height="3" fill="rgba(255,255,255,0.08)" />
        {/* vertical mullions */}
        <g stroke="#fff" strokeWidth="2">
          {[400, 460, 520, 580, 640, 760, 820, 880, 940, 1080, 1140, 1200, 1260, 1380, 1440].map((x, i) => (
            <line key={i} x1={x} y1="94" x2={x} y2="126" />
          ))}
        </g>
        {/* door slots — wider gaps in the window band + door outline below */}
        {[700, 1020, 1340].map((x) => (
          <g key={x}>
            <rect x={x - 26} y="94" width="52" height="32" fill={bodyColor} stroke="#cfcdc4" strokeWidth="0.6" />
            <rect x={x - 22} y="98" width="44" height="24" fill="url(#windowGrad)" />
            <line x1={x} y1="94" x2={x} y2="126" stroke={bodyColor} strokeWidth="2" />
            {/* door body below window */}
            <rect x={x - 26} y="126" width="52" height="62" fill={bodyColor} stroke="#cfcdc4" strokeWidth="0.6" />
            <rect x={x - 26} y="124" width="52" height="2" fill="#cfcdc4" />
            <line x1={x} y1="126" x2={x} y2="188" stroke="#cfcdc4" strokeWidth="0.6" />
            {/* small wheelchair icon on accessibility door (1020) */}
            {x === 1020 && (
              <g transform={`translate(${x - 6}, 155)`}>
                <circle cx="6" cy="6" r="6" fill={accent} />
                <text x="6" y="9.5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#fff" fontWeight="600">♿</text>
              </g>
            )}
          </g>
        ))}
      </g>

      {/* === Accent stripe === */}
      <g>
        <rect x="80" y="130" width="1480" height="3" fill={accent} />
        <rect x="80" y="133" width="1480" height="1" fill="rgba(0,0,0,0.18)" />
      </g>

      {/* === Wordmark === */}
      <g transform="translate(440, 158)">
        <text
          fontFamily="var(--font-mono)"
          fontSize="14"
          fontWeight="600"
          fill="#1a1a1c"
          letterSpacing="3"
        >
          NEXRAIL
        </text>
        <text
          x="0" y="14"
          fontFamily="var(--font-mono)"
          fontSize="7"
          fill="#6c6c70"
          letterSpacing="2"
        >
          SERIES N-01 · TORONTO ↔ HAMILTON
        </text>
      </g>

      {/* Car number */}
      <g transform="translate(1480, 158)">
        <rect x="-4" y="-12" width="46" height="20" fill="none" stroke="#1a1a1c" strokeWidth="0.8" />
        <text fontFamily="var(--font-mono)" fontSize="14" fontWeight="600" fill="#1a1a1c">N-01</text>
      </g>

      {/* === Undercarriage / bogies === */}
      <g>
        {/* bogie pods */}
        <rect x="420" y="196" width="240" height="22" fill="#1a1a1c" />
        <rect x="1100" y="196" width="240" height="22" fill="#1a1a1c" />
        {/* gear lines */}
        <g stroke="#3a3a3e" strokeWidth="0.6">
          {[440, 460, 480, 500, 520, 540, 560, 580, 600, 620, 640,
            1120, 1140, 1160, 1180, 1200, 1220, 1240, 1260, 1280, 1300, 1320].map((x, i) => (
            <line key={i} x1={x} y1="200" x2={x} y2="216" />
          ))}
        </g>
        {/* contact shoe on third rail */}
        <rect x="820" y="208" width="120" height="6" fill="#3a3a3e" />
        <rect x="820" y="214" width="120" height="4" fill="#888580" />
        <line x1="850" y1="196" x2="850" y2="208" stroke="#3a3a3e" strokeWidth="2" />
        <line x1="910" y1="196" x2="910" y2="208" stroke="#3a3a3e" strokeWidth="2" />

        {/* retractable wheels — animated by showWheels */}
        <g style={{ transition: "transform 600ms cubic-bezier(.4,0,.2,1)", transform: showWheels ? "translateY(0)" : "translateY(-14px)" }}>
          <circle cx="500" cy="222" r="14" fill="#1a1a1c" stroke="#3a3a3e" strokeWidth="2" />
          <circle cx="500" cy="222" r="6" fill="#3a3a3e" />
          <circle cx="600" cy="222" r="14" fill="#1a1a1c" stroke="#3a3a3e" strokeWidth="2" />
          <circle cx="600" cy="222" r="6" fill="#3a3a3e" />
          <circle cx="1180" cy="222" r="14" fill="#1a1a1c" stroke="#3a3a3e" strokeWidth="2" />
          <circle cx="1180" cy="222" r="6" fill="#3a3a3e" />
          <circle cx="1280" cy="222" r="14" fill="#1a1a1c" stroke="#3a3a3e" strokeWidth="2" />
          <circle cx="1280" cy="222" r="6" fill="#3a3a3e" />
        </g>
      </g>

      {/* Levitation gap indicator — small "GAP 10cm" label between body and rail */}
      {!showWheels && (
        <g opacity="0.85">
          <line x1="780" y1="218" x2="780" y2="222" stroke={accent} strokeWidth="1" />
          <line x1="780" y1="220" x2="800" y2="220" stroke={accent} strokeWidth="1" />
          <text x="804" y="223" fontFamily="var(--font-mono)" fontSize="8" fill={accent}>10 cm levitation gap</text>
        </g>
      )}

      {/* === Magnetic field overlay === */}
      {showMagField && (
        <g opacity="0.85">
          {[460, 520, 580, 640, 1140, 1200, 1260, 1320].map((cx, i) => (
            <g key={i}>
              <path
                d={`M ${cx - 18} 196 C ${cx - 18} 188, ${cx + 18} 188, ${cx + 18} 196 C ${cx + 18} 208, ${cx - 18} 208, ${cx - 18} 196 Z`}
                fill="none"
                stroke="var(--maglev)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1.4s" repeatCount="indefinite" />
              </path>
              <path
                d={`M ${cx - 26} 196 C ${cx - 26} 184, ${cx + 26} 184, ${cx + 26} 196`}
                fill="none"
                stroke="var(--maglev)"
                strokeWidth="0.6"
                strokeDasharray="2 3"
                opacity="0.6"
              />
            </g>
          ))}
          <text x="1400" y="240" fontFamily="var(--font-mono)" fontSize="9" fill="var(--maglev)">
            ↑ LSM travelling magnetic wave (8.5 Hz)
          </text>
        </g>
      )}

      {/* === Hotspots === */}
      {hotspots && HS.map((h) => (
        <g
          key={h.id}
          transform={`translate(${h.x}, ${h.y})`}
          style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onHotspotClick(h.id); }}
        >
          <circle r="14" fill="rgba(255,255,255,0.001)" />
          <circle r="11" fill={activeHotspot === h.id ? accent : "#ffffff"} stroke={activeHotspot === h.id ? accent : "#1a1a1c"} strokeWidth="1.2" />
          <text
            textAnchor="middle"
            y="3.5"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="600"
            fill={activeHotspot === h.id ? "#fff" : "#1a1a1c"}
          >
            {h.n}
          </text>
          <circle r="11" fill="none" stroke={accent} strokeWidth="1">
            <animate attributeName="r" from="11" to="22" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.7" to="0" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* === Engineering labels (optional) === */}
      {showLabels && (
        <g fontFamily="var(--font-mono)" fontSize="9" fill="#6c6c70">
          <g>
            <line x1="0" y1="245" x2="1580" y2="245" stroke="#6c6c70" strokeWidth="0.6" />
            <line x1="0" y1="240" x2="0" y2="250" stroke="#6c6c70" strokeWidth="0.6" />
            <line x1="1580" y1="240" x2="1580" y2="250" stroke="#6c6c70" strokeWidth="0.6" />
            <text x="790" y="256" textAnchor="middle">CAR LENGTH · 25.0 m</text>
          </g>
          <g>
            <line x1="1595" y1="70" x2="1595" y2="196" stroke="#6c6c70" strokeWidth="0.6" />
            <line x1="1590" y1="70" x2="1600" y2="70" stroke="#6c6c70" strokeWidth="0.6" />
            <line x1="1590" y1="196" x2="1600" y2="196" stroke="#6c6c70" strokeWidth="0.6" />
            <text x="1605" y="135" transform="rotate(90, 1605, 135)">3.4 m</text>
          </g>
        </g>
      )}
    </svg>
  );
}

/* ============================================================
   CrossSection — front-view cross-section of a NexRail car
   Shows: levitation magnets, third rail, cabin layout, wheelchair lock-in
   ============================================================ */
function CrossSectionSVG({ width = "100%", style = {}, accent = "var(--accent)", highlight = null }) {
  // viewBox 0 0 600 480
  // body cross-section: rounded rectangle approx 360w x 280h
  const isHL = (k) => highlight === k;
  return (
    <svg viewBox="0 0 600 520" width={width} style={style}>
      <defs>
        <linearGradient id="csBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f0eee6" />
        </linearGradient>
      </defs>
      {/* sky */}
      <rect x="0" y="0" width="600" height="520" fill="transparent" />

      {/* elevated guideway slab */}
      <g>
        <rect x="60" y="430" width="480" height="32" fill="#e0ddd3" />
        <rect x="60" y="462" width="480" height="4" fill="#c4c0b4" />
        {/* support pylon partial */}
        <rect x="280" y="466" width="40" height="54" fill="#c4c0b4" />
        {/* guideway sides (maglev coils) */}
        <rect x="170" y="380" width="20" height="60" fill="#bdbab1" stroke={isHL("magnet") ? accent : "#888580"} strokeWidth={isHL("magnet") ? 2 : 1} />
        <rect x="410" y="380" width="20" height="60" fill="#bdbab1" stroke={isHL("magnet") ? accent : "#888580"} strokeWidth={isHL("magnet") ? 2 : 1} />
        {/* maglev levitation/guide coil markings */}
        <g stroke="#888580" strokeWidth="0.6">
          {[388, 396, 404, 412, 420, 428].map((y, i) => (
            <g key={i}>
              <line x1="170" y1={y} x2="190" y2={y} />
              <line x1="410" y1={y} x2="430" y2={y} />
            </g>
          ))}
        </g>
        {/* third rail */}
        <rect x="60" y="424" width="80" height="6" fill={isHL("thirdrail") ? accent : "#3a3a3e"} />
        <text x="65" y="420" fontFamily="var(--font-mono)" fontSize="9" fill={isHL("thirdrail") ? accent : "#6c6c70"}>THIRD RAIL</text>
      </g>

      {/* car body cross-section */}
      <g>
        {/* outer shell */}
        <path
          d="
            M 130 110
            Q 130 60, 200 50
            L 400 50
            Q 470 60, 470 110
            L 470 400
            L 130 400
            Z
          "
          fill="url(#csBody)"
          stroke={isHL("shell") ? accent : "#1a1a1c"}
          strokeWidth={isHL("shell") ? 2.4 : 1.2}
        />
        {/* roof solar */}
        <rect x="200" y="46" width="200" height="6" fill="#0d1d3a" stroke={isHL("solar") ? accent : "#1a1a1c"} strokeWidth={isHL("solar") ? 2 : 0.6} />
        <g stroke="#1a3a6e" strokeWidth="0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={200 + i * 20} y1="46" x2={200 + i * 20} y2="52" />
          ))}
        </g>
        {/* roof HVAC + LIDAR */}
        <rect x="240" y="36" width="60" height="10" fill="#1a1a1c" />
        <rect x="320" y="38" width="40" height="8" fill="#1a1a1c" />
        <circle cx="300" cy="32" r="3" fill={accent} />

        {/* windows L + R */}
        <rect x="135" y="80" width="20" height="80" fill="#1a1a1c" />
        <rect x="445" y="80" width="20" height="80" fill="#1a1a1c" />

        {/* floor */}
        <line x1="130" y1="280" x2="470" y2="280" stroke="#cfcdc4" strokeWidth="1" />
        {/* ceiling line */}
        <line x1="130" y1="120" x2="470" y2="120" stroke="#cfcdc4" strokeWidth="1" />

        {/* cabin interior — seats */}
        <g>
          {/* left row of seats */}
          <rect x="160" y="200" width="50" height="60" fill={isHL("cabin") ? "#fde2e6" : "#f0eee6"} stroke="#cfcdc4" strokeWidth="0.6" rx="4" />
          <rect x="160" y="206" width="50" height="14" fill={isHL("cabin") ? accent : "#cfcdc4"} rx="3" />
          <rect x="220" y="200" width="50" height="60" fill={isHL("cabin") ? "#fde2e6" : "#f0eee6"} stroke="#cfcdc4" strokeWidth="0.6" rx="4" />
          <rect x="220" y="206" width="50" height="14" fill={isHL("cabin") ? accent : "#cfcdc4"} rx="3" />
          {/* aisle gap (280-320) */}
          {/* right row */}
          <rect x="330" y="200" width="50" height="60" fill={isHL("cabin") ? "#fde2e6" : "#f0eee6"} stroke="#cfcdc4" strokeWidth="0.6" rx="4" />
          <rect x="330" y="206" width="50" height="14" fill={isHL("cabin") ? accent : "#cfcdc4"} rx="3" />
          <rect x="390" y="200" width="50" height="60" fill={isHL("cabin") ? "#fde2e6" : "#f0eee6"} stroke="#cfcdc4" strokeWidth="0.6" rx="4" />
          <rect x="390" y="206" width="50" height="14" fill={isHL("cabin") ? accent : "#cfcdc4"} rx="3" />
        </g>

        {/* wheelchair lock-in (left side) */}
        <g>
          <rect x="160" y="135" width="60" height="56" fill={isHL("accessibility") ? "#fde2e6" : "transparent"} stroke={isHL("accessibility") ? accent : "#cfcdc4"} strokeWidth={isHL("accessibility") ? 2 : 0.8} strokeDasharray="3 3" />
          {/* wheelchair pictogram */}
          <g transform="translate(180, 145)">
            <circle cx="10" cy="22" r="10" fill="none" stroke={isHL("accessibility") ? accent : "#6c6c70"} strokeWidth="1.4" />
            <circle cx="10" cy="6" r="3" fill={isHL("accessibility") ? accent : "#6c6c70"} />
            <path d="M10 9 L10 18 L18 18 L20 26" fill="none" stroke={isHL("accessibility") ? accent : "#6c6c70"} strokeWidth="1.4" />
          </g>
        </g>

        {/* under-floor: maglev magnets + electronics */}
        <g>
          <rect x="150" y="290" width="300" height="40" fill="#101013" stroke={isHL("magnet") ? accent : "#3a3a3e"} strokeWidth={isHL("magnet") ? 2 : 0.6} />
          <g stroke="#5a5a5e" strokeWidth="0.6">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1={150 + i * 25} y1="290" x2={150 + i * 25} y2="330" />
            ))}
          </g>
          {/* superconducting coil labels */}
          <text x="200" y="312" fontFamily="var(--font-mono)" fontSize="7" fill="#cfcdc4">SUPERCONDUCTING MAGNET ARRAY · −269 °C</text>

          {/* battery / regen buffer */}
          <rect x="170" y="340" width="120" height="30" fill={isHL("regen") ? accent : "#1a1a1c"} />
          <text x="180" y="358" fontFamily="var(--font-mono)" fontSize="8" fill="#fff">REGEN BUFFER · 84 kWh</text>

          {/* AI module */}
          <rect x="310" y="340" width="140" height="30" fill={isHL("ai") ? accent : "#1a1a1c"} />
          <text x="320" y="358" fontFamily="var(--font-mono)" fontSize="8" fill="#fff">EDGE COMPUTE · AI-NODE</text>

          {/* retractable wheels housing */}
          <rect x="155" y="380" width="30" height="20" fill="#3a3a3e" />
          <rect x="415" y="380" width="30" height="20" fill="#3a3a3e" />
          <circle cx="170" cy="400" r="6" fill="#1a1a1c" stroke={isHL("wheel") ? accent : "#3a3a3e"} strokeWidth={isHL("wheel") ? 2 : 1} />
          <circle cx="430" cy="400" r="6" fill="#1a1a1c" stroke={isHL("wheel") ? accent : "#3a3a3e"} strokeWidth={isHL("wheel") ? 2 : 1} />
        </g>

        {/* third-rail contact shoe */}
        <g>
          <rect x="130" y="380" width="20" height="20" fill={isHL("thirdrail") ? accent : "#3a3a3e"} />
          <line x1="130" y1="424" x2="130" y2="400" stroke={isHL("thirdrail") ? accent : "#3a3a3e"} strokeWidth="1.4" />
        </g>

        {/* automatic ramp (deployed if accessibility highlighted) */}
        {isHL("accessibility") && (
          <g>
            <rect x="60" y="395" width="80" height="5" fill={accent} />
            <text x="60" y="392" fontFamily="var(--font-mono)" fontSize="9" fill={accent}>RAMP DEPLOYED</text>
          </g>
        )}
      </g>

      {/* dimension labels */}
      <g fontFamily="var(--font-mono)" fontSize="9" fill="#6c6c70">
        <line x1="130" y1="490" x2="470" y2="490" stroke="#6c6c70" strokeWidth="0.6" />
        <line x1="130" y1="486" x2="130" y2="494" stroke="#6c6c70" strokeWidth="0.6" />
        <line x1="470" y1="486" x2="470" y2="494" stroke="#6c6c70" strokeWidth="0.6" />
        <text x="300" y="502" textAnchor="middle">CAR WIDTH · 3.4 m</text>
      </g>
    </svg>
  );
}

/* ============================================================
   TopDownSVG — bird's-eye view of a 4-car NexRail consist
   Used in funding/specs section
   ============================================================ */
function TopDownSVG({ width = "100%", accent = "var(--accent)" }) {
  return (
    <svg viewBox="0 0 1600 140" width={width}>
      <defs>
        <linearGradient id="tdShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(0,0,0,0.0)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.06)" />
        </linearGradient>
      </defs>
      {/* track */}
      <rect x="0" y="60" width="1600" height="20" fill="#ecebe4" />
      <line x1="0" y1="62" x2="1600" y2="62" stroke="#cfcdc4" strokeWidth="1" />
      <line x1="0" y1="78" x2="1600" y2="78" stroke="#cfcdc4" strokeWidth="1" />
      {/* train cars */}
      {[0, 360, 720, 1080].map((x, i) => {
        const isLead = i === 0;
        return (
          <g key={i}>
            <path
              d={
                isLead
                  ? `M ${x} 70 C ${x} 50, ${x + 60} 30, ${x + 140} 30 L ${x + 320} 30 L ${x + 320} 110 L ${x + 140} 110 C ${x + 60} 110, ${x} 90, ${x} 70 Z`
                  : `M ${x + 6} 30 L ${x + 320} 30 L ${x + 320} 110 L ${x + 6} 110 Z`
              }
              fill="#ffffff"
              stroke="#1a1a1c"
              strokeWidth="1"
            />
            <path
              d={
                isLead
                  ? `M ${x} 70 C ${x} 50, ${x + 60} 30, ${x + 140} 30 L ${x + 320} 30 L ${x + 320} 110 L ${x + 140} 110 C ${x + 60} 110, ${x} 90, ${x} 70 Z`
                  : `M ${x + 6} 30 L ${x + 320} 30 L ${x + 320} 110 L ${x + 6} 110 Z`
              }
              fill="url(#tdShade)"
            />
            <rect x={x + 40} y="68" width="270" height="4" fill={accent} />
            <text x={x + 160} y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="#1a1a1c">
              N-0{i + 1}
            </text>
            {/* doors */}
            {[x + 80, x + 180, x + 280].map((dx) => (
              <rect key={dx} x={dx - 6} y="30" width="12" height="80" fill="none" stroke="#cfcdc4" strokeWidth="0.8" />
            ))}
          </g>
        );
      })}
      <g fontFamily="var(--font-mono)" fontSize="10" fill="#6c6c70">
        <text x="1420" y="80">4-CAR CONSIST · 100 m</text>
      </g>
    </svg>
  );
}

Object.assign(window, { TrainSVG, CrossSectionSVG, TopDownSVG });
