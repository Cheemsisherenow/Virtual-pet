import gsap from 'gsap/all';
import {React,useRef, useState} from 'react'
import {useGSAP} from "@gsap/react";
import { ITEMS } from '../constants';
import { inGameVariables, itemAmount, petAnimation } from '../store';
import clsx from "clsx";

const Storage = () => {
    // Declaring hooks and variables
    const itemStore = itemAmount();
    const {hunger, setHunger, mood, setMood, clean, setClean} = inGameVariables();
    const playAnimation = petAnimation((state) => state.playAnimation);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(1);
    const storageRef = useRef(null);

    // Function to handle what happens when a item is used
    const handleUse = () => {
        const item = ITEMS.find((i) => i.id === id);
        console.log(itemStore[item.name])
        if (itemStore[item.name] > 0){
            if(item.name == "Lithium"){
                (hunger <= 95 ? setHunger(hunger+5): itemStore[item.name]++)
            }
            else if(item.name == "Battery"){
                (hunger <= 85 ? setHunger(hunger+15): itemStore[item.name]++)
            }
            else if(item.name == "Crystal"){
                (mood <= 90 ? setMood(mood+5): itemStore[item.name]++)
            }
            else if(item.name == "Battery"){
                (mood <= 85 ? setMood(mood+15): itemStore[item.name]++)
            }
            else if(item.name == "Air"){
                (clean <= 85 ? setClean(clean+5): itemStore[item.name]++)
            }
            else if(item.name == "Lubricant"){
                (clean <= 85 ? setClean(clean+15): itemStore[item.name]++)
            }

        
            if (item.animation && playAnimation) {
            // Plays an animation based on the item
            playAnimation(item.animation);

            }
            console.log("playAnimation value:", playAnimation);
            itemStore[item.name]--;
        }
    };

    // Function to get the image of each item
    const getImg = (id) => {
        const item = ITEMS.find((i) => i.id === id);
        return item.img;
    }

    // Function to get the name of each item
    const getName = (id) => {
        const item = ITEMS.find((i) => i.id === id);
        return item.name;
    }

    // Function to handle the back key
    const handleBack = () => {
        if (id > 1){
            setId((prevId)=>(prevId - 1));
        }
        else {
            setId(ITEMS.length);
        }
        }
    // Function to handle the forward key
    const handleForth = () => {
        if (id < ITEMS.length){
            setId((prevId)=>(prevId + 1));
        }
        else {
            setId(1);
        }
        }
    
    // GSAP animations for the storage
    useGSAP(() => {
        if (storageRef.current) {
          gsap.set(storageRef.current, { x: "100%" });
        }
      }, [storageRef]);
    useGSAP(() => {
        if (!storageRef.current) return;
        if (visible){
            gsap.to(storageRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power2.out",
              });
        }
        else{
            gsap.to(storageRef.current, {
                x: "100%",
                duration: 0.5,
                ease: "power2.out",
              });
        }
      }, [visible]);

// What gets rendered
  return (
    <div ref={storageRef} className="flex absolute bg-[url('/storage.png')] bg-[length:100%_100%] bg-no-repeat w-[30vw] h-[20vh] right-0" >
       <button className="absolute top-0 -translate-x-full text-8xl " onClick={() => setVisible(!visible)}> {!visible ? "<" : ">"} </button>
       <span className="absolute left-1/2 text-3xl -translate-x-1/2 top-[5%]">
            {getName(id)}
       </span>
       <div className="absolute bottom-1/2 translate-y-3/4 flex justify-around text-6xl w-full" >
        <button onClick={handleBack}> {"<"}</button>
        <button onClick={handleForth}> {">"} </button>
       </div>
       <div className="w-full flex justify-center group">
            <img src={getImg(id)} className={clsx("pixelated absolute h-[60%] bottom-[10%]", id===1 && "absolute h-[75%] bottom-[25%]")}/>
            <button onClick = {handleUse} className="absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-[url('button.png')] h-[25%] w-[25%] bg-[length:100%_100%] bg-center opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-200">
                Use
            </button>
       </div>
    </div>
  )
}

export default Storage
