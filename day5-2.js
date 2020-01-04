/*
  Nothing to say, just follow the instructions and enhance the Intcode computer
  就照題目做的就對了，沒什麼好講的
*/

var input = document.querySelector('pre').innerText.replace('\n', '').split(',')

function run(arr) {
  let input = 5
  let position = 0
  let address = 0
  while(position < arr.length) {
    let op = arr[position] + ''
    if (op === '3') {
      address = Number(arr[position+1])
      arr[address] = input
      position+=2
    } else if (op === '104') {
      address = Number(arr[position+1])
      position+=2
      console.log('output:', address)
    } else if (op === '4') {
      address = Number(arr[position+1])
      position+=2
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
}

run(input)