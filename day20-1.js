/*
  This problem is quite interesting, acutally I remember I solved similar problem before. It's still BFS but you need to consider the teleport
  這題很有趣，我以前碰過類似的題目，一樣用 BFS 可以解但是要考慮到傳送
*/

let map = `                               O         L       Z Z   P       X         P                                   
                               E         W       Z P   F       W         S                                   
  #############################.#########.#######.#.###.#######.#########.#################################  
  #...#.#.#.#.#.#...........#.#.......#.....#.#.#.....#.#.....#.#.....#.#...........#.....#.#.#.#.#.#...#.#  
  #.###.#.#.#.#.#####.#.###.#.#######.###.###.#.#.#.###.#.###.#.###.###.###.###########.###.#.#.#.#.#.###.#  
  #.#.....#...........#...#.....#...#.#.......#...#...#...#...#.#...#...........#...#.#...................#  
  #.###.#####.#.###.#.###.###.#####.#.#.#######.###########.#.#.#.#.#########.###.###.#.###.#.#.#.###.###.#  
  #.....#.....#.#.#.#...#.#...........#...#.#...#...#.#.....#.#...#...#...........#.#.#...#.#.#.#.#...#...#  
  #####.#######.#.#########.#.#.#.###.#.#.#.###.###.#.#.###.#.###.#.#.#.#.#.#####.#.#.#.#######.#.###.###.#  
  #...#.....#...#.#.#.......#.#.#...#.#.#.....#.....#...#...#.#.#.#.#.#.#.#.....#.#...#...#...#.#...#...#.#  
  #.###.#########.#.#.#####.#####.###.###.###.#.#######.#######.#####.#######.###.###.#.#####.###.#########  
  #...#.#...#.#.#.#.#.#.....#.......#...#.#...#.......#...#...............#...#.....#...........#.#...#.#.#  
  #.###.###.#.#.#.#.#####.#####.#.#.#######.#.###.#####.#######.#.###.###.###.#####.#.#.###########.###.#.#  
  #.........#.....#...#...#.....#.#.#...#.#.#.#...#...#.....#.#.#.#.#.#.#.#.....#.#...#.#.#.#.#...#.#.#.#.#  
  ###.#######.#######.#.###.#####.#####.#.###.#.#####.#.#####.#####.#.#.#.###.###.###.###.#.#.#.###.#.#.#.#  
  #.........#.#.#.#...#.#.#.#...........#.#.#.#...#.#.....#.#.......#...#.#.#.#...#.#.........#...#.#.#...#  
  #.#########.#.#.#.#####.#######.#.#.#.#.#.#.###.#.###.###.#.#.###.#.#####.#.#.###.###.#.#.###.#.#.#.#.###  
  #.....#.......#...#.........#...#.#.#.#.....#.....#.......#.#...#.#.#.........#.......#.#.#.#.#.#.#.....#  
  ###.#.###.#####.#######.###.#.###.#.#####.#####.#.###.#######.#####.#.###############.###.#.#.###.###.###  
  #.#.#.#...#.....#...#...#...#...#.#.#.#.#.#...#.#...#...#.#.....#.#.#.#.............#.#...#...#.....#...#  
  #.#.###.#####.#####.#######.#.#######.#.#.###.#####.#.###.#.#.###.#.#.#.#.#.#####.###########.#.#####.###  
  #.......#.#...#.#...#.#...........#.#.#.....#.......#...#.#.#.......#...#.#.#...#.#.#.#.#.........#.#...#  
  #.###.###.###.#.###.#.#########.###.#.#.#.###.###.###.###.#####.###.#####.###.#####.#.#.#####.###.#.#.#.#  
  #.#.....#.#...#.#.#...#.#.........#...#.#.#...#...#.......#.....#.#.#...........#.........#.#.#.#.#...#.#  
  #######.#.###.#.#.#.###.#######.###.#.###.###.###.###.###.#.#.###.###.#.###.#####.#########.#.#.###.#####  
  #...........#.#.#.....#.............#.#.#.#.....#.#...#.#.#.#.......#.#.#.....#.#.#...#.#...#.....#...#.#  
  #########.###.#.#.#######.#.#.#####.###.#.#####.#.#.###.#.###.#####.#.#####.###.#.###.#.#.#####.###.###.#  
  #.#.#.#.#.#...#.....#.#.#.#.#.#.........#...#...#.#.#.......#.#.....#...#...#...#.#...#.#.....#...#.....#  
  #.#.#.#.#.###.#.#.#.#.#.#######.#########.###.###########.#####.#####.#########.#.###.#.###.###.#####.#.#  
  #...#.#.....#...#.#.#...#.#    Y         H   N           T     S     W        #.#.#.....#.#.#...#.#.#.#.#  
  #.###.###.###.#.#####.###.#    T         V   P           Z     B     Z        #.#.###.#.#.#.###.#.#.#.###  
  #.#...#.#.....#...#.....#.#                                                   #.....#.#...........#...#.#  
  #.###.#.#.#.#########.#.#.#                                                   #.#.#####.#########.#.#.#.#  
TZ......#...#.....#...#.#...#                                                 PF..#.#...#.....#.......#....TF
  #.#.#####.#.#####.#.#####.#                                                   #.#.#.#.###.#.###.#.#####.#  
  #.#...#...#.....#.#.#.#...#                                                   #.#.#.#...#.#.#.#.#.#.....#  
  ###.#.#.###.#.#.###.#.###.#                                                   #.#.#.###.#.###.###########  
  #.#.#...#...#.#............XH                                                 #.#...#.....#.#.....#.....#  
  #.#####.#####.#.#.#.###.#.#                                                   ###.#########.###.#.#####.#  
  #...#.#.#.....#.#.#.#.#.#.#                                                   #...#.............#.#.....#  
  #.#.#.#.#########.###.#####                                                   ###.#.###.#.#####.#####.#.#  
NJ..#.#.#.#...#.#.#.....#...#                                                   #.#.#...#.#.#...........#..NP
  ###.#.###.#.#.#.#.#######.#                                                   #.#####.#####.###.###.#.###  
  #.....#.#.#.#...#.#.......#                                                   #.......#...#.#.....#.#...#  
  #####.#.#.#####.###.#.###.#                                                   #.#########.###############  
  #...#...............#.#.#..KX                                               PS....#.....#.#.#.#...#...#.#  
  #.#####################.###                                                   #########.#.#.#.#.#####.#.#  
  #.................#.......#                                                   #..........................YT
  #.###.#.#.###.###.#.###.###                                                   #.###.###.#.#.#.#.###.###.#  
KX....#.#.#.#...#.....#.....#                                                 IF....#.#...#.#.#.#...#.#...#  
  #.###.###.#####.#.###.#####                                                   #########.#################  
  #.#...#...#.#...#.#........XW                                                 #...#...#.#.#.#.#..........HV
  #.###.###.#.#####.#.#######                                                   #.#####.###.#.#.#.#####.#.#  
  #.#.#.#.#.#.#...#.#.#.#...#                                                 XG..#.#.#...#...#...#...#.#.#  
  ###.###.###.###.#####.#.#.#                                                   #.#.#.#.###.#.#.#.#.#####.#  
  #.#.#.#.#.#.#.#.........#.#                                                   #...#.......#.#.#.#...#.#.#  
  #.#.#.#.#.#.#.#######.###.#                                                   #.#####.#.#.#####.###.#.###  
SO....#.........#.#.....#...#                                                   #.......#.#.......#...#.#.#  
  #.###.###.#.#.#.###.###.###                                                   #####.#.#####.#######.#.#.#  
  #.....#...#.#.......#.#....XX                                               MU..#...#.....#.#...........#  
  #.#.###.#####.#####.#.#.###                                                   #.#####.#######.#######.###  
  #.#.#.#.#.#.....#.....#.#..YH                                                 #.#.#...#.#...........#...#  
  #####.###.###############.#                                                   #.#.#####.#.###.#.#.###.#.#  
  #...#...#...#.#.#...#...#.#                                                   #.#...#.#.#...#.#.#...#.#..TH
  #.#####.#.###.#.#.###.###.#                                                   #.#.###.#.#######.#########  
XH..#.#.#.....#.#...#...#.#.#                                                   #...................#.#...#  
  #.#.#.#.#.###.###.#.#.#.#.#                                                   #####################.###.#  
  #.......#...........#.....#                                                   #.....#.........#..........VD
  #########.###.###.#.#.#.###                                                   #.###.#.#.#.###.#.#.#####.#  
IF......#.#.#.#.#...#.#.#.#.#                                                 OE..#...#.#.#.#.....#...#...#  
  #.#####.#.#.#######.#.###.#                                                   #.#.###.###.###.###.#.#.###  
  #...#.#.#...#.#.#...#.#.#..LW                                                 #.#...#...#.#.....#.#.#.#..AA
  #.#.#.#.#####.#.#######.#.#                                                   #####.#.#.#####.#.###.#.#.#  
YH..#.#...#.......#...#...#..NJ                                                 #.......#.#...#.#.#...#...#  
  #.###.#.###.#.#.#.###.#.#.#                                                   #####.#####.#.#######.#####  
  #.....#.....#.#.......#...#                                                   #.#.....#.#.#.#.#...#.#...#  
  ###########################                                                   #.###.###.#.###.#.#####.#.#  
  #...............#.#.......#                                                   #.#.#.#.#.....#...#.....#..KI
  ###.#####.#.###.#.#.#.#.#.#                                                   #.#.###.#.#######.#####.#.#  
  #.....#.#.#.#.....#.#.#.#..SO                                               TF..#...#...#.#.......#...#.#  
  #.#####.###.###.#.###.#.#.#                                                   #.#.#.#.#.#.###.#.###.###.#  
WZ..........#.#.#.#.#.#.#.#.#                                                   #...#...#.......#.......#.#  
  #.###.#.#.###.###.#.#.###.#                                                   #.#.###.#.#.###.#.###.#####  
  #...#.#.#.#.............#.#                                                   #.#...#.#.#...#.#...#.....#  
  #.###.#####.#####.#.#.###.#      Q           T       K   V         Z     T    ###.#.#.#####.#.###.#.#.###  
  #.#.....#.#...#...#.#...#.#      B           H       I   D         P     G    #...#.#...#...#...#.#.#...#  
  #########.#.###.###.#####.#######.###########.#######.###.#########.#####.###########.###.#.#.#.#####.###  
  #...#.......#.#...#.#.#.#.#.#.........#.#.#...#...#...#...#.#.#.....#.....#...#...#.#.#...#.#.#...#.....#  
  ###.#.#.#####.#.#####.#.###.###.###.###.#.#.###.#.###.#.###.#.#.#######.#.#.###.###.#.#####.###.#.#.#.###  
  #.....#.#.......#...#.#.........#.....#.#.#.#...#...#.#.....#.........#.#...#...#...#.....#.#...#.#.#...#  
  #.#.#.###.#####.#.###.#.###.#.#####.#.#.#.#.###.###.#.#.#.#.#.#.#.#########.#.###.#.#########.#.#.###.###  
  #.#.#.#...#.#.........#.#...#.#.#...#.#.....#...#.#...#.#.#.#.#.#...#...#.#.......#.....#...#.#.#...#...#  
  #.#####.###.#.#####.#######.###.#.###.#.#######.###.###.#####.###.###.###.#.#.###.###.#.#.#.###.#.###.###  
  #.#...#.#.......#.........#.#.....#.#.#.......#.#.#.#.....#.#.#.......#.....#...#.#.#.#...#.#...#...#...#  
  #.###.#.#.###.###.#.#######.#######.#.#######.#.#.#.###.#.#.#.#####.###.#.###.###.#.###.###.#####.#.#.#.#  
  #.#.....#...#...#.#.#...#.#.#.#.........#.#...#...#.#...#...#.#.......#.#...#...#.....#...#.#.#.#.#.#.#.#  
  ###.#.#.#.#.###.###.###.#.###.#######.###.#.#.#.#.#####.#.#########.#.###.#########.###.###.#.#.#.#######  
  #...#.#.#.#.#...#...#.......#...#.#.....#...#.#.#.....#.#.#.....#...#.#...#.....#.#.#.....#.#...........#  
  ###.###.#####.#####.#####.###.###.###.#######.#.#.#######.###.#.###.#####.#.#####.#####.#.###.#.#####.#.#  
  #.....#.#...#.#.....#.....#.#.#...#.#.#...#...#.#.#.#...#...#.#.....#...#...........#...#.#.#.#.#.....#.#  
  #.###.#####.#.#####.#####.#.#.###.#.#.#.#####.#.###.###.###.#####.#.###.#.#.###.###########.###.#####.#.#  
  #.#.#.#.......#...#.#...............#...#.#...#...#.........#.....#.#.....#.#.#.#.........#.#.......#.#.#  
  ###.#######.#####.#######.#.###.###.#.#.#.###.#.#.#######.#.#.#.#.###.###.###.###.#########.###.#########  
  #.#...#...#.#.#.#...#.....#.#...#.#.#.#.#.....#.#.#.#.#...#.#.#.#.#.....#.......#.....#.#.....#...#...#.#  
  #.#.#####.###.#.#.#.#.#.#######.#.#.#.#####.###.###.#.#####.#.#######.#######.###.#.###.#.#########.###.#  
  #.....#...#.....#.#.#.#.#.......#.#...#.#...#.#...#.#...#.#.#...#.#.........#.#...#.#.............#.#...#  
  #.###.#.#.###.#####.#.#########.#.#####.#.###.#.###.#.###.#.###.#.#####.#.#####.#####.#.#.#.#.###.#.###.#  
  #.#.#.#.#.............#.................#.#...#.#.....#.......#.....#...#.#.....#.....#.#.#.#.#.#.......#  
  ###.#.#####.###.#.#####.#.###.#.#.###.#.#.#.#.#.###.#####.#####.#.#.###.###.#######.###########.#.#####.#  
  #.............#.#.#.#...#.#...#.#.#...#.#.#.#.#...#...#.......#.#.#.#...#.....................#.#.....#.#  
  #####.#.###.#.#.###.###.###.#.###.#.#####.#.#.#.###.#######.#######.#.###.#.#.#.#.#.###.#.#####.###.###.#  
  #.....#...#.#.#.#.......#...#.#...#.#.......#.#.........#...#.......#.....#.#.#.#.#...#.#.......#.....#.#  
  ###################################.#########.#####.#####.#####.###########.#############################  
                                     X         S     T     Q     M           X                               
                                     G         B     G     B     U           X                               `

