/*
  It's not so easy as the previous problem. Because we need to support the feedback loop
  The first solution came to my mind is, when the machine needs to wait for input, just return the function with current machine state,
  and we can resuume the machine once we get the input.

  這題其實有點難因為跟之前的都不太一樣，要支援中斷的功能
  最先想到的就是把整個 machine 的狀態保存起來，就可以在拿到 input 以後繼續執行
  
*/

var DEBUG_MODE = false
var text = document.querySelector('pre').innerText
var input = text.replace('\n', '').split(',')

// arr must be strings
function run(arr, inputs, initPosition = 0) {
  let inputIndex = 0
  let position = initPosition
  let address = 0
  let output = undefined
  let isHalt = false
  while(position < arr.length) {
    let op = arr[position] + ''
    if (DEBUG_MODE) {
      console.log('arr', arr)
      console.log('op:', op, position)
    }
    
    if (op === '3') {
      address = Number(arr[position+1])
      arr[address] = inputs[inputIndex++]
      // need to wait for input signal
      if (inputIndex > inputs.length) {
        return {
          wait: true,
          state: arr.slice(),
          output,
          position
        }
      }
      position+=2
    } else if (op === '104') {
      address = Number(arr[position+1])
      position+=2
      output = address
      //console.log('output:', address)
    } else if (op === '4') {
      address = Number(arr[position+1])
      position+=2
      output = arr[address]
      //console.log('output:', address, arr[address])
    } else if (op === '99') {
      isHalt = true
      break;
    } else {
      let realOp = (op[op.length - 2] || 0) + '' + op[op.length - 1]
      let mode1 = op[op.length-3]
      let mode2 = op[op.length-4]

      let p1 = Number(arr[position+1])
      let p2 = Number(arr[position+2])
      let p3 = Number(arr[position+3])

      let realP1 = Number(mode1 == 1 ? p1 : arr[p1])
      let realP2 = Number(mode2 ? p2:arr[p2])

      if (DEBUG_MODE) {
        console.log('realOp', realOp, realP1, realP2)
      }
      
      if (realOp === '01') { // +
        arr[p3] =  realP1 + realP2 
        position +=4
      } else if (realOp === '02') { // *
        arr[p3] = realP1 * realP2
        position +=4
      } else if (realOp === '05') {
        if (realP1 != 0) {
          position = realP2
        } else {
          position+=3
        }
      } else if (realOp === '06') {
        if (realP1 == 0) {
          position = realP2
        } else {
          position+=3
        }
      } else if (realOp === '07') {
        arr[p3] = realP1 < realP2 ? 1 : 0
        position+=4
      } else if (realOp === '08') {
        arr[p3] = realP1 == realP2 ? 1 : 0
        position+=4
      }
    }
  }
  return {
    output,
    isHalt
  }
}

function generateCombination(arr, n) {
  if (n===1) {
    return arr.slice()
  }

  let numbers = generateCombination(arr, n-1)
  let results = []
  for(let i=0; i<numbers.length; i++) {
    for(let j=0; j<arr.length; j++) {
      if (numbers[i].indexOf(arr[j]) >= 0) continue;
      results.push(numbers[i] + arr[j])
    }
  }
  return results
}

var cs = generateCombination(['5', '6', '7', '8', '9'], 5)
var maxOutput = 0
var stateMap = {}
for(let i=0; i<cs.length; i++) {
  let seq = cs[i]
  let prevOutput = 0
  let j = 0
  while(true) {
    let r = null
    if (stateMap[j]) {
      let ins = [prevOutput]
      r = run(stateMap[j].state, ins, stateMap[j].position)
      stateMap[j] = null
    } else {
      let ins = [Number(seq[j]), prevOutput]
      r = run(input.slice(), ins)
    }

    prevOutput = r.output
    if (r.isHalt && j === 4) {
      if (prevOutput > maxOutput) {
        maxOutput = prevOutput
      }
      break
    }
    if (r.wait) {
      // keep the state
      stateMap[j] = r
    }
    j++
    if (j == 5) j=0
  }
}

console.log(maxOutput)