import { create } from "zustand";

//UI state store: manages the navigation state
export const useStart = create((set)=>({
    startPage: true, //Toggle between the start screen and main game
    setStartPage: startPage => set({startPage}) //setter function for startPage
}))

//Pet vitals store
//these values reset on page refresh in this version of the game (add persist?)
export const inGameVariables = create((set)=>({
    money: 0,
    setMoney: money => set({money}),
    hunger: 100,
    setHunger: hunger => set({hunger}),
    mood: 55,
    setMood: mood => set({mood}),
    clean: 100,
    setClean: clean => set({clean}),
    health: 100,
    setHealth: health => set({health})
}))

//animation and refs store
//stores functions or references for the pet's visual state
export const petAnimation = create((set) => ({
    playAnimation: null, //holds a function reference to trigger an animation
    setPlayAnimation: (fn) => set({ playAnimation: fn }),
    Ref: null, //reference to the DOM/Three.js object for direct manipulation
  }));

//Game stats store
//Tracks progress and achievements
export const stats = create((set)=>({
    totalTimePlayed: 0,
    setTimePlayed: totalTimePlayed => set({totalTimePlayed}),
    totalExpense: 0,
    setTotalExpense: totalExpense => set({totalExpense}),
    totalMoneyEarned: 0,
    setTotalMoneyEarned: totalMoneyEarned => set({totalMoneyEarned})
}));

//Inventory store
//Tracks quantities of specific items and resources
export const itemAmount = create((set)=>({
    Lithium: 0,
    setLithium: Lithium => set({Lithium}),
    Battery: 0,
    setBattery: Battery => set({Battery}),
    Crystal: 1,
    setCrystal: Crystal => set({Crystal}),
    Orb: 1,
    setOrb: Orb => set({Orb}),
    Air: 0,
    setAir: Air => set({Air}),
    Lubricant: 0,
    setLubricant: Lubricant => set({Lubricant}),

    getNumber: (name) => get()[name] //helper function to retrieve a value by item name string
}))

//Persistent version:



/*import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const inGameVariables = create(
  persist(
    (set) => ({
      money: 0,
      setMoney: (money) => set({ money }),
      hunger: 100,
      setHunger: (hunger) => set({ hunger }),
      mood: 55,
      setMood: (mood) => set({ mood }),
      clean: 100,
      setClean: (clean) => set({ clean }),
      health: 100,
      setHealth: (health) => set({ health }),
    }),
    { name: "pet-vitals" } 
  )
);
export const petAnimation = create((set) => ({
    playAnimation: null,
    setPlayAnimation: (fn) => set({ playAnimation: fn }),
    Ref: null,
  }));
export const stats = create(
  persist(
    (set) => ({
      totalTimePlayed: 0,
      setTimePlayed: (totalTimePlayed) => set({ totalTimePlayed }),
      totalExpense: 0,
      setTotalExpense: (totalExpense) => set({ totalExpense }),
      totalMoneyEarned: 0,
      setTotalMoneyEarned: (totalMoneyEarned) => set({ totalMoneyEarned }),
    }),
    { name: "pet-stats" }
  )
);

export const itemAmount = create(
  persist(
    (set) => ({
      Lithium: 0,
      setLithium: (Lithium) => set({ Lithium }),
      Battery: 0,
      setBattery: (Battery) => set({ Battery }),
      Crystal: 1,
      setCrystal: (Crystal) => set({ Crystal }),
      Orb: 1,
      setOrb: (Orb) => set({ Orb }),
      Air: 0,
      setAir: (Air) => set({ Air }),
      Lubricant: 0,
      setLubricant: (Lubricant) => set({ Lubricant }),
    }),
    { name: "pet-inventory" }
  )
);*/