map = map.split('\n')
// 先算出每一個點，以及找出起點與終點
// Let's start from find start and end point, and get the teleport coordinates.
let newMap = []
let transports = {

}
let startX = 0
let startY = 0
let endX = 0
let endY = 0
for(let y=0; y<map.length; y++) {
  newMap[y] = []
  for(let x=0; x<map[y].length; x++) {
    // 把不能走的都變成牆
    // Marked anything except . as #
    if (map[y][x] !== '.') {
      newMap[y][x] = '#'
      continue
    } 
    // If it's teleport point
    let name = null
    if (y-2 >= 0 && isAlphabet(map[y-1][x]) && isAlphabet(map[y-2][x])) {
      name = map[y-2][x] + map[y-1][x]
    } else if (y+2 < map.length && isAlphabet(map[y+1][x]) && isAlphabet(map[y+2][x])) {
      name = map[y+1][x] + map[y+2][x]
    } else if (x-2 >= 0 && isAlphabet(map[y][x-2]) && isAlphabet(map[y][x-1])) {
      name = map[y][x-2] + map[y][x-1]
    } else if (x+2 < map[y].length && isAlphabet(map[y][x+1]) && isAlphabet(map[y][x+2])) {
      name = map[y][x+1] + map[y][x+2]
    }

    // it's normal path, not teleport point
    if (!name) {
      newMap[y][x] = '.'
      continue
    }

    if (name === 'AA') {
      startY = y
      startX = x
      newMap[y][x] = '.'
      continue
    }

    if (name === 'ZZ') {
      endY = y
      endX = x
      newMap[y][x] = '.'
      continue
    }

    if (!transports[name]) {
      transports[name] = []
    }
    transports[name].push({x, y})
    newMap[y][x] = '.'
  }
}

