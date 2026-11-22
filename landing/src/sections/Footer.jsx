import { useEffect, useRef } from 'react';
import Button from '../components/Button.jsx';
import Mark from '../components/Mark.jsx';
import startBitmap from '../effects/bitmap.js';
import { GITHUB_URL } from '../lib/links.js';

const COLUMNS = [
  ['Product', [['/download', 'Download for Mac'], ['#get', 'Run on Linux'], ['#one-inbox', 'One inbox'], ['#work', 'Hand off and share'], ['#team', 'Multiplayer'], ['#cloud', 'Agentcloud']]],
  ['Open source', [[GITHUB_URL, 'GitHub'], [`${GITHUB_URL}/issues`, 'Report a bug'], ['/conductor-alternative', 'Conductor alternatives'], ['/vibe-kanban-alternative', 'Vibe Kanban alternatives']]],
];

/* statement and links, a hairline, the wordmark edge to edge, a hairline, the small print */
export default function Footer() {
  const wm = useRef(null);
  useEffect(() => startBitmap(wm.current), []);
  return (
    <footer className="foot">
      <div className="wrap top">
        <div>
          <h2 className="h2">One place for your<br />team and its agents.</h2>
          <div className="acts">
            <Button href="/download">Download for Mac</Button>
            <Button tone="glass" href={GITHUB_URL}>Star on GitHub</Button>
          </div>
        </div>
        {COLUMNS.map(([heading, links]) => (
          <nav key={heading}>
            <div className="hint">{heading}</div>
            {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
        ))}
      </div>
      <div className="sep" />
      <div ref={wm} className="wrap wm" aria-label="Agentbox"><span className="wmk"><Mark tone="ink" /><i /></span><span>Agentbox</span></div>
      <div className="sep" />
      <div className="wrap bar">
        <span>© 2026 Agentbox. Free and open source.</span>
        <nav><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href={GITHUB_URL}>GitHub</a></nav>
      </div>
    </footer>
  );
}
