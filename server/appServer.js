const path = require('path')
const Koa = require('koa')
const StaticServer = require('koa-static')

const Ringtones = require('./ringtones')
const ringtones = new Ringtones()

const app = new Koa()

//静态
app.use(
    StaticServer(
        path.resolve(__dirname, '../dist')
    )
)

app.listen(3002)