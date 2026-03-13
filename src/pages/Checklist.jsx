//overall states evan
import {React, useEffect, useRef} from 'react'
import { stats } from '../store'
import Progression from './Progression';

const Checklist = () => {
    // Zustand global variables
    const {totalTimePlayed, totalMoneyEarned, totalExpense} = stats();

    //tutorial progression
    const {update, isActive4, start4} = Progression();
    const playTimeRef = useRef(null);
    const totalExpenseRef = useRef(null);
    const totalMoneyRef = useRef(null);
    useEffect(() =>{
        //updating the empty tutorial progression
        update([
            { target: playTimeRef, position: 22, text: "This is the number of time (in seconds) you have spent on the game." },
            { target: totalExpenseRef, position: 23, text: "This is the number of money you have spent on items for your Chainchilla." },
            { target: totalMoneyRef, position: 24, text: "This is the number of money you have earned so far." },
        ])
    },[])
    
    // Whats rendered
  return (
    <div className="bg-[#f8f2f3] flex items-center justify-center mt-[7vh] min-h-[93vh] w-screen">
        <div className="relative w-[60vw] h-[80vh]">
            <img src="/Virtual-pet/clipboard.png" className="absolute h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></img> {/**set clipboard position wiht translate */}
            <div className="absolute rotate-8  h-3/4 flex gap-[5%] flex-col top-1/4 left-1/2 -translate-x-5/10 items-center w-1/2 origin-center"> {/**set text position */}
                <span className="text-4xl"> Stats/Checklist</span>
                <div className="flex flex-col justify-around w-3/5 h-3/4">
                    <span ref={playTimeRef} className="text-xl"> Total Playtime: {totalTimePlayed} S</span>
                    <span ref={totalExpenseRef} className="text-xl"> Total Expenses: {totalExpense} C</span>
                    <span ref={totalMoneyRef} className="text-xl"> Total Money Earned: {totalMoneyEarned} C</span>
                </div>
            </div>
        </div>
        {!isActive4 && <button onClick={()=>{start4()}}className="absolute left-1 bottom-0 bg-[url('/Virtual-pet/tutorialButton.png')] h-[9%] w-[5%] bg-[length:100%_100%] bg-no-repeat bg-center transform transition-transform duration-300 ease-in-out hover:-translate-y-1 group">
        <span className="absolute inset-0 flex items-center justify-center -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out">
          Tutorial
        </span>
        </button>}
    </div>
  )
}

export default Checklist
