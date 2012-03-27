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
 * MONO 链接池，用以提高对mysql,redis等i/o操作的性能 目前只支持 mongodb
  +------------------------------------------------------------------------------
 * @package  core.db
 * @author   cupdir <cupdir@gmail.com>
 * @version  $Id$
  +------------------------------------------------------------------------------
 */
var poolModule = require('generic-pool');
var dbutil = require(xiaomi.ROOT_PATH+'/core/db/mongodb').dbutil;

exports.dbpool = pool = poolModule.Pool({
    name     : 'mongo',
    create   : function(callback) {
        
        dbutil.createMongoClient('unicom',function(err, db, client){
            callback(err,client);
        });
    },
    destroy  : function(client) { client.close(); },
    max      : 50,             //最大10个连接
    idleTimeoutMillis : 30000, //空闲30秒后自动消毁
    log : false
});

