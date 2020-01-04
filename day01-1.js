/*
  Easy one, instead of copy the input to the local, we can just open Chrome devtool and get the input

  水題，就照題目說的做就好，比較特別的點在於可以直接在 input 頁面打開 devtool 去抓輸入
  就不用複製到自己電腦上
*/
var input = document.querySelector('pre').innerText.split('\n').filter(i => i)
console.log(input.map(i => Math.floor(i/3) - 2).reduce((s, i) => s+i, 0))