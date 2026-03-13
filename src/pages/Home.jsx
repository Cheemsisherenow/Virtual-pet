import {React, useRef, useEffect, useMemo, useState} from 'react'
import gsap from "gsap";
import { inGameVariables, petAnimation, petState, stats } from '../store';
import { ANIMATION_DURATIONS } from '../constants';
import Tutorial from './Tutorial';
import Progression from './Progression';


const Home = () => {
  // Setting the Zustand variables, hooks, and normal variables
    const {money, setMoney, hunger, mood, clean, health, setDead} = inGameVariables();
    const [showTutorial, setShowTutorial] = useState(true);
    const { isActive1, next, skip1, steps, currentStep, update, start1 } = Progression();
    const isDead = () => inGameVariables.getState().dead;
    const { setIsAnimating } = petState();
    const hasInitialized = useRef(false)
    const startRef = useRef(null);
    const petRef = useRef(null);
    useEffect(()=>{
      if(health <= 0){
      setDead(true);
      petRef.current.src="/Virtual-pet/dead.png";
      gsap.killTweensOf(petRef.current);}
    },[health])
    useEffect(() => {
              //updating the empty tutorial progression
      update([
        { target: startRef, position: 0, text: "" },
        { target: petRef, position: 1, text: "Here is your pet Chainchilla! Make sure to take care of it and click him to earn money." },
      ])
    }, [])
    //tutorial progression
    const setPlayAnimation = petAnimation((state) => state.setPlayAnimation);
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
      if (hunger < 20 || mood < 20){ //make chinchilla angry when hunger or mood less than 20
        console.log("returning angry") 
        return "angry"
      };
      if (hunger < 50 || mood < 50){  //When chilla mood or hunger less than 50 and greater than 20 make chilla unhappy
      return "unhappy"
      };
      return "happy"; //when hunger or mood greater than 50, make chilla happy
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
      if(isPausedRef.current || isDead()) return;
      if (!petRef.current.src.endsWith(Gif)){ //checks if gif played already
        setMoney(money+1); //incrememnt money by 1
        playAnimation(Gif); //play animation
        const currentEarned = stats.getState().totalMoneyEarned;
        const newEarned = currentEarned + 1;
        setTotalMoneyEarned(newEarned); //update overall stats 
      }
    }
    const sleepPet = (callback) => { //for pet sleeping
      const check = () => {
        const isMoving = gsap.getTweensOf(petRef.current).length > 0; //checks if pet is moving
        const isPaused = isPausedRef.current; //checks if pet is paused (paused happens when pet is clicked)
        if (!isMoving && !isPaused) callback(); //callback if pet is not paused or moving
        else setTimeout(check, 500); 
      };
      check();
    };
    useEffect(() => {
      const check = () => {
        if (isDead()) return;
        const { totalTimePlayed } = stats.getState();
        console.log(totalTimePlayed)
        if (!isActive1.current && totalTimePlayed != 0 && totalTimePlayed % 120 == 0) {
          sleepPet(() => {
            isPausedRef.current = true;
    
            const sleepEnd = Date.now() + 20000;
            const loopSleep = () => {
              if (Date.now() < sleepEnd) {
                playAnimation("/Virtual-pet/zap.gif");
                setTimeout(loopSleep, 2000);
              } else {
                isPausedRef.current = false;
                movePet();
                setTimeout(check, 1000);
              }
            };
            loopSleep();
          });
        } else {
          setTimeout(check, 1000);
        }
      };
      check();
    }, [])
    useEffect(()=>{
      if (!hasInitialized.current) {
        hasInitialized.current = true
        return 
      }
      if(isActive1){
        gsap.killTweensOf(petRef.current)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        petRef.current.src = PET_IMAGES[petStateRef.current] 
        gsap.set(petRef.current, { scaleX: 1 })               
      }
      else movePet();
    },[isActive1])
    const movePet = (targetX = null) => {
      console.log("movePet called")
      const { isActive1 } = Progression.getState();
      if (isPausedRef.current || isActive1 || isDead()) return;
      const pet = petRef.current;
      // ills any animations from before for safety
      gsap.killTweensOf(pet);

      // Calculate max X/Y chilla can move based on window size minus pet size
      const maxX = window.innerWidth - 50; 

      //Finds the current location of chilla
      const currentX = gsap.getProperty(pet, "x");
      // Debugging
      console.log("X" + currentX);
      // Selects a random location on the screen for chilla to move
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
              // The waittime for chilla's next movement
              console.log("petState:", petStateRef.current)
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
        if(isDead()) return;

        isPausedRef.current = true;
        setIsAnimating(true);
        
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
          setIsAnimating(false);
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
        {currentStep === 0 && (<div ref={startRef} className="absolute flex bg-white p-2 text-center items-center z-15 inset-0 m-auto rounded-xl text-3xl shadow-xl w-[25%] h-[20%]">
          Here is a quick tutorial to help you get started on the game!
        </div>)}
        {!isActive1 && <button onClick={()=>{start1()}}className="absolute left-1 bottom-0 bg-[url('/Virtual-pet/tutorialButton.png')] h-[9%] w-[5%] bg-[length:100%_100%] bg-no-repeat bg-center transform transition-transform duration-300 ease-in-out hover:-translate-y-1 group">
        <span className="absolute inset-0 flex items-center justify-center -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out">
          Tutorial
        </span>
        </button>}
       
        
    </div>
  )
}

export default Home
