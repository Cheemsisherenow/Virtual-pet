import {React, useRef} from 'react'
import { useStart } from '../store'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'
const StartPage = ({goTo}) => {
    const startButtonRef = useRef(null);
    const {startPage, setStartPage} = useStart();
    const handleStart = () =>{
        goTo("home");
        setTimeout(() => {
          setStartPage(false);
        }, (1000));
    }
    useGSAP(() => {
      if (startButtonRef.current){
        const tl = gsap.timeline();
        tl.fromTo(
          startButtonRef.current,
          { y: '1000%' }, 
          { 
            y: '0%',      
            duration: 0.6,
            ease: 'power2.out',
            delay: 1
          }
        )
        const el = startButtonRef.current;
        el.addEventListener('mouseenter', () => gsap.to(el, { y: '-8px', duration: 0.2 }))
        el.addEventListener('mouseleave', () => gsap.to(el, { y: '0px', duration: 0.2 }))

        return () => {
          el.removeEventListener('mouseenter', () => gsap.to(el, { y: '-8px', duration: 0.2 }))
          el.removeEventListener('mouseleave', () => gsap.to(el, { y: '0px', duration: 0.2 }))
        }
    }}, [startPage]);
  return (
    <div className="w-screen h-screen">
        <div className="relative h-screen w-screen overflow-hidden bg-neutral-200">
          
          <div
            className="absolute inset-0 opacity-20 [animation:moveDiagonal_10s_linear_infinite]"
            style={{
              backgroundImage: "url('/Virtual-pet/logo.png')",
              backgroundSize: "220px 160px",
              backgroundRepeat: "repeat",
              backgroundPosition: "50px 50px",
              
                
            }}            ></div>

            <div className="relative z-10 flex h-full items-center justify-center">
              <img src="/Virtual-pet/Start.png" className="absolute w-[65%] inset-x-0 top-1/8 mx-auto"/>
              <button ref={startButtonRef} onClick={handleStart} className="absolute text-4xl inset-x-0 bottom-1/5 mx-auto bg-[url('/Virtual-pet/button.png')] w-[25%] h-[10%] bg-[length:100%_100%] bg-center ">
                  Press Start
              </button>
            </div>

          </div>
      </div>
  )
}

export default StartPage
