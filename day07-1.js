/*
  We need to try every combination to find the answer, and that's all.
  只要試過每一種組合就可以得到答案，就醬
*/

var input = document.querySelector('pre').innerText.replace('\n', '').split(',')

function run(arr, inputs) {
  let inputIndex = 0
  let position = 0
  let address = 0
  let output = undefined
  while(position < arr.length) {
    let op = arr[position] + ''
    if (op === '3') {
      address = Number(arr[position+1])
      arr[address] = inputs[inputIndex++]
      position+=2
    } else if (op === '104') {
      address = Number(arr[position+1])
      position+=2
      output = address
      console.log('output:', address)
    } else if (op === '4') {
      address = Number(arr[position+1])
      position+=2
      output = arr[address]
      console.log('output:', address, arr[address])
    } else if (op === '99') {
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
  return output
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

var cs = generateCombination(['0', '1', '2', '3', '4'], 5)
var maxOutput = 0

for(let i=0; i<cs.length; i++) {
  let seq = cs[i]
  let ins = []
  let prevOutput = 0
  for(let j=0; j<seq.length; j++) {
    ins[0] = seq[j] // phase setting
    ins[1] = prevOutput
    prevOutput = run(input.slice(), ins)
  }
  if (prevOutput > maxOutput) {
    maxOutput = prevOutput
  }
}

console.log(maxOutput)