const axios = require('axios')
const cheerio = require('cheerio')
//数据库相关操作
const ringtonesDb = require('./ringtonesDb')
const downloadMp3 = require('./downloadMp3')

module.exports = class Ringtones extends ringtonesDb{
    constructor(){
        super()
        this.pageCurrent = 3101
        this.pageTotal = 0
        // 第页数据量
        this.pageNumber = 0 
        // this.startGetData()
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
    /**
     * 取总页面
     * @param {Object} $ 
     */
    getPageTotal($){
        $('.page a').each((index, dom)=>{
            let thisText = $(dom).text()
            if (/^[1-9][0-9]*$/.test(thisText)) {
                thisText *= 1
                if (thisText > this.pageTotal) {
                    this.pageTotal = thisText
                }
            }
        })
    }
    /**
     * 批量下载到本地并保存到数据库
     * @param {Array} list 数据
     */
    saveMp3(list){
        let lastIndex = list.length - 1
        list.forEach(({title, address}, index)=>{
            downloadMp3(address)
                .then((fileAddress)=>{
                    list[index].fileAddress = fileAddress
                    if (index === lastIndex) {
                        this.addDatas('ringtones', list)
                    }
                })
        })
    }
    /**
     * 开始爬数据并保存到库里
     */
    async startGetData(){
        await this.init()
        do {
            let $ = await this.getXiaomiHtml()
            let newList = this.pushList($)
            this.pageCurrent++
            console.log(this.pageCurrent, this.pageTotal)
            console.table(newList);
            this.addDatas('ringtones', newList)
        } while (this.pageCurrent < this.pageTotal);
    }
    //核心方法
    async init(){
        let [$] = await Promise.all([this.getXiaomiHtml(), this.initDb()])
        this.getPageTotal($)
        let newList = this.pushList($)
        // 存到数据库并下载到本地
        // this.saveMp3(newList)
        // 存到数据库
        console.table(newList);
        this.addDatas('ringtones', newList)
        // this.pageCurrent++
    }
}