const path = require('path')
const querystring = require('querystring')

const Koa = require('koa')
const StaticServer = require('koa-static')
const Router = require('koa-router')

//数据库相关操作
const ringtonesDb = require('./ringtonesDb')
const myDB = new ringtonesDb()

const app = new Koa()
const router = new Router()

router.get('/api/list', async (ctx, next) => {
    next()
    let {
        current = 1,
        pageSize = 20,
        title = ''
    } = querystring.parse(ctx.querystring)
    current *= 1 
    pageSize *= 1
    try {
        await myDB.connect()
        let list = await myDB.findDatas({
            collectionName: 'ringtones',
            current,
            pageSize,
            title
        })
        ctx.body = {
            code: 200, 
            list
        }
    } catch (error) {
        console.error(error);
        
        ctx.body = {
            code: 1001
        }
    }
})
/* router.post('/api/list/ringtone', async (ctx, next)=>{
    
}) */

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(
        // 静态资源
        StaticServer(
            path.resolve(__dirname, '../../../../eellyPPT001/')
        )
    )
    .listen(3002)