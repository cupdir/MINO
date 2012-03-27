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
 * MONO 系统配置
  +------------------------------------------------------------------------------
 * @package  system
 * @author   cupdir <cupdir@gmail.com>
 * @version  $Id$
  +------------------------------------------------------------------------------
 */
exports.config = xiaomi = {
    'ROOT_PATH':'/home/cupdir/node', //设置根目录
    'LISTEN_PORT':8000,
    'DBCONFIG':{type:'mysql',dbuser:'name',dbpass:'sad',port:111,dbname:'sdsd'}
};
//express支持
try{
express         = require('express');
exports.MI      = MI =  express.createServer();
exports.util    = util = require('util');
exports.http    = require('http');
exports.url     = require('url');
exports.pool    = require(xiaomi.ROOT_PATH+'/core/db/mongo-pool').dbpool;
}catch(err){
    // do nothing
}


