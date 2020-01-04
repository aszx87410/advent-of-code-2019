/*
  I like this one, the point here is, you can find x, y and z separately, and the LCM will be the answer
  So I ran this program three times to find x, y and z, then use the LCM calculator I found on the internet to get the answer
  
  我滿喜歡這題的，重點是你可以 x,y,z 的循環分開找，都找出來以後求出 LCM 就是答案
  這邊只附上找出單個的程式碼，跑三遍之後隨便上網找一個最小公倍數的計算器找答案
*/

let moons = [
  {x: 16, y: -8, z:13},
  {x: 4, y: 10, z:10},
  {x: 17, y:-5, z:6},
  {x: 13, y: -3, z:0}
]


let v = [
  {x:0, y:0, z:0},
  {x:0, y:0, z:0},
  {x:0, y:0, z:0},
  {x:0, y:0, z:0}
]

let states = {}

let i = 0
while(true){
  // replace x below to y and z, and calculate the LCM（Least common multiple）
  let s = moons.map(r => r.x).join(',') + ':' + v.map(r => r.x).join(',')
  if (states[s]) {
    console.log(i)
    break;
  }
  states[s] = 's' + i
  i++
  for(let j=0; j<moons.length; j++) {
    // 調整 v
    for(let k=j+1; k<moons.length; k++) {
      if (moons[j].x > moons[k].x) {
        v[j].x--
        v[k].x++
      } else if (moons[j].x < moons[k].x) {
        v[j].x++
        v[k].x--
      }

      if (moons[j].y > moons[k].y) {
        v[j].y--
        v[k].y++
      } else if (moons[j].y < moons[k].y) {
        v[j].y++
        v[k].y--
      }

      if (moons[j].z > moons[k].z) {
        v[j].z--
        v[k].z++
      } else if (moons[j].z < moons[k].z) {
        v[j].z++
        v[k].z--
      }
    }
  }

  // 調整 position
  for(let j=0; j<moons.length; j++) {
    moons[j].x += v[j].x
    moons[j].y += v[j].y
    moons[j].z += v[j].z
  }
}