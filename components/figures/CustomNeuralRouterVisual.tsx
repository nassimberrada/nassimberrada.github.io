"use client";

import React, { useMemo } from "react";

export type RouterTarget = "openai" | "mistral" | "anthropic";

interface CustomNeuralRouterVisualProps {
  gaugeVal: number; // 0.0 (Low Cost) to 0.5 (Balanced) to 1.0 (High Speed)
  onTargetSelect?: (target: RouterTarget) => void;
}

// 2:1 Isometric Projection Helper (ViewBox: 680 x 340)
const CX = 345;
const CY = 175;
const S = 1.35;
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

function iso(x: number, y: number, z: number = 0): [number, number] {
  const sx = CX + (x - y) * COS30 * S;
  const sy = CY + (x + y) * SIN30 * S - z * S;
  return [Number(sx.toFixed(1)), Number(sy.toFixed(1))];
}

// Build isometric slab paths (top, left, right faces)
function isoSlab(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  z0: number,
  z1: number
) {
  const t00 = iso(x0, y0, z1);
  const t10 = iso(x1, y0, z1);
  const t11 = iso(x1, y1, z1);
  const t01 = iso(x0, y1, z1);

  const b00 = iso(x0, y0, z0);
  const b10 = iso(x1, y0, z0);
  const b11 = iso(x1, y1, z0);
  const b01 = iso(x0, y1, z0);

  const top = `M ${t00[0]} ${t00[1]} L ${t10[0]} ${t10[1]} L ${t11[0]} ${t11[1]} L ${t01[0]} ${t01[1]} Z`;
  const right = `M ${t10[0]} ${t10[1]} L ${t11[0]} ${t11[1]} L ${b11[0]} ${b11[1]} L ${b10[0]} ${b10[1]} Z`;
  const left = `M ${t01[0]} ${t01[1]} L ${t11[0]} ${t11[1]} L ${b11[0]} ${b11[1]} L ${b01[0]} ${b01[1]} Z`;

  return { top, left, right, t00, t10, t11, t01, b00, b10, b11, b01 };
}

