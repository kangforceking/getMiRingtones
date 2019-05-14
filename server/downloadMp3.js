// 来自： http://www.cnblogs.com/xiandedanteng/p/9019254.html
const http = require('http')
const fs = require('fs')
const randomStr = require('./utils/randomStr')

module.exports = function(url){
    return new Promise((resolve, reject)=>{
        let urlArr = url.match(/http\:\/\/([a-z|A-Z|0-9|\.|-]+\.com)([a-z|A-Z|0-9|\.|-|\/]+\.mp3)/)
        let hostname = urlArr[1]
        let path = urlArr[2]
        // 有端口加端口，没有端口默认80
        let port = 80;
        req = http.request({
            hostname,
            port,
            path,
            method: 'GET',
            headers: {
                'Referer':'http://zhuti.xiaomi.com/ringtone',
            }
        }, (resp)=>{
            let imgData = "";
            resp.setEncoding("binary"); 
            resp.on('data',function(chunk){
                imgData += chunk;            
            });
            resp.on('end',()=>{  
                // 创建文件
                let fileName = `./${randomStr()}.mp3`;
                fs.writeFile(fileName, imgData, 'binary', function(err){
                    if(err){
                        reject(err)
                    } else {
                        resolve(fileName.slice(1))
                    }
                });    
            });
        });
        // 超时处理
        req.setTimeout(7500, ()=>{
            req.abort();
            reject('请求超时')
        });
        // 出错处理
        req.on('error', (err)=>{
            if(err){
                reject(`[downloadMp3]文件${url}下载失败,${err}`)
            }
        });
        // 请求结束
        req.end();
    })
}