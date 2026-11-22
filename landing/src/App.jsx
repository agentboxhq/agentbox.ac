import { useEffect, useLayoutEffect } from 'react';
import startFit from './effects/fit.js';
import startReveal from './effects/reveal.js';
import Cloud from './sections/Cloud.jsx';
import Footer from './sections/Footer.jsx';
import Get from './sections/Get.jsx';
import Hero from './sections/Hero.jsx';
import Inbox from './sections/Inbox.jsx';
import Plans from './sections/Plans.jsx';
import Sync from './sections/Sync.jsx';
import Team from './sections/Team.jsx';
import Thesis from './sections/Thesis.jsx';
import Topbar from './sections/Topbar.jsx';
import Work from './sections/Work.jsx';

/* The page argues one thing in order: people and agents reach you in one place (hero, inbox),
   why that place has to exist (thesis), what a team does in it (work, team), and last
   where the agents come from (anywhere, any harness, the cloud). */
export default function App() {
  // a layout effect, so the page zoom is set before any section's canvas reads it
  useLayoutEffect(startFit, []);
  useEffect(() => startReveal(document), []);

  return (
    <>
      <div className="rails" aria-hidden="true"><i className="rl l" /><i className="rl r" /></div>
      <Topbar />
      <Hero />
      <Inbox />
      <Thesis />
      <Work />
      <Team />
      <Sync />
      <Plans />
      <Cloud />
      <Get />
      <Footer />
    </>
  );
}
