import {React,useState,useEffect,useCallback} from 'react'
import Progression from './Progression';
    

const Tutorial = ({ targetRef }) => {
    const {currentStep } = Progression();
    const [rect, setRect] = useState(null);
    const PAD = 16;
    const measure = useCallback(() => {
        const el = targetRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setRect({ x: r.left - PAD, y: r.top - PAD, w: r.width + PAD * 2, h: r.height + PAD * 2 });
    }, [targetRef]);

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
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
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
  </div>
  )
}

export default Tutorial
