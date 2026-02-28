import { create } from "zustand";
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
export const petAnimation = create((set) => ({
    playAnimation: null,
    setPlayAnimation: (fn) => set({ playAnimation: fn }),
    Ref: null,
  }));
export const stats = create((set)=>({
    totalTimePlayed: 0,
    setTimePlayed: totalTimePlayed => set({totalTimePlayed}),
    totalExpense: 0,
    setTotalExpense: totalExpense => set({totalExpense}),
    totalMoneyEarned: 0,
    setTotalMoneyEarned: totalMoneyEarned => set({totalMoneyEarned})
}));

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
    setLubricant: Lubricant => set({Lubricant})
}))
