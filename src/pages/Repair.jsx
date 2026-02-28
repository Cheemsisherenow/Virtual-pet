
import {React, useState} from 'react'
import { inGameVariables} from '../store';
import { REPAIR } from '../constants';
import { stats } from '../store';

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
    if(money >= Item.cost){
      setBought(true);
      setMoney(money-cost);
      const newHealth = Math.min(100, health + Item.heal);
      setHealth(newHealth);

      const currentExpense = stats.getState().totalExpense;
      const newExpense = currentExpense + cost;
      setTotalExpense(newExpense);
      
  }
  else{
    setDisplay("No Money!");
  }

    
    setTimeout(() => {
      setBought(false);
      setDisplay("Buy?");
    }, 2000);
  };
  return(
    <button className="absolute z-15 overflow-hidden bottom-[10%] bg-[url('button.png')] bg-[length:100%_100%] h-[10%] w-[35%] bg-no-repeat bg-center group" onClick={handleBuy}>
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
  // What actually gets rendered
  return (
    <div className="w-screen bg-[#d5ccc4] h-screen mt-[7vh]">
      <img src="/Virtual-pet/repair.png" className="absolute w-full h-[50%] bottom-0"/>
      <img src="/Virtual-pet/bird.png" className="absolute left-[10%] h-[43%]"/>
      <div className="absolute flex w-[50%] bottom-[50%] justify-around right-0">
        <div className="relative flex justify-center">
          <img src="/Virtual-pet/super.png" className=" w-3/4"/>
          <Button item="Super" cost={250}/>
        </div>
        <div className="relative flex justify-center">
          <img src="/Virtual-pet/good.png" className="w-3/4"/>
          <Button item="Good" cost={150}/>
        </div>
        <div className="relative flex justify-center">
          <img src="/Virtual-pet/poor.png" className="w-3/4"/>
          <Button item="Poor" cost={100}/>
        </div>
      </div>
    </div>
  )
}

export default Repair
