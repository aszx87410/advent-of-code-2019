/*
  Draw the map, find the intersections, sum them up, done.

  把地圖畫出來，找到交叉點，加總，結束
*/

var text='1,330,331,332,109,3072,1101,1182,0,16,1101,1481,0,24,102,1,0,570,1006,570,36,1002,571,1,0,1001,570,-1,570,1001,24,1,24,1105,1,18,1008,571,0,571,1001,16,1,16,1008,16,1481,570,1006,570,14,21101,0,58,0,1105,1,786,1006,332,62,99,21101,333,0,1,21102,1,73,0,1105,1,579,1102,1,0,572,1101,0,0,573,3,574,101,1,573,573,1007,574,65,570,1005,570,151,107,67,574,570,1005,570,151,1001,574,-64,574,1002,574,-1,574,1001,572,1,572,1007,572,11,570,1006,570,165,101,1182,572,127,101,0,574,0,3,574,101,1,573,573,1008,574,10,570,1005,570,189,1008,574,44,570,1006,570,158,1106,0,81,21102,1,340,1,1105,1,177,21101,0,477,1,1105,1,177,21102,1,514,1,21102,1,176,0,1105,1,579,99,21101,0,184,0,1105,1,579,4,574,104,10,99,1007,573,22,570,1006,570,165,1002,572,1,1182,21101,0,375,1,21101,211,0,0,1105,1,579,21101,1182,11,1,21102,222,1,0,1106,0,979,21102,1,388,1,21102,1,233,0,1106,0,579,21101,1182,22,1,21101,0,244,0,1106,0,979,21102,401,1,1,21102,1,255,0,1105,1,579,21101,1182,33,1,21101,266,0,0,1106,0,979,21101,414,0,1,21102,277,1,0,1105,1,579,3,575,1008,575,89,570,1008,575,121,575,1,575,570,575,3,574,1008,574,10,570,1006,570,291,104,10,21102,1182,1,1,21102,313,1,0,1105,1,622,1005,575,327,1101,1,0,575,21101,0,327,0,1105,1,786,4,438,99,0,1,1,6,77,97,105,110,58,10,33,10,69,120,112,101,99,116,101,100,32,102,117,110,99,116,105,111,110,32,110,97,109,101,32,98,117,116,32,103,111,116,58,32,0,12,70,117,110,99,116,105,111,110,32,65,58,10,12,70,117,110,99,116,105,111,110,32,66,58,10,12,70,117,110,99,116,105,111,110,32,67,58,10,23,67,111,110,116,105,110,117,111,117,115,32,118,105,100,101,111,32,102,101,101,100,63,10,0,37,10,69,120,112,101,99,116,101,100,32,82,44,32,76,44,32,111,114,32,100,105,115,116,97,110,99,101,32,98,117,116,32,103,111,116,58,32,36,10,69,120,112,101,99,116,101,100,32,99,111,109,109,97,32,111,114,32,110,101,119,108,105,110,101,32,98,117,116,32,103,111,116,58,32,43,10,68,101,102,105,110,105,116,105,111,110,115,32,109,97,121,32,98,101,32,97,116,32,109,111,115,116,32,50,48,32,99,104,97,114,97,99,116,101,114,115,33,10,94,62,118,60,0,1,0,-1,-1,0,1,0,0,0,0,0,0,1,28,0,0,109,4,1202,-3,1,587,20101,0,0,-1,22101,1,-3,-3,21101,0,0,-2,2208,-2,-1,570,1005,570,617,2201,-3,-2,609,4,0,21201,-2,1,-2,1106,0,597,109,-4,2106,0,0,109,5,1202,-4,1,630,20102,1,0,-2,22101,1,-4,-4,21102,0,1,-3,2208,-3,-2,570,1005,570,781,2201,-4,-3,652,21001,0,0,-1,1208,-1,-4,570,1005,570,709,1208,-1,-5,570,1005,570,734,1207,-1,0,570,1005,570,759,1206,-1,774,1001,578,562,684,1,0,576,576,1001,578,566,692,1,0,577,577,21101,0,702,0,1105,1,786,21201,-1,-1,-1,1106,0,676,1001,578,1,578,1008,578,4,570,1006,570,724,1001,578,-4,578,21102,731,1,0,1105,1,786,1106,0,774,1001,578,-1,578,1008,578,-1,570,1006,570,749,1001,578,4,578,21102,1,756,0,1105,1,786,1106,0,774,21202,-1,-11,1,22101,1182,1,1,21101,0,774,0,1106,0,622,21201,-3,1,-3,1106,0,640,109,-5,2106,0,0,109,7,1005,575,802,20102,1,576,-6,20102,1,577,-5,1105,1,814,21101,0,0,-1,21101,0,0,-5,21101,0,0,-6,20208,-6,576,-2,208,-5,577,570,22002,570,-2,-2,21202,-5,37,-3,22201,-6,-3,-3,22101,1481,-3,-3,1201,-3,0,843,1005,0,863,21202,-2,42,-4,22101,46,-4,-4,1206,-2,924,21101,1,0,-1,1106,0,924,1205,-2,873,21102,1,35,-4,1106,0,924,1201,-3,0,878,1008,0,1,570,1006,570,916,1001,374,1,374,2101,0,-3,895,1102,2,1,0,2102,1,-3,902,1001,438,0,438,2202,-6,-5,570,1,570,374,570,1,570,438,438,1001,578,558,921,21002,0,1,-4,1006,575,959,204,-4,22101,1,-6,-6,1208,-6,37,570,1006,570,814,104,10,22101,1,-5,-5,1208,-5,43,570,1006,570,810,104,10,1206,-1,974,99,1206,-1,974,1101,0,1,575,21101,0,973,0,1106,0,786,99,109,-7,2105,1,0,109,6,21101,0,0,-4,21101,0,0,-3,203,-2,22101,1,-3,-3,21208,-2,82,-1,1205,-1,1030,21208,-2,76,-1,1205,-1,1037,21207,-2,48,-1,1205,-1,1124,22107,57,-2,-1,1205,-1,1124,21201,-2,-48,-2,1105,1,1041,21102,-4,1,-2,1105,1,1041,21101,-5,0,-2,21201,-4,1,-4,21207,-4,11,-1,1206,-1,1138,2201,-5,-4,1059,1201,-2,0,0,203,-2,22101,1,-3,-3,21207,-2,48,-1,1205,-1,1107,22107,57,-2,-1,1205,-1,1107,21201,-2,-48,-2,2201,-5,-4,1090,20102,10,0,-1,22201,-2,-1,-2,2201,-5,-4,1103,1201,-2,0,0,1106,0,1060,21208,-2,10,-1,1205,-1,1162,21208,-2,44,-1,1206,-1,1131,1105,1,989,21101,439,0,1,1105,1,1150,21102,1,477,1,1106,0,1150,21101,514,0,1,21101,0,1149,0,1105,1,579,99,21101,1157,0,0,1105,1,579,204,-2,104,10,99,21207,-3,22,-1,1206,-1,1138,1201,-5,0,1176,2101,0,-4,0,109,-6,2106,0,0,28,9,36,1,36,1,36,1,36,1,36,1,26,9,1,1,26,1,7,1,1,1,22,11,1,1,1,1,22,1,3,1,5,1,1,1,1,1,2,13,7,1,3,11,2,1,11,1,7,1,9,1,1,1,4,1,11,1,7,1,9,1,1,1,4,1,11,1,7,1,9,1,1,1,4,1,5,13,1,1,9,1,1,1,4,1,5,1,5,1,5,1,1,1,9,1,1,1,2,11,3,1,5,1,1,13,2,1,1,1,5,1,1,1,3,1,5,1,11,1,4,1,1,1,5,1,1,1,3,1,5,13,4,1,1,1,5,1,1,1,3,1,22,1,1,9,3,1,15,1,6,1,7,1,5,1,15,1,6,1,7,1,1,5,15,1,6,1,7,1,1,1,19,1,6,1,7,1,1,1,19,1,6,1,7,1,1,1,19,1,6,9,1,1,19,1,16,1,19,1,12,13,11,1,12,1,3,1,7,1,11,1,12,1,3,1,7,1,11,1,12,1,3,1,7,1,11,1,12,1,3,1,1,5,1,13,12,1,3,1,1,1,3,1,26,1,3,13,20,1,5,1,3,1,5,1,20,1,5,1,3,1,5,1,20,1,5,1,3,1,5,1,20,1,5,1,3,1,5,1,20,1,5,1,3,1,5,1,20,11,5,1,26,1,9,1,26,11,14'

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

var map = []
var options = {
  relativeBase: 0,
  cursor: 0,
  state: null
}
var input = []
var mapY = 0
map[0] = []

while(true) {
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
    input = []
    continue;
  }
  
  let output = result.outputs[0]
  if (output == 10) {
    map[++mapY] = []
  } else if (output == 35) {
    map[mapY].push('#')
  } else if (output == 46) {
    map[mapY].push('.')
  } else {
    map[mapY].push(String.fromCharCode(output))
  }
}

var total = 0
for(let i=1; i<mapY-1; i++) {
  for(let j=1; j<map[i].length - 1; j++) {
    if (
      map[i][j] === '#' &&
      map[i+1][j] === '#' &&
      map[i-1][j] === '#' &&
      map[i][j+1] === '#' &&
      map[i][j-1] === '#'
    ) {
      total+=i*j
    }
  }
}

for(let i=0; i<mapY; i++) {
  console.log(map[i].join(''))
}
console.log(total)