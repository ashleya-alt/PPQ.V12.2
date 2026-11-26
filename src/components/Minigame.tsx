import React, { useState } from 'react';
import { GameState, EncChoice, MinigameRankRound, MinigamePickRound, MinigameMatchRound } from '../types';
import { T } from '../theme';
import { isMatch, isRank, matchIsCorrect, rankIsCorrect, roundCorrect } from '../game/minigame';

const btn: React.CSSProperties = { marginTop: 14, background: T.gold, color: T.bgDark, border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, cursor: 'pointer' };

/** Rank round: drag items into priority order (arrow buttons for touch/keyboard). */
function RankRound({ round, onLock }: { round: MinigameRankRound; onLock: (correct: boolean) => void }) {
  const [order, setOrder] = useState<number[]>(round.items.map((_, i) => i));
  const [drag, setDrag] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const move = (from: number, to: number) => { if (locked || to < 0 || to >= order.length) return; const o = [...order]; const [x] = o.splice(from, 1); o.splice(to, 0, x); setOrder(o); };
  const correct = rankIsCorrect(round, order);
  return (
    <div>
      <div style={{ fontSize: 14, color: T.textDim, marginBottom: 8 }}>Drag to reorder (or use the arrows). Top = highest priority.</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {order.map((item, pos) => {
          const it = round.items[item];
          const rightPos = round.correctOrder.indexOf(item);
          const border = locked ? (rightPos === pos ? T.green : Math.abs(rightPos - pos) <= 1 ? T.orange : T.red) : drag === pos ? T.gold : T.goldDim + '55';
          return (
            <div key={item} draggable={!locked}
              onDragStart={() => setDrag(pos)} onDragOver={e => { e.preventDefault(); if (drag !== null && drag !== pos) { move(drag, pos); setDrag(pos); } }} onDragEnd={() => setDrag(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: T.bgDark, border: '1px solid ' + border, borderRadius: 10, padding: '8px 10px', cursor: locked ? 'default' : 'grab' }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: T.bgLight, color: T.goldBright, fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pos + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.textBright }}>{it.label}</div>
                {locked && <div style={{ fontSize: 14, color: T.textDim, marginTop: 2 }}>{'Correct slot: #' + (rightPos + 1) + ' \u2014 ' + it.why}</div>}
              </div>
              {!locked && <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <button onClick={() => move(pos, pos - 1)} style={{ background: T.bgLight, color: T.text, border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}>{'\u25B2'}</button>
                <button onClick={() => move(pos, pos + 1)} style={{ background: T.bgLight, color: T.text, border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}>{'\u25BC'}</button>
              </div>}
            </div>
          );
        })}
      </div>
      {!locked && <button style={btn} onClick={() => { setLocked(true); }}>Lock in this order</button>}
      {locked && (
        <div style={{ marginTop: 12, animation: 'fadeIn 0.3s ease' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: correct ? T.green : T.red }}>{correct ? '\u2705 Priorities read correctly.' : '\u274C Priorities out of order.'}</div>
          <div style={{ fontSize: 14, color: T.textDim, marginTop: 4, lineHeight: 1.4 }}>{round.feedback}</div>
          <button style={btn} onClick={() => onLock(correct)}>Continue {'\u2192'}</button>
        </div>
      )}
    </div>
  );
}

/** Match round: assign each concern to an owning executive, then submit the complete slate once. */
function MatchRound({ round, onLock }: { round: MinigameMatchRound; onLock: (correct: boolean) => void }) {
  const [matches, setMatches] = useState<number[]>(round.concerns.map(() => -1));
  const [locked, setLocked] = useState(false);
  const complete = matches.every(x => x >= 0);
  const correct = matchIsCorrect(round, matches);
  return (
    <div>
      <div style={{ fontSize: 14, color: T.textDim, marginBottom: 8 }}>Match every concern to the executive who owns the outcome. Answers stay hidden until you submit the full slate.</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {round.concerns.map((concern, concernIdx) => {
          const right = round.correctMatches[concernIdx];
          const isRight = matches[concernIdx] === right;
          return (
            <div key={concern.label} style={{ background: T.bgDark, border: '1px solid ' + (locked ? (isRight ? T.green : T.red) : T.goldDim + '66'), borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.textBright, marginBottom: 6 }}>{concern.label}</div>
              <select
                aria-label={'Owner for ' + concern.label}
                disabled={locked}
                value={matches[concernIdx]}
                onChange={e => { const next = [...matches]; next[concernIdx] = Number(e.target.value); setMatches(next); }}
                style={{ width: '100%', background: T.bgLight, color: T.textBright, border: '1px solid ' + T.goldDim, borderRadius: 7, padding: '8px 10px', font: 'inherit', fontSize: 14 }}>
                <option value={-1}>Choose an executive…</option>
                {round.executives.map((executive, executiveIdx) => <option key={executive} value={executiveIdx}>{executive}</option>)}
              </select>
              {locked && <div style={{ fontSize: 14, color: isRight ? T.green : T.text, marginTop: 7, lineHeight: 1.4 }}>
                {isRight ? 'Correct' : 'Owner: ' + round.executives[right]}. {concern.why}
              </div>}
            </div>
          );
        })}
      </div>
      {!locked && <button style={{ ...btn, opacity: complete ? 1 : 0.55 }} disabled={!complete} onClick={() => setLocked(true)}>Submit all matches</button>}
      {locked && <div style={{ marginTop: 12, animation: 'fadeIn 0.3s ease' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: correct ? T.green : T.red }}>{correct ? '✅ Every concern has the right owner.' : '❌ At least one concern needs a different owner.'}</div>
        <div style={{ fontSize: 14, color: T.text, marginTop: 4, lineHeight: 1.4 }}>{round.feedback}</div>
        <button style={btn} onClick={() => onLock(correct)}>Continue →</button>
      </div>}
    </div>
  );
}

/** Pick round: choose the best of three. */
function PickRound({ round, onLock }: { round: MinigamePickRound; onLock: (pick: number) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const show = picked !== null;
  return (
    <div>
      <div style={{ display: 'grid', gap: 8 }}>
        {round.options.map((o, i) => {
          const isPick = picked === i;
          const border = show ? (o.correct ? T.green : isPick ? T.red : T.bgLight) : T.goldDim + '55';
          return (
            <button key={i} disabled={show} onClick={() => setPicked(i)}
              style={{ textAlign: 'left', background: isPick ? T.bgLight : T.bgDark, border: '1px solid ' + border, borderRadius: 10, padding: '10px 12px', color: T.text, cursor: show ? 'default' : 'pointer', opacity: show && !isPick && !o.correct ? 0.6 : 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.textBright }}>{show && o.correct ? '\u2705 ' : show && isPick ? '\u274C ' : ''}{o.label}</div>
              {show && (isPick || o.correct) && <div style={{ fontSize: 14, color: T.textDim, marginTop: 4, lineHeight: 1.4 }}>{o.feedback}</div>}
            </button>
          );
        })}
      </div>
      {show && <button style={btn} onClick={() => onLock(picked!)}>Continue {'\u2192'}</button>}
    </div>
  );
}

/** Skill + luck mini-game: pick/rank each round, then roll. Skill decides the outcome tier; the roll shades it. */
export function MinigameCard({ gs, choice, onComplete }: { gs: GameState; choice: EncChoice; onComplete: (picks: number[], correct: number) => void }) {
  const mg = choice.minigame!;
  const [round, setRound] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const correct = picks.filter((p, r) => roundCorrect(mg.rounds[r], p)).length;
  const done = round >= mg.rounds.length;
  const cur = mg.rounds[Math.min(round, mg.rounds.length - 1)];
  const lock = (v: number) => { setPicks([...picks, v]); setRound(round + 1); };
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 20px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ background: T.bgCard, border: '1px solid ' + T.goldDim + '55', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 14, color: T.goldDim, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mini-game {'\u00B7'} {choice.label}</div>
        <h2 style={{ margin: '6px 0 4px', color: T.textBright, fontSize: 20 }}>{mg.title}</h2>
        <p style={{ color: T.text, fontSize: 15, lineHeight: 1.55, marginTop: 0 }}>{mg.intro}</p>
        {mg.openingStatements && <div aria-label="Executive opening statements" style={{ display: 'grid', gap: 7, background: T.bgDark, border: '1px solid ' + T.blue + '55', borderRadius: 10, padding: 12, margin: '12px 0' }}>
          <div style={{ fontSize: 14, color: T.blue, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>What the executives said</div>
          {mg.openingStatements.map(({ speaker, statement }) => <div key={speaker} style={{ fontSize: 14, color: T.text, lineHeight: 1.5 }}><strong style={{ color: T.textBright }}>{speaker}:</strong> {statement}</div>)}
        </div>}
        <div style={{ display: 'flex', gap: 6, margin: '12px 0' }}>
          {mg.rounds.map((r, i) => {
            const st = i < picks.length ? (roundCorrect(r, picks[i]) ? 'ok' : 'bad') : i === round ? 'cur' : 'todo';
            const col = st === 'ok' ? T.green : st === 'bad' ? T.red : st === 'cur' ? T.gold : T.bgLight;
            return <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: col }} />;
          })}
        </div>
        {!done && (
          <div key={round}>
            <div style={{ fontSize: 14, color: T.goldDim, marginBottom: 6 }}>Round {round + 1} of {mg.rounds.length}{isRank(cur) ? ' · prioritize' : isMatch(cur) ? ' · match owners' : ''}</div>
            <div style={{ fontSize: 14, color: T.textBright, fontWeight: 600, marginBottom: 12, lineHeight: 1.5 }}>{cur.prompt}</div>
            {isRank(cur) ? <RankRound round={cur} onLock={c => lock(c ? 1 : 0)} /> : isMatch(cur) ? <MatchRound round={cur} onLock={c => lock(c ? 1 : 0)} /> : <PickRound round={cur} onLock={lock} />}
          </div>
        )}
        {done && (
          <div>
            <div style={{ fontSize: 14, color: T.textBright, fontWeight: 700 }}>{correct} of {mg.rounds.length} meeting decisions landed.</div>
            <div style={{ fontSize: 14, color: T.text, marginTop: 6, lineHeight: 1.5 }}>
              Skill decides the outcome: {correct === mg.rounds.length ? 'a perfect read locks in the best tier regardless of the roll.' : correct >= mg.rounds.length - 1 ? 'one miss caps the outcome one tier down.' : 'too many misses cap the outcome low.'} The roll (+2 per correct read, -2 per miss) only shades the result.
            </div>
            <div style={{ background: T.bgDark, border: '1px solid ' + T.blue + '55', borderRadius: 8, padding: '9px 11px', marginTop: 10 }}>
              <div style={{ fontSize: 12, color: T.blue, fontWeight: 800, textTransform: 'uppercase' }}>What the roll decides</div>
              <div style={{ fontSize: 14, color: T.textBright, marginTop: 3 }}>{mg.rollLabel}</div>
            </div>
            <button style={btn} onClick={() => onComplete(picks, correct)}>{'Roll the dice \u{1F3B2}'}</button>
          </div>
        )}
      </div>
    </div>
  );
}
