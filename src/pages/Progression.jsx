import React from 'react'
import { create } from 'zustand'
const Progression = create((set, get) => ({
    steps: [],
    currentStep: 0,
    isActive: false,
  
    start: (steps) => set({ steps, isActive: true }),
  
    add: (newSteps) => set({ steps: [...get().steps, ...newSteps] }),
    
    next: () => {
      const { currentStep, steps } = get();
      console.log(currentStep);
      if (currentStep < steps.length - 1) set({ currentStep: currentStep + 1 });
      else set({ isActive: false });
      
    },
  
    skip: () => set({ isActive: false }),
  }))

export default Progression
