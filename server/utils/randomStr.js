/**取随机数 */
module.exports = function(num, defautStr = 'abcdefghjkmnpqrstuvwsyz123456789'){
    let strArr = defautStr.split('')
    let leg = num || strArr.length
    let i = 0
    let str = ''
    do {
        let randomNum = Math.floor(Math.random()*leg) 
        str += strArr[randomNum]
        i++
    } while(i <= leg)
    return str
}