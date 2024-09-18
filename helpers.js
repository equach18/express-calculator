const ExpressError = require("./expressError");

function parseNums(numStr) {
  let nums = numStr.split(",").map((num) => {
    const parsedNum = Number(num);
    if (isNaN(parsedNum)) {
      throw new ExpressError(`${num} is not a number.`, 400);
    }
    return parsedNum;
  });
  return nums;
}

function getMean(numArr) {
  const sum = numArr.reduce((acc, cur) => acc + cur, 0);
  return sum / numArr.length;
}

function getMedian(numArr) {
  const sortedArr = numArr.sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length/2)

  if (sortedArr.length % 2 !== 0){
    return sortedArr[mid];
  }
  return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
}

function getMode(numArr){
    const frequency = numArr.reduce((acc, num) =>{
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    },{})

    const maxFreq = Math.max(...Object.values(frequency))

    const modes = Object.keys(frequency).reduce((acc, num) => {
        if (frequency[num] === maxFreq) {
            acc.push(Number(num));
        }
        return acc;
    }, []);

    return modes.length === 1 ? modes[0] : modes;
}

module.exports = {
  parseNums,
  getMean,
  getMedian, 
  getMode
};
