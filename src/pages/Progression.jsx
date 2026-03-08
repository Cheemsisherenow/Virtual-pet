import React from 'react'
import { create } from 'zustand'
const Progression = create((set, get) => ({
    steps: [],
    currentStep: 0,
    isActive: false,
  
    start: (steps) => set({ isActive: true }),
  
    add: (newSteps) => set((state) => {
        const existingPositions = new Set(state.steps.map(s => s.position)); // grabs the old steps array
        const filtered = newSteps.filter(s => !existingPositions.has(s.position)); // then it filters the duplicate ones because strict mode runs useEffect twice so each time it adds two refs on accident
        return {
          steps: [...state.steps, ...filtered].sort((a, b) => a.position - b.position) // then it returns a new steps array with each ref sorted based on the position i gave them
        }
      }),
    
    next: () => {
      const { currentStep, steps } = get();
      console.log(currentStep);
      console.log(steps.length);
      console.log(steps);
      if (currentStep < steps.length - 1) set({ currentStep: currentStep + 1 });
      else set({ isActive: false });
      
    },
  
    skip: () => set({ currentStep: 3 ,isActive: false }),
  }))

export default Progression
