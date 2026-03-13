//import libraries
import {React, useEffect, useRef} from 'react'
import {inGameVariables} from "../store"
import Progression from './Progression';


const Bar = ({background}) => { //background color to show heart depletion
    // Zustand global variables 
    const {money, hunger, setHunger, mood, setMood, clean, setClean, health, setHealth} = inGameVariables();
    //tutorial progressions; ref point to div
    const healthRef = useRef(null);
    const moneyRef = useRef(null);
    const hungerRef = useRef(null);
    const moodRef = useRef(null);
    const cleanRef = useRef(null);
    const {update, isActive1} = Progression(); 
    useEffect(() => {
          //updating the empty tutorial progression
          update([
            { target: healthRef, position: 3, text: "This is your Chainchilla's health, it will decrease by itself and decrease faster if you do not take good care of your Chainchilla, and once it reaches 0, your Chainchilla dies!" },
            { target: moneyRef, position: 4, text: "This is the amount of Chain coins you have, the ingame currency you can earn by clicking the Chainchilla." },
            { target: hungerRef, position: 5, text: "This is your Chainchilla's hunger bar, make sure to feed him from time to time or his health will start decreasing faster." },
            { target: moodRef, position: 6, text: "This is your Chainchilla's mood bar! Make sure this bar is high so you get more money from the Chainchilla, and be careful, don't make the Chainchilla mad." },
            { target: cleanRef, position: 7, text: "This is your Chainchilla's cleaniness bar, the lower it is, the slower your Chainchilla will move." },
          ])
        }, [])
    // Intervals to decrease the differnt bars
    useEffect(() => {
        //hunger interval
        const hungerInterval = setInterval(() => {
            if(!Progression.getState().isActive1){ //if completed tutorial
            const currentHunger = inGameVariables.getState().hunger;
            const newHunger = Math.max(0, currentHunger - 1); //make sure bar doesn't fall below 0
            setHunger(newHunger);} //update
        }, 5000); //loses 1 every 5 seconds
        //mood interval
        const moodInterval = setInterval(()=>{
            if(!Progression.getState().isActive1){
            const currentMood = inGameVariables.getState().mood;
            const newMood = Math.max(0, currentMood - 1);
            setMood(newMood);}
        },5000) //loses 1 every 5 seconds
        //health interval
        const healthInterval = setInterval(()=>{
            if(!Progression.getState().isActive1){
            const currentHealth = inGameVariables.getState().health;
            const newHealth = Math.max(0, currentHealth - 1); 
            setHealth(newHealth);}
        },5000) //loses 1 every 5 seconds
        const cleanInterval = setInterval(()=>{
            if(!Progression.getState().isActive1){
            const currentClean = inGameVariables.getState().clean;
            const newClean = Math.max(0, currentClean - 1);
            setClean(newClean);}
        },10000) //clenliness drop by 1 every 10 seconds

        // Cleanup
        return () => {
            clearInterval(hungerInterval);
            clearInterval(moodInterval);
            clearInterval(healthInterval);
            clearInterval(cleanInterval);
        }; 
      }, []);
      // The rendering component
  return (
    //html
    
    <div className="fixed pointer-events-none flex flex-col justify-around h-[40%] mt-[1%] w-full z-50">
        <div className="flex items-center w-[20%] h-[30%] gap-2" style={{ "--level": `${health}%` }}>
            <div ref={healthRef} className="relative w-[30%] h-full flex items-center top-0">
                <img src="/Virtual-pet/heartframe.png" className="absolute w-full z-10"/> {/* outline of heart */}
                <img src="/Virtual-pet/heart.png" className="absolute w-full "/> {/*red part of heart (goes down) */}
                <div className="absolute inset-0 z-5 transition-transform duration-300 ease-linear" style={{ backgroundColor: background, height: `calc(100% - var(--level))`}}/>
            </div>
                
            
            
            <div ref={moneyRef} className="flex relative translate-y-[70%]  items-center h-[40%] min-w-[30%]">
                <div className="flex w-full items-center">

                        <img src="/Virtual-pet/coin.png" className="pixelated relative max-w-[80%] left-0"/>
                    
                </div>
                <div className="flex items-center justify-center h-[100%] w-[70%]">
                    <span className="text-3xl leading-none">{money}C</span>
                </div>
                
            </div>
        </div>
            <div ref={hungerRef} className="flex justify-between items-center w-[18%]">
                <div className="flex justify-center w-[83%] items-center ">
                    <div className="w-[96%] h-5 bg-gray-300 rounded overflow-hidden">

                        <div
                        className="h-full  bg-green-500 transition-all duration-300"
                        style={{ width: `${hunger}%` }}
                        />
                        
                    </div>

                        <img src="/Virtual-pet/hungerBar.png" className="pixelated w-[15%] absolute left-0"/>
                        
                    
                </div>
                
                <span>{hunger}%</span>
            </div>    
            
            <div ref={moodRef} className="flex justify-between w-[18%]">
                <div className="flex justify-center w-[83%] items-center ">
                    <div className="w-[96%] h-5 bg-gray-300 rounded overflow-hidden">

                        <div
                        className="h-full  bg-red-500 transition-all duration-300"
                        style={{ width: `${mood}%` }}
                        />
                        
                    </div>

                        <img src="/Virtual-pet/moodBar.png" className="pixelated w-[15%] absolute left-0"/>
                    
                </div>
                <span>{mood}%</span>
            </div>
            <div ref={cleanRef} className="flex justify-between w-[18%]">
                <div className="flex justify-center w-[83%] items-center ">
                    <div className="w-[96%] h-5 bg-gray-300 rounded overflow-hidden">

                        <div
                        className="h-full  bg-blue-500 transition-all duration-300"
                        style={{ width: `${clean}%` }}
                        />
                        
                    </div>

                        <img src="/Virtual-pet/clean.png" className="pixelated w-[15%] absolute left-0"/>
                    
                </div>
                <span>{clean}%</span>
            </div>
         
    </div>
    
  )
}

export default Bar
