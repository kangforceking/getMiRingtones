const axios = require('axios')
const cheerio = require('cheerio')
const {MongoClient} = require('mongodb')

class Ringtones{
    constructor(){
        this.list = []
        this.pageCurrent = 1
        this.pageTotal = 0
        // 第页数据量
        this.pageNumber = 0 
    }
    async getList(){
        this.pageCurrent++
        axios
            .get(`http://zhuti.xiaomi.com/ringtone?page=${this.pageCurrent}&sort=New`)
            .then(({data})=>{
                // console.log(data);
                let $ = cheerio.load(data)
                let $list = $('.J_RingList li')
                let listLeg = $list.length
                this.pageNumber || (this.pageNumber = listLeg)
                $list.each((index, dom)=>{
                    let $dom = $(dom)
                    let title = $dom.find('.title').text()
                    let address = $dom.find('.listen').attr('href')
                    this.list.push({title, address})
                })
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    
}

module.exports = new Ringtones()