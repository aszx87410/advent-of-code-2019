/*
  Actually I solve this one by mixed of program and manually. I let mouse go random direction and draw the map
  Once I have the map, I can save it as file and then read it, so that the mouse knows more ans the map.
  I just do this randomly few times, and use my brain to calculate the distance of the oxygen system lol
  
  Therefore, the codebase is totally a mess.

  這一題其實我是靠手動跟程式解的，我讓老鼠隨意亂走然後把地圖畫出來，畫出來以後存檔
  這樣下次就只要讀檔，就可以從那時的狀態再來，有點像接關的感覺，讓他隨意跑幾次畫出來以後，再手動去算到終點的距離...
  code 一團亂，完全不值得參考 

*/

var fs = require('fs')
var text='3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1001,1034,0,1039,1002,1036,1,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1105,1,124,1001,1034,0,1039,1001,1036,0,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1106,0,124,1001,1034,-1,1039,1008,1036,0,1041,101,0,1035,1040,1001,1038,0,1043,102,1,1037,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,1002,1035,1,1040,101,0,1038,1043,101,0,1037,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,5,1032,1006,1032,165,1008,1040,35,1032,1006,1032,165,1102,1,2,1044,1106,0,224,2,1041,1043,1032,1006,1032,179,1102,1,1,1044,1105,1,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,44,1044,1105,1,224,1102,0,1,1044,1106,0,224,1006,1044,247,1002,1039,1,1034,1001,1040,0,1035,1001,1041,0,1036,1002,1043,1,1038,102,1,1042,1037,4,1044,1105,1,0,5,26,24,17,68,40,71,9,36,46,67,39,48,8,20,23,12,47,28,13,47,2,68,17,71,31,63,31,83,14,78,31,8,33,30,63,30,5,7,11,91,97,17,84,23,37,46,6,14,59,1,76,41,63,85,83,86,63,33,13,50,17,37,16,59,8,7,35,71,9,23,67,46,62,58,38,76,3,71,43,17,64,29,30,72,91,17,70,21,15,76,31,89,20,38,27,65,53,60,34,90,99,56,15,45,57,8,52,70,36,15,79,32,35,83,78,10,3,90,16,74,14,84,43,20,81,91,25,71,83,24,31,92,72,34,59,27,78,6,31,14,31,76,9,80,63,35,40,92,12,84,65,41,27,82,10,7,56,25,70,4,98,16,37,65,46,78,11,97,20,16,95,98,24,31,3,57,74,42,99,36,34,74,10,81,46,43,97,2,24,61,55,13,96,41,41,46,14,64,2,46,94,53,3,3,81,37,85,7,54,29,90,22,75,47,20,26,86,69,53,89,17,2,55,13,85,99,90,2,48,29,66,55,31,19,39,59,56,98,28,38,10,46,10,62,20,63,18,53,97,9,32,6,46,3,91,24,6,62,30,73,26,24,50,3,16,78,3,34,50,8,18,40,65,64,21,28,30,87,45,99,8,21,77,40,73,38,56,12,86,64,43,61,89,4,55,47,28,14,8,99,52,51,40,82,26,19,68,17,53,70,5,14,22,64,69,84,14,69,2,80,18,79,5,66,18,34,48,31,34,54,50,8,33,73,38,52,94,71,7,31,94,31,93,66,82,39,40,42,80,91,70,10,6,50,35,96,13,7,89,22,58,30,24,85,81,88,55,7,58,38,91,55,11,35,84,28,87,26,78,48,66,11,88,8,18,68,55,38,6,1,57,60,1,8,99,58,21,29,88,32,32,57,72,8,20,45,5,91,39,51,59,82,29,52,37,33,49,5,28,38,17,6,58,67,11,72,51,42,4,3,12,94,84,25,31,72,32,89,49,4,23,57,49,27,38,50,30,23,15,80,4,12,67,14,48,76,91,58,11,63,37,95,1,15,22,84,8,23,87,61,32,78,87,7,47,1,81,31,84,91,21,19,68,6,87,3,72,43,60,23,67,42,40,62,9,86,33,84,69,24,97,37,49,24,67,2,16,52,3,42,49,3,95,84,61,8,40,79,10,74,51,6,77,63,1,66,7,55,24,80,68,17,30,47,54,30,77,40,99,18,85,99,85,2,27,18,33,54,99,27,5,64,39,22,66,12,71,29,26,35,49,13,41,22,76,30,70,30,75,34,7,5,62,1,23,61,43,90,24,91,40,42,75,48,40,91,39,46,38,56,17,28,51,56,7,51,40,56,22,87,43,99,6,58,93,35,47,83,10,57,55,68,34,68,93,28,55,11,3,53,80,9,41,42,50,95,7,4,84,10,91,33,12,99,98,60,76,73,24,70,46,72,27,36,62,27,25,43,59,39,9,95,72,9,17,79,36,52,52,22,4,55,57,16,19,65,62,83,11,76,73,37,89,21,86,6,88,17,93,1,59,8,48,73,90,96,10,85,46,12,99,16,16,76,4,2,2,45,62,30,12,14,72,60,9,19,71,43,41,36,99,69,38,1,1,48,32,33,83,26,15,51,19,31,71,92,8,49,34,87,32,80,73,28,65,95,7,8,85,12,63,22,83,8,70,1,82,96,59,29,95,43,59,72,68,38,48,11,87,54,90,11,93,30,63,12,96,41,64,21,89,24,94,73,79,18,55,40,95,0,0,21,21,1,10,1,0,0,0,0,0,0'
var globalState = ''

