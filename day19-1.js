/*
  Easy, but I found a bug in the IntCodeComputer... 
  水題，但讓我找到一個 IntCodeComputer 的 bug
*/

var text='109,424,203,1,21101,11,0,0,1106,0,282,21101,0,18,0,1105,1,259,1201,1,0,221,203,1,21102,1,31,0,1105,1,282,21102,38,1,0,1106,0,259,21002,23,1,2,22101,0,1,3,21102,1,1,1,21102,1,57,0,1106,0,303,1201,1,0,222,21002,221,1,3,20101,0,221,2,21101,0,259,1,21101,80,0,0,1106,0,225,21102,1,33,2,21102,91,1,0,1106,0,303,1202,1,1,223,20101,0,222,4,21101,0,259,3,21101,0,225,2,21102,225,1,1,21101,0,118,0,1106,0,225,20102,1,222,3,21101,0,22,2,21101,133,0,0,1105,1,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1106,0,259,1201,1,0,223,21002,221,1,4,20102,1,222,3,21102,5,1,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,1,195,0,105,1,108,20207,1,223,2,20101,0,23,1,21102,-1,1,3,21101,0,214,0,1106,0,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,2102,1,-4,249,22101,0,-3,1,21201,-2,0,2,21202,-1,1,3,21101,250,0,0,1105,1,225,22101,0,1,-4,109,-5,2105,1,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22101,0,-2,-2,109,-3,2106,0,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,22102,1,-2,3,21102,1,343,0,1106,0,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,21201,-4,0,1,21101,0,384,0,1105,1,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,22101,0,1,-4,109,-5,2106,0,0'

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
        let mode = opDetails.modes[2]
        // special case: READ
        if (opDetails.info.name === 'READ') {
          mode = opDetails.modes[0]
        }
        if (mode == 0) {
          this.setMemory(c, result)
        } else if (mode == 2) {
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

var options = {
  relativeBase: 0,
  cursor: 0,
  state: null,
  debug: false
}

var input = []
let total = 0

for(let i=0; i<50; i++) {
  for(let j=0; j<50; j++) {
    input = [j, i] // x, y
    var c = new IntCodeComputer(options)
    c.readCommand(text)
    c.readInput(input)
    var result = c.run()
    if (result && result.outputs) {
      total += result.outputs[0]
    }
  }
}

console.log(total)