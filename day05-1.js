/*
  Actually I spend more time than expected on this problem because of the "type"
  It's quite confused and easy to produce the bug when I mixed the type string and integer...

  這題花的時間比我想像中還久，因為型態的關係
  把數字跟字串混在一起好麻煩啊...
*/

var input = document.querySelector('pre').innerText.replace('\n', '').split(',')

function run(arr) {
  let input = 1
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

      if (realOp === '01') { // +
        arr[p3] = Number(mode1 == 1 ? p1 : arr[p1]) + Number(mode2 ? p2:arr[p2])
      } else if (realOp == '02') { // *
        arr[p3] = Number(mode1 == 1 ? p1 : arr[p1]) * Number(mode2 ? p2:arr[p2])
      }
      position +=4
    }
  }
}

run(input)