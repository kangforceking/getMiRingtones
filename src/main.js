import { Vue } from 'vue';

import './index.scss'

document.title = '你好'

function abc(params) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            document.title = '你好啊！'
            resolve('abc')
        }, 300)
    })
}
abc()

new Vue({
    render: h => h(App)
}).$mount('#app')
  