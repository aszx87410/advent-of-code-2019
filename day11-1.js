/*
  It should be easy, but it took me a whole day because there is a bug in my IntCodeComputer implementation.
  這題應該要很簡單的，但我花了一整天 debug 因為我的 IntCodeComputer 寫錯了...QQ
*/

var text = '3,8,1005,8,309,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,29,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,51,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,72,1,1104,8,10,2,1105,15,10,2,1106,0,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,107,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,128,2,6,8,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,155,1006,0,96,2,108,10,10,1,101,4,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,188,2,1,5,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,214,2,6,18,10,1006,0,78,1,105,1,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,247,2,103,8,10,2,1002,10,10,2,106,17,10,1,1006,15,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,285,1,1101,18,10,101,1,9,9,1007,9,992,10,1005,10,15,99,109,631,104,0,104,1,21102,387507921664,1,1,21102,1,326,0,1106,0,430,21102,932826591260,1,1,21102,337,1,0,1106,0,430,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,206400850983,0,1,21101,0,384,0,1105,1,430,21102,3224464603,1,1,21102,395,1,0,1106,0,430,3,10,104,0,104,0,3,10,104,0,104,0,21102,838433657700,1,1,21102,418,1,0,1106,0,430,21101,825012007272,0,1,21101,429,0,0,1106,0,430,99,109,2,21202,-1,1,1,21101,40,0,2,21101,461,0,3,21102,1,451,0,1105,1,494,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,456,457,472,4,0,1001,456,1,456,108,4,456,10,1006,10,488,1102,1,0,456,109,-2,2106,0,0,0,109,4,1202,-1,1,493,1207,-3,0,10,1006,10,511,21101,0,0,-3,21202,-3,1,1,21201,-2,0,2,21102,1,1,3,21102,1,530,0,1106,0,535,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,558,2207,-4,-2,10,1006,10,558,22101,0,-4,-4,1106,0,626,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21101,0,577,0,1106,0,535,22102,1,1,-4,21101,1,0,-1,2207,-4,-2,10,1006,10,596,21102,0,1,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,618,21201,-1,0,1,21102,618,1,0,105,1,493,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0'
class IntCodeComputer {
  constructor(options = {}) {
    this.options = options
    this.inputIndex = options.inputIndex || 0
    this.inputs = []
    this.output = null
    this.outputIndex = options.outputIndex || 0
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
    this.output = out
    this.hasOutput = true
    this.outputIndex++
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
          output: this.output,
          outputIndex: this.outputIndex,
          relativeBase: this.relativeBase
        }
      }
    }
  }
}

var mapLen = 100
var map = []
for(let i=0; i<=mapLen; i++) {
  map[i] = Array.from({length: mapLen}).fill({
    paint: false,
    color: 'black'
  })
}

var currentX = 50
var currentY = 50
var direction = 'U'
var left = {
  'U': 'L',
  'L': 'D',
  'D': 'R',
  'R': 'U'
}

var right = {
  'U': 'R',
  'R': 'D',
  'D': 'L',
  'L': 'U'
}

var options = {
  relativeBase: 0,
  cursor: 0,
  state: null,
  debug: false
}

var input = []
map[currentY][currentX].color = 'black'

let cnt = 0
while (true) {
  var c = new IntCodeComputer(options)
  if (options.state) {
    c.readCommand(options.state)
  } else {
    c.readCommand(text)
  }
  c.readInput(input)
  var result = c.run()
  if (!result || !result.state) break;
  options = result

  // waitInput, enter new input
  if (result.waitInput) {
    options.inputIndex = 0 // 歸零
    if (map[currentY][currentX].color == 'black') {
      input = [0]
    } else {
      input = [1]
    }
    continue;
  }

  if (result.outputIndex % 2 === 1) {
    map[currentY][currentX] = {
      paint: true,
      color: result.output == '0' ? 'black' : 'white'
    }
    continue;
  }

  // turn left
  if (result.output == '0') {
    direction = left[direction]
  } else { // turn right  
    direction = right[direction]
  }
  if (direction === 'U') {
    currentY--
  } else if (direction === 'D') {
    currentY++
  } else if (direction === 'L') {
    currentX--
  } else if (direction === 'R'){
    currentX++
  }
}

let t = 0
for(let i=0; i<mapLen; i++) {
  for(let j=0; j<mapLen; j++) {
    if (map[i][j].paint) t++
  }
}

console.log(t)