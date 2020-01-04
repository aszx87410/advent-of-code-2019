/*
  It's the same as day1-1, but we need a while loop to accumalte

  跟 day1-1 差不多，只是要把計算的過程累加起來
*/
var input = document.querySelector('pre').innerText.split('\n').filter(i => i)
console.log(input.map(cal).reduce((s, i) => s+i, 0))

function cal(n) {
  let t = 0
  while(true) {
    n = Math.floor(n/3) - 2
    if (n <= 0) break
    t+=n
  }
  return t
}