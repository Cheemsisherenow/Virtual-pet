import {React, useEffect,useRef} from 'react'
import {SCREEN_LIST} from "../constants/"
import { stats } from '../store'
import Progression from './Progression';
const NavBar = ({goTo, current}) => {
  // Increases the time plays, since NavBar is always rendered it will always increase the time played
  const {setTimePlayed} = stats();
  const navRef = useRef(null);
  useEffect(()=>{
    const timeInterval = setInterval(() => {
      const currentTime = stats.getState().totalTimePlayed;
      const newTime = currentTime + 1;
      setTimePlayed(newTime);
    },1000);
    return () => clearInterval(timeInterval);
  },[])
  const {update} = Progression();
  const homeRef = useRef(null)
  const shopRef = useRef(null)
  const repairRef = useRef(null)
  const checklistRef = useRef(null)
  const screenRefs = {
    "home": homeRef,
    "shop": shopRef,
    "repair": repairRef,
    "checklist": checklistRef
  }
  useEffect(() => {
      
    update([
      { target: navRef, position: 9, text: "This is your navigation bar, it will be how you can go to other locations and tabs." },
      { target: homeRef, position: 10, text: "This is the home tab, click this to return back to your Chainchilla when you are in another tab!" },
      { target: shopRef, position: 11, text: "This is the shop tab, this is where you can get the resources and materials to keep your Chainchilla healthy and alive!" },
      { target: repairRef, position: 12, text: "This is the repair tab, the mechanic here will repair your Chainchilla's health and you need to go here to restore his health and give the Chainchilla a checkup when his health is low." },
      { target: checklistRef, position: 13, text: "This is the checklist tab, where you can see the ingame stats." }
    ])
  }, [])

  // Displaying the different tabs
  return (
    <header ref={navRef}>
            <nav>
                <ul>
                    {SCREEN_LIST.map((screen) => (
                        <button
                        ref={screenRefs[screen]} 
                        key = {screen} 
                        onClick = {() => goTo(screen)}
                        disabled={current === screen}>
                            {screen}
                        </button>
                    ))}
                </ul>
            </nav>
    </header>
  )
}

export default NavBar
//9x100