/*
  Easy
  簡單
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

let i = 1000
while(i--){
  for(let j=0; j<moons.length; j++) {
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

  for(let j=0; j<moons.length; j++) {
    moons[j].x += v[j].x
    moons[j].y += v[j].y
    moons[j].z += v[j].z
  }
}

let t = 0
for(let i=0; i<4; i++) {
  t += (Math.abs(moons[i].x) + Math.abs(moons[i].y) + Math.abs(moons[i].z)) *  (Math.abs(v[i].x) + Math.abs(v[i].y) + Math.abs(v[i].z))
}

console.log(t)