const {MongoClient} = require('mongodb')

module.exports = class RingtonesDb{
    constructor(url = 'mongodb://localhost:27017'){
        // 数据库地址
        this.url = url
        // 数据库名称
        this.dbName = 'xiaomi'
        // 当前连接上的数据库
        this.dbase = ''
        // db对象
        this.db = ''
    }
    /**
     * 连接数据库
     */
    connect(){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(`${this.url}/${this.dbName}`, { useNewUrlParser: true }, (error, db)=>{
                if (error) {
                    console.log(error);
                    
                    reject(error)
                    db.close()
                } else {
                    this.db = db
                    this.dbase = db.db(this.dbName)
                    resolve(db)
                }
            })
        })
    }
    /**
     * 创建集合
     * @param {String} collectionName 集合名称
     */   
    createCollection(collectionName){
        return new Promise((reslove, reject)=>{
            this.dbase.createCollection(collectionName, (err, res)=>{
                if (err) {
                    reject(err)
                    this.db.close()
                } else {
                    reslove()
                }
            })    
        })
    }
    /**
     * 插入数据
     * @param {String} collectionName 集合名字
     * @param {Array} data  要插入的数据
     */
    addDatas(collectionName, data){
        return new Promise((resolve, reject)=>{
            this.dbase.collection(collectionName).insertMany(data, (error)=>{
                if (error) {
                    console.log(error);
                    reject(error)
                    // this.db.close()
                } else {
                    resolve()
                }
            })
        })
    }
    /**
     * 查询数据
     * @param {String} collectionName 
     */
    findDatas({
        collectionName,
        pageSize = 10,
        current = 1,
        title = ''
    }){
        return new Promise((resolve, reject)=>{
            try {
                let whereObj = {}
                title && (whereObj.title = title)
                console.log(title, whereObj)
                this
                    .dbase
                    .collection(collectionName)
                    .find(whereObj)
                    .limit(pageSize)
                    .skip(pageSize * (current - 1))
                    .toArray((err, result)=>{
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result)
                        }   
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * 连接数据库，创建集合
     */
    async initDb(){
        await this.connect()
        await Promise.all([
            this.createCollection('classify'), 
            this.createCollection('ringtones')
        ])
    }
}