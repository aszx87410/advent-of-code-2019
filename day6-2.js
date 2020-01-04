/*
  I like BFS more than DFS
  比起 DFS，我比較喜歡 BFS
*/

var input = document.querySelector('pre').innerText.split('\n').filter(a => a)

var map = {
}

for(let i=0; i<input.length; i++) {
  let p = input[i]
  let k = p.split(')')
  if (!map[k[0]]) {
    map[k[0]] = []
  }
  if (!map[k[1]]) {
    map[k[1]] = []
  }
  map[k[0]].push(k[1])
  map[k[1]].push(k[0])
}

var ans = {
  COM: 0,
  YOU: 0,
  785: 1
}

var queue = ['785']

while(queue.length > 0) {
  var current = queue.shift()
  var currentStep = ans[current]
  var can = map[current]
  if(!can) continue
  for(let i=0; i<can.length; i++) {
    var next = can[i]
    if (ans[next] === undefined ||  currentStep + 1 < ans[next]) {
      ans[next] = currentStep + 1
      queue.push(next)
    }
  }
}

console.log(ans['SAN'])