import React from 'react';

export const T = {
  bg: '#0f0b06',
  bgCard: '#1a1510',
  bgLight: '#2a2218',
  bgDark: '#0a0804',
  gold: '#e0bd58',
  goldDim: '#b89a47',
  goldBright: '#f4d96b',
  text: '#eee3cc',
  textDim: '#c1b59d',
  textBright: '#fff8e8',
  purple: '#b8a9ff',
  red: '#ff7777',
  green: '#6fd58a',
  blue: '#8ab4ff',
  orange: '#ffb75d',
};

export const S = {
  panel: {
    background: T.bgDark,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    border: '1px solid ' + T.goldDim + '33',
  } as React.CSSProperties,
  tag: {
    fontSize: 12,
    fontWeight: 700 as const,
    color: T.goldDim,
    textTransform: 'uppercase' as const,
    marginBottom: 8,
  },
  btn: {
    background: 'linear-gradient(135deg,' + T.gold + ',' + T.goldDim + ')',
    color: T.bgDark,
    border: 'none',
    borderRadius: 10,
    padding: '14px',
    fontSize: 14,
    fontWeight: 800,
  } as React.CSSProperties,
};

export const GCSS = `
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:${T.bg};color:${T.text};overflow-wrap:break-word;font-size:16px}
div,span,p{overflow-wrap:break-word}
	button,select{color-scheme:dark}
	.game-header,.header-primary,.header-secondary,.score-strip{flex-wrap:wrap}
.game-header{gap:8px}.header-primary,.header-secondary{min-width:0}.score-strip{row-gap:6px}
.score-number{white-space:nowrap;word-break:keep-all;overflow-wrap:normal;min-width:4ch;font-variant-numeric:tabular-nums}
	@media(max-width:480px){.game-header>div{width:100%}.header-secondary{justify-content:space-between}.score-strip{justify-content:flex-start}.score-row{gap:10px;align-items:flex-start;flex-wrap:wrap}.score-label{min-width:0;flex:1 1 220px}.score-number{flex:0 0 auto}}
button{font-family:inherit;cursor:pointer}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:${T.goldDim};border-radius:3px}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes diceRoll{0%{transform:rotate(0deg) scale(1)}25%{transform:rotate(90deg) scale(1.1)}50%{transform:rotate(180deg) scale(1)}75%{transform:rotate(270deg) scale(1.1)}100%{transform:rotate(360deg) scale(1)}}
`;
