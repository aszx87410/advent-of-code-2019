/*
  The solution is slow too, and I am so lasy so I just copy and paste instead of writing a for loop or something...sorry
  I just wipe the dots clockwise, calculate the slope and distance for every coordinates and then decide the order

  這解法一樣很慢而且我很懶，所以直接複製貼上...
  基本上就是順時針來掃，針對每個方向去找每個點，然後排序，排序完按照順序清掉
*/

var w = 33
var h = 33
var map = `..#..###....#####....###........#
.##.##...#.#.......#......##....#
#..#..##.#..###...##....#......##
..####...#..##...####.#.......#.#
...#.#.....##...#.####.#.###.#..#
#..#..##.#.#.####.#.###.#.##.....
#.##...##.....##.#......#.....##.
.#..##.##.#..#....#...#...#...##.
.#..#.....###.#..##.###.##.......
.##...#..#####.#.#......####.....
..##.#.#.#.###..#...#.#..##.#....
.....#....#....##.####....#......
.#..##.#.........#..#......###..#
#.##....#.#..#.#....#.###...#....
.##...##..#.#.#...###..#.#.#..###
.#..##..##...##...#.#.#...#..#.#.
.#..#..##.##...###.##.#......#...
...#.....###.....#....#..#....#..
.#...###..#......#.##.#...#.####.
....#.##...##.#...#........#.#...
..#.##....#..#.......##.##.....#.
.#.#....###.#.#.#.#.#............
#....####.##....#..###.##.#.#..#.
......##....#.#.#...#...#..#.....
...#.#..####.##.#.........###..##
.......#....#.##.......#.#.###...
...#..#.#.........#...###......#.
.#.##.#.#.#.#........#.#.##..#...
.......#.##.#...........#..#.#...
.####....##..#..##.#.##.##..##...
.#.#..###.#..#...#....#.###.#..#.
............#...#...#.......#.#..
.........###.#.....#..##..#.##...`.split('\n')

for(let i=0; i<h; i++) {
  map[i] = map[i].split('')
}

let laserX = 27
let laserY = 19

map[laserY][laserX] = 'X'

function slope(x1, y1, x2, y2) {
  return (y2-y1) / (x2-x1)
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.abs(x1-x2)*Math.abs(x1-x2) + Math.abs(y1-y2)*Math.abs(y1-y2))
}

var cnt = 1
var dots = []
var wipedSlope = {}

while(cnt < 202) {
  // 上方 top
  for(let dy=laserY; dy>=0; dy--) {
    if (map[dy][laserX] === '#') {
      map[dy][laserX] = cnt
      cnt++
      break;
    }
  }

  // 右上 right-top
  dots = []
  wipedSlope = {}
  for(let dy=laserY-1; dy>=0; dy--) {
    for(let dx=laserX+1; dx<w; dx++) {
      if (map[dy][dx] === '#') {
        dots.push({
          x: dx,
          y: dy,
          slope: slope(laserX, laserY, dx, dy),
          dist: dist(laserX, laserY, dx, dy)
        })
      }
    }
  }
  // ASC
  dots.sort((a, b) => {
    if(a.slope !== b.slope) {
      return a.slope - b.slope
    }
    return a.dist - b.dist
  })
  dots = dots.filter(dot => {
    if (wipedSlope[dot.slope]) {
      return false
    }
    wipedSlope[dot.slope] = true
    return true
  })

  for(let i=0; i<dots.length; i++) {
    map[dots[i].y][dots[i].x] = cnt++
  }
  
  // 右方 right
  for(let dx=laserX; dx<w; dx++) {
    if (map[laserY][dx] === '#') {
      map[laserY][dx] = cnt
      cnt++
      break;
    }
  }

  // 右下 right-bottom
  dots = []
  wipedSlope = {}
  for(let dy=laserY+1; dy<h; dy++) {
    for(let dx=laserX+1; dx<w; dx++) {
      if (map[dy][dx] === '#') {
        dots.push({
          x: dx,
          y: dy,
          slope: slope(laserX, laserY, dx, dy),
          dist: dist(laserX, laserY, dx, dy)
        })
      }
    }
  }
  // ASC
  dots.sort((a, b) => {
    if(a.slope !== b.slope) {
      return a.slope - b.slope
    }
    return a.dist - b.dist
  })
  dots = dots.filter(dot => {
    if (wipedSlope[dot.slope]) {
      return false
    }
    wipedSlope[dot.slope] = true
    return true
  })

  for(let i=0; i<dots.length; i++) {
    map[dots[i].y][dots[i].x] = cnt++
  }

  // 下方 bottom
  for(let dy=laserY; dy<h; dy++) {
    if (map[dy][laserX] === '#') {
      map[dy][laserX] = cnt
      cnt++
      break;
    }
  }

  // 左下 left-bottom
  dots = []
  wipedSlope = {}
  for(let dy=laserY+1; dy<h; dy++) {
    for(let dx=laserX-1; dx>=0; dx--) {
      if (map[dy][dx] === '#') {
        dots.push({
          x: dx,
          y: dy,
          slope: slope(laserX, laserY, dx, dy),
          dist: dist(laserX, laserY, dx, dy)
        })
      }
    }
  }
  // ASC
  dots.sort((a, b) => {
    if(a.slope !== b.slope) {
      return a.slope - b.slope
    }
    return a.dist - b.dist
  })
  dots = dots.filter(dot => {
    if (wipedSlope[dot.slope]) {
      return false
    }
    wipedSlope[dot.slope] = true
    return true
  })

  for(let i=0; i<dots.length; i++) {
    map[dots[i].y][dots[i].x] = cnt++
  }

  // 左方 left
  for(let dx=laserX; dx>=0; dx--) {
    if (map[laserY][dx] === '#') {
      map[laserY][dx] = cnt
      cnt++
      break;
    }
  }

  // 左上 left-top
  dots = []
  wipedSlope = {}
  for(let dy=laserY-1; dy>=0; dy--) {
    for(let dx=laserX-1; dx>=0; dx--) {
      if (map[dy][dx] === '#') {
        dots.push({
          x: dx,
          y: dy,
          slope: slope(laserX, laserY, dx, dy),
          dist: dist(laserX, laserY, dx, dy)
        })
      }
    }
  }
  // ASC
  dots.sort((a, b) => {
    if(a.slope !== b.slope) {
      return a.slope - b.slope
    }
    return a.dist - b.dist
  })
  dots = dots.filter(dot => {
    if (wipedSlope[dot.slope]) {
      return false
    }
    wipedSlope[dot.slope] = true
    return true
  })

  for(let i=0; i<dots.length; i++) {
    map[dots[i].y][dots[i].x] = cnt++
  }

}

for(let y=0; y<h; y++) {
  for(let x=0; x<w; x++) {
    if(map[y][x] === 200) {
      console.log(x*100 + y)
    }
  }
}