//Input
const str = "abcdef"


//Solution
function reverseString(str) {
  let res = ""
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i]
  }
  return res;
}


//Output
console.log(reverseString(str));
