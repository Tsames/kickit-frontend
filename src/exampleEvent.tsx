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
    _id: "example_event",
    title: "Delightful Picnic",
    location: "Greer Park",
    description: "Enjoy one of the last days of summer with us in the afternoon sun at Greer Park! The weather has been absolutely beautiful after the last heat wave, it would be a shame to not enjoy these days to the fullest. Make sure to bring something tasty to eat for everyone else with you!",
    early: 11,
    late: 18,
    days: [timeOne, timeTwo, timeThree, timeFour, timeFive,timeSix, timeSeven],
    attending: [{ name:"Tom", available: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1]]}, 
                {name: "Ethan", available: [[3,3], [3,2], [3,3], [3,4], [2,3], [2,2], [2,3], [2,4], [3,3], [3,2], [3,3], [3,4]]}, 
                {name: "Daniel", available: [[1,5], [1,6], [1,7], [1,8], [1,9], [5,4], [5,5], [5,6], [5,7], [5,8], [5,9], [5,10], [6,1], [6,2], [6,3], [6,4], [6,5]]},
                {name: "Lissie", available: [[1,5], [1,6], [1,7], [1,8], [1,9], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,8], [1,9], [1,10], [1,11], [1,12]]},
                {name: "Rebecca", available: [[4,4], [4,2], [4,3], [4,4], [4,5], [4,6], [4,7], [4,8], [4,9], [4,10], [1,11], [1,12], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7], [2,8], [2,9], [2,10], [2,11], [2,12]]},
                {name: "Patrick", available: [[2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7], [2,8], [2,9], [2,10], [2,11], [2,12]]},
                {name: "Nidusha", available: [[1,5], [1,6], [1,7], [1,8], [1,9]]},
                {name: "Yamen", available: [[1,5], [1,6], [1,7], [1,8], [1,9]]},
                {name: "Brittany", available: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1]]}]
}

export default exampleEvent;