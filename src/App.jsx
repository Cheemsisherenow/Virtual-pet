import {React, useState, useRef,useEffect} from 'react'
import NavBar from './pages/NavBar'
import Home from './pages/Home'
import Shop from './pages/Shop.jsx'
import Repair from './pages/Repair.jsx'
import Loading from './pages/Loading.jsx'
import Storage from './pages/Storage.jsx'
import Checklist from './pages/Checklist.jsx'
import {SCREENS} from "./constants"
import Bar from './pages/StatBar.jsx'
import gsap from 'gsap'
import Tutorial from './pages/Tutorial.jsx'
import { useGSAP } from '@gsap/react'
import Progression from './pages/Progression.jsx'
import StartPage from './pages/StartPage.jsx'
import { useStart } from './store/index.js'
export default function App() {
  const [currentBg, setCurrentBg] = useState('#c7bfb2');
  const storageRef = useRef(null);
  const navRef = useRef(null);
  const {startPage, setStartPage} = useStart();
  const { isActive1, isActive2, isActive3, isActive4, setCurrentStep, update, steps, currentStep, add, start1, start2, start3, start4} = Progression();
  const hasStartedHome = useRef(false)
  const hasStartedShop = useRef(false)
  const hasStartedRepair = useRef(false)
  const hasStartedCheckList = useRef(false)
  
  useEffect(() => {
      
    add(
      Array.from({ length: 25 }, (_, i) => ({ target: null, position: i, text: null }))
    )
    update([
      { target: storageRef, position: 2, text: "Here is your storage, this is where all your items will be stored which you can use on the Chainchilla." },
    ])
      start1()
    }, [])
    
  const step = steps[currentStep]
  const [screen, setScreen] = useState(SCREENS.START);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(null);
  useEffect(() => {
    if (screen === SCREENS.HOME && !hasStartedHome.current) {
      hasStartedHome.current = true 
    }
    if (screen === SCREENS.SHOP && !hasStartedShop.current) {
      hasStartedShop.current = true 
      start2()
    }
    else if (screen === SCREENS.REPAIR && !hasStartedRepair.current) {
      hasStartedRepair.current = true 
      start3()
    }
    else if (screen === SCREENS.CHECKLIST && !hasStartedCheckList.current) {
      hasStartedCheckList.current = true 
      start4()
    }
  }, [screen])
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
      case SCREENS.START:
        setStartPage(true);
        break;
      case SCREENS.HOME:
        setCurrentBg('#c7bfb2');
        if (!hasStartedHome.current) setCurrentStep(0);
        else setCurrentStep(1);
        console.log(currentStep)
        break;
      case SCREENS.SHOP:
        setCurrentStep(13);
        setCurrentBg('#e4ab79');
        break;
      case SCREENS.REPAIR:
        setCurrentStep(19);
        setCurrentBg('#d5ccc4');
        break;
      case SCREENS.CHECKLIST:
        setCurrentStep(22);
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
      case SCREENS.START: 
        return <StartPage goTo={goTo} />;
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
      
      {!startPage && (
        <>
          <NavBar goTo={goTo} current={screen}/>
          <Bar background={currentBg}/>
          <Storage ref={storageRef}/>
          {(isActive1 || isActive2 || isActive3 || isActive4) && step && step.target && <Tutorial targetRef={step.target} />}
        </>)}
      
      {loading && <Loading ref={loadingRef}/>}
      {renderScreen()}
    </div>
  );
}