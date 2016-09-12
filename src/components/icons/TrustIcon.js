import React from 'react';

export const TrustIcon = ({ fill = "#f37152" , stroke = "#f37152", wh = "100%" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.43 98.43" style={{ width: wh, height: wh }}>
    <title>prod-trust</title>
    <path d="M40.79,66.13,14,92.92a3.18,3.18,0,0,1-4.48,0l-1.6-1.6a3.18,3.18,0,0,1,0-4.48L35.76,59c-1.12-1.27-2.48-2.37-3.62-3.45L4.39,83.3a8.18,8.18,0,0,0,0,11.55L6,96.46a8.18,8.18,0,0,0,11.55,0L44.36,69.64C43.35,68.29,41.36,67.93,40.79,66.13Z" transform="translate(-2 -0.42)" style={{ "fill": fill }} />
    <circle cx="60.78" cy="37.64" r="35.14" style={{ ...style.base, "stroke": stroke }} />
    <path d="M26.26,65.33a35.34,35.34,0,0,0,10.3,9.93" transform="translate(-2 -0.42)" style={{ ...style.base, "stroke": stroke }} />
  </svg>
);

const style = {
  base: {
    "fill":"none",
    "strokeLinecap":"round",
    "strokeMiterlimit":10,
    "strokeWidth": "5px"
  }
};