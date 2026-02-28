import {React, useEffect} from 'react'
import {inGameVariables} from "../store/"

const Bar = ({background}) => {
    // Zustand global variables 
    const {money, hunger, setHunger, mood, setMood, clean, setClean, health, setHealth} = inGameVariables();

    // Intervals to decrease the differnt bars
    useEffect(() => {
        const hungerInterval = setInterval(() => {
            const currentHunger = inGameVariables.getState().hunger;
            const newHunger = Math.max(0, currentHunger - 1);
            setHunger(newHunger);
        }, 5000);
        const moodInterval = setInterval(()=>{
            const currentMood = inGameVariables.getState().mood;
            const newMood = Math.max(0, currentMood - 1);
            setMood(newMood);
        },5000)
        const healthInterval = setInterval(()=>{
            const currentHealth = inGameVariables.getState().health;
            const newHealth = Math.max(0, currentHealth - 1);
            setHealth(newHealth);
        },5000)
        const cleanInterval = setInterval(()=>{
            const currentClean = inGameVariables.getState().clean;
            const newClean = Math.max(0, currentClean - 1);
            setClean(newClean);
        },10000)

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
    <div className="fixed pointer-events-none flex flex-col justify-around h-[40%] mt-[1%] w-full z-50">
        <div className="flex items-center w-[20%] h-[30%] gap-2" style={{ "--level": `${health}%` }}>
            <div className="relative w-[30%] h-full flex items-center top-0">
                <img src="/Virtual-pet/heartframe.png" className="absolute w-full z-10"/>
                <img src="/Virtual-pet/heart.png" className="absolute w-full "/>
                <div className="absolute inset-0 z-5 transition-transform duration-300 ease-linear" style={{ backgroundColor: background, height: `calc(100% - var(--level))`}}/>
            </div>
                
            
            
            <div className="flex relative translate-y-[70%]  items-center h-[40%] min-w-[30%]">
                <div className="flex w-full items-center">

                        <img src="/Virtual-pet/coin.png" className="pixelated relative max-w-[80%] left-0"/>
                    
                </div>
                <div className="flex items-center justify-center h-[100%] w-[70%]">
                    <span className="text-3xl leading-none">{money}$</span>
                </div>
                
            </div>
        </div>
            <div className="flex justify-between items-center w-[18%]">
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
            
            <div className="flex justify-between w-[18%]">
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
            <div className="flex justify-between w-[18%]">
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
