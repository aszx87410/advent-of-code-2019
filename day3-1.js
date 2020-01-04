/*
  I am lazy to think a better way to do this so let's start with a very straightforward solution.
  We can create an 2D array called map, and mark map[x][y] as true if there is a wire.
  So we just follow every instruction and set the map, find which coordinate two wires crossed, and find the closest
  There is one caveat, because the index of the array must be positive or zero, so we start from x:100000 , y:100000 to avoid negative index
  For example, if we start from x:0, then L10 instruction break the program because of the negtive index

  這題有點懶得想比較好的解法，所以直接用最直覺的方法去解它
  就是建一個二維陣列 map，map[x][y] 是 true 代表這邊有電線
  接下來就只要跟著題目去標記陣列，然後看哪邊相交，最後從所有相加的點找最小值就好
  唯一要注意的地方是 x,y 是從 100000 開始，因為陣列不能有負的 index，假設從 0 開始，那 L10 這指令就會讓 index 變負的
  所以要挑一個大一點的值開始走
*/

var input = document.querySelector('pre').innerText.split('\n')
var w1 = input[0].split(',')
var w2 = input[1].split(',')

var map = []
for(let i=0; i<1000000; i++) map[i] = []

var cx = 100000;
var cy = 100000;
for(let p of w1) {

  let step = Number(p.slice(1))
  if (p[0] === 'R') {
    for(let q=1; q<=step; q++) {
      map[++cx][cy] = '*'
    }
  } else if (p[0] === 'U') {
    for(let q=1; q<=step; q++) {
      map[cx][++cy] = '*'
    }
  } else if (p[0] === 'D') {
    for(let q=1; q<=step; q++) {
      map[cx][--cy] = '*'
    }
  } else {
    for(let q=1; q<=step; q++) {
      map[--cx][cy] = '*'
    }
  }
}

var cross = []
var cx = 100000;
var cy = 100000;
for(let p of w2) {
  let step = Number(p.slice(1))
  if (p[0] === 'R') {
    for(let q=1; q<=step; q++) {
      cx++
      if(map[cx][cy] === '*') {
        cross.push({cx, cy})
      }
      
    }
  } else if (p[0] === 'U') {
    for(let q=1; q<=step; q++) {
      cy++
      if(map[cx][cy] === '*') {
        cross.push({cx, cy})
      }
      
    }
  } else if (p[0] === 'D') {
    for(let q=1; q<=step; q++) {
      cy--
      if(map[cx][cy] === '*') {
        cross.push({cx, cy})
      }
      
    }
  } else {
    for(let q=1; q<=step; q++) {
      cx--
      if(map[cx][cy] === '*') {
        cross.push({cx, cy})
      }
      
    }
  }
}


var ans = cross.reduce((min, e) => {
  let n = Math.abs(e.cx - 100000) + Math.abs(e.cy - 100000)
  return n < min ? n : min
}, 999999999)
console.log(ans)