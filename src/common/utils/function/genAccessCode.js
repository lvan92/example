export const genAccessCode = () =>  [...Array(6)].map(genValue).map(i=> String.fromCharCode(i)).join('')
const genValue = (i) =>{
    //*(123 - 48 + 1 ) + 48
    let a = Math.floor(Math.random()*75 + 48)
    if (check(a)) return a; else return genValue(i)
}

const check = (a) => {
    if (a >= 58 && a <= 64) return false
    if (a >= 91 && a <= 96) return false
    return true
}

