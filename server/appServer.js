const path = require('path')
const Koa = require('koa')
const StaticServer = require('koa-static')

//数据库相关操作
const ringtonesDb = require('./ringtonesDb')

const app = new Koa()

//静态资源中间件
app.use(
    StaticServer(
        path.resolve(__dirname, '../../../../eellyPPT001/')
    )
)

app.listen(3002)