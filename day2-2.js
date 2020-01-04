/*
  Because the two input values will be between 0-99, we can do brute-force to find the answer base on day2-1, just warp the code to a function.
  因為答案的範圍在 0-99 之內，所以把 day2-1 的解法包成函式然後暴力破解一下就好
*/

function solve(n, v) {
  let input = document.querySelector('pre').innerText.split(',').map(Number)
  input[1]=n;
  input[2]=v;

  for(let i=0; i<input.length; i+=4) {
    if (input[i] === 99) {
      break;
    }
    if (input[i] === 1) {
       input[input[i+3]] =  input[input[i+1]] + input[input[i+2]]
    } else if (input[i] === 2){
       input[input[i+3]] =  input[input[i+1]] * input[input[i+2]]
    } else {
      return;
    }
  }

  if (input[0] === 19690720){
    console.log(n*100 + v)
  }
}

for(let i=0; i<100; i++) {
  for(let j=0; j<100; j++) {
    solve(i, j)
  }
}