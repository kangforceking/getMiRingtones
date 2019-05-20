import { Vue } from 'vue';

document.title = '你好'
document.body.innerHTML = '<p>asdafaf</p>'

function abc(params) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('abc')
        }, 300)
    })
}
abc()