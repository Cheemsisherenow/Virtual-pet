import {React, useEffect} from 'react'
import {SCREEN_LIST} from "../constants/"
import { stats } from '../store'
const NavBar = ({goTo, current}) => {
  // Increases the time plays, since NavBar is always rendered it will always increase the time played
  const {setTimePlayed} = stats();
  useEffect(()=>{
    const timeInterval = setInterval(() => {
      const currentTime = stats.getState().totalTimePlayed;
      const newTime = currentTime + 1;
      setTimePlayed(newTime);
    },1000);
    return () => clearInterval(timeInterval);
  },[])

  // Displaying the different tabs
  return (
    <header>
            <nav>
                <ul>
                    {SCREEN_LIST.map((screen) => (
                        <button 
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