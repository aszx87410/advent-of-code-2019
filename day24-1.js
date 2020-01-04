/*
  Not hard, just follow the instructions and you will get the answer
  不難，就照著做就好
*/

var input = `###..
#...#
.#.##
##.#.
#.###`

var map = input.split('\n').map(m => m.split(''))

var repeated = {}

repeated[snapshot(map)] = 0

for(let i=1; i<=1000; i++) {
  map = run(map)
  let snap = snapshot(map)
  if (repeated[snap]) {
    console.log('found!', i)
    console.log(score(map))
    break
  }
  repeated[snap] = i
}

function run(arr) {
  let newMap = []
  for(let y=0; y<5; y++) {
    newMap[y] = []
    for(let x=0; x<5; x++) {
      let bug = 0
      if (y-1>=0 && arr[y-1][x] === '#') { bug++ }
      if (x+1<5 && arr[y][x+1] === '#') { bug++ }
      if (y+1<5 && arr[y+1][x] === '#') { bug++ }
      if (x-1>=0 && arr[y][x-1] === '#') { bug++ }
      if (arr[y][x] === '#') {
        newMap[y][x] = bug === 1 ? '#' : '.'
      } else {
        newMap[y][x] = (bug == 1 || bug == 2) ? '#' : '.'
      }
    }
  }
  return newMap
}


function snapshot(arr) {
  return arr.map(item => item.join('')).join('')
} 

function score(arr) {
  let total = 0
  for(let y=0; y<5; y++) {
    for(let x=0; x<5; x++) {
      if (arr[y][x] !== '#') continue
      total += 2**(y*5 + x)
    }
  }
  return total
}