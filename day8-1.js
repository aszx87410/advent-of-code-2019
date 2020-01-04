/*
  Easy
  簡單
*/

var input = document.querySelector('pre').innerText.replace('\n', '')

var winner = ''
var minZeroNum = 300

while(input !== '') {
  var temp = input.slice(0, 150)
  input = input.replace(temp, '')
  var z = temp.length - temp.replace(/0/g, '').length
  if (z < minZeroNum) {
    winner = temp
    minZeroNum = z
  }
}

console.log(winner.split('').filter(a => a==='1').length * winner.split('').filter(a => a==='2').length)