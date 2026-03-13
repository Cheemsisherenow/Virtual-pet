//evan
import {React, useState,useEffect, useRef} from 'react'
import { inGameVariables} from '../store';
import { REPAIR } from '../constants';
import { stats } from '../store';
import Progression from './Progression';

// Button component to allow reuse
const Button = ({item,cost}) =>{
  // Using prop keys to pass in values for each item
  // Declaring the hooks and variables
  const [bought, setBought] = useState(false);
  const {money, setMoney, health, setHealth} = inGameVariables();
  const Item = REPAIR.find((i) => i.name === item);
  const [display, setDisplay] = useState("Buy?");
  const {setTotalExpense} = stats();

  // Function to handle what happens if the user buys the item (not enough money, etc.)
  const handleBuy = () => {
    if(money >= Item.cost){ //checks if user has enough money
      setBought(true); 
      setMoney(money-cost); //spend money
      const newHealth = Math.min(100, health + Item.heal); //heal health back to at most 100
      setHealth(newHealth);

      const currentExpense = stats.getState().totalExpense; //amount of money spent total for overall stats
      const newExpense = currentExpense + cost;
      setTotalExpense(newExpense);
      
  }
  else{ //if user is broke uh oh
    setDisplay("No Money!");
  }

    
    setTimeout(() => { //on hover suggest user to buy
      setBought(false);
      setDisplay("Buy?");
    }, 2000);
  };
  return(
    //repair module button positioning
    <button className="absolute z-15 overflow-hidden bottom-[10%] bg-[url('/Virtual-pet/button.png')] bg-[length:100%_100%] h-[10%] w-[35%] bg-no-repeat bg-center group" onClick={handleBuy}>
      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
        {bought ? 'Bought!' : `${cost} C`}
      </span>
      <span className="absolute text-sm inset-0 flex items-center justify-center transition-all duration-300 translate-y-full group-hover:translate-y-0 group-hover:opacity-100">
        {bought ? 'Bought!' : `${display}`}
      </span>
    </button>
  )
}
const Repair = () => {
  //tutorial references
  const {update, isActive3, start3} = Progression();
  const poorRef = useRef(null);
  const goodRef = useRef(null);
  const superRef = useRef(null);
  useEffect(()=>{
    update([
      //updating the empty tutorial progression

      {target: poorRef, position: 19, text: "This is the poor repair, using this will restore 25% of your Chainchilla's health." },
      {target: goodRef, position: 20, text: "This is the good repair, using this will restore 50% of your Chainchilla's health."},
      {target: superRef, position: 21, text: "This is the super repair, using this will restore 100% of your Chainchilla's health."}
    ])
  },[])
  // What actually gets rendered
  return (
    <div className="w-screen bg-[#d5ccc4] h-screen mt-[7vh]">
      {/* repair module positioning */}
      <img src="/Virtual-pet/repair.png" className="absolute w-full h-[50%] bottom-0"/>
      <img src="/Virtual-pet/bird.png" className="absolute left-[10%] h-[43%]"/>
      <div className="absolute flex w-[50%] bottom-[50%] justify-around right-0">
        <div ref={superRef} className="relative flex justify-center">
          <img src="/Virtual-pet/super.png" className=" w-3/4"/>
          <Button item="Super" cost={250}/>
        </div>
        <div ref={goodRef} className="relative flex justify-center">
          <img src="/Virtual-pet/good.png" className="w-3/4"/>
          <Button item="Good" cost={150}/>
        </div>
        <div ref={poorRef} className="relative flex justify-center">
          <img src="/Virtual-pet/poor.png" className="w-3/4"/>
          <Button item="Poor" cost={100}/>
        </div>
      </div>
      {!isActive3 && <button onClick={()=>{start3()}}className="absolute left-1 bottom-0 bg-[url('/Virtual-pet/tutorialButton.png')] h-[9%] w-[5%] bg-[length:100%_100%] bg-no-repeat bg-center transform transition-transform duration-300 ease-in-out hover:-translate-y-1 group">
        <span className="absolute inset-0 flex items-center justify-center -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out">
          Tutorial
        </span>
        </button>}
    </div>
  )
}

export default Repair
