//Set Example Event Data

const exampleEvent = {

    title: "Delightful Picnic",
    location: "Greer Park",
    description: "Enjoy one of the last days of summer with us in the afternoon sun at Greer Park! The weather has been absolutely beautiful after the last heat wave, it would be a shame to not enjoy these days to the fullest. Make sure to bring something tasty to eat for everyone else with you!",
    early: 12,
    late: 6,
    days: [1663743600000, 1663830000000, 1663916400000, 1664089200000, 1664175600000, 1664262000000, 1664348400000, 1664521200000, 1664607600000],
    attending: [{ name:"Tom", available: [[1,1,1],[1,1,2],[1,1,3],[1,1,4],[1,1,5],[1,1,6],[1,1,7],[1,1,8],[1,1,9],[1,1,10]]}, 
                {name: "Ethan", available: [[1,1,1], [1,1,2], [1,1,3], [1,1,4], [1,2,1], [1,2,2], [1,2,3], [1,2,4], [1,3,1], [1,3,2], [1,3,3], [1,3,4]]}, 
                {name: "Daniel", available: [[1,1,5], [1,1,6], [1,1,7], [1,1,8], [1,1,9], [1,5,4], [1,5,5], [1,5,6], [1,5,7], [1,5,8], [1,5,9], [1,5,10], [1,6,1], [1,6,2], [1,6,3], [1,6,4], [1,6,5]]},
                {name: "Lissie", available: [[1,1,5], [1,1,6], [1,1,7], [1,1,8], [1,1,9], [2,1,1], [2,1,2], [2,1,3], [2,1,4], [2,1,5], [2,1,6], [2,1,7], [2,1,8], [2,1,9], [2,1,10], [2,1,11], [2,1,12]]},
                {name: "Rebecca", available: [[1,1,1], [1,1,2], [1,1,3], [1,1,4], [1,1,5], [1,1,6], [1,1,7], [1,1,8], [1,1,9], [1,1,10], [1,1,11], [1,1,12], [1,2,1], [1,2,2], [1,2,3], [1,2,4], [1,2,5], [1,2,6], [1,2,7], [1,2,8], [1,2,9], [1,2,10], [1,2,11], [1,2,12]]},
                {name: "Patrick", available: [[1,2,1], [1,2,2], [1,2,3], [1,2,4], [1,2,5], [1,2,6], [1,2,7], [1,2,8], [1,2,9], [1,2,10], [1,2,11], [1,2,12]]},
                {name: "Nidusha", available: [[1,1,5], [1,1,6], [1,1,7], [1,1,8], [1,1,9]]},
                {name: "Yamen", available: [[1,1,5], [1,1,6], [1,1,7], [1,1,8], [1,1,9]]},
                {name: "Brittany", available: [[1,1,5], [1,1,6], [1,1,7], [1,1,8], [1,1,9]]}]

}

const exampleBlocks = [[1663743600000, 1663830000000, 1663916400000, null, 1664089200000, 1664175600000, 1664262000000], [1664348400000, null, 1664521200000, 1664607600000]]

export { exampleEvent, exampleBlocks };