/*
  Just follow the instructions
  就跟著題目做就好
*/

let input = document.querySelector('pre').innerText.split(',').map(Number)

input[1]=12;
input[2]=2;

for(let i=0; i<input.length; i+=4) {
  if (input[i] === 99) {
    break;
  }
  if (input[i] === 1) {
     input[input[i+3]] =  input[input[i+1]] + input[input[i+2]]
  } else if (input[i] === 2){
     input[input[i+3]] =  input[input[i+1]] * input[input[i+2]]
  }
}

console.log(input[0])
