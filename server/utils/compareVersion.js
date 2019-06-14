/**
 * 比较版本号，如：v2.32.4 比 v1.21.67087-best 大返回true
 * @param {String} version1 
 * @param {String} version2 
 */
function compareVersion(version1, version2){
    let versionArr1 = version1.split('.')
    let versionArr2 = version2.split('.')
    let major = false
    let minor = false
    let ratch = false
    let result = {
        exceed: false,

    } 
    return result
}

module.exports = compareVersion