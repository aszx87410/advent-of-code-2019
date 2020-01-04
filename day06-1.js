/*
  It has been a long time to code DFS...
  好久沒寫 DFS 了
*/

var input = document.querySelector('pre').innerText.split('\n').filter(a => a)

var map = {
}

var uniq = []
for(let i=0; i<input.length; i++) {
  let p = input[i]
  let k = p.split(')')
  if (!map[k[0]]) {
    map[k[0]] = []
  }
  map[k[0]].push(k[1])
  uniq.push(k[0])
  uniq.push(k[1])
}

var sa = new Set(uniq)
var ans = {
  COM: 0
}

// calculate the distance from COM to every object
for(let ele of sa) {
  dfs('COM', ele, 0)
}

function dfs(current, target, step) {
  if (current===target) {
    ans[target] = step
    return
  }
  var can = map[current]
  if(!can) return
  for(let i=0; i<can.length; i++) {
    dfs(can[i], target, step+1)
  }
}

var sum = 0
for(let key in ans) {
  sum+=ans[key]
}
console.log(sum)