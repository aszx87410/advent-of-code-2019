/*
  Easy one, just follow the instructions
  水題，跟著題目指示做就好
*/

var cnt = 0
for(let i=165432; i<=707912; i++) {
  if (can(i)) {
    cnt++
  }
}
console.log(cnt)

function can(num) {
  let arr = (num+'').split('').map(Number)
  let flag = false

  // check if the digits never decrease
  for(let i=0; i<5; i++) {
    if (arr[i] > arr[i+1]) return false
  }

  // check if two adjacent digits are the same (like 22 in 122345).
  for(let i=1; i<6; i++) {
    if(arr[i] === arr[i-1]) flag=true
  }
  return flag
}