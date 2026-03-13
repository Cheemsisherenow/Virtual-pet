import gsap from 'gsap/all';
import {React, useRef, useEffect, useState, forwardRef} from 'react'
import {useGSAP} from "@gsap/react";
import { MODELS } from '../constants';
import { inGameVariables, petAnimation, petState, pictures } from '../store';
import clsx from "clsx";
import Progression from './Progression';

const Customize = forwardRef((props, ref) => {
    // Declaring hooks and variables
    /*export const pictures = create((set)=>({
        petEvolv: "base",
        petSkin: "chainchilla",
        setPetEvolv: petEvolv => set({petEvolv}),
        setPetSkin: petSkin => set({petSkin})
    }));*/
    const {setPetSkin} = pictures();
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(1);
    const { isActive, next, skip, steps, currentStep, start } = Progression();
    const { isAnimating } = petState();


    // Function to handle what happens when a MODEL is used
    const handleUse = () => {
        const MODEL = MODELS.find((i) => i.id === id);
            if(MODEL.name == "chainchilla"){
                setPetSkin("chainchilla")
            }
            else if(MODEL.name == "girl"){
                setPetSkin("girl")
            }
            else if(MODEL.name == "alien"){
                setPetSkin("alien")
            }
            else if(MODEL.name == "brown"){
                setPetSkin("brown")
                
            }


        
            
        };

    // Function to get the image of each MODEL
    const getImg = (id) => {
        const MODEL = MODELS.find((i) => i.id === id);
        console.log(MODEL.img)
        console.log(id)
        console.log(MODEL)
        return MODEL.img;
    }

    // Function to get the name of each MODEL
    const getName = (id) => {
        const MODEL = MODELS.find((i) => i.id === id);
        return MODEL.name;
    }

    // Function to handle the back key
    const handleBack = () => {
        if (id > 1){
            setId((prevId)=>(prevId - 1));
        }
        else {
            setId(MODELS.length);
        }
        }
    // Function to handle the forward key
    const handleForth = () => {
        if (id < MODELS.length){
            setId((prevId)=>(prevId + 1));
        }
        else {
            setId(1);
        }
        }
    
    // GSAP animations for the storage
    useGSAP(() => {
        if (currentStep == 3) {
            gsap.set(ref.current, { x: 0 });
        } else {
            gsap.set(ref.current, { x: "100%"});
        }
      }, [ref, currentStep]);
    useGSAP(() => {
        if (!ref.current) return;
        if (visible){
            gsap.to(ref.current, {
                x: 0,
                duration: 0.5,
                ease: "power2.out",
              });
        }
        else{
            gsap.to(ref.current, {
                x: "100%",
                duration: 0.5,
                ease: "power2.out",
              });
        }
      }, [visible]);
      
  return (
    <div>
        <div ref={ref} className="flex absolute bg-[url('/Virtual-pet/customizeStorage.png')] bg-[length:100%_100%] bg-no-repeat w-[30vw] h-[50vh] top-[30vh] z-40 right-0" >
            <button className="absolute top-0 -translate-x-full text-8xl " onClick={() => setVisible(!visible)}> {!visible ? "<" : ">"} </button>
            <span className="absolute left-1/2 text-3xl -translate-x-1/2 top-[5%]">
                    {getName(id)}{" "}
            </span>
            <div className="absolute  inset-0 m-auto flex justify-between z-10 text-6xl w-[80%]" >
                <button onClick={handleBack}> {"<"}</button>
                <button onClick={handleForth}> {">"} </button>
            </div>
            <div className="w-full flex justify-center group">
                    <img src={getImg(id)} className="pixelated absolute h-[60%] bottom-[10%]"/>
                    <button onClick = {handleUse} className="absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-[url('/Virtual-pet/button.png')] h-[15%] w-[25%] bg-[length:100%_100%] bg-center opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-200">
                        Use
                    </button>
            </div>
        </div>
    </div>
  )
})

export default Customize