const { PerformanceObserver, performance } = require("perf_hooks");

// Recursive Find: Average run time 23.7536206001117 ms
/**
 *  Every recursive loop, check the map to see if its a duplicate, if not add it to the map
 *  Then pass the array with the first item removed and the map with all the found variables
 *  Return either when you find the repeat or when you reach the end
 *  @param {array} arr - Array to be processed
 *  @return {number} - First duplicate found or -1 if none exists
 */
function findFirstDuplicateRecur(arr) {
    let found = new Map();
    return findFirstDuplicateRecursive(arr, found);
}

/**
 * Every recursive loop, check the map to see if its a duplicate, if not add it to the map
 * Then pass the array with the first item removed and the map with all the found variables
 * Return either when you find the repeat or when you reach the end
 * @param {array} arr - array to be processed
 * @param {Map} found - map that holds the previously found items, should be passed initially blank
 * @return {number} - First duplicate found or -1 if none exists
 */
function findFirstDuplicateRecursive(arr, found) {
    if (arr.length != 0) {
        if (found.has(arr[0])) {
            return arr[0];
        } else {
            let shiftVar = arr.shift();
            found.set(shiftVar, 1);
            return findFirstDuplicateRecur(arr, found);
        }
    } else {
        return -1;
    }
}

// single loop find with map: Average run time 0.280548999942839 ms
/**
 *  Loop through the array and check to see if each value is in
 *  the map.  If it isn't, add it to the map.  When you hit the first item
 *  that is already in the map, return it.
 *  @param {array} arr - Array to be processed
 *  @return {number} - First duplicate found or -1 if none exists
 */
function findFirstDuplicateMap(arr) {
    let found = new Map();

    for (let i = 0; i < arr.length; i++) {
        if (found.has(arr[i])) {
            return arr[i];
        } else {
            found.set(arr[i], 1);
        }
    }

    return -1;
}

// single loop find with object: Average run time 0.922331400059163 ms
/**
 *  Loop through the array and check to see if each value is in
 *  the object.  If it isn't, add it to the object.  When you hit the first item
 *  that is already in the object, return it.
 *  @param {array} arr - Array to be processed
 *  @return {number} - First duplicate found or -1 if none exists
 */
function findFirstDuplicateObj(arr) {
    let found = {};

    for (let i = 0; i < arr.length; i++) {
        if (found[arr[i]] != undefined) {
            return arr[i];
        } else {
            found[arr[i]] = 1;
        }
    }

    return -1;
}

// Single loop using find and another array: Average run time 0.285495600044727 ms
/**
 *  Loop through the array and check to see if each value is in
 *  the other array.  If it isn't, add it to the other array.  When you hit the first item
 *  that is already in the other array, return it.
 *  @param {array} arr - Array to be processed
 *  @return {number} - First duplicate found or -1 if none exists
 */
function findFirstDuplicateFindLoop(arr) {
    let found = [];
    for (let i = 0; i < arr.length; i++) {
        if (found.indexOf(arr[i]) === -1) {
            found.push(arr[i]);
        } else {
            return arr[i];
        }
    }

    return -1;
}

// Single loop using find and another array, but only returning at the end: Average run time 114.507947600029 ms
/**
 *  Loop through the array and check to see if each value is in
 *  the other array.  If it isn't, add it to the other array.  When you hit the first item
 *  that is already in the other array, return it.
 *  Instead of returning whenever you find the object in the loop, were just going to wait till
 *  we've gone through every item and then return.
 *  @param {array} arr - Array to be processed
 *  @return {number} - First duplicate found or -1 if none exists
 */
function findFirstDuplicateWait(arr) {
    if (arr.length >= 2500) {
        // Took too long after 2500 so just don't do anything
        return -1;
    }
    let found = [];
    let response = -1;
    for (let i = 0; i < arr.length; i++) {
        if (found.indexOf(arr[i]) === -1) {
            found.push(arr[i]);
        } else {
            if (response === -1) {
                response = arr[i];
            }
        }
    }

    return response;
}

// Double Loop, doing index of manually: Average run time 0.17083979986608 ms
/**
 *  Instead of using indexOf or any other prebuilt function, we create our own.
 *  Loop through the array and add check to see if each value is in
 *  the other array.  Do this via a nested loop that loops through the already found array
 * checking for the same value. If it isn't in the other array, add it.  When you hit the first item
 *  that is already in the other array, return it.
 *  @param {array} arr - Array to be processed
 *  @return {number} - First duplicate found or -1 if none exists
 */
function findFirstDuplicateDouble(arr) {
    let found = [];
    for (let i = 0; i < arr.length; i++) {
        let hasIndex = false;
        for (let j = 0; j < found.length; j++) {
            if (arr[i] == found[j]) {
                hasIndex = true;
                break;
            }
        }
        if (!hasIndex) {
            found.push(arr[i]);
        } else {
            return arr[i];
        }
    }

    return -1;
}

// To pass tests
function findFirstDuplicate(arr) {
    return findFirstDuplicateDouble(arr);
}

if (require.main === module) {
    // add your own tests in here
    console.log("Expecting: 3");
    console.log("=>", findFirstDuplicate([2, 1, 3, 3, 2]));

    console.log("");

    console.log("Expecting: -1");
    console.log("=>", findFirstDuplicate([1, 2, 3, 4]));

    // Timing
    timing();
}

/**
 * This function calculates the time it takes to run each function.  It creates
 * a lot of big arrays at random and runs them multiple times to get an average.
 * It will also run it over different array lengths.  Carts for the times it produced attached.
 */
function timing() {
    let arrayNum = 100;
    let arrayLenRange = [500, 1000, 1500, 2000, 2500, 3000, 3500];
    let averageTries = 500;
    let functions = [
        findFirstDuplicateRecur,
        findFirstDuplicateMap,
        findFirstDuplicateObj,
        findFirstDuplicateFindLoop,
        findFirstDuplicateWait,
        findFirstDuplicateDouble,
    ];

    for (let o = 0; o < arrayLenRange.length; o++) {
        let arrayRange = arrayLenRange[o] + 3;
        for (let p = 0; p < functions.length; p++) {
            let timesArr = [];

            for (let l = 0; l < averageTries; l++) {
                let arrayArrays = [];
                for (let i = 1; i < arrayNum; i++) {
                    arrayArrays[i] = Array.from({ length: arrayLenRange[o] }, () =>
                        Math.floor(Math.random() * arrayRange)
                    );
                }

                let t1 = performance.now();

                for (let j = 1; j < arrayArrays.length; j++) {
                    let dummyVar = functions[p](arrayArrays[j]);
                    // console.log(dummyVar);
                }

                let t2 = performance.now();
                timesArr[l] = t2 - t1;
            }

            let allTimes = timesArr.reduce((a, b) => a + b);

            // console.log("Time for: " + functions[p].name + " is: " + allTimes / averageTries);
            console.log(allTimes / averageTries);
        }
        console.log("------------------------------------------------------------");
    }
}

module.exports = findFirstDuplicate;
