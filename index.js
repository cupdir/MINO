// +----------------------------------------------------------------------
// | MINO [ WHAT DO YOU NODE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2012 http://www.xiaomi.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: cupdir <cupdir@gmail.com>
// +----------------------------------------------------------------------
// $Id$

/**
  +------------------------------------------------------------------------------
 * MONO 入口文件
  +------------------------------------------------------------------------------
 * @package  node
 * @author   cupdir <cupdir@gmail.com>
 * @version  $Id$
  +------------------------------------------------------------------------------
 */

var server = require('./system/system'); //加载系统配置
require(server.config.ROOT_PATH+'/core/init');//初始化各种配置
/**
 * 任务转发处理 http://expressjs.com/guide.html
 * @param object request HTTP对象
 * @param object response 请求对象 
 */
server.MI.get('/', function(request,response){
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end('<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>'+
        '<h3 style=\'color:gray\'>MINO </h3><br>'+
             
        '</body>');
});
server.MI.get("/:module/:method.:format?", function(request,response){    
    if(request.params.format == 'json'){
        response.header('Content-Type', 'application/json; charset=utf-8');
    } 
    response.header('Server', 'MINO/1.0');
    response.header('X-Powered-By', 'xiaomi');
    try{
        if(/^[a-zA-Z]+$/.test(request.params.method) == false){
            console.log('+--------------------------------------+');
            console.log(request.params.method+'\t接口方法命名不正确');
            response.end(request.params.method+'\t接口方法命名不正确');
            console.log('+--------------------------------------+');
            return;
        }
        var service = require(server.config.ROOT_PATH+'/module/'+request.params.module),
        callback = 'service.api.'+request.params.method+'(request,response,server)';
        
        if(typeof(service.api) == 'undefined'){
            console.log('+--------------------------------------+');
            console.log('\t没有实现service.api对象');
            response.end('\t没有实现service.api对象');
            console.log('+--------------------------------------+');
            return;
            
        }
        eval(callback);
        
    }catch(err) {
        console.log('+--------------------------------------+');
        console.log(err);
        response.end("\t系统错误\n"+err);
        console.log('+--------------------------------------+');
    }
//response.end();
});
server.MI.listen(server.config.LISTEN_PORT);//开启监听
console.log('+--------------------------------------+');
console.log('\t服务器:' + 'http://10.237.35.154:8000/');
console.log('\t平台版本:' + process.platform)
console.log('\t版本号: ' + process.version);
console.log("\t进程号:" + process.pid);
console.log(util.inspect(process.memoryUsage()));
console.log('+--------------------------------------+');


/**
 * 进程事件
 */
process.on('uncaughtException', function (err) {
    console.log('+--------------------------------------+');
    console.log(err);
    console.log('+--------------------------------------+');
});




