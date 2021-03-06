/*
  I like this one as well, the point here is, we can simplified the formulas.
  For example, if we have:
  * 2 AB, 3 BC, 4 CA => 1 FUEL
  * 3 A, 4 B => 1 AB

  We can replace AB with 3A and 4B, so it will become:
  2A, 4B, 3BC, 4CA => 1 FUEL

  And I just try to do this to every formulas, then I get the answer
  It seems every formula can be simplified in the end.

  我也滿喜歡這題的，這題的重點在於這些公式可以被簡化
  舉例來說，如果我們有：
  * 2 AB, 3 BC, 4 CA => 1 FUEL
  * 3 A, 4 B => 1 AB

  那就可以把第一行的 AB 用 3A 與 4B 代替，就會變成：
  2A, 4B, 3BC, 4CA => 1 FUEL

  然後我試著把每個公式都簡化，最後就得到了答案
  看來每個公式都可以被簡化
*/

var input = `5 HLJD, 1 QHSZD, 13 SKZX => 8 MQPH
10 LSLV => 4 JNJHW
1 MQGF, 4 ZWXDQ, 1 GNSZ => 9 DGDH
1 SKZX, 3 DJSP => 1 MCHV
6 TWSR, 10 ZHDFS, 10 LQZXQ => 9 LXQNX
1 FRVW, 1 CJTW => 9 BRCB
20 ZHVNP => 8 XMXL
7 JQJXP => 1 ZGZDW
13 KRCM => 6 KXPQ
4 ZWXDQ, 4 KFKQF, 1 DZDX => 2 MQGF
8 DZDX, 2 ZKGM => 3 KFKQF
3 FXFTB => 8 KVDGP
10 MVGLF, 3 MWFBW, 13 XMXL, 1 CJTW, 2 ZSXJZ, 2 TNCZH, 3 MPFKN, 6 LXQNX => 2 MZMZQ
5 FRVW => 3 NWBTP
1 MVGLF, 2 NLXD, 6 KVDGP, 2 MQPH, 4 FXTJ, 10 TKXKF, 2 FRWV => 2 CSNS
13 TWSR => 9 BNWT
2 KRCM => 7 LSLV
1 ZHDFS, 11 NTVZD, 1 JQJXP => 6 ZHVNP
2 MCHV, 1 JNJHW => 6 NDQNH
32 SMHJH, 6 KXPQ => 1 CJTW
15 FXFTB, 1 MVGLF => 9 MPFKN
119 ORE => 9 KRCM
3 TNCZH => 9 BFQLT
5 MPFKN, 7 TKXKF, 6 JQJXP, 2 DZDX, 16 LCQJ, 4 DGDH, 4 ZGZDW => 7 WVXW
1 ZHDFS, 1 LXQNX => 3 TNCZH
4 ZMVKM, 1 BRQT => 3 QHSZD
24 FRVW, 1 KVDGP, 2 ZLNM => 3 FGLNK
2 KXPQ, 1 LSLV, 22 HNRQ => 5 ZWXDQ
6 ZWXDQ => 1 FRVW
1 FXFTB, 2 MWFBW => 6 ZHDFS
32 FRVW => 5 FRWV
6 FXFTB, 6 NDQNH, 2 MWFBW => 1 JQJXP
9 ZMVKM, 6 QHSZD, 5 LSLV => 4 SMHJH
3 CHKZ => 6 HLJD
21 BFQLT => 6 FXTJ
1 SMHJH, 4 FXFTB => 6 CHKZ
13 FRVW, 13 JQJXP, 1 GNSZ => 8 ZSXJZ
2 NDQNH => 8 NTVZD
3 KRCM => 2 ZKGM
13 ZHDFS, 14 ZWXDQ, 1 CHKZ => 7 LQZXQ
2 BNWT, 3 CHKZ => 7 ZLNM
167 ORE => 1 BRQT
1 LSLV => 3 DZDX
8 MZMZQ, 7 NWBTP, 3 WVXW, 44 MQPH, 3 DJSP, 1 CSNS, 3 BRCB, 32 LQZXQ => 1 FUEL
8 ZLNM => 2 NLXD
30 JQJXP, 9 FGLNK => 7 LCQJ
1 ZKGM, 19 KXPQ => 8 DJSP
4 DJSP => 6 FXFTB
25 NFTPZ => 6 ZMVKM
14 ZHVNP, 1 MVGLF => 9 TKXKF
1 BRQT => 2 SKZX
6 ZKGM => 7 HNRQ
3 DZDX => 5 TWSR
1 SMHJH => 7 MVGLF
3 NDQNH => 1 GNSZ
153 ORE => 9 NFTPZ
14 MCHV, 4 JNJHW, 2 DJSP => 4 MWFBW`

input = input.split('\n')
var formulas = {}
for(let i=0; i<input.length; i++) {
  let temp = input[i].split(' => ')
  let target = temp[1]
  let [num, t] = target.split(' ')
  let ins = temp[0].split(', ')
  let ooo = []
  formulas[t] = {
    num: Number(num)
  }
  for(let i=0; i<ins.length; i++) {
    let p = ins[i].split(' ')
    ooo.push({
      name: p[1],
      amount: Number(p[0])
    })
  }
  formulas[t].needed = ooo
}

var todos = {}
var formula = formulas['FUEL']
for(let i=0; i<formula.needed.length; i++) {
  todos[formula.needed[i].name] = formula.needed[i].amount
}
delete formulas['FUEL']

function canSimplify(element) {
  for(let key in formulas) {
    let n = formulas[key].needed
    for(let i=0; i<n.length; i++) {
      if (n[i].name === element) {
        return false
      }
    }
  }
  return true
}

/*
  todos: {
     AAA: 5,
     BBB: 6
  }
*/

while(true) {
  // 尋找只在todos  出現過一次而且只出現在 target 的
  if (Object.keys(todos).length === 1) break;
  for(let key in todos) {
    if (key === 'ORE') continue
    if (canSimplify(key)) {
      // console.log('simplify:', key)
      let amount = todos[key]
      let m = Math.ceil(amount / formulas[key].num)
      let needed = formulas[key].needed
      for(let i=0; i<needed.length; i++) {
        if (!todos[needed[i].name]) {
          todos[needed[i].name] = 0
        }
        todos[needed[i].name] += m * needed[i].amount
      }

      // 簡化完畢 simplifed over
      delete formulas[key]
      delete todos[key]
    }
  }
}

console.log(todos)