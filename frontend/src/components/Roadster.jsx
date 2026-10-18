import React from "react";

// Stylized side-view flying Roadster with Starman, spinning wheels and exhaust.
export const Roadster = ({ className = "", showExhaust = true }) => (
  <svg
    viewBox="0 0 260 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {showExhaust && (
      <g>
        <ellipse className="exhaust-puff" cx="16" cy="60" rx="11" ry="6" fill="#00E5FF" opacity="0.55" />
        <ellipse className="exhaust-puff puff-2" cx="6" cy="63" rx="15" ry="7" fill="#FF3B30" opacity="0.4" />
        <ellipse className="exhaust-puff puff-3" cx="27" cy="57" rx="7" ry="4" fill="#FFFFFF" opacity="0.5" />
        <path d="M42 58 C28 51 22 56 30 60 C22 64 30 69 44 62 Z" fill="#FF8A00" />
        <path d="M44 59 C34 56 30 58 36 60 C30 62 37 64 46 61 Z" fill="#FFD400" />
      </g>
    )}
    {/* body */}
    <path d="M40 60 L54 46 L84 34 L140 30 L188 34 L224 48 L242 56 L240 67 L46 67 Z" fill="#E10600" />
    <path
      d="M54 46 L84 34 L140 30 L188 34 L224 48 L242 56 L238 57 L188 46 L142 42 L94 44 L62 52 Z"
      fill="#FF3B30"
      opacity="0.85"
    />
    {/* glass canopy */}
    <path d="M98 34 L138 31 L162 34 L152 45 L106 46 Z" fill="#0B2B33" stroke="#00E5FF" strokeWidth="1.5" />
    {/* starman helmet */}
    <circle cx="172" cy="27" r="9" fill="#F5F5F5" stroke="#00E5FF" strokeWidth="1.5" />
    <path d="M165 26 a7 7 0 0 1 14 0" fill="#0B2B33" opacity="0.65" />
    {/* rocker line */}
    <rect x="42" y="62" width="200" height="5" rx="2" fill="#7A0D07" />
    {/* rear wheel */}
    <g className="wheel">
      <circle cx="82" cy="68" r="15" fill="#111111" stroke="#3A3A3E" strokeWidth="3" />
      <path d="M82 55 V81 M69 68 H95 M73 59 L91 77 M91 59 L73 77" stroke="#3A3A3E" strokeWidth="2" />
      <circle cx="82" cy="68" r="5.5" fill="#00E5FF" />
    </g>
    {/* front wheel */}
    <g className="wheel">
      <circle cx="202" cy="68" r="15" fill="#111111" stroke="#3A3A3E" strokeWidth="3" />
      <path d="M202 55 V81 M189 68 H215 M193 59 L211 77 M211 59 L193 77" stroke="#3A3A3E" strokeWidth="2" />
      <circle cx="202" cy="68" r="5.5" fill="#00E5FF" />
    </g>
    {/* headlight */}
    <path d="M238 54 L248 56 L246 61 L236 59 Z" fill="#00E5FF" />
  </svg>
);
