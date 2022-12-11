//Input
const arr = [1, 2, 3, 5, 4, 2, 6, 4]


//Solution
function deleteDuplicatedElements(arr) {
  return arr.reduce((result, item) => {
    if (result.includes(item))
      return result;
    else return [...result, item]
  }, [])
}


//Output
console.log(deleteDuplicatedElements(arr));