/*
  The most difficult part of this is to understand the message...fortunately sublime has search highlight feature
  這題最難的地方是要看出最後出來的 message，感恩 sublime 搜尋功能
*/

var input = document.querySelector('pre').innerText.replace('\n', '')

var str = Array.from({length: 150}).fill(2)

while(input !== '') {
  var temp = input.slice(0, 150)
  input = input.replace(temp, '')
  for(let i=0; i<temp.length; i++) {
    if (str[i] == 2 && temp[i] != 2) {
      str[i] = temp[i]
    }
  }
}

str = str.join('')

console.log(
  str.slice(0, 25) + '\n' +
  str.slice(25, 50) + '\n' +
  str.slice(50, 75) + '\n' +
  str.slice(75, 100) + '\n' +
  str.slice(100, 125) + '\n' +
  str.slice(125, 150) + '\n'
)