import React from "react";

const SoccerField = ({bg1 = "#5E9D44", bg2 = "#72A653"}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1215 800"
      width="100%"
      height="100%"
    >
      {/* 필드 배경 */}
      <path
        d="M84.62745439999999 84.36806 H1129.3725456 V706.63194 H84.62745439999999 V84.36806"
        fill={bg1}
        stroke="none"
      ></path>
      {/* 필드 구분선 */}
      <path
        d="M84.62745439999999 84.36806 H189.03145439999997 V706.63194 H84.62745439999999 V84.36806
           M293.43545439999997 84.36806 H397.83945439999997 V706.63194 H293.43545439999997 V84.36806
           M502.24345439999996 84.36806 H606.6474544 V706.63194 H502.24345439999996 V84.36806
           M711.0514544 84.36806 H815.4554544 V706.63194 H711.0514544 V84.36806
           M919.8594544 84.36806 H1024.2634544 V706.63194 H919.8594544 V84.36806
           M1128.6674544 84.36806 H1129.3725456 V706.63194 H1128.6674544 V84.36806"
        fill={bg2}
        stroke="none"
        strokeLinecap="square"
      ></path>
      {/* 외곽 라인 */}
      <path
        className="field-outline"
        d="M84.62745439999999 84.36806 H1129.3725456 V706.63194 H84.62745439999999 V84.36806"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="square"
        strokeWidth="7"
      ></path>
      {/* 경기장 내부 라인 */}
      <path
        className="field-outline"
        d="M84.62745439999999 188.78006000000002 H253.1005472 V602.21994 H84.62745439999999
           M84.62745439999999 296.73573999999996 H144.17580544 V494.26426000000004 H84.62745439999999
           M254.1601264 319.52445 A 95.362128 95.362128 0 0 1 254.1601264 471.47555
           M607 84.36806 V706.63194
           M960.8994528000001 188.78006000000002 H1129.3725456 V602.21994 H960.8994528000001 V188.78006000000002
           M1069.82419456 296.73573999999996 H1129.3725456 V494.26426000000004 H1069.82419456 V296.73573999999996
           M959.8398736 319.52445 A 95.362128 95.362128 0 0 0 959.8398736 471.47555
           M607 395.5 Z"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="square"
        strokeWidth="4"
      ></path>
      {/* 골 라인 */}
      <path
        className="field-outline"
        d="M84.62745439999999 349.77229 H71.7474 V441.22771 H84.62745439999999
           M1129.3725456 349.77229 H1142.2526 V441.22771 H1129.3725456"
        fill="url(#grid_3_white)"
        stroke="#ffffff"
        strokeLinecap="square"
        strokeWidth="4"
      ></path>
      {/* 중앙 원 */}
      <circle
        className="field-outline"
        cx="607"
        cy="395.5"
        r="100.97789776"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
      ></circle>
      <circle
        className="field-outline"
        cx="607"
        cy="395.5"
        r="3.4327064"
        fill="#ffffff"
        stroke="none"
      ></circle>
      {/* 좌우 골대 */}
      <circle
        className="field-outline"
        cx="194.71773328"
        cy="395.5"
        r="3.4327064"
        fill="#ffffff"
        stroke="none"
      ></circle>
      <circle
        className="field-outline"
        cx="1019.28226672"
        cy="395.5"
        r="3.4327064"
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

export default SoccerField;