/*
  teleports structure:
  '2,45': { x: 28, y: 45 }

  代表 x,y 這個點可以傳送到 x,y 去
  It means 'x,y' can teleport to {x, y}
*/
var teleports = {}
for(let key in transports) {
  let arr = transports[key]
  teleports[arr[0].x + ',' + arr[0].y] = arr[1]
  teleports[arr[1].x + ',' + arr[1].y] = arr[0]
}

// BFS
let queue = [
  {x: startX, y: startY}
]
let ans = []
for(let y=0; y<newMap.length; y++) {
  ans[y] = []
}

ans[startY][startX] = 0

let dir = [
  {dx: 1, dy: 0},
  {dx: -1, dy: 0},
  {dx: 0, dy: 1},
  {dx: 0, dy: -1}
]

while(queue.length) {
  let {x,y} = queue.shift()

  for(let d of dir) {
    let newX = x + d.dx
    let newY = y + d.dy
    if (
      newX < 0 ||
      newY < 0 ||
      newX >= newMap[0].length ||
      newY >= newMap.length ||
      newMap[newY][newX] !== '.' ||
      (ans[y][x] + 1 >= ans[newY][newX] && ans[newY][newX] !== undefined) // We shouldn't go there
    ) {
      continue
    }
    
    ans[newY][newX] = ans[y][x] + 1
    queue.push({x: newX, y: newY})
  }

  // 看能不能傳送, check if we can teleport
  let tp = teleports[x + ',' + y]
  if (!tp || ans[y][x] + 1 >= ans[tp.y][tp.x] && ans[tp.y][tp.x] !== undefined) {
    continue
  }
  ans[tp.y][tp.x] = ans[y][x] + 1
  queue.push({x: tp.x, y: tp.y})
}

console.log(ans[endY][endX])
function isAlphabet(c) {
  return c>='A' && c<='Z'
}