class IntCodeComputer {
  constructor(options = {}) {
    this.options = options
    this.inputIndex = options.inputIndex || 0
    this.inputs = []
    this.outputs = []
    this.isHalt = false
    this.waitInput = false
    this.hasOutput = false
    this.cursor = options.cursor || 0
    this.relativeBase = options.relativeBase || 0
    this.OP_INFO = {
      '01': {
        name: 'ADD',
        length: 4,
        handler: (context) => {
          context.setResult(context.a + context.b)
          return true
        }
      },

      '02': {
        name: 'MUL',
        length: 4,
        handler: (context) => {
          context.setResult(context.a * context.b)
          return true
        }
      },

      '03': {
        name: 'READ',
        length: 2,
        handler: (context) => {
          // 沒有 input 可以用，要中斷
          if (this.inputIndex >= this.inputs.length) {
            this.waitInput = true
            return false
          }
          context.setResult(this.inputs[this.inputIndex++])
          return true
        }
      },

      '04': {
        name: 'OUT',
        length: 2,
        handler: context => {
          context.setOutput(context.a)
          return true
        }
      },

      '05': {
        name: 'JNZ',
        length: 3,
        handler: context => {
          if (context.a != 0) {
            context.jump(context.b)
          } else {
            return true
          }
        }
      },

      '06': {
        name: 'JZ',
        length: 3,
        handler: context => {
          if (context.a == 0) {
            context.jump(context.b)
          } else {
            return true
          }
        }
      },

      '07': {
        name: 'LT',
        length: 4,
        handler: context => {
          context.setResult(context.a < context.b ? 1 : 0)
          return true
        }
      },

      '08': {
        name: 'EQ',
        length: 4,
        handler: context => {
          context.setResult(context.a == context.b ? 1 : 0)
          return true
        }
      },

      '09': {
        name: 'ARB',
        length: 2,
        handler: context => {
          context.setRelativeBase(context.relativeBase + context.a)
          return true
        }
      },

      '99': {
        name: 'HALT',
        length: 1,
        handler: context => {
          context.halt()
          return true
        }
      }
    }
  }

  readCommand(rawInput = '') {
    this.rawInput = rawInput
    this.memory = rawInput.replace('\n', '').split(',')
  }

  loadMemory(memory) {
    this.memory = memory
  }

  readInput(inputs = []) {
    this.inputs = inputs
  }

  // always return string of length 5
  fetchOp() {
    let op = this.memory[this.cursor] + ''    
    if (op.length < 5) {
      let times = (5 - op.length)
      for(let i=1; i<=times; i++) {
        op = '0' + op
      }
    }
    return op
  }

  parseOp(op) {
    let realOp = op[3] + op[4]
    let modes = [op[2], op[1], op[0]]
    return {
      realOp,
      modes,
      info: this.OP_INFO[realOp]
    }
  }

  halt() {
    this.isHalt = true
    globalState = this.memory.join(',')
    console.log('halt')
  }

  setOutput(out) {
    //console.log('output:', out)
    this.outputs.push(out)
    if (this.outputs.length === 1){
      this.hasOutput = true
    }
  } 

  setRelativeBase(base) {
    this.relativeBase = base
  }

  jump(newCursor) {
    this.cursor = newCursor
  }

  readNumberFromMemory(position) {
    return Number(this.memory[position] || 0)
  }

  setMemory(position, value) {
    this.memory[position] = value + ''
  }

  execute(currentCursor, op) {
    const opDetails = this.parseOp(op)
    const info = opDetails.info
    let a = this.readNumberFromMemory(currentCursor + 1)
    let b = this.readNumberFromMemory(currentCursor + 2)
    let c = this.readNumberFromMemory(currentCursor + 3)
    if (opDetails.modes[0] == 0) {
      a = this.readNumberFromMemory(a)
    } else if (opDetails.modes[0] == 2) {
      a = this.readNumberFromMemory(a + this.relativeBase)
    }

    if (opDetails.modes[1] == 0) {
      b = this.readNumberFromMemory(b)
    } else if (opDetails.modes[1] == 2) {
      b = this.readNumberFromMemory(b + this.relativeBase)
    }

    // special case, if READ, destination is next parameter instead of third parameters
    if (info.name === 'READ') {
      c = this.readNumberFromMemory(currentCursor + 1)
    }

    const context = {
      setResult: (result) => {
        if (opDetails.modes[2] == 0) {
          this.setMemory(c, result)
        } else if (opDetails.modes[2] == 2) {
          this.setMemory(c + this.relativeBase, result)
        }
      },
      setOutput: this.setOutput.bind(this),
      jump: this.jump.bind(this),
      setRelativeBase: this.setRelativeBase.bind(this),
      halt: this.halt.bind(this),
      relativeBase: this.relativeBase,
      a,
      b
    }
    this.log('Position:', currentCursor, ', OP:', info.name, ', a:', a, ', b:', b)
    const next = info.handler(context)
    if (next) {
      this.jump(currentCursor + info.length)
    }
  }

