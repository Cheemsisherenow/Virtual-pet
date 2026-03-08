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
  const {add} = Progression();
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
      
    add([
      { target: navRef, position: 8 },
      { target: homeRef, position: 9 },
      { target: shopRef, position: 10 },
      { target: repairRef, position: 11 },
      { target: checklistRef, position: 12 }
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