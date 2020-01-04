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

function can(num) {
  let arr = (num+'').split('').map(Number)
  let flag = false
  for(let i=0; i<5; i++) {
    if (arr[i] > arr[i+1]) return false
  }

  for(let i=1; i<6; i++) {
    if(arr[i] === arr[i-1] && arr[i] !== arr[i-2] && arr[i] !== arr[i+1]) flag=true
  }
  return flag
}