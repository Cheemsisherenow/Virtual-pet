export const SCREENS = {
  HOME: "home",
  SHOP: "shop",
  REPAIR: "repair",
  CHECKLIST: "checklist"
};
export const SCREEN_LIST = Object.values(SCREENS);

export const ITEMS = [
  {name: "Lithium", id: 1, cost: 5, setter: "setLithium", img: "/Virtual-pet/lithium.png"},
  {name: "Battery", id: 2, cost: 10, setter: "setBattery", img: "/Virtual-pet/battery.png"},
  {name: "Crystal", id: 3, cost: 25, setter: "setCrystal", img: "/Virtual-pet/crystal.png", animation: "/Virtual-pet/crystalgif.gif" },
  {name: "Orb", id: 4, cost: 50, setter: "setOrb", img: "/Virtual-pet/orb.png", animation: "/Virtual-pet/zap.gif"},
  {name: "Air", id: 5, cost: 50, setter: "setAir", img: "/Virtual-pet/air.png"},
  {name: "Lubricant", id: 6, cost: 100, setter: "setLubricant", img: "/Virtual-pet/lubricant.png"},
]
export const REPAIR = [
  {name: "Poor", id: 7, cost: 100, heal: 10},
  {name: "Good", id: 8, cost: 150, heal: 25},
  {name: "Super", id: 9, cost: 250, heal: 100}
]

export const ANIMATION_DURATIONS = [
  {"/Virtual-pet/zap.gif": 2000},
  {"/Virtual-pet/crystalgif.gif": 1800},
  {"/Virtual-pet/click1.gif": 1400}
];
