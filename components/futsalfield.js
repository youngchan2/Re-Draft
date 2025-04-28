import React from "react";

const FutsalField = ({ bg = "#0280C6", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1215 800"
      width="100%"
      height="100%"
      style={{ width: "100%", height: "100%" }}
    >
      {/* 외부 필드 */}
      <path
        className={`field-outline ${className}`}
        d="M84.62745439999999 84.36806 H1129.3725456 V706.63194 H84.62745439999999 V84.36806"
        fill={bg}
        stroke="#ffffff"
        strokeLinecap="square"
        strokeWidth="7"
      ></path>

      {/* 내부 라인 */}
      <path
        className={`field-outline ${className}`}
        d="M84.62745439999999 188.78006000000002 A 100 100 0 0 1 189.03145439999997 296.73573999999996				
          M189.03145439999997 296.73573999999996 V494.26426000000004				
          M84.62745439999999 602.21994 A 100 100 0 0 0 189.03145439999997 494.26426000000004
          M606.6474544 84.36806 V706.63194
          M1129.3725456 188.78006000000002 A 100 100 0 0 0 1024.2634544 296.73573999999996				
          M1024.2634544 296.73573999999996 V494.26426000000004				
          M1129.3725456 602.21994 A 100 100 0 0 1 1024.2634544 494.26426000000004
          M606.6474544 395.5 Z"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="square"
        strokeWidth="4"
      ></path>

      {/* 골 라인 */}
      <path
        className={`field-outline ${className}`}
        d="M71.7474 349.77229 H84.62745439999999 V441.22771 H71.7474 Z
          M1142.2526 349.77229 H1129.3725456 V441.22771 H1142.2526 Z"
        fill="url(#grid_4_white)"
        stroke="#ffffff"
        strokeLinecap="square"
        strokeWidth="4"
      ></path>

      {/* 중앙 원 */}
      <circle
        className={`field-outline ${className}`}
        cx="606.6474544"
        cy="395.5"
        r="100"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
      ></circle>

      <circle
        cx="606.6474544"
        cy="395.5"
        r="3.5"
        fill="#ffffff"
        stroke="none"
      ></circle>

      {/* 좌우 골대 */}
      <circle
        cx="189.03145439999997"
        cy="395.5"
        r="3.5"
        fill="#ffffff"
        stroke="none"
      ></circle>
      <circle
        cx="1024.2634544"
        cy="395.5"
        r="3.5"
        fill="#ffffff"
        stroke="none"
      ></circle>

      {/* 로고 텍스트 */}
      <text
        x="919.575864"
        y="684.9269"
        stroke="none"
        fill="#ffffff"
        fontSize="21.245"
        opacity="0.15"
      >
        김영찬
      </text>
    </svg>
  );
};

export default FutsalField;