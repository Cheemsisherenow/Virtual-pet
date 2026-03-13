import {React,useState,useEffect,useCallback} from 'react'
import Progression from './Progression';
    

const Tutorial = ({ targetRef }) => {
    const {next,skip,currentStep, steps } = Progression();
    const step = steps[currentStep]
    const [rect, setRect] = useState(null);
    const PAD = 16;
    const measure = useCallback(() => {
        const el = targetRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setRect({ x: r.left - PAD, y: r.top - PAD, w: r.width + PAD * 2, h: r.height + PAD * 2 });
    }, [targetRef, targetRef.current.x]); 

    useEffect(() => {
        const el = targetRef.current;
        if (!el) return;

        const observer = new ResizeObserver(() => {
            measure()
        });

        observer.observe(el);
        window.addEventListener("resize", measure);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure]);


    if (!rect) return null;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const spaceB = H - (rect.y + rect.h);
    const spaceA = rect.y;
    const showB = spaceB > 120;

    const boxW = 260;
    const boxX = Math.min(Math.max(rect.x, 16), W - boxW - 16); 
    const boxY = showB ? rect.y + rect.h + 12 : rect.y - 12
  return (
    <div id="tutorial" className="fixed inset-0 z-50 pointer-events-auto">
    <svg className="absolute w-screen h-screen inset-0">
      <defs>
        <mask id="pet-mask">
          <rect width={W} height={H} fill="white" />
          <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} rx={12} fill="black" />
        </mask>
      </defs>
      <rect width={W} height={H} fill="black" fillOpacity={0.7} mask="url(#pet-mask)" />
      <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} rx={12}
        fill="none" stroke="rgba(120,180,255,0.6)" strokeWidth={2} />
    </svg>
    <div className="absolute pointer-events-auto bg-white rounded-xl shadow-xl p-4 break-words" style={{left: boxX, width: boxW, ...(showB ? { top: boxY } : { bottom: H - boxY })}}>
        <p> {steps[currentStep].text} </p>
        <div className="relative w-[60%] mt-1 flex justify-between items-center">
            <button className="relative z-15 overflow-hidden bg-[url('/Virtual-pet/button.png')] h-[25%] w-[45%] bg-[length:100%_100%] bg-no-repeat bg-center" onClick={next}>Next</button>
            <button className="relative z-15 overflow-hidden bg-[url('/Virtual-pet/button.png')] h-[25%] w-[45%] bg-[length:100%_100%] bg-no-repeat bg-center" onClick={skip}> Skip </button>
        </div>
    </div>
  </div>
  )
}

export default Tutorial