  log() {
    if (!this.options.debug) return
    console.log.apply(console, arguments)
  }

  run() {
    while(this.cursor < this.memory.length && !this.isHalt) {
      let op = this.fetchOp()
      this.execute(this.cursor, op)
      // 等待 input
      if (this.waitInput || this.hasOutput) {
        return {
          hasOutput: this.hasOutput,
          waitInput: this.waitInput,
          inputIndex: this.inputIndex,
          state: this.memory.join(','),
          cursor: this.cursor,
          outputs: this.outputs,
          relativeBase: this.relativeBase
        }
      }
    }
  }
}


var moves = 0
var lastMove = 0
var map = []
var mapH = 50
var mapW = 50
//var data = fs.readFileSync('./map').toString().split('\n')
for(let i=0; i<50; i++) {
  map[i] = Array.from({length: 50}).fill('?')
}
var currentX = 25
var currentY = 25
var dir = 'L'
map[25][25] = 'S'
var dirMap = {
  'U': {
    num: 1,
    x: 0,
    y: -1
  },
  'D': {
    num: 2,
    x: 0,
    y: 1
  },
  'R': {
    num: 4,
    x: 1,
    y: 0
  },
  'L': {
    num: 3,
    x: -1,
    y: 0
  }
}

var options = {
  relativeBase: 0,
  cursor: 0,
  state: null
}
var input = []
var found = false
let runs = 0
while(runs++ <= 50000) {
  //console.log('runs:', runs)
  var c = new IntCodeComputer(options)
  if (options.state) {
    c.readCommand(options.state)
  } else {
    c.readCommand(text)
  }
  c.readInput(input)
  var result = c.run()
  if (!result || !result.state) {
    console.log('over')
    break;
  }
  options = result
  if(result.waitInput) {
    options.inputIndex = 0 // 歸零
    lastMove = dir
    input = [dirMap[dir].num]
    continue;
  }
  
  let output = result.outputs[0]
  let nextX = currentX + dirMap[dir].x
  let nextY = currentY + dirMap[dir].y
  if (output == 0) { // 撞到牆
    map[nextY][nextX] = '0'

    //決定方向，問號優先
    let cnt = 0
    while(cnt++ < 30) {
      if (dir === 'U') {
        dir = 'R'
      } else if (dir === 'R') {
        dir = 'D'
      } else if (dir === 'D') {
        dir = 'L'
      } else {
        dir = 'U'
      }
      let next = map[currentY + dirMap[dir].y][currentX + dirMap[dir].x]
      if ( next == '0') continue
      if ( next == '?') break
      if (cnt > 15 && next == '.' && Math.random() > 0.5) break
    }
    
  } else if (output === 2) {
    map[nextY][nextX] = 'K'
    console.log('found!!', currentY + dirMap[dir].y, currentX + dirMap[dir].x)
    found = true
    currentY = nextY
    currentX = nextX
   //printMap(currentY, currentX)
  } else {
    if (map[nextY][nextX] === '?') {
      map[nextY][nextX] = '.'
    }
    
    currentY+= dirMap[dir].y
    currentX+= dirMap[dir].x

    //決定方向，問號優先
    let cnt = 0
    // while(cnt++ < 30) {
    //   if (dir === 'U') {
    //     dir = 'R'
    //   } else if (dir === 'R') {
    //     dir = 'D'
    //   } else if (dir === 'D') {
    //     dir = 'L'
    //   } else {
    //     dir = 'U'
    //   }
    //   let next = map[currentY + dirMap[dir].y][currentX + dirMap[dir].x]
    //   if ( next == '0') continue
    //   if ( next == '?') break
    //   if (cnt > 15 && next == '.' && Math.random() > 0.5) break
    // }
    if (currentY == 36 && currentX == '9') {
      dir = 'R'
    }
  }
  //printMap(currentY, currentX)
  //console.log('====')
}

//printMap(currentY, currentX)

var data = fs.readFileSync('./map').toString().split('\n')
for(let i=0; i<data.length; i++) {
  data[i] = data[i].split('')
}
for(let y=0; y<mapH; y++) {
  for(let x=0; x<mapW; x++) {
    if (data[y][x] !== '?') continue
    data[y][x] = map[y][x]
  }
}

for(let i=0; i<data.length; i++) {
  data[i] = data[i].join('')
}

var result = data.join('\n')
fs.writeFileSync('./map', result)


function printMap(y, x) {
  let temp = map[y][x]
  map[y][x] = 'D'
  for(let i=0; i<mapH; i++) {
    console.log(map[i].join(''))
  }
  map[y][x] = temp
}