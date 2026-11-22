import { useEffect, useRef } from 'react';
import AppleIcon from '../components/AppleIcon.jsx';
import AppShell, { ListTop, Tabs } from '../components/AppShell.jsx';
import AppWindow from '../components/AppWindow.jsx';
import { Claude, OpenAI } from '../components/Brands.jsx';
import Button from '../components/Button.jsx';
import Who from '../components/Who.jsx';
import GitHubIcon from '../components/GitHubIcon.jsx';
import startDither from '../effects/dither.js';
import { GITHUB_URL } from '../lib/links.js';

/* The inbox as the app opens it, rail folded: what teammates sent and what agents finished, in
   one list. Each sender is a face or an engine's mark and a name, so the rows stay quiet. The
   first row arrives once the window is up: Maya hands it over. */
const AGENT = { claude: Claude, codex: OpenAI };
const ROWS = [
  { title: 'Checkout fails for some carts', note: 'Maya gave you this', from: 'Maya Chen', who: 'maya', status: 'Waiting on you', age: '2 min ago', arrive: true },
  { title: 'Can an agent take the Android sign-in bug?', from: 'Sam Ortiz', who: 'sam', status: 'Message', age: '4 min ago' },
  { title: 'Retry failed Stripe webhooks', from: 'Claude Code', agent: 'claude', status: 'Answered', age: '6 min ago' },
  { title: 'Looks right to me. Ship it once the tests pass.', from: 'Maya Chen', who: 'maya', status: 'Message', age: '12 min ago' },
  { title: 'Sign in loops back to the start on Android', from: 'Codex', agent: 'codex', status: 'Answered', age: '18 min ago' },
  { title: 'Pricing page, layouts A and B', from: 'Sam Ortiz', who: 'sam', status: 'Shared a file', age: '26 min ago' },
  { title: 'Release notes for today', from: 'Codex', agent: 'codex', status: 'Answered', age: '31 min ago' },
];

function Row({ title, note, from, who, agent, status, age, arrive }) {
  const Logo = AGENT[agent];
  return (
    <div className={arrive ? 'hrw arrive' : 'hrw'}>
      <div className="hrwi">
        <span className="hrt">{title}{note && <em>{note}</em>}</span>
        <span className="hrf">{Logo ? <i className={agent}><Logo /></i> : <Who who={who} size={22} />}{from}</span>
        <span className="hrs">{status}</span>
        <span className="hra">{age}</span>
      </div>
    </div>
  );
}

function HeroInbox() {
  return (
    <div className="hbz gl2">
      <AppWindow>
        <AppShell>
          <ListTop />
          <Tabs on="needs" needs="7" progress="5" />
          <div className="hrh"><span>Thread</span><span>From</span><span>Status</span><span>Sent</span></div>
          {ROWS.map(r => <Row key={r.title} {...r} />)}
        </AppShell>
      </AppWindow>
    </div>
  );
}

export default function Hero() {
  const canvas = useRef(null);
  useEffect(() => startDither(canvas.current), []);

  return (
    <header className="hero">
      <canvas ref={canvas} className="dither" aria-hidden="true" />
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h1 className="rv d1">Talk to your whole team, humans and agents alike.</h1>
        <p className="sub rv d1">The messaging app built for teams that work with agents.</p>
        <div className="cta rv d2">
          <Button href="/download"><AppleIcon />Download for Mac</Button>
          <Button tone="glass" href={GITHUB_URL}><GitHubIcon />Star on GitHub</Button>
        </div>
      </div>
      <div className="wrap hshot rv d3" aria-hidden="true"><HeroInbox /></div>
    </header>
  );
}
