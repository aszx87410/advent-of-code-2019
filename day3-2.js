/*
  It's quite similar like day3-1, the only difference is, we store an object instead of boolean to the array,
  so that we know the steps.

  就跟 day3-1 很像，唯一的差別是 map 裡面存的會是 object，這樣才能知道 w1 跟 w2 的 steps 是多少
*/

var input = document.querySelector('pre').innerText.split('\n')
var w1 = input[0].split(',')
var w2 = input[1].split(',')

var len = 1000000
var start = 100000

var map = []
for(let i=0; i<len; i++) map[i] = []

var cx = start;
var cy = start;
var cnt = 0
for(let p of w1) {
  let step = Number(p.slice(1))
  if (p[0] === 'R') {
    for(let q=1; q<=step; q++) {
      cnt++
      cx++
      if(!map[cx][cy]) {
        map[cx][cy] = {}
      }
      if (!map[cx][cy].w1) {
        map[cx][cy].w1 = cnt
      }
    }
  } else if (p[0] === 'U') {
    for(let q=1; q<=step; q++) {
      cnt++
      cy++
      if(!map[cx][cy]) {
        map[cx][cy] = {}
      }
      if (!map[cx][cy].w1) {
        map[cx][cy].w1 = cnt
      }
    }
  } else if (p[0] === 'D') {
    for(let q=1; q<=step; q++) {
      cnt++
      cy--
      if(!map[cx][cy]) {
        map[cx][cy] = {}
      }
      if (!map[cx][cy].w1) {
        map[cx][cy].w1 = cnt
      }
    }
  } else {
    for(let q=1; q<=step; q++) {
      cnt++
      cx--
      if(!map[cx][cy]) {
        map[cx][cy] = {}
      }
      if (!map[cx][cy].w1) {
        map[cx][cy].w1 = cnt
      }
    }
  }
}

var cross = []
var cx = start;
var cy = start;
cnt=0
for(let p of w2) {
  let step = Number(p.slice(1))
  if (p[0] === 'R') {
    for(let q=1; q<=step; q++) {
      cnt++
      cx++

      if(!map[cx][cy]) {
        map[cx][cy] = {}
      }
      if (!map[cx][cy].w2) {
        map[cx][cy].w2 = cnt
      }

      if(map[cx][cy].w1 && map[cx][cy].w2) {
        cross.push(map[cx][cy].w1 + map[cx][cy].w2)
      }
      
    }
  } else if (p[0] === 'U') {
    for(let q=1; q<=step; q++) {
      cnt++
      cy++
      if(!map[cx][cy]) {
        map[cx][cy] = {}
      }
      if (!map[cx][cy].w2) {
        map[cx][cy].w2 = cnt
      }

      if(map[cx][cy].w1 && map[cx][cy].w2) {
        cross.push(map[cx][cy].w1 + map[cx][cy].w2)
      }
      
    }
  } else if (p[0] === 'D') {
    for(let q=1; q<=step; q++) {
      cnt++
      cy--
      if(!map[cx][cy]) {
        map[cx][cy] = {}
      }
      if (!map[cx][cy].w2) {
        map[cx][cy].w2 = cnt
      }

      if(map[cx][cy].w1 && map[cx][cy].w2) {
        cross.push(map[cx][cy].w1 + map[cx][cy].w2)
      }
      
    }
  } else {
    for(let q=1; q<=step; q++) {
      cnt++
      cx--
      if(!map[cx][cy]) {
        map[cx][cy] = {}
      }
      if (!map[cx][cy].w2) {
        map[cx][cy].w2 = cnt
      }

      if(map[cx][cy].w1 && map[cx][cy].w2) {
        cross.push(map[cx][cy].w1 + map[cx][cy].w2)
      }
      
    }
  }
}


var ans = cross.sort((a, b) => a-b)
console.log(ans[0])