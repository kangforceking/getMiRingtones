const axios = require('axios')
const cheerio = require('cheerio')

const ringtonesDb = require('./ringtonesDb')

module.exports = class Ringtones extends ringtonesDb{
    constructor(){
        super()
        this.pageCurrent = 1
        this.pageTotal = 0
        // 第页数据量
        this.pageNumber = 0 
        // this.init()
    }
    /** */
    getXiaomiHtml(){
        return new Promise((resolve, reject)=>{
            axios
                .get(`http://zhuti.xiaomi.com/ringtone?page=${this.pageCurrent}&sort=New`)
                .then(({data})=>{
                    let $ = cheerio.load(data)
                    resolve($)
                })
                .catch((err)=>{
                    reject(err)
                })    
        })
    }
    pushList($){

        let $list = $('.J_RingList li')
        let listLeg = $list.length
        this.pageNumber || (this.pageNumber = listLeg)
        let newList = []
        $list.each((index, dom)=>{
            let $dom = $(dom)
            let title = $dom.find('.title').text()
            let address = $dom.find('.listen').attr('href')
            newList.push({title, address})
        })
        return newList
    }
    getPageTotal($){
        $('.mod .page a').each((index, dom)=>{
            let thisText = $(dom).text()
            if (/^[1-9][0-9]*$/.test(thisText)) {
                thisText *= 1
                if (thisText > this.pageTotal) {
                    this.pageTotal = thisText
                }
            }
        })
    }
    //核心方法
    async init(){
        // this.pageCurrent++
        Promise
            .all([this.getXiaomiHtml(), this.initDb()])
            .then(([$])=>{
                if (!this.pageTotal) {
                    this.getPageTotal($)
                }
                let newList = this.pushList($)
                this.addDatas('ringtones', newList)
            })
    }
    
}