export const SCREENS = {
  START: "start",
  HOME: "home",
  SHOP: "shop",
  REPAIR: "repair",
  CHECKLIST: "checklist"
};
export const SCREEN_LIST = Object.values(SCREENS);

export const ITEMS = [
  {name: "Lithium", id: 1, cost: 5, setter: "setLithium", img: "/Virtual-pet/lithium.png", animation: "/Virtual-pet/lithium.gif"},
  {name: "Battery", id: 2, cost: 10, setter: "setBattery", img: "/Virtual-pet/battery.png", animation: "/Virtual-pet/battery.gif"},
  {name: "Crystal", id: 3, cost: 25, setter: "setCrystal", img: "/Virtual-pet/crystal.png", animation: "/Virtual-pet/crystalgif.gif" },
  {name: "Orb", id: 4, cost: 50, setter: "setOrb", img: "/Virtual-pet/orb.png", animation: "/Virtual-pet/zap.gif"},
  {name: "Air", id: 5, cost: 50, setter: "setAir", img: "/Virtual-pet/air.png", animation: "/Virtual-pet/air.gif"},
  {name: "Lubricant", id: 6, cost: 100, setter: "setLubricant", img: "/Virtual-pet/lubricant.png", animation: "/Virtual-pet/lubricant.gif"},
]
export const MODELS = [
  {name: "chainchilla", id: 1, img:"Virtual-pet/base/chainchillahappy.png"},
  {name: "girl", id: 2, img:"Virtual-pet/base/girlhappy.png"},
  {name: "brown", id: 3, img:"Virtual-pet/base/brownhappy.png"},
  {name: "alien", id: 4, img:"Virtual-pet/base/alienhappy.png"},

]
export const REPAIR = [
  {name: "Poor", id: 7, cost: 100, heal: 10},
  {name: "Good", id: 8, cost: 150, heal: 25},
  {name: "Super", id: 9, cost: 250, heal: 100}
]

export const ANIMATION_DURATIONS = [
  {"/Virtual-pet/zap.gif": 2000},
  {"/Virtual-pet/crystalgif.gif": 1800},
  {"/Virtual-pet/base/chainchillaclick.gif": 1400},
  {"/Virtual-pet/base/girlaclick.gif": 1400},
  {"/Virtual-pet/base/alienclick.gif": 1400},
  {"/Virtual-pet/base/brownclick.gif": 1400},
  {"/Virtual-pet/battery.gif": 1700},
  {"/Virtual-pet/lithium.gif": 1900},
  {"/Virtual-pet/air.gif": 2300},
  {"/Virtual-pet/lubricant.gif": 2300},
  {"/Virtual-pet/base/chainchillasleep.gif": 800}
];
