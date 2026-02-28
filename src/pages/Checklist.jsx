import React from 'react'
import { stats } from '../store'

const Checklist = () => {
    // Zustand global variables
    const {totalTimePlayed, totalMoneyEarned, totalExpense} = stats();
    // Whats rendered
  return (
    <div className="bg-[#f8f2f3] flex items-center justify-center mt-[7vh] min-h-[93vh] w-screen">
        <div className="relative w-[60vw] h-[80vh]">
            <img src="/Virtual-pet/clipboard.png" className="absolute h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></img>
            <div className="absolute rotate-8  h-3/4 flex gap-[5%] flex-col top-1/4 left-1/2 -translate-x-5/10 items-center w-1/2 origin-center">
                <span className="text-4xl"> Stats/Checklist</span>
                <div className="flex flex-col justify-around w-3/5 h-3/4">
                    <span className="text-xl"> Total Playtime: {totalTimePlayed} S</span>
                    <span className="text-xl"> Total Expenses: {totalExpense} C</span>
                    <span className="text-xl"> Total Money Earned: {totalMoneyEarned} C</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Checklist
