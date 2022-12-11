//Input
const arr = [1, 2, 3, 5, 6, 4, 2, 1, 6, 3, 5, 3];


function countDuplicatedElements(arr) {
  let map = {};
  let count = 0;
  let value;
  arr.forEach(item => {
    map[item] = map[item] ? map[item] + 1 : 1;
    if (map[item] > count) {
      count = map[item];
      value = item;
    }
  })
  return { value, count };
}


//Output
console.log(countDuplicatedElements(arr));