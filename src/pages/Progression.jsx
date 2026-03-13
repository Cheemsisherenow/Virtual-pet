import React from 'react'
import { create } from 'zustand'
const Progression = create((set, get) => ({
    steps: [],
    currentStep: 0,
    isActive1: false,
    isActive2: false,
    isActive3: false,
    isActive4: false,
  
    start1: (steps) => set({ isActive1: true }),

    start2: (steps) => set({ isActive2: true }),
    
    start3: (steps) => set({ isActive3: true }),
    
    start4: (steps) => set({ isActive4: true }),
  
    add: (newSteps) => set((state) => {
        const existingPositions = new Set(state.steps.map(s => s.position)); // grabs the old steps array
        const filtered = newSteps.filter(s => !existingPositions.has(s.position)); // then it filters the duplicate ones because strict mode runs useEffect twice so each time it adds two refs on accident
        return {
          steps: [...state.steps, ...filtered].sort((a, b) => a.position - b.position) // then it returns a new steps array with each ref sorted based on the position i gave them
        }
      }),
      update: (newSteps) => set((state) => ({
        steps: state.steps.map(s => {
          const updated = newSteps.find(n => n.position === s.position);
          return updated ? { ...s, target: updated.target, text: updated.text } : s;
        })
      })),
    
    next: () => {
      const { currentStep, steps } = get();
      console.log(currentStep)
      console.log(steps)
      if (currentStep < steps.length - 1) set({ currentStep: currentStep + 1 });
      else  set({ isActive4: false });
      if (currentStep == 13) set({ isActive1: false });
      else if (currentStep == 19) set({ isActive2: false });
      else if (currentStep == 23) set({ isActive3: false });
      
    },

    setCurrentStep: (currentStep) => set({currentStep}),
  
    skip: () => {
      const { isActive1, isActive2, isActive3, isActive4 } = get();
      if (isActive1) set({ currentStep: 1 ,isActive1: false });
      else if (isActive2) set({isActive2: false })
      else if (isActive3) set({isActive3: false }) 
      else if (isActive4) set({isActive4: false }) },
  }))
  export default Progression
