import {React, useRef, useEffect, useMemo, useState} from 'react'
import gsap from "gsap";
import { inGameVariables, petAnimation, stats } from '../store';
import { ANIMATION_DURATIONS } from '../constants';

const Home = () => {
  // Setting the Zustand variables, hooks, and normal variables
    const {money, setMoney, hunger, mood,clean} = inGameVariables();
    const setPlayAnimation = petAnimation((state) => state.setPlayAnimation);
    const petRef = useRef(null);
    const {setTotalMoneyEarned} = stats();
    const isPausedRef = useRef(false);
    const petStateRef = useRef("happy");
    const savedTargetRef = useRef(null);
    const timeoutRef = useRef(null);
    const speedRef = useRef(75);
    // Changes the speed based on how clean the pet is
    useEffect(() => {
      speedRef.current = 15 + (60 * clean / 100);
    }, [clean]);

    // Changes the mood and state of the pet
    const getPetState = useMemo(() => {
      console.log(mood)
      if (hunger < 20 || mood < 20){ 
        console.log("returning angry") 
        return "angry"
      };
      if (hunger < 50 || mood < 50){ 
      return "unhappy"
      };
      return "happy";
    },[hunger, mood]);

    // Changes what the petRef is pointing to, this is used for the movePet function since normal useState does not get updated
    useEffect(() => {
      petStateRef.current = getPetState;
    }, [getPetState]);

    // Storage for the pet's moods and walking animations
  const PET_IMAGES = {
      happy: "/Virtual-pet/chainchillahappy.png",
      unhappy: "/Virtual-pet/chainchillaunhappy.png",
      angry: "/Virtual-pet/chainchillaangry.png",
    };
    const PET_WALKING = {
      happy: "/Virtual-pet/chainchillawalkinghappy.gif",
      unhappy: "/Virtual-pet/chainchillawalkingunhappy.gif",
      angry: "/Virtual-pet/chainchillawalkingangry.gif",
    };
    
    // Function to handle the user clicking the pet
    const handleClick = (Gif) => {
      if (!petRef.current.src.endsWith(Gif)){
        setMoney(money+1);
        playAnimation(Gif);
        const currentEarned = stats.getState().totalMoneyEarned;
        const newEarned = currentEarned + 1;
        setTotalMoneyEarned(newEarned);
      }
    }
    const movePet = (targetX = null) => {
      if (isPausedRef.current) return;
      const pet = petRef.current;
      // ills any animations from before for safety
      gsap.killTweensOf(pet);

      // Calculate max X/Y Pochita can move based on window size minus pet size
      const maxX = window.innerWidth - 50; 

      //Finds the current location of Pochita
      const currentX = gsap.getProperty(pet, "x");
      // Debugging
      console.log("X" + currentX);
      // Selects a random location on the screen for Pochita to move
      targetX = targetX !== null ? targetX : Math.random() * maxX;

      // Calculates the distance
      const dx = targetX - currentX;
      const distance = Math.abs(dx);

      // Calculates the duration based on speed and distance
      const duration = distance / speedRef.current;


      // GSAP animations
      gsap.to(petRef.current, {
          onStart: () => {
              petRef.current.src = PET_WALKING[petStateRef.current];
              if(targetX > currentX){
                  gsap.set(petRef.current, { scaleX: -1 });
              };
            },
          x: targetX,
          duration: duration,
          ease: "linear",
          onComplete: () => {
              // The waittime for Pochita's next movement
              petRef.current.src = PET_IMAGES[petStateRef.current]; 
              gsap.set(petRef.current, { scaleX: 1 });
              const waitTime = (duration * 1000) + Math.random() * 10000 + 5000;

              // Clear any existing timeout for safety and debugging
              if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              }
              
              timeoutRef.current = setTimeout(() => {
              petRef.current.src = PET_WALKING[petStateRef.current];
              movePet();
              }, waitTime);
          },
      });
      };
      // Function to play the animations from the items
      const playAnimation = (Src) => {

        isPausedRef.current = true;
        
        const animation = ANIMATION_DURATIONS.find((item) => item[Src] !== undefined);
        const duration = animation[Src];

    
        // Save current animation target if moving
        const tween = gsap.getTweensOf(petRef.current)[0];
        if (tween) {
          // Save where it was going
          savedTargetRef.current = tween.vars.x; 
        }
        else{
          savedTargetRef.current = null;
        }
        
        gsap.killTweensOf(petRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        const currentScale = gsap.getProperty(petRef.current, "scaleX");
        petRef.current.src = Src;
        
        // Sets the pet back to its state before the animation
        setTimeout(() => {
          isPausedRef.current = false;
          petRef.current.src = PET_IMAGES[getPetState];
          gsap.set(petRef.current, { scaleX: currentScale });
          if (savedTargetRef.current !== null) {
            movePet(savedTargetRef.current);
          } else {
            const waitTime = Math.random() * 10000 + 5000;
            timeoutRef.current = setTimeout(() => {
              movePet();
            }, waitTime);
          }
          savedTargetRef.current = null;
        }, duration);
      };
      useEffect(()=>{
        setPlayAnimation(playAnimation);
      },[])     

  useEffect(() => {
    gsap.set(petRef.current, { x: (window.innerWidth - 50) / 2 })
    movePet(); 

    //Cleanup when leaving screen
    return () => {
      gsap.killTweensOf(petRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }; 
  }, [])
  
  return (
    <div id="home" className="bg-[url('/home.png')] mt-[7vh] min-h-[93vh] w-screen bg-[length:auto_100%] bg-bottom bg-no-repeat">
      <input placeholder="Chainchilla" className="absolute left-1/2 top-[10%] pt-5  -translate-x-1/2 w-[20vw] h-[10vh] bg-[url('/name.png')] bg-[length:100%_100%] text-center appearance-none border-none outline-none"/>
        <div className="absolute h-[10%] bottom-0"/>
        <img ref={petRef} src="/Virtual-pet/chainchillahappy.png" onClick={()=>(handleClick("/Virtual-pet/click1.gif"))} className="pixelated fixed h-[20%] bottom-0"></img>
        </div>
  )
}

export default Home
