import React from 'react';

export const AskIcon = ({ fill = "#f37152" , stroke = "#f37152", wh = "100%" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.86 101.4" style={{ width: wh, height: wh }}>
    <title>prod-ask</title>
    <path d="M17.83,36.49a32.93,32.93,0,1,1,65.86,0" transform="translate(-15.33 -1.06)" style={{ ...style.base, "stroke": stroke }}/>
    <path d="M83.69,34.28c0,29.25-20.87,25.17-20.87,50.57a15.12,15.12,0,0,1-30.24,0" transform="translate(-15.33 -1.06)" style={{ ...style.base, "stroke": stroke }} />
    <circle cx="32.69" cy="83.4" r="4" style={{ "fill": fill }} />
    <path d="M40.07,25.8A15.12,15.12,0,1,1,61.46,47.18S48,58.77,48,69.42" transform="translate(-15.33 -1.06)" style={{ ...style.base, "stroke": stroke }}/>
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