export function CustomNeuralRouterVisual({
  gaugeVal,
  onTargetSelect,
}: CustomNeuralRouterVisualProps) {
  // Determine heights of the three columns based on gauge position
  const { hOpenAI, hMistral, hAnthropic, activeTarget } = useMemo(() => {
    const g = gaugeVal;

    // Smooth bell-shaped heights
    const wCost = Math.max(0, 1 - 2.8 * g);
    const wBal = Math.max(0, 1 - 3.2 * Math.abs(g - 0.5));
    const wSpeed = Math.max(0, 1 - 2.8 * (1 - g));

    const hOAI = 24 + wCost * 80 + (1 - g) * 10;
    const hMis = 26 + wBal * 82 + (1 - Math.abs(g - 0.5) * 2) * 8;
    const hAnt = 26 + wSpeed * 100 + g * 12;

    let target: RouterTarget = "mistral";
    if (g < 0.33) {
      target = "openai";
    } else if (g > 0.66) {
      target = "anthropic";
    }

    return {
      hOpenAI: Math.round(hOAI),
      hMistral: Math.round(hMis),
      hAnthropic: Math.round(hAnt),
      activeTarget: target,
    };
  }, [gaugeVal]);

  // World coordinates matching the screenshot
  // Left Prompts Tile (Deep enough to frame all cards, calibrated width)
  const leftTileBounds = { x0: -180, y0: -35, x1: -105, y1: 75, z0: -4, z1: 0 };
  const leftSlab = isoSlab(
    leftTileBounds.x0,
    leftTileBounds.y0,
    leftTileBounds.x1,
    leftTileBounds.y1,
    leftTileBounds.z0,
    leftTileBounds.z1
  );

  // Center Router Box
  const routerBounds = { x0: -60, y0: -10, x1: -15, y1: 30, z0: 0, z1: 36 };
  const routerSlab = isoSlab(
    routerBounds.x0,
    routerBounds.y0,
    routerBounds.x1,
    routerBounds.y1,
    routerBounds.z0,
    routerBounds.z1
  );

  // Right White Base Plinth
  const plinthBounds = { x0: 32, y0: -80, x1: 162, y1: 35, z0: -12, z1: 0 };
  const plinthSlab = isoSlab(
    plinthBounds.x0,
    plinthBounds.y0,
    plinthBounds.x1,
    plinthBounds.y1,
    plinthBounds.z0,
    plinthBounds.z1
  );

  // Subtiles geometry on right plinth (3x3 grid)
  const subtileWidth = 34;
  const subtileHeight = 26;
  const subtileGapX = 8;
  const subtileGapY = 8;
  const gridStartX = 42;
  const gridStartY = -72;

  const getSubtile = (row: number, col: number) => {
    const x0 = gridStartX + row * (subtileWidth + subtileGapX);
    const x1 = x0 + subtileWidth;
    const y0 = gridStartY + col * (subtileHeight + subtileGapY);
    const y1 = y0 + subtileHeight;
    return { x0, x1, y0, y1 };
  };

  const antSubtile = getSubtile(0, 0);
  const misSubtile = getSubtile(1, 2);
  const oaiSubtile = getSubtile(2, 1);

  // Strict isometric floor lines (y = 10 constant for exact +30deg angle)
  const pPromptsOut = iso(leftTileBounds.x1, 10, 0);
  const pRouterIn = iso(routerBounds.x0, 10, 0);
  const pRouterOut = iso(routerBounds.x1, 10, 0);
  const pPlinthIn = iso(plinthBounds.x0, 10, 0);

  // Shared origin O of the 3D coordinate system
  const originX = plinthBounds.x1 + 10;
  const originY = plinthBounds.y0 - 6;
  const pOrigin = iso(originX, originY, 0);
  const pZTop = iso(originX, originY, 130);
  const pModelsEnd = iso(originX, plinthBounds.y1 + 18, 0);
  const pProvidersEnd = iso(plinthBounds.x0 - 8, originY, 0);

  return (
    <div className="w-full flex items-center justify-center select-none font-sans">
      <svg
        viewBox="0 0 680 340"
        className="w-full h-auto max-h-[460px] overflow-visible"
        style={{ filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.06))" }}
      >
        <defs>
          <filter id="plinth-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="14"
              floodColor="#000000"
              floodOpacity="0.12"
            />
          </filter>

          <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="5"
              floodColor="#000000"
              floodOpacity="0.08"
            />
          </filter>

          <linearGradient id="vibrant-green-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="vibrant-green-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="vibrant-green-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
        </defs>

        {/* 1. LEFT PROMPT TILE (Deepened floor slab, snug width) */}
        <g filter="url(#plinth-shadow)">
          <path d={leftSlab.left} fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
          <path d={leftSlab.right} fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
          <path
            d={leftSlab.top}
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
        </g>

        {/* 2. STRAIGHT ISOMETRIC LINE FROM PROMPTS TILE TO ROUTER BOX (neutral color) */}
        <line
          x1={pPromptsOut[0]}
          y1={pPromptsOut[1]}
          x2={pRouterIn[0]}
          y2={pRouterIn[1]}
          stroke="var(--foreground)"
          strokeWidth="1.5"
          opacity="0.6"
          strokeLinecap="round"
        />

        {/* 3 STAGGERED INCOMING PROMPT CARDS */}
        <g>
          {/* Card 1 (Back): "Tell me a joke" */}
          <g transform="translate(122, 50)" filter="url(#card-shadow)">
            <rect
              width="88"
              height="26"
              rx="6"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x="44"
              y="16"
              textAnchor="middle"
              fontSize="8"
              fontFamily="sans-serif"
              fontWeight="600"
              fill="var(--muted)"
            >
              Tell me a joke
            </text>
          </g>

          {/* Card 2 (Middle): "Summarize this document" */}
          <g transform="translate(82, 80)" filter="url(#card-shadow)">
            <rect
              width="100"
              height="26"
              rx="6"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x="50"
              y="16"
              textAnchor="middle"
              fontSize="8"
              fontFamily="sans-serif"
              fontWeight="600"
              fill="var(--muted)"
            >
              Summarize this document
            </text>
          </g>

          {/* Card 3 (Front): "What is the capital of Egypt?" */}
          <g transform="translate(48, 110)" filter="url(#card-shadow)">
            <rect
              width="116"
              height="34"
              rx="7"
              fill="var(--card)"
              stroke="var(--foreground)"
              strokeWidth="1.2"
            />
            <text
              x="58"
              y="14"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              What is the capital
            </text>
            <text
              x="58"
              y="26"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              of Egypt?
            </text>
          </g>
        </g>

        {/* 3. CENTER DYNAMIC ROUTER BOX (Green solid prism with "U" logo only) */}
        <g className="transition-all duration-300">
          <path
            d={routerSlab.left}
            fill="url(#vibrant-green-front)"
            stroke="#16a34a"
            strokeWidth="1.2"
          />
          <path
            d={routerSlab.right}
            fill="url(#vibrant-green-side)"
            stroke="#16a34a"
            strokeWidth="1.2"
          />
          <path
            d={routerSlab.top}
            fill="url(#vibrant-green-top)"
            stroke="#22c55e"
            strokeWidth="1.2"
          />

          {/* Clean White "U" Logo on Front Face */}
          {(() => {
            const pFrontCenter = [
              (routerSlab.t01[0] + routerSlab.b11[0]) / 2,
              (routerSlab.t01[1] + routerSlab.b11[1]) / 2,
            ];
            return (
              <g
                transform={`matrix(0.866, 0.5, 0, 1, ${pFrontCenter[0] - 8}, ${
                  pFrontCenter[1] - 8
                })`}
              >
                <path
                  d="M 2 2 L 2 9 A 6 6 0 0 0 14 9 L 14 2"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </g>
            );
          })()}
        </g>

        {/* 4. STRAIGHT ISOMETRIC LINE CONNECTING ROUTER TO MODELS PLINTH (vibrant green) */}
        <g>
          <line
            x1={pRouterOut[0]}
            y1={pRouterOut[1]}
            x2={pPlinthIn[0]}
            y2={pPlinthIn[1]}
            stroke="#22c55e"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle r="3.5" fill="#22c55e" className="animate-pulse">
            <animate
              attributeName="cx"
              from={pRouterOut[0]}
              to={pPlinthIn[0]}
              dur="1.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              from={pRouterOut[1]}
              to={pPlinthIn[1]}
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* 5. RIGHT TILE (Large White Base Plinth) */}
        <g filter="url(#plinth-shadow)">
          <path
            d={plinthSlab.left}
            fill="var(--muted-bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <path
            d={plinthSlab.right}
            fill="var(--background)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <path
            d={plinthSlab.top}
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
        </g>

        {/* 6. PROVIDERS AXIS (RENDERED BEHIND THE COLUMNS IN VISUAL HIERARCHY) */}
        <g>
          <line
            x1={pOrigin[0]}
            y1={pOrigin[1]}
            x2={pProvidersEnd[0]}
            y2={pProvidersEnd[1]}
            stroke="var(--foreground)"
            strokeWidth="1.4"
          />
          <polygon
            points={`${pProvidersEnd[0]},${pProvidersEnd[1]} ${pProvidersEnd[0] + 6},${
              pProvidersEnd[1] + 1
            } ${pProvidersEnd[0] + 3},${pProvidersEnd[1] + 5}`}
            fill="var(--foreground)"
          />
          <text
            x={pProvidersEnd[0] - 10}
            y={pProvidersEnd[1] - 6}
            textAnchor="end"
            fontSize="9"
            fontFamily="sans-serif"
            fontWeight="700"
            fill="var(--foreground)"
          >
            Providers
          </text>
        </g>

        {/* 7. 3x3 SUBTILES ON TOP OF RIGHT PLINTH */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => {
            const isAnt = r === 0 && c === 0;
            const isMis = r === 1 && c === 2;
            const isOAI = r === 2 && c === 1;

            const st = getSubtile(r, c);
            const slab = isoSlab(st.x0, st.y0, st.x1, st.y1, 0, 2);

            if (isAnt || isMis || isOAI) {
              return (
                <path
                  key={`st-${r}-${c}`}
                  d={slab.top}
                  fill="var(--muted-bg)"
                  stroke="var(--border)"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
              );
            }

            return (
              <g key={`st-${r}-${c}`}>
                <path
                  d={slab.left}
                  fill="var(--muted-bg)"
                  stroke="var(--border)"
                  strokeWidth="0.8"
                />
                <path
                  d={slab.right}
                  fill="var(--background)"
                  stroke="var(--border)"
                  strokeWidth="0.8"
                />
                <path
                  d={slab.top}
                  fill="var(--card)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
              </g>
            );
          })
        )}

        {/* 8. THREE RISING GREEN COLUMNS (Depth-sorted back to front, in front of Providers axis) */}

        {/* 8a. ANTHROPIC COLUMN (Back-Left: Row 0, Col 0) */}
        {(() => {
          const st = antSubtile;
          const h = hAnthropic;
          const isSelected = activeTarget === "anthropic";
          const slab = isoSlab(st.x0, st.y0, st.x1, st.y1, 2, h);

          const topMidX = (slab.t01[0] + slab.t11[0]) / 2;
          const topMidY = (slab.t01[1] + slab.t11[1]) / 2;

          return (
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onTargetSelect && onTargetSelect("anthropic")}
            >
              <path
                d={slab.left}
                fill="url(#vibrant-green-front)"
                stroke="#16a34a"
                strokeWidth="1.2"
              />
              <path
                d={slab.right}
                fill="url(#vibrant-green-side)"
                stroke="#16a34a"
                strokeWidth="1.2"
              />
              <path
                d={slab.top}
                fill="url(#vibrant-green-top)"
                stroke="#22c55e"
                strokeWidth="1.4"
              />

              {/* Anthropic "A\" Logo */}
              <g
                transform={`matrix(0.866, 0.5, 0, 1, ${topMidX - 9}, ${topMidY + 6})`}
              >
                <path
                  d="M 2 18 L 8 2 L 14 18 M 4 13 L 12 13 M 17 2 L 17 18"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {isSelected && (
                <path
                  d={slab.top}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })()}

        {/* 8b. MISTRAL COLUMN (Middle-Right: Row 1, Col 2) */}
        {(() => {
          const st = misSubtile;
          const h = hMistral;
          const isSelected = activeTarget === "mistral";
          const slab = isoSlab(st.x0, st.y0, st.x1, st.y1, 2, h);

          const topMidX = (slab.t01[0] + slab.t11[0]) / 2;
          const topMidY = (slab.t01[1] + slab.t11[1]) / 2;

          return (
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onTargetSelect && onTargetSelect("mistral")}
            >
              <path
                d={slab.left}
                fill="url(#vibrant-green-front)"
                stroke="#16a34a"
                strokeWidth="1.2"
              />
              <path
                d={slab.right}
                fill="url(#vibrant-green-side)"
                stroke="#16a34a"
                strokeWidth="1.2"
              />
              <path
                d={slab.top}
                fill="url(#vibrant-green-top)"
                stroke="#22c55e"
                strokeWidth="1.4"
              />

              {/* Mistral Pixelated "M" Logo */}
              <g
                transform={`matrix(0.866, 0.5, 0, 1, ${topMidX - 9}, ${topMidY + 6})`}
              >
                <rect x="0" y="0" width="3.5" height="3.5" fill="#f97316" />
                <rect x="14" y="0" width="3.5" height="3.5" fill="#f97316" />
                <rect x="3.5" y="3.5" width="3.5" height="3.5" fill="#ea580c" />
                <rect x="10.5" y="3.5" width="3.5" height="3.5" fill="#ea580c" />
                <rect x="7" y="7" width="3.5" height="3.5" fill="#eab308" />
                <rect x="0" y="7" width="3.5" height="8" fill="#f97316" />
                <rect x="14" y="7" width="3.5" height="8" fill="#f97316" />
              </g>

              {isSelected && (
                <path
                  d={slab.top}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })()}

        {/* 8c. OPENAI COLUMN (Front-Center: Row 2, Col 1) */}
        {(() => {
          const st = oaiSubtile;
          const h = hOpenAI;
          const isSelected = activeTarget === "openai";
          const slab = isoSlab(st.x0, st.y0, st.x1, st.y1, 2, h);

          const topMidX = (slab.t01[0] + slab.t11[0]) / 2;
          const topMidY = (slab.t01[1] + slab.t11[1]) / 2;

          return (
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onTargetSelect && onTargetSelect("openai")}
            >
              <path
                d={slab.left}
                fill="url(#vibrant-green-front)"
                stroke="#16a34a"
                strokeWidth="1.2"
              />
              <path
                d={slab.right}
                fill="url(#vibrant-green-side)"
                stroke="#16a34a"
                strokeWidth="1.2"
              />
              <path
                d={slab.top}
                fill="url(#vibrant-green-top)"
                stroke="#22c55e"
                strokeWidth="1.4"
              />

              {/* Official OpenAI Rosette/Knot Logo */}
              <g
                transform={`matrix(0.866, 0.5, 0, 1, ${topMidX - 9}, ${topMidY + 5}) scale(0.75)`}
              >
                <path
                  d="M22.28 10.13c-.15-.65-.43-1.26-.82-1.78a5.2 5.2 0 0 0-3.32-2.12c-.22-.64-.59-1.22-1.07-1.71a5.3 5.3 0 0 0-4.04-1.57 5.24 5.24 0 0 0-3.66 1.45c-.53-.17-1.09-.24-1.65-.21a5.23 5.23 0 0 0-4.52 3.14 5.17 5.17 0 0 0-.6 2.37c0 .4.06.8.18 1.18-.5.44-.89 1-1.14 1.63a5.22 5.22 0 0 0 .15 4.39 5.26 5.26 0 0 0 2.45 2.53c.12.6.38 1.16.76 1.65a5.24 5.24 0 0 0 3.73 2.12c.56.2 1.15.25 1.74.15a5.28 5.28 0 0 0 3.63-1.42c.51.15 1.05.21 1.58.17a5.24 5.24 0 0 0 4.54-3.15 5.17 5.17 0 0 0 .59-2.36 5.2 5.2 0 0 0-.17-1.18c.5-.44.89-1 1.14-1.63a5.2 5.2 0 0 0-.15-4.39 5.25 5.25 0 0 0-2.45-2.53zm-8.83 11.23c-1.06 0-2.09-.4-2.86-1.12l.14-.08 4.75-2.74c.2-.12.33-.33.34-.56v-6.7l2.01 1.16v5.6c0 2.45-1.99 4.44-4.38 4.44zm-7.7-4.32c-.52-.89-.79-1.9-.77-2.94.02-1.03.33-2.04.89-2.91l.14.09 4.74 2.74c.2.12.43.12.63 0l5.8-3.35v2.32l-4.85 2.8c-2.12 1.22-4.83.49-6.05-1.63l-.53.88zm-1.06-8.86c.52-.89 1.3-1.6 2.23-2.04l.15.08 4.74 2.74c.2.12.43.12.63 0l5.8-3.35-2.01-1.16h-5.6c-2.45 0-4.44 1.99-4.44 4.44 0 .44.06.88.19 1.3l.31-1.01zm11.75-1.89l-4.75-2.74c-.2-.12-.43-.12-.63 0L5.2 7.07V4.75l4.85-2.8c2.12-1.22 4.83-.49 6.05 1.63.53.91.8 1.94.79 3-.02 1.05-.34 2.07-.92 2.95l-.14-.08zm4.72 7.82c-.52.89-1.3 1.6-2.23 2.04l-.15-.08-4.74-2.74c-.2-.12-.43-.12-.63 0l-5.8 3.35 2.01 1.16h5.6c2.45 0 4.44-1.99 4.44-4.44 0-.44-.06-.88-.19-1.3l-.31 1.01zm-3.37-3.41l-2.88-1.66-2.88 1.66v-3.32l2.88-1.66 2.88 1.66v3.32z"
                  fill="#000000"
                />
              </g>

              {isSelected && (
                <path
                  d={slab.top}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })()}

        {/* 9. FOREGROUND AXES (Models Axis along Y, and Vertical f(Cost, Speed, Quality) Axis along Z) */}
        <g>
          {/* Vertical Axis: f(Cost, Speed, Quality) straight UP from O */}
          <line
            x1={pOrigin[0]}
            y1={pOrigin[1]}
            x2={pZTop[0]}
            y2={pZTop[1]}
            stroke="var(--foreground)"
            strokeWidth="1.4"
          />
          <polygon
            points={`${pZTop[0]},${pZTop[1]} ${pZTop[0] - 3.5},${pZTop[1] + 7} ${
              pZTop[0] + 3.5
            },${pZTop[1] + 7}`}
            fill="var(--foreground)"
          />
          <text
            x={pZTop[0] - 8}
            y={pZTop[1] - 4}
            textAnchor="end"
            fontSize="9"
            fontFamily="sans-serif"
            fontWeight="700"
            fill="var(--foreground)"
          >
            f(Cost, Speed, Quality)
          </text>

          {/* Models Axis: from O along Y-direction */}
          <line
            x1={pOrigin[0]}
            y1={pOrigin[1]}
            x2={pModelsEnd[0]}
            y2={pModelsEnd[1]}
            stroke="var(--foreground)"
            strokeWidth="1.4"
          />
          <polygon
            points={`${pModelsEnd[0]},${pModelsEnd[1]} ${pModelsEnd[0] + 6},${
              pModelsEnd[1] - 2
            } ${pModelsEnd[0] + 2},${pModelsEnd[1] - 6}`}
            fill="var(--foreground)"
          />
          <text
            x={pModelsEnd[0] - 8}
            y={pModelsEnd[1] + 14}
            fontSize="9"
            fontFamily="sans-serif"
            fontWeight="700"
            fill="var(--foreground)"
          >
            Models
          </text>
        </g>
      </svg>
    </div>
  );
}

// Static SVG generator for use as background inside the project's grid card
export function getNeuralRouterCardSvg(): string {
  const leftTileBounds = { x0: -180, y0: -35, x1: -105, y1: 75, z0: -4, z1: 0 };
  const leftSlab = isoSlab(leftTileBounds.x0, leftTileBounds.y0, leftTileBounds.x1, leftTileBounds.y1, leftTileBounds.z0, leftTileBounds.z1);

  const routerBounds = { x0: -60, y0: -10, x1: -15, y1: 30, z0: 0, z1: 36 };
  const routerSlab = isoSlab(routerBounds.x0, routerBounds.y0, routerBounds.x1, routerBounds.y1, routerBounds.z0, routerBounds.z1);

  const plinthBounds = { x0: 32, y0: -80, x1: 162, y1: 35, z0: -12, z1: 0 };
  const plinthSlab = isoSlab(plinthBounds.x0, plinthBounds.y0, plinthBounds.x1, plinthBounds.y1, plinthBounds.z0, plinthBounds.z1);

  const subtileWidth = 34;
  const subtileHeight = 26;
  const subtileGapX = 8;
  const subtileGapY = 8;
  const gridStartX = 42;
  const gridStartY = -72;

  const getSubtile = (row: number, col: number) => {
    const x0 = gridStartX + row * (subtileWidth + subtileGapX);
    const x1 = x0 + subtileWidth;
    const y0 = gridStartY + col * (subtileHeight + subtileGapY);
    const y1 = y0 + subtileHeight;
    return { x0, x1, y0, y1 };
  };

  const antSubtile = getSubtile(0, 0);
  const misSubtile = getSubtile(1, 2);
  const oaiSubtile = getSubtile(2, 1);

  const pPromptsOut = iso(leftTileBounds.x1, 10, 0);
  const pRouterIn = iso(routerBounds.x0, 10, 0);
  const pRouterOut = iso(routerBounds.x1, 10, 0);
  const pPlinthIn = iso(plinthBounds.x0, 10, 0);

  const originX = plinthBounds.x1 + 10;
  const originY = plinthBounds.y0 - 6;
  const pOrigin = iso(originX, originY, 0);
  const pZTop = iso(originX, originY, 130);
  const pModelsEnd = iso(originX, plinthBounds.y1 + 18, 0);
  const pProvidersEnd = iso(plinthBounds.x0 - 8, originY, 0);

  // Column slabs
  const antSlab = isoSlab(antSubtile.x0, antSubtile.y0, antSubtile.x1, antSubtile.y1, 2, 42);
  const misSlab = isoSlab(misSubtile.x0, misSubtile.y0, misSubtile.x1, misSubtile.y1, 2, 92);
  const oaiSlab = isoSlab(oaiSubtile.x0, oaiSubtile.y0, oaiSubtile.x1, oaiSubtile.y1, 2, 30);

  const misTopMidX = (misSlab.t01[0] + misSlab.t11[0]) / 2;
  const misTopMidY = (misSlab.t01[1] + misSlab.t11[1]) / 2;

  const routerFrontMidX = (routerSlab.t01[0] + routerSlab.b11[0]) / 2;
  const routerFrontMidY = (routerSlab.t01[1] + routerSlab.b11[1]) / 2;

  return `
    <svg viewBox="0 0 680 340" class="w-full h-full object-contain select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="card-vg-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#22c55e" />
          <stop offset="100%" stop-color="#16a34a" />
        </linearGradient>
        <linearGradient id="card-vg-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#16a34a" />
          <stop offset="100%" stop-color="#15803d" />
        </linearGradient>
        <linearGradient id="card-vg-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#15803d" />
          <stop offset="100%" stop-color="#166534" />
        </linearGradient>
      </defs>

      <!-- Prompts Base Tile -->
      <path d="${leftSlab.left}" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="0.8" />
      <path d="${leftSlab.right}" fill="currentColor" opacity="0.06" stroke="currentColor" stroke-width="0.8" />
      <path d="${leftSlab.top}" fill="currentColor" opacity="0.12" stroke="currentColor" stroke-width="1" />

      <!-- Neutral Line from Prompts to Router -->
      <line x1="${pPromptsOut[0]}" y1="${pPromptsOut[1]}" x2="${pRouterIn[0]}" y2="${pRouterIn[1]}" stroke="currentColor" stroke-width="1.4" opacity="0.4" />

      <!-- Prompt cards -->
      <g transform="translate(122, 50)">
        <rect width="88" height="26" rx="6" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="0.8" />
      </g>
      <g transform="translate(82, 80)">
        <rect width="100" height="26" rx="6" fill="currentColor" opacity="0.18" stroke="currentColor" stroke-width="0.8" />
      </g>
      <g transform="translate(48, 110)">
        <rect width="116" height="34" rx="7" fill="currentColor" opacity="0.22" stroke="currentColor" stroke-width="1" />
      </g>

      <!-- Router Box -->
      <path d="${routerSlab.left}" fill="url(#card-vg-front)" stroke="#16a34a" stroke-width="1" />
      <path d="${routerSlab.right}" fill="url(#card-vg-side)" stroke="#16a34a" stroke-width="1" />
      <path d="${routerSlab.top}" fill="url(#card-vg-top)" stroke="#22c55e" stroke-width="1" />
      <g transform="matrix(0.866, 0.5, 0, 1, ${routerFrontMidX - 7}, ${routerFrontMidY - 7})">
        <path d="M 2 2 L 2 8 A 5 5 0 0 0 12 8 L 12 2" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" />
      </g>

      <!-- Green Connecting Line -->
      <line x1="${pRouterOut[0]}" y1="${pRouterOut[1]}" x2="${pPlinthIn[0]}" y2="${pPlinthIn[1]}" stroke="#22c55e" stroke-width="2.8" stroke-linecap="round" />

      <!-- Plinth -->
      <path d="${plinthSlab.left}" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1" />
      <path d="${plinthSlab.right}" fill="currentColor" opacity="0.06" stroke="currentColor" stroke-width="1" />
      <path d="${plinthSlab.top}" fill="currentColor" opacity="0.14" stroke="currentColor" stroke-width="1.2" />

      <!-- Providers Axis behind columns -->
      <line x1="${pOrigin[0]}" y1="${pOrigin[1]}" x2="${pProvidersEnd[0]}" y2="${pProvidersEnd[1]}" stroke="currentColor" stroke-width="1.2" opacity="0.6" />

      <!-- Columns -->
      <g class="router-provider-blocks">
      <!-- Anthropic -->
      <path d="${antSlab.left}" fill="url(#card-vg-front)" stroke="#16a34a" stroke-width="1" />
      <path d="${antSlab.right}" fill="url(#card-vg-side)" stroke="#16a34a" stroke-width="1" />
      <path d="${antSlab.top}" fill="url(#card-vg-top)" stroke="#22c55e" stroke-width="1.2" />

      <!-- Mistral -->
      <path d="${misSlab.left}" fill="url(#card-vg-front)" stroke="#16a34a" stroke-width="1" />
      <path d="${misSlab.right}" fill="url(#card-vg-side)" stroke="#16a34a" stroke-width="1" />
      <path d="${misSlab.top}" fill="url(#card-vg-top)" stroke="#22c55e" stroke-width="1.2" />
      <g transform="matrix(0.866, 0.5, 0, 1, ${misTopMidX - 8}, ${misTopMidY + 6})">
        <rect x="0" y="0" width="3" height="3" fill="#f97316" />
        <rect x="12" y="0" width="3" height="3" fill="#f97316" />
        <rect x="3" y="3" width="3" height="3" fill="#ea580c" />
        <rect x="9" y="3" width="3" height="3" fill="#ea580c" />
        <rect x="6" y="6" width="3" height="3" fill="#eab308" />
        <rect x="0" y="6" width="3" height="7" fill="#f97316" />
        <rect x="12" y="6" width="3" height="7" fill="#f97316" />
      </g>

      <!-- OpenAI -->
      <path d="${oaiSlab.left}" fill="url(#card-vg-front)" stroke="#16a34a" stroke-width="1" />
      <path d="${oaiSlab.right}" fill="url(#card-vg-side)" stroke="#16a34a" stroke-width="1" />
      <path d="${oaiSlab.top}" fill="url(#card-vg-top)" stroke="#22c55e" stroke-width="1.2" />
      </g>

      <!-- Foreground Coordinate Axes -->
      <line x1="${pOrigin[0]}" y1="${pOrigin[1]}" x2="${pZTop[0]}" y2="${pZTop[1]}" stroke="currentColor" stroke-width="1.2" opacity="0.6" />
      <line x1="${pOrigin[0]}" y1="${pOrigin[1]}" x2="${pModelsEnd[0]}" y2="${pModelsEnd[1]}" stroke="currentColor" stroke-width="1.2" opacity="0.6" />
    </svg>
  `.trim();
}
