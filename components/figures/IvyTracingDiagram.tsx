"use client";

import React from "react";

export function IvyTracingDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            AST Graph Tracing &amp; Cross-Framework Compilation Engine
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Reference: Example of Graph Tracing · Unifying Framework Fragmentation
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 920 460"
          className="w-full min-w-[820px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            <marker
              id="tracing-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--muted)" opacity="0.8" />
            </marker>
            <marker
              id="tracing-arrow-green"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
            <marker
              id="tracing-arrow-orange"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f97316" />
            </marker>
          </defs>

          {/* ============================================================= */}
          {/* COLUMN 1: Compiling the Source Graph                          */}
          {/* ============================================================= */}
          <g transform="translate(20, 20)">
            <text
              x="120"
              y="22"
              textAnchor="middle"
              fontSize="12.5"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              Compiling the Source Graph
            </text>

            {/* Source Code Box */}
            <rect
              x="15"
              y="40"
              width="210"
              height="74"
              rx="8"
              fill="var(--muted-bg)"
              stroke="var(--border)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            <text
              x="28"
              y="60"
              fontSize="11"
              fontFamily="monospace"
              fill="#ef4444"
              fontWeight="600"
            >
              def <tspan fill="var(--foreground)">linear(w, x, b):</tspan>
            </text>
            <text
              x="42"
              y="78"
              fontSize="11"
              fontFamily="monospace"
              fill="var(--foreground)"
            >
              ret = w @ x + b
            </text>
            <text
              x="42"
              y="96"
              fontSize="11"
              fontFamily="monospace"
              fill="#ef4444"
              fontWeight="600"
            >
              return <tspan fill="var(--foreground)">ret</tspan>
            </text>

            {/* Downward Block Arrow */}
            <path
              d="M 112 120 L 128 120 L 128 142 L 138 142 L 120 160 L 102 142 L 112 142 Z"
              fill="var(--muted-bg)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />

            {/* Source Graph: Top Nodes (Inputs) */}
            <g transform="translate(15, 175)">
              {/* Node w */}
              <rect
                x="0"
                y="0"
                width="34"
                height="28"
                rx="6"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              <text
                x="17"
                y="18"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                w
              </text>

              {/* Node x */}
              <rect
                x="50"
                y="0"
                width="34"
                height="28"
                rx="6"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              <text
                x="67"
                y="18"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                x
              </text>

              {/* Node b */}
              <rect
                x="150"
                y="0"
                width="34"
                height="28"
                rx="6"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              <text
                x="167"
                y="18"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                b
              </text>

              {/* Lines from inputs to jnp.matmul */}
              <line x1="17" y1="28" x2="35" y2="60" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow)" />
              <line x1="67" y1="28" x2="55" y2="60" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow)" />

              {/* jnp.matmul */}
              <rect
                x="10"
                y="60"
                width="84"
                height="32"
                rx="6"
                fill="#818cf8"
                fillOpacity="0.2"
                stroke="#6366f1"
                strokeWidth="1.3"
              />
              <text
                x="52"
                y="80"
                textAnchor="middle"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                jnp.matmul
              </text>

              {/* Lines to jnp.add */}
              <line x1="52" y1="92" x2="80" y2="124" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow)" />
              <line x1="167" y1="28" x2="125" y2="124" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow)" />

              {/* jnp.add */}
              <rect
                x="65"
                y="124"
                width="80"
                height="32"
                rx="6"
                fill="#818cf8"
                fillOpacity="0.2"
                stroke="#6366f1"
                strokeWidth="1.3"
              />
              <text
                x="105"
                y="144"
                textAnchor="middle"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                jnp.add
              </text>

              {/* Line to ret */}
              <line x1="105" y1="156" x2="105" y2="182" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow)" />

              {/* ret node */}
              <rect
                x="85"
                y="182"
                width="40"
                height="28"
                rx="6"
                fill="var(--card)"
                stroke="#6366f1"
                strokeWidth="1.5"
              />
              <text
                x="105"
                y="200"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                ret
              </text>
            </g>

            {/* Bottom explanation */}
            <text
              x="120"
              y="405"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="sans-serif"
              fill="var(--muted)"
            >
              The graph compiler <tspan fontWeight="700" fill="var(--foreground)">extracts a static graph</tspan>
            </text>
            <text
              x="120"
              y="418"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="sans-serif"
              fill="var(--muted)"
            >
              from the source code to be transpiled
            </text>
          </g>

          {/* ============================================================= */}
          {/* COLUMN 2: Updating Functions & Converting Arguments           */}
          {/* (Enclosed in Emerald Tinted Container)                        */}
          {/* ============================================================= */}
          <g transform="translate(270, 20)">
            <rect
              x="0"
              y="0"
              width="370"
              height="425"
              rx="12"
              fill="#10b981"
              fillOpacity="0.06"
              stroke="#10b981"
              strokeOpacity="0.25"
              strokeWidth="1.2"
            />

            {/* Sub-header 1: Updating the Functions */}
            <rect
              x="15"
              y="12"
              width="155"
              height="30"
              rx="6"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x="92"
              y="31"
              textAnchor="middle"
              fontSize="11"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              Updating the Functions
            </text>

            {/* Sub-header 2: Converting the Arguments */}
            <rect
              x="185"
              y="12"
              width="170"
              height="30"
              rx="6"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x="270"
              y="31"
              textAnchor="middle"
              fontSize="11"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              Converting the Arguments
            </text>

            {/* Left Section of Col 2: Graph with Ivy Frontend Functions */}
            <g transform="translate(18, 55)">
              {/* Inputs */}
              <rect x="0" y="0" width="30" height="26" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="15" y="17" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">w</text>

              <rect x="42" y="0" width="30" height="26" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="57" y="17" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">x</text>

              <rect x="84" y="0" width="30" height="26" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="99" y="17" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">b</text>

              {/* Connecting lines from inputs to frontend ops */}
              <line x1="15" y1="26" x2="35" y2="55" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-green)" />
              <line x1="57" y1="26" x2="45" y2="55" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-green)" />
              <line x1="99" y1="26" x2="105" y2="120" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-green)" />

              {/* ivy.frontends.jax.numpy.matmul */}
              <rect
                x="2"
                y="55"
                width="72"
                height="46"
                rx="6"
                fill="#10b981"
                fillOpacity="0.22"
                stroke="#10b981"
                strokeWidth="1.2"
              />
              <text x="38" y="70" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="var(--foreground)">ivy.frontends</text>
              <text x="38" y="82" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="var(--foreground)">.jax.numpy</text>
              <text x="38" y="94" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="700" fill="#10b981">.matmul</text>

              {/* ivy.frontends.jax.numpy.add */}
              <rect
                x="80"
                y="120"
                width="72"
                height="46"
                rx="6"
                fill="#10b981"
                fillOpacity="0.22"
                stroke="#10b981"
                strokeWidth="1.2"
              />
              <text x="116" y="135" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="var(--foreground)">ivy.frontends</text>
              <text x="116" y="147" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="var(--foreground)">.jax.numpy</text>
              <text x="116" y="159" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="700" fill="#10b981">.add</text>

              {/* Line from matmul to add */}
              <line x1="38" y1="101" x2="80" y2="135" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-green)" />

              {/* Line from add to ret */}
              <line x1="116" y1="166" x2="77" y2="200" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-green)" />

              {/* ret */}
              <rect x="52" y="200" width="40" height="28" rx="6" fill="var(--card)" stroke="#10b981" strokeWidth="1.5" />
              <text x="72" y="218" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">ret</text>
            </g>

            {/* Right Section of Col 2: Converting the Arguments (Boxes & Conversion Arrow) */}
            <g transform="translate(182, 55)">
              {/* Box 1: Source JAX arguments */}
              <rect
                x="0"
                y="0"
                width="175"
                height="80"
                rx="6"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text x="8" y="16" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                args = (<tspan fill="#6366f1" fontWeight="700">jnp.array</tspan>([[1., 0.],
              </text>
              <text x="48" y="29" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                [0., 1.]]),
              </text>
              <text x="8" y="44" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<tspan fill="#6366f1" fontWeight="700">jnp.array</tspan>([[4., 1.],
              </text>
              <text x="48" y="57" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                [2., .]]))
              </text>
              <text x="8" y="72" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                kwargs = {`{"b": 5}`}
              </text>

              {/* Downward Argument Conversion Block Arrow */}
              <path
                d="M 80 92 L 95 92 L 95 125 L 105 125 L 87 145 L 70 125 L 80 125 Z"
                fill="var(--muted-bg)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />

              {/* Box 2: Converted PyTorch arguments */}
              <rect
                x="0"
                y="155"
                width="175"
                height="80"
                rx="6"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text x="8" y="171" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                args = (<tspan fill="#ea580c" fontWeight="700">torch.tensor</tspan>([[1., 0.],
              </text>
              <text x="48" y="184" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                [0., 1.]]),
              </text>
              <text x="8" y="199" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<tspan fill="#ea580c" fontWeight="700">torch.tensor</tspan>([[4., 1.],
              </text>
              <text x="48" y="212" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                [2., .]]))
              </text>
              <text x="8" y="227" fontSize="9" fontFamily="monospace" fill="var(--foreground)">
                kwargs = {`{"b": 5}`}
              </text>
            </g>

            {/* Bottom explanation */}
            <text
              x="185"
              y="385"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="sans-serif"
              fill="var(--muted)"
            >
              The native functions are <tspan fontWeight="700" fill="var(--foreground)">replaced</tspan> with frontend counterparts,
            </text>
            <text
              x="185"
              y="400"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="sans-serif"
              fill="var(--muted)"
            >
              and native arrays with target framework arrays
            </text>
          </g>

          {/* Large Horizontal Block Arrow Connecting Column 2 -> Column 3 */}
          <path
            d="M 645 205 L 685 205 L 685 195 L 705 215 L 685 235 L 685 225 L 645 225 Z"
            fill="var(--muted-bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />

          {/* ============================================================= */}
          {/* COLUMN 3: Compiling the Target Graph                          */}
          {/* ============================================================= */}
          <g transform="translate(685, 20)">
            <text
              x="120"
              y="22"
              textAnchor="middle"
              fontSize="12.5"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              Compiling the Target Graph
            </text>

            {/* Target Graph: Inputs at top */}
            <g transform="translate(20, 60)">
              {/* Node w */}
              <rect x="0" y="0" width="34" height="28" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1.2" />
              <text x="17" y="18" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">w</text>

              {/* Node x */}
              <rect x="50" y="0" width="34" height="28" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1.2" />
              <text x="67" y="18" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">x</text>

              {/* Node b */}
              <rect x="150" y="0" width="34" height="28" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1.2" />
              <text x="167" y="18" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">b</text>

              {/* Lines from inputs to torch.matmul */}
              <line x1="17" y1="28" x2="35" y2="70" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-orange)" />
              <line x1="67" y1="28" x2="55" y2="70" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-orange)" />

              {/* torch.matmul */}
              <rect
                x="10"
                y="70"
                width="90"
                height="34"
                rx="6"
                fill="#fb923c"
                fillOpacity="0.2"
                stroke="#ea580c"
                strokeWidth="1.3"
              />
              <text
                x="55"
                y="91"
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                torch.matmul
              </text>

              {/* Lines to torch.add */}
              <line x1="55" y1="104" x2="85" y2="145" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-orange)" />
              <line x1="167" y1="28" x2="135" y2="145" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-orange)" />

              {/* torch.add */}
              <rect
                x="75"
                y="145"
                width="84"
                height="34"
                rx="6"
                fill="#fb923c"
                fillOpacity="0.2"
                stroke="#ea580c"
                strokeWidth="1.3"
              />
              <text
                x="117"
                y="166"
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                torch.add
              </text>

              {/* Line to ret */}
              <line x1="117" y1="179" x2="117" y2="215" stroke="var(--border)" strokeWidth="1.2" markerEnd="url(#tracing-arrow-orange)" />

              {/* ret node */}
              <rect
                x="97"
                y="215"
                width="40"
                height="28"
                rx="6"
                fill="var(--card)"
                stroke="#ea580c"
                strokeWidth="1.5"
              />
              <text
                x="117"
                y="233"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                ret
              </text>
            </g>

            {/* Bottom explanation */}
            <text
              x="120"
              y="405"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="sans-serif"
              fill="var(--muted)"
            >
              Finally, the compiler <tspan fontWeight="700" fill="var(--foreground)">extracts the target graph</tspan>
            </text>
            <text
              x="120"
              y="418"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="sans-serif"
              fill="var(--muted)"
            >
              by tracing functions in the target backend API
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
