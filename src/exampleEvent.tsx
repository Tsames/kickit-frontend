//Set Example Event Data

//Attending Interface
interface attendingInterface {
    name: string;
    available: Array<[number, number]>;
}

//Event Interface
interface eventInterface {
    _id: string;
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
    attending: Array<attendingInterface>;
}

let currentDay: Date = new Date(Date.now());

currentDay.setSeconds(0);
currentDay.setMinutes(0);
currentDay.setHours(0);

let timeOne: number = currentDay.getTime();

let dayTwo: Date = new Date(currentDay);
dayTwo.setDate(currentDay.getDate() + 1);
let timeTwo: number = dayTwo.getTime();

let dayThree: Date | number = new Date(dayTwo);
dayThree.setDate(dayTwo.getDate() + 1);
let timeThree: number = dayThree.getTime();

let dayFour: Date | number = new Date(currentDay);
dayFour.setDate(currentDay.getDate() + 7);
let timeFour: number = dayFour.getTime();

let dayFive: Date | number = new Date(currentDay);
dayFive.setDate(currentDay.getDate() + 8);
let timeFive: number = dayFive.getTime();

let daySix: Date | number = new Date(currentDay);
daySix.setDate(currentDay.getDate() + 9);
let timeSix: number = daySix.getTime();

let daySeven: Date | number = new Date(currentDay);
daySeven.setDate(currentDay.getDate() + 12);
let timeSeven: number = daySeven.getTime();


const exampleEvent: eventInterface = {
    _id: "example",
    title: "Delightful Picnic",
    location: "Greer Park",
    description: "Enjoy one of the last days of summer with us in the afternoon sun at Greer Park! The weather has been absolutely beautiful after the last heat wave, it would be a shame to not enjoy these days to the fullest. Make sure to bring something tasty to eat for everyone else with you!",
    early: 11,
    late: 18,
    // days: [timeOne],
    // days: [timeOne, timeTwo],
    // days: [timeOne, timeTwo, timeThree],
    // days: [timeOne, timeTwo, timeThree, timeFour, timeFive],
    days: [timeOne, timeTwo, timeThree, timeFour, timeFive, timeSix],
    // days: [timeOne, timeTwo, timeThree, timeFour, timeFive,timeSix, timeSeven],
    attending: [{ name:"Tom", available: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5]]}, 
                {name: "Ethan", available: [[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7]]}, 
                {name: "Daniel", available: [[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7]]},
                {name: "Lissie", available: [[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6]]},
                {name: "Rebecca", available: [[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7]]},
                {name: "Patrick", available: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,3],[7,3],[8,3],[9,3],[10,3],[6,4],[7,4],[8,4],[9,4],[10,4],[1,5],[2,5],[3,5],[4,5],[5,5]]},
                {name: "Nidusha", available: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4]]},
                {name: "Yamen", available: [[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5]]},
                {name: "Brittany", available: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4]]}]
}

export default exampleEvent;