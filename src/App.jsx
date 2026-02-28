import {React, useState, useRef} from 'react'
import NavBar from './pages/NavBar'
import Home from './pages/Home'
import Shop from './pages/Shop.jsx'
import Repair from './pages/Repair.jsx'
import Loading from './pages/Loading.jsx'
import Storage from './pages/Storage.jsx'
import Checklist from './pages/Checklist.jsx'
import {SCREENS} from "./constants"
import Bar from './pages/Bar.jsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
export default function App() {
  const [currentBg, setCurrentBg] = useState('#c7bfb2');
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(null);
  useGSAP(() => {
    if (loading && loadingRef.current){
      const tl = gsap.timeline();
      // Start off-screen to the left then slides back to normal position
      tl.fromTo(
        loadingRef.current,
        { x: '-100%' }, 
        { 
          x: '0%',      
          duration: 0.6,
          ease: 'power2.out'
        }
        // Slide out to the new
      ).to(
        loadingRef.current,
        {
          x: '100%',    
          duration: 0.6,
          ease: 'power2.in',
          delay: 0.3
        }
      );;
  }}, [loading]);

  // Loading starts, screen changes, animation plays, then loading disappears 
  const goTo = (nextScreen) => {
    setLoading(true);
    switch (nextScreen) {
      case SCREENS.HOME:
        setCurrentBg('#c7bfb2');
        break;
      case SCREENS.SHOP:
        setCurrentBg('#e4ab79');
        break;
      case SCREENS.REPAIR:
        setCurrentBg('#d5ccc4');
        break;
      case SCREENS.CHECKLIST:
        setCurrentBg('#f8f2f3');
        break;
    }
    setTimeout(() => {
      setScreen(nextScreen);
      setTimeout(()=>{setLoading(false)},500);
    }, 1000);
  }

  // Conditional rendering, the function that actually renders the screen
  const renderScreen = () => {
    switch (screen) {
      case SCREENS.HOME: 
        return <Home goTo={goTo} />;
      case SCREENS.SHOP:
        return <Shop goTo={goTo} />;
      case SCREENS.REPAIR:
        return <Repair goTo={goTo} />;
      case SCREENS.CHECKLIST:
        return <Checklist goTo={goTo}/>

    }
  }
  // The actual page, this is what actually gets passed back and renders and the core of react
  return (
    <div className="app">
      <NavBar goTo={goTo} current={screen}/>
      <Bar background={currentBg}/>
      <Storage/>
      {loading && <Loading ref={loadingRef}/>}
      {renderScreen()}
    </div>
  